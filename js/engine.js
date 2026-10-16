/* Nyomozós játékmotor. Az ügyeket a cases/*.js fájlok töltik be a window.MM_CASES tömbbe. */
(function () {
  "use strict";
  const I = window.MM_I18N || { T: s => s, lang: "hu", apply: () => {} };
  const T = I.T, LANG = I.lang;
  const CASES = (window.MM_CASES || []).slice().sort((a, b) => a.number - b.number);
  CASES.forEach(c => { Object.assign(c, (window.MM_EXTRAS || {})[c.id] || {}); I.apply(c); });
  const app = document.getElementById("app");
  const $ = s => app.querySelector(s);
  const $$ = s => app.querySelectorAll(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shiftTxt = (s, k) => s.replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + k + 2600) % 26 + 65));
  // ékezet- és kisbetű-független összehasonlításhoz
  const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();
  const sameWords = (a, b) => norm(a).split(" ").sort().join(" ") === norm(b).split(" ").sort().join(" ");
  // Vigenère: dir = 1 kódol, -1 visszafejt; a kulcs csak betűknél lép
  function vig(text, key, dir) {
    const k = norm(key).replace(/ /g, "");
    if (!k) return text;
    let i = 0;
    return text.replace(/[A-Z]/g, c => { const s = k.charCodeAt(i++ % k.length) - 65; return String.fromCharCode((c.charCodeAt(0) - 65 + dir * s + 2600) % 26 + 65); });
  }
  const RAW = window.MM_ART || { portrait: () => "", scene: () => "", cover: () => "" };
  // ha az images/manifest.js felsorol egy képet, azt mutatjuk, különben a kóddal rajzolt változatot
  const HAS = new Set(window.MM_IMAGES || []);
  const pic = (path, svg, alt) => HAS.has(path) ? `<img src="images/${path}" alt="${esc(alt || "")}" loading="lazy" decoding="async">` : svg();
  const ART = {
    cover: (c) => pic(`${c.id}/cover.webp`, () => RAW.cover(c.cover, c.title), c.title),
    portrait: (s, c) => pic(`${(c || C).id}/portrait-${s.id}.webp`, () => RAW.portrait(s.look, s.name), s.name),
    scene: (l, alt) => pic(`${C.id}/scene-${l.id}.webp`, () => RAW.scene(l.art || l.id, alt), alt)
  };
  const coverOf = c => c.cover ? `<div class="art cover" data-fx="${c.fx || ""}">${ART.cover(c)}</div>` : "";
  const SND = n => window.MM_AUDIO && window.MM_AUDIO.sfx(n);
  const SCENE = n => window.MM_AUDIO && window.MM_AUDIO.setScene(n);
  const FX = () => window.MM_FX && window.MM_FX.scan(app);
  const langSwitch = () => `<div class="langs" role="group" aria-label="Nyelv / Language"><button class="link" data-lang="hu" aria-pressed="${LANG === "hu"}">Magyar</button><span aria-hidden="true">·</span><button class="link" data-lang="en" aria-pressed="${LANG === "en"}">English</button></div>`;
  const bindLang = () => app.querySelectorAll("[data-lang]").forEach(b => b.onclick = () => { if (b.dataset.lang !== LANG) I.set(b.dataset.lang); });
  const LEVELS = [
    ["Könnyű", T("Öt gyanúsított, egy elültetett hamis nyom. Kétlépcsős súgó rejtvényenként.")],
    ["Közepes", T("Trükkös tetthelyek, több hazug, új rejtvénytípusok. Kétlépcsős súgó.")],
    ["Nehéz", T("Hat gyanúsított, egymásra épülő rejtvények, és egynél több embert kell leleplezned. Csak egy súgó rejtvényenként.")]
  ];

  /* ---------- mentés ---------- */
  const KEY = id => "mm2:" + id;
  const fresh = () => ({ tab: "ugy", loc: null, clues: [], solved: {}, hints: {}, inputs: {}, tries: 0, ended: null, conf: [], wrongConf: 0, acc: {}, board: {}, threads: [], introSeen: false, timed: false, used: 0, asked: [], rstep: 0, rmiss: 0 });
  function loadState(id) {
    try { const v = JSON.parse(localStorage.getItem(KEY(id))); if (v && v.clues) return Object.assign(fresh(), v); } catch (e) {}
    return fresh();
  }
  // a régi (mm:) mentések a korábbi játékszabályokhoz tartoztak, töröljük őket
  try { Object.keys(localStorage).filter(k => k.startsWith("mm:") && !["mm:sound", "mm:lang"].includes(k)).forEach(k => localStorage.removeItem(k)); } catch (e) {}
  let C = null, S = null, confirmReset = false;
  function save() { try { localStorage.setItem(KEY(C.id), JSON.stringify(S)); } catch (e) {} }
  function gain(id) { if (id && !S.clues.includes(id)) S.clues.push(id); }
  function solve(pid) { S.solved[pid] = true; gain(C.puzzles[pid].reward); save(); SND("success"); }
  const hintsUsed = st => Object.values(st.hints).reduce((a, b) => a + b, 0);
  const pids = c => Object.keys(c.puzzles);
  const MAXTRIES = c => c.maxTries || 3;
  const score = st => Math.max(0, 100 - 20 * Math.max(0, st.tries - 1) - 6 * hintsUsed(st) - 4 * (st.wrongConf || 0) - 4 * (st.rmiss || 0));
  const rank = n => T(n >= 90 ? "Hercule Poirot is megsüvegelné" : n >= 70 ? "A kapitányság dicséretét kapod" : n >= 45 ? "Megbízható nyomozó" : "Szerencsés kezdő");
  const contra = (c, sid) => (c.contradictions || []).filter(k => !sid || k.suspect === sid);
  const has = (list, v) => [].concat(list).includes(v);
  // időre játszott mód: minden lépés perceket visz el a csendőrök érkezéséig
  const COST = { take: 10, wrong: 5, hint: 20, confront: 15, accuse: 30, ask: 5 };
  const budget = c => 10 * c.locations.reduce((n, l) => n + (l.items || []).length, 0) + 15 * (c.contradictions || []).length + 15 * pids(c).length + 90;
  const fmtLeft = m => { m = Math.max(0, m); const h = Math.floor(m / 60), mm = m % 60; return h ? T("{0} óra {1} perc", h, mm) : T("{0} perc", mm); };
  function spend(min) {
    if (!S.timed || S.ended) return false;
    S.used = (S.used || 0) + min;
    if (S.used >= budget(C)) { S.ended = "timeout"; S.tab = "vad"; S.loc = null; save(); SND("wrong"); return true; }
    save(); return false;
  }
  const updateClock = () => { const ck = app.querySelector(".clock"); if (ck && S.timed) { const l = budget(C) - S.used; ck.textContent = "⏱ " + T("Még {0} a csendőrök érkezéséig", fmtLeft(l)); ck.classList.toggle("low", l < 60); } };
  // a titkos szál: a záró ügy a hat ügy megoldása után nyílik meg
  const FINALE = CASES.find(c => c.finale);
  const THREAD = FINALE ? FINALE.requiresAll.map(id => CASES.find(c => c.id === id)).filter(Boolean) : [];
  const wonCase = c => loadState(c.id).ended === "win";
  const unlocked = c => !c.requiresAll || c.requiresAll.every(id => { const x = CASES.find(k => k.id === id); return x && wonCase(x); });
  const noteCard = (c, open) => `<div class="cnote ${open ? "" : "locked"}"><span class="eyebrow">${esc(c.meta.split("·")[1] || "")}</span><b>${esc(c.title)}</b>${open ? `<p>${esc(c.carnation.note)}</p>` : `<p class="meta">${T("Még megoldatlan")}</p>`}<span class="cletter" aria-label="${T("Bekarikázott betű")}">${open ? esc(c.carnation.letter) : "?"}</span></div>`;
  const REBUFF = ["vállat von: »Ez semmit sem bizonyít.«", "rezzenéstelen arccal néz rád.", "felhúzza a szemöldökét: »Ehhez nekem semmi közöm.«", "elneveti magát: »Ezzel akar sarokba szorítani?«"].map(x => T(x));

  /* ---------- útvonal ---------- */
  function route() {
    const id = (location.hash || "").slice(1);
    const c = CASES.find(x => x.id === id);
    if (c && !unlocked(c)) { location.hash = ""; return; }
    if (c) { C = c; S = loadState(c.id); renderCase(); }
    else { C = null; S = null; renderHome(); }
    window.scrollTo({ top: 0 });
  }
  window.addEventListener("hashchange", route);

  /* ---------- címoldal ---------- */
  function renderHome() {
    document.title = T("Rejtélyes gyilkosságok");
    const card = c => {
      const st = loadState(c.id);
      const done = pids(c).filter(p => st.solved[p]).length, total = pids(c).length;
      const started = st.clues.length > 0 || st.tries > 0;
      const status = st.ended === "win" ? `<span class="stamp">${T("Megoldva")}</span>` : st.ended ? `<span class="stamp">${T("Elszalasztva")}</span>` : "";
      const label = T(st.ended === "win" ? "Újraolvasom" : st.ended ? "Megnézem" : started ? "Folytatom" : "Nyomozás indítása");
      return `<article class="casecard">${coverOf(c)}${status}
        <span class="eyebrow">${T("{0}. ügy · {1} rejtvény · {2} gyanúsított", c.number, pids(c).length, c.suspects.length)}</span>
        <h2>${esc(c.title)}</h2>
        <span class="meta">${esc(c.meta)}</span>
        <p>${esc(c.teaser)}</p>
        ${st.ended === "win" ? `<span class="meta">${T("{0} pont", score(st))} · ${rank(score(st))}</span>` : ""}
        ${started && !st.ended ? `<span class="meta">${T("{0}/{1} rejtvény · {2}/{3} nyom", done, total, st.clues.length, Object.keys(c.clues).length)}</span>` : ""}
        <div class="row"><a class="btn" href="#${c.id}">${label} →</a></div>
      </article>`;
    };
    const sections = LEVELS.map(([lvl, desc]) => {
      const list = CASES.filter(c => c.difficulty === lvl);
      if (!list.length) return "";
      return `<section class="level"><div class="level-head"><h2>${T(lvl)}</h2><p>${esc(desc)}</p></div><div class="cases">${list.map(card).join("")}</div></section>`;
    }).join("");
    app.innerHTML = `<div class="wrap">
      <header class="home-head">
        <div class="topnav"><span class="meta">${T("Klasszikus krimik a böngészőben")}</span>${langSwitch()}</div>
        <h1>${T("Rejtélyes gyilkosságok")}</h1>
        <p>${T("Halott a házban, mindenkinek van titka, és csak egyikük gyilkos. Járd be a helyszíneket, fejtsd meg a rejtvényeket, és nevezd meg a tettest.")}</p>
      </header>
      ${sections}
      ${FINALE ? threadSection() : ""}
      <section class="howto">
        <span class="eyebrow">${T("Hogyan játssz?")}</span>
        <ol>
          <li>${T("Kutasd át a helyszíneket, és gyűjtsd a nyomokat a jegyzetfüzetbe.")}</li>
          <li>${T("Oldd meg a rejtvényeket. Ha elakadsz, kérj súgót, de az a végén látszani fog.")}</li>
          <li>${T("Olvasd el a vallomásokat, és szembesítsd a gyanúsítottakat a nyomokkal. Mindenki elhallgat valamit, de csak egyikük gyilkos.")}</li>
          <li>${T("Emelj vádat, és minden állításodhoz jelöld meg a döntő bizonyítékot. Három próbálkozásod van.")}</li>
        </ol>
        <p>${T("A játékállás ebben a böngészőben mentődik, bármikor folytathatod.")}</p>
      </section>
    </div>`;
    bindLang(); SCENE("home"); FX();
  }

  function threadSection() {
    const n = THREAD.filter(wonCase).length, open = n === THREAD.length;
    const st = loadState(FINALE.id);
    const finaleCard = open
      ? `<article class="casecard finale">${coverOf(FINALE)}${st.ended === "win" ? `<span class="stamp">${T("Megoldva")}</span>` : ""}
          <span class="eyebrow">${T("{0}. ügy", FINALE.number)} · ${T("Zárás")}</span><h2>${esc(FINALE.title)}</h2><span class="meta">${esc(FINALE.meta)}</span><p>${esc(FINALE.teaser)}</p>
          ${st.ended === "win" ? `<span class="meta">${T("{0} pont", score(st))} · ${rank(score(st))}</span>` : ""}
          <div class="row"><a class="btn" href="#${FINALE.id}">${T(st.ended === "win" ? "Újraolvasom" : st.clues.length ? "Folytatom" : "Nyomozás indítása")} →</a></div></article>`
      : `<article class="casecard finale locked"><span class="eyebrow">${T("{0}. ügy", FINALE.number)} · ${T("Zárás")}</span><h2>${T("Lezárt ügy")}</h2>
          <p>${T("Mind a hat ügy végén egy préselt fekete szegfű és egy cédula vár. Ha mindet megtalálod, kiderül, ki áll mögöttük.")}</p>
          <span class="meta">${T("{0} / {1} cédula", n, THREAD.length)}</span></article>`;
    return `<section class="level thread"><div class="level-head"><h2>${T("A titkos szál")}</h2><p>${T("Hat gyilkosság, hat cédula, egy aláírás: F. Sz.")}</p></div>
      <div class="cnotes">${THREAD.map(c => noteCard(c, wonCase(c))).join("")}</div>
      <div class="cases">${finaleCard}</div></section>`;
  }

  /* ---------- ügy nézet ---------- */
  const TABS = [["ugy", "Ügyirat"], ["hely", "Helyszínek"], ["gyan", "Gyanúsítottak"], ["jegy", "Jegyzetfüzet"], ["tabla", "Tábla"], ["vad", "Vádemelés"]].map(([a, b]) => [a, T(b)]);
  function renderCase() {
    document.title = C.title;
    app.innerHTML = `<div class="wrap">
      <div class="topnav"><a class="link" href="#">← ${T("Összes ügy")}</a>${langSwitch()}</div>
      <header class="case">
        <div class="stack" style="gap:6px"><span class="meta">${esc(C.meta)}</span><h1>${esc(C.title)}</h1>${S.timed && !S.ended ? `<span class="clock ${budget(C) - S.used < 60 ? "low" : ""}">⏱ ${T("Még {0} a csendőrök érkezéséig", fmtLeft(budget(C) - S.used))}</span>` : ""}</div>
        <span class="stamp">${T(S.ended === "win" ? "Ügy lezárva" : S.ended ? "Elszalasztva" : "Nyomozás folyamatban")}</span>
      </header>
      <nav class="tabs" role="tablist">${TABS.map(([id, l]) => `<button role="tab" aria-selected="${S.tab === id}" data-tab="${id}">${l}${id === "jegy" && S.clues.length ? `<span class="count">${S.clues.length}</span>` : ""}</button>`).join("")}</nav>
      <main class="sheet" aria-live="polite">${VIEWS[S.tab]()}</main>
      <footer><span>${T("{0}. ügy", C.number)}</span><button data-reset>${T(confirmReset ? "Biztosan? Kattints újra a törléshez" : "Ügy újrakezdése")}</button></footer>
    </div>`;
    $$("[data-tab]").forEach(b => b.onclick = () => { S.tab = b.dataset.tab; S.loc = null; confirmReset = false; save(); renderCase(); });
    $("[data-reset]").onclick = () => {
      if (!confirmReset) { confirmReset = true; renderCase(); return; }
      confirmReset = false; S = fresh(); save(); renderCase(); window.scrollTo({ top: 0 });
    };
    BIND[S.tab] && BIND[S.tab]();
    bindLang();
    if (!S.introSeen && !S.ended && !S.clues.length) showIntro();
    SCENE((S.tab === "hely" && S.loc && C.sounds && C.sounds[S.loc]) || C.sound || "home");
    FX();
  }
  const go = (tab, loc) => { S.tab = tab; S.loc = loc || null; save(); renderCase(); window.scrollTo({ top: 0 }); };

  const pips = () => `<div class="progress">${pids(C).map(p => `<span class="pip ${S.solved[p] ? "done" : ""}">${S.solved[p] ? "✓ " : ""}${esc(C.puzzles[p].title)}</span>`).join("")}</div>`;

  const VIEWS = {
    ugy: () => `<div class="stack">
      ${coverOf(C)}
      <span class="eyebrow">${esc(C.intro.eyebrow)}</span>
      <h2>${esc(C.intro.heading)}</h2>
      <p class="lead">${esc(C.intro.lead)}</p>
      <p>${esc(C.intro.body)}</p>
      <div class="typed">${T("TEENDŐ:\n1. Járd végig a helyszíneket, gyűjts nyomokat.\n2. Oldd meg a(z) {0} rejtvényt, mindegyik döntő bizonyítékot ad.\n3. Szembesítsd a gyanúsítottakat a nyomokkal. Aki hazudik, nem feltétlenül gyilkos.\n4. Emelj vádat, és támaszd alá bizonyítékkal. Három próbálkozásod van, utána a tettes kicsúszik a kezeid közül.", pids(C).length)}</div>
      ${C.dossier ? `<div class="stack dossier"><span class="eyebrow">${esc(C.dossier.heading)}</span><p>${esc(C.dossier.text)}</p><div class="cnotes">${THREAD.map(c => noteCard(c, true)).join("")}</div></div>` : ""}
      ${pips()}
      <div class="row"><button class="btn" data-go>${T("Helyszínelés indítása")} →</button></div>
    </div>`,

    hely: () => {
      if (S.loc) return viewLoc(C.locations.find(l => l.id === S.loc));
      return `<div class="stack"><span class="eyebrow">${T("A helyszín alaprajza")}</span><h2>${T("Helyszínek")}</h2>
        <p>${T("Válassz egy helyiséget. A rejtvényt rejtő helyszíneket ✦ jelöli.")}</p>
        <div class="grid2">${C.locations.map(l => {
          const locked = l.requires && !S.solved[l.requires];
          const items = l.items || [];
          const total = items.length + (l.puzzle ? 1 : 0);
          const got = items.filter(i => S.clues.includes(i.clue)).length + (l.puzzle && S.solved[l.puzzle] ? 1 : 0);
          const status = locked ? `<span class="status locked">${T("Zárva")}</span>` : got === total ? `<span class="status done">${T("Átkutatva")}</span>` : `<span class="status">${T("{0}/{1} felderítve", got, total)}</span>`;
          return `<button class="loc" data-loc="${l.id}" ${locked ? "disabled" : ""}><div class="art" aria-hidden="true">${ART.scene(l, "")}</div><h3>${l.puzzle ? "✦ " : ""}${esc(l.name)}</h3><p>${esc(l.desc)}</p>${status}</button>`;
        }).join("")}</div></div>`;
    },

    gyan: () => {
      const legacy = !C.contradictions;
      const opts = S.clues.map(k => `<option value="${k}">${esc(C.clues[k].t)}</option>`).join("");
      return `<div class="stack"><span class="eyebrow">${T("Kihallgatási jegyzőkönyvek")}</span><h2>${T("Gyanúsítottak")}</h2>
      <p>${T(legacy ? "Mindenki mond valamit, és mindenki elhallgat valamit." : "Válassz egy nyomot a jegyzetfüzetből, és szembesítsd vele azt, akinek a vallomásával ütközik. A téves szembesítés pontlevonással jár.")}</p>
      <div class="grid2">${C.suspects.map(s => {
        let notes = "", liar = false;
        if (legacy) {
          const ex = s.extra && (S.solved[s.extra.after] || S.clues.includes(s.extra.after));
          if (ex) { notes = `<p class="note">${esc(s.extra.text)}</p>`; liar = s.extra.lie; }
        } else {
          const found = contra(C, s.id).filter(k => S.conf.includes(k.id));
          liar = found.some(k => k.lie !== false);
          notes = found.map(k => `<p class="note">${esc(k.reveal)}</p>`).join("");
        }
        const tool = legacy || S.ended ? "" : S.clues.length
          ? `<div class="confront"><select id="cf-${s.id}" aria-label="${T("Nyom a szembesítéshez")}"><option value="">${T("Szembesítés nyommal…")}</option>${opts}</select><button class="btn ghost small" data-cf="${s.id}">${T("Szembesítem")}</button></div><p class="msg" data-cfmsg="${s.id}"></p>`
          : `<p class="meta">${T("Még nincs nyomod, amivel szembesíthetnéd.")}</p>`;
        const qs = ((C.interviews || {})[s.id] || []).filter(q => (!q.after || S.clues.includes(q.after)) && (!q.afterConf || S.conf.includes(q.afterConf)));
        const asked = qs.filter(q => S.asked.includes(s.id + ":" + q.id)), open = S.ended ? [] : qs.filter(q => !S.asked.includes(s.id + ":" + q.id));
        const talk = qs.length ? `<div class="talk">${asked.map(q => `<p class="qa"><b>${esc(q.q)}</b> ${esc(q.a)}</p>`).join("")}${open.length ? `<div class="asks">${open.map(q => `<button class="btn ghost small ask" data-ask="${s.id}:${q.id}">${esc(q.q)}</button>`).join("")}</div>` : ""}</div>` : "";
        return `<div class="suspect">${liar ? `<span class="stamp anim">${T("Hazudott")}</span>` : ""}<div class="head"><div class="art portrait">${ART.portrait(s)}</div><div class="who"><h3>${esc(s.name)}</h3><span class="role">${esc(s.role)}</span></div></div><p>${esc(s.stmt)}</p>${talk}${notes}${tool}</div>`;
      }).join("")}</div></div>`;
    },

    jegy: () => {
      const ids = Object.keys(C.clues).filter(k => S.clues.includes(k));
      return `<div class="stack"><span class="eyebrow">${T("Saját jegyzeteid")}</span><h2>${T("Jegyzetfüzet")}</h2>${pips()}
        ${ids.length ? `<div class="stack">${ids.map(k => `<div class="clue"><span class="src">${esc(C.clues[k].src)}</span><h3>${esc(C.clues[k].t)}</h3><p>${esc(C.clues[k].x)}</p></div>`).join("")}</div>`
          : `<p class="typed">${T("Még üres a füzet. Kezdd ott, ahol a holttestet megtalálták.")}</p>`}
        ${S.conf.length ? `<span class="eyebrow">${T("Feltárt ellentmondások")}</span><div class="stack">${contra(C).filter(k => S.conf.includes(k.id)).map(k => `<div class="clue"><span class="src">${esc(C.suspects.find(x => x.id === k.suspect).name)}</span><p>${esc(k.reveal)}</p></div>`).join("")}</div>` : ""}
        <p class="eyebrow">${T("{0} / {1} nyom", ids.length, Object.keys(C.clues).length)}</p></div>`;
    },

    tabla: () => `<div class="stack"><span class="eyebrow">${T("A nyomozó parafatáblája")}</span><h2>${T("Tábla")}</h2>
      <p>${T("Húzd a kártyákat oda, ahová szeretnéd, és köss össze piros fonallal mindent, ami összetartozik.")} ${S.clues.length ? "" : T("Még nincs nyomod: a talált nyomok maguktól felkerülnek a táblára.")}</p>
      <div class="row"><button class="btn ghost small" data-thread aria-pressed="false">${T("Fonal húzása")}</button><button class="btn ghost small" data-tidy>${T("Rendezés")}</button><button class="btn ghost small" data-unthread>${T("Fonalak le")}</button><span class="meta" data-boardhint></span></div>
      <div class="board-wrap"><div class="board" data-board><svg class="threads" data-threads aria-hidden="true"></svg>${boardCards().map(k => `<div class="pin ${k.kind}" tabindex="0" data-pin="${k.id}" style="left:${k.x}px;top:${k.y}px" aria-label="${esc(k.label)}">${k.html}</div>`).join("")}</div></div></div>`,

    vad: () => {
      if (S.ended === "win") return C.reveal && S.rstep < C.reveal.length ? viewReveal() : viewEnding();
      if (S.ended === "lose" || S.ended === "timeout") return viewLose();
      if (S.ended === "reveal") return viewEnding(true);
      const left = pids(C).filter(p => !S.solved[p]).length, triesLeft = MAXTRIES(C) - S.tries;
      const clueOpts = S.clues.map(k => ({ v: k, label: C.clues[k].t }));
      const A = S.acc || {};
      return `<div class="stack"><span class="eyebrow">${T("Mindenki rád vár")}</span><h2>${T("Vádemelés")}</h2>
        <p>${T("Összehívod a ház lakóit, és elmondod, mi történt. Minden állításodhoz jelöld meg a döntő bizonyítékot a jegyzetfüzetből: egy jó ügyvéd csak a bizonyítéknak hisz.")}</p>
        <p class="meta">${T("Még {0} próbálkozásod van.", triesLeft)}${left ? " " + T("{0} rejtvény megoldatlan.", left) : ""}</p>
        ${C.accusation.questions.map(q => {
          const opts = q.from === "suspects" ? C.suspects.map(s => ({ v: s.id, label: s.name })).concat(q.extra || []) : q.from === "clues" ? clueOpts : q.options;
          const radios = opts.length ? opts.map(o => `<label class="opt"><input type="radio" name="q-${q.id}" value="${o.v}" ${A[q.id] === o.v ? "checked" : ""}> ${esc(o.label)}</label>`).join("") : `<p class="meta">${T("Még nincs egyetlen nyomod sem.")}</p>`;
          const proof = q.proof ? `<label class="proof"><span>${T("Döntő bizonyíték:")}</span><select id="p-${q.id}" data-proof="${q.id}"><option value="">— ${T("válassz a jegyzetfüzetből")} —</option>${clueOpts.map(o => `<option value="${o.v}" ${A["p-" + q.id] === o.v ? "selected" : ""}>${esc(o.label)}</option>`).join("")}</select></label>` : "";
          return `<fieldset><legend>${esc(q.legend)}</legend>${radios}${proof}</fieldset>`;
        }).join("")}
        <div class="row"><button class="btn" data-accuse>${T("Kimondom a vádat")}</button></div><p class="msg" data-accmsg></p></div>`;
    }
  };

  /* ---------- nyomozótábla ---------- */
  const BW = 1120, BH = 820;
  function boardCards() {
    const out = [];
    C.suspects.forEach((s, i) => {
      const liar = contra(C, s.id).some(k => k.lie !== false && S.conf.includes(k.id));
      const p = S.board["s:" + s.id] || { x: 24 + i * 180, y: 20 };
      out.push({ id: "s:" + s.id, kind: "pin-sus", label: s.name, x: p.x, y: p.y,
        html: `<div class="art portrait">${ART.portrait(s)}</div><b>${esc(s.name)}</b>${liar ? `<span class="stamp">${T("Hazudott")}</span>` : ""}` });
    });
    S.clues.forEach((k, i) => {
      const p = S.board["c:" + k] || { x: 24 + (i % 5) * 216, y: 300 + Math.floor(i / 5) * 132 };
      out.push({ id: "c:" + k, kind: "pin-clue", label: C.clues[k].t, x: p.x, y: p.y,
        html: `<span class="src">${esc(C.clues[k].src)}</span><b>${esc(C.clues[k].t)}</b><span class="tx" title="${esc(C.clues[k].x)}">${esc(C.clues[k].x)}</span>` });
    });
    return out;
  }
  function drawThreads() {
    const svg = $("[data-threads]"); if (!svg) return;
    const ctr = id => { const el = app.querySelector(`[data-pin="${CSS.escape(id)}"]`); return el ? [el.offsetLeft + el.offsetWidth / 2, el.offsetTop + 14] : null; };
    svg.setAttribute("viewBox", `0 0 ${BW} ${BH}`);
    svg.innerHTML = (S.threads || []).map(([a, b], i) => {
      const p = ctr(a), q = ctr(b); if (!p || !q) return "";
      const sag = Math.min(60, Math.hypot(q[0] - p[0], q[1] - p[1]) / 6);
      const d = `M${p[0]} ${p[1]} Q${(p[0] + q[0]) / 2} ${(p[1] + q[1]) / 2 + sag} ${q[0]} ${q[1]}`;
      return `<path d="${d}" class="thread"/><path d="${d}" class="thread-hit" data-cut="${i}"/>`;
    }).join("") + (S.threads || []).flatMap(t => t).filter((v, i, a) => a.indexOf(v) === i).map(id => { const p = ctr(id); return p ? `<circle cx="${p[0]}" cy="${p[1]}" r="6" class="pinhead"/>` : ""; }).join("");
    svg.querySelectorAll("[data-cut]").forEach(el => el.onclick = () => { S.threads.splice(+el.dataset.cut, 1); save(); drawThreads(); });
  }

  /* ---------- írógépes bevezető ---------- */
  function showIntro() {
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ov = document.createElement("div"); ov.className = "intro"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", C.title);
    const full = C.intro.lead + "\n\n" + C.intro.body;
    ov.innerHTML = `<div class="intro-card">
      <div class="intro-cover">${ART.cover(C)}</div>
      <span class="meta">${esc(C.meta)}</span>
      <h2>${esc(C.title)}</h2>
      <div class="intro-text typed" aria-live="polite"></div>
      <div class="intro-choose" hidden>
        <p class="meta">${T("Hogyan nyomozol?")}</p>
        <div class="row"><button class="btn" data-mode="free">${T("Szabad nyomozás")}</button><button class="btn ghost" data-mode="timed">${T("Hajnalig, időre")}</button></div>
        <p class="meta">${T("Időre játszva minden lépés perceket visz el, és a csendőrök {0} múlva megérkeznek.", fmtLeft(budget(C)))}</p>
      </div>
      <button class="link intro-skip" data-skip>${T("Kihagyom")} ›</button></div>`;
    document.body.appendChild(ov);
    const box = ov.querySelector(".intro-text"), choose = ov.querySelector(".intro-choose");
    let i = 0, t = null;
    const finish = () => { clearInterval(t); box.textContent = full; choose.hidden = false; ov.querySelector("[data-skip]").hidden = true; const b = ov.querySelector("[data-mode]"); if (b) b.focus(); };
    if (reduce) finish(); else t = setInterval(() => { i += 2; box.textContent = full.slice(0, i); if (i % 6 === 0) SND("tick"); if (i >= full.length) finish(); }, 28);
    ov.querySelector("[data-skip]").onclick = finish;
    ov.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => { S.introSeen = true; S.timed = b.dataset.mode === "timed"; S.used = 0; save(); ov.remove(); renderCase(); });
    requestAnimationFrame(() => ov.classList.add("on"));
  }

  /* ---------- megosztható eredménykártya ---------- */
  async function shareCard() {
    const sc = score(S), W = 1080, H = 1350;
    try { await Promise.all(['italic 700 72px "Bodoni Moda"', '700 30px "Courier Prime"', '28px "Crimson Pro"'].map(f => document.fonts.load(f))); } catch (e) {}
    const img = new Image();
    if (HAS.has(`${C.id}/cover.webp`)) await new Promise(r => { img.onload = r; img.onerror = r; img.src = `images/${C.id}/cover.webp`; });
    let url;
    // ha a borító valamiért nem rajzolható vásznra, a kártya borító nélkül készül
    for (const withCover of [true, false]) { try { url = paintCard(sc, W, H, withCover && img.naturalWidth ? img : null); break; } catch (e) {} }
    if (!url) return;
    openShare(url, sc);
  }
  function paintCard(sc, W, H, img) {
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const g = cv.getContext("2d");
    g.fillStyle = "#12151c"; g.fillRect(0, 0, W, H);
    const CH = 400;
    if (img) g.drawImage(img, 0, 0, W, CH);
    else { g.strokeStyle = "rgba(201,164,92,.18)"; g.lineWidth = 2; for (let i = 0; i <= 24; i++) { const a = Math.PI * i / 24; g.beginPath(); g.moveTo(W / 2, CH); g.lineTo(W / 2 - Math.cos(a) * 900, CH - Math.sin(a) * 900); g.stroke(); } }
    const grd = g.createLinearGradient(0, CH - 160, 0, CH); grd.addColorStop(0, "rgba(18,21,28,0)"); grd.addColorStop(1, "#12151c"); g.fillStyle = grd; g.fillRect(0, CH - 160, W, 160);
    g.strokeStyle = "#c9a45c"; g.lineWidth = 3; g.strokeRect(40, 40, W - 80, H - 80);
    const wrap = (txt, x, y, maxW, lh) => { const words = txt.split(" "); let line = ""; for (const w of words) { const t = line ? line + " " + w : w; if (g.measureText(t).width > maxW && line) { g.fillText(line, x, y); y += lh; line = w; } else line = t; } g.fillText(line, x, y); return y; };
    g.textAlign = "center";
    g.fillStyle = "#9ba1b3"; g.font = '700 26px "Courier Prime", monospace'; g.fillText(`${T("Rejtélyes gyilkosságok").toUpperCase()} · ${T("{0}. ügy", C.number).toUpperCase()} · ${T(C.difficulty).toUpperCase()}`, W / 2, CH + 40);
    g.fillStyle = "#e8e0c9"; g.font = 'italic 700 74px "Bodoni Moda", Georgia, serif'; let y = wrap(C.title, W / 2, CH + 130, W - 200, 84);
    g.save(); g.translate(W / 2, y + 80); g.rotate(-0.06); g.strokeStyle = "#e2595e"; g.lineWidth = 6; g.strokeRect(-220, -46, 440, 74);
    g.fillStyle = "#e2595e"; g.font = '700 44px "Courier Prime", monospace'; g.fillText(T("Ügy lezárva").toUpperCase(), 0, 6); g.restore();
    y += 280; g.fillStyle = "#c9a45c"; g.font = 'italic 700 170px "Bodoni Moda", Georgia, serif'; g.fillText(String(sc), W / 2, y);
    g.font = '700 28px "Courier Prime", monospace'; g.fillText(T("pont").toUpperCase(), W / 2, y + 44);
    g.fillStyle = "#e8e0c9"; g.font = 'italic 46px "Crimson Pro", Georgia, serif'; y = wrap(rank(sc), W / 2, y + 120, W - 220, 54);
    g.fillStyle = "#9ba1b3"; g.font = '28px "Courier Prime", monospace';
    g.fillText(`${T("{0}. vádra", S.tries)} · ${hintsUsed(S) ? T("{0} súgó", hintsUsed(S)) : T("súgó nélkül")} · ${T("{0}/{1} ellentmondás", S.conf.length, contra(C).length)}`, W / 2, y + 64);
    if (S.timed) { g.fillStyle = "#7cc68e"; g.fillText(T("Hajnal előtt, {0} tartalékkal", fmtLeft(budget(C) - S.used)), W / 2, y + 108); }
    g.fillStyle = "#c9a45c"; g.font = '700 26px "Courier Prime", monospace'; g.fillText("takacsalex93.github.io/MisteryMurders", W / 2, H - 80);
    return cv.toDataURL("image/png");
  }
  async function openShare(url, sc) {
    const text = `🕵️ ${T("Rejtélyes gyilkosságok")} – ${C.title}\n${T("{0} pont", sc)} · ${rank(sc)}\n${T("{0}. vádra", S.tries)}, ${hintsUsed(S) ? T("{0} súgóval", hintsUsed(S)) : T("súgó nélkül")}${S.timed ? ", " + T("hajnal előtt") : ""}\nhttps://takacsalex93.github.io/MisteryMurders/`;
    const ov = document.createElement("div"); ov.className = "intro on"; ov.setAttribute("role", "dialog");
    ov.innerHTML = `<div class="intro-card"><img class="sharecard" src="${url}" alt="${T("Eredménykártya")}"><div class="row"><button class="btn" data-native hidden>${T("Megosztás")}</button><a class="btn ghost" href="${url}" download="${C.id}-eredmeny.png">${T("Kép letöltése")}</a><button class="btn ghost" data-copytext>${T("Szöveg másolása")}</button><button class="link" data-close>${T("Bezárás")}</button></div><p class="msg" data-sharemsg></p></div>`;
    document.body.appendChild(ov);
    const m = ov.querySelector("[data-sharemsg]");
    ov.querySelector("[data-close]").onclick = () => ov.remove();
    ov.onclick = e => { if (e.target === ov) ov.remove(); };
    ov.querySelector("[data-copytext]").onclick = () => { try { navigator.clipboard.writeText(text).then(() => { m.className = "msg ok"; m.textContent = T("Kimásolva, beillesztheted bárhová."); }, () => { m.textContent = text; }); } catch (e) { m.textContent = text; } };
    try {
      const blob = await (await fetch(url)).blob(), file = new File([blob], `${C.id}-eredmeny.png`, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { const b = ov.querySelector("[data-native]"); b.hidden = false; b.onclick = () => navigator.share({ files: [file], text }).catch(() => {}); }
    } catch (e) {}
  }

  function viewLoc(l) {
    let h = `<div class="stack"><button class="link" data-back>← ${T("Vissza az alaprajzhoz")}</button>
      <div class="art locart">${ART.scene(l, l.name)}</div>
      <span class="eyebrow">${T("Helyszín")}</span><h2>${esc(l.name)}</h2><p>${esc(l.desc)}</p>`;
    (l.items || []).forEach(it => {
      const has = S.clues.includes(it.clue);
      h += `<div class="item"><h3>${esc(it.label)}</h3><p>${esc(it.text)}</p>${has
        ? `<span class="found">✓ ${T("Nyom feljegyezve:")} ${esc(C.clues[it.clue].t)}</span><p class="typed">${esc(C.clues[it.clue].x)}</p>`
        : `<div class="row"><button class="btn ghost" data-take="${it.clue}">${T("Megvizsgálom")}</button></div>`}</div>`;
    });
    if (l.puzzle) h += `<div class="item" data-puzzle="${l.puzzle}">${renderPuzzle(l.puzzle)}</div>`;
    return h + `</div>`;
  }

  function viewEnding(revealOnly) {
    const hu = hintsUsed(S), sc = score(S);
    const culprit = C.suspects.find(s => s.id === [].concat(C.accusation.questions[0].answer)[0]);
    const conf = !revealOnly && C.confession ? `<div class="rv-obj confess"><div class="art portrait">${culprit ? ART.portrait(culprit) : ""}</div><div><b>${culprit ? esc(culprit.name) : ""}</b><p>${esc(C.confession)}</p></div></div>` : "";
    const stats = revealOnly ? `<p class="eyebrow">${T("A megoldás, amit nem sikerült bizonyítanod")}</p>`
      : `<p class="rank">${T("{0} pont", sc)} · ${rank(sc)}</p>${S.timed ? `<p class="found">⏱ ${T("Hajnal előtt megoldva, {0} tartalékkal", fmtLeft(budget(C) - S.used))}</p>` : ""}<p class="eyebrow">${T("{0}. vádra", S.tries)} · ${hu ? T("{0} súgó", hu) : T("súgó nélkül")} · ${T("{0} téves szembesítés", S.wrongConf || 0)}${S.rmiss ? " · " + T("{0} elhibázott bizonyíték", S.rmiss) : ""} · ${T("{0}/{1} ellentmondás", S.conf.length, contra(C).length)} · ${T("{0}/{1} nyom", S.clues.length, Object.keys(C.clues).length)}</p>`;
    return `<div class="stack"><div class="ending ${revealOnly ? "lost" : ""}"><div class="row" style="justify-content:space-between;align-items:flex-start"><div class="art portrait" style="width:110px">${culprit ? ART.portrait(culprit) : ""}</div><span class="stamp anim">${T(revealOnly ? "Megoldás" : "Ügy lezárva")}</span></div>
      <h2>${esc(C.ending.heading)}</h2>
      ${conf}
      ${!revealOnly && C.carnation ? `<div class="carnation"><span class="eyebrow">${T("A titkos szál")}</span><p>${esc(C.carnation.found)}</p><p class="typed">${esc(C.carnation.note)}</p><span class="cletter big">${esc(C.carnation.letter)}</span><p class="meta">${FINALE && unlocked(FINALE) ? T("Megvan mind a hat cédula. A címoldalon megnyílt a záró ügy.") : T("{0} / {1} cédula a címoldalon, A titkos szál alatt.", THREAD.filter(wonCase).length, THREAD.length)}</p></div>` : ""}
      ${C.ending.paragraphs.map(p => `<p>${esc(p)}</p>`).join("")}
      ${stats}</div>
      <div class="row"><a class="btn" href="#">${T("Vissza az ügyekhez")}</a>${revealOnly ? `<button class="btn ghost" data-restart>${T("Újrakezdem az ügyet")}</button>` : `<button class="btn ghost" data-share>${T("Eredménykártya")}</button>`}</div></div>`;
  }
  function viewReveal() {
    const steps = C.reveal, i = S.rstep, st = steps[i];
    const who = C.suspects.find(x => x.id === st.who);
    const past = steps.slice(0, i).map(p => `<div class="rv-done"><p class="rv-say">${esc(p.say)}</p><p class="rv-win">${esc(p.win)}</p></div>`).join("");
    const opts = S.clues.map(k => `<option value="${k}">${esc(C.clues[k].t)}</option>`).join("");
    return `<div class="stack reveal"><span class="eyebrow">${T("A leleplezés · {0}. lépés / {1}", i + 1, steps.length)}</span><h2>${T("Az igazság pillanata")}</h2>
      <p class="meta">${T("A vád megállt. Most mondd el nekik, hogyan történt. Minden ellenvetésre felelj a megfelelő bizonyítékkal.")}</p>
      ${past}
      <p class="rv-say lead">${esc(st.say)}</p>
      <div class="rv-obj"><div class="art portrait">${who ? ART.portrait(who) : ""}</div><div><b>${who ? esc(who.name) : ""}</b><p>${esc(st.objection)}</p></div></div>
      <div class="confront"><select id="rv-proof" aria-label="${T("Bizonyíték")}"><option value="">${T("Felmutatom a bizonyítékot…")}</option>${opts}</select><button class="btn" data-rv>${T("Felmutatom")}</button></div>
      <p class="msg" data-rvmsg></p></div>`;
  }
  function viewLose() {
    return `<div class="stack"><div class="ending lost"><span class="stamp" style="align-self:flex-start">${T("Elszalasztva")}</span>
      <h2>${T(S.ended === "timeout" ? "Megérkeztek a csendőrök." : "A tettes kicsúszott a kezeid közül.")}</h2>
      <p>${T(S.ended === "timeout" ? "Kifutottál az időből. Hajnalban megérkeztek a csendőrök, és a bizonyítékok hiányában mindenkit elengedtek. A gyilkos még aznap reggel eltűnt." : "Harmadszor sem állt meg a vád. Reggel megérkeztek a csendőrök, de a bizonyítékok addigra összekuszálódtak, és a gyilkos szabadon távozott. Ilyen is előfordul a legjobbakkal.")}</p>
      <p>${T("Újrakezdheted az ügyet tiszta lappal, vagy megnézheted, mi történt valójában.")}</p></div>
      <div class="row"><button class="btn" data-restart>${T("Újrakezdem az ügyet")}</button><button class="btn ghost" data-reveal>${T("Megmutatom a megoldást")}</button></div></div>`;
  }

  /* ---------- rejtvények ---------- */
  function hintBlock(pid) {
    const p = C.puzzles[pid], n = S.hints[pid] || 0, all = (p.hints || []).length;
    if (!all) return "";
    const shown = p.hints.slice(0, n).map((t, i) => `<p class="hint"><b>${i + 1}.</b> ${esc(t)}</p>`).join("");
    const btn = !S.solved[pid] && n < all ? `<button class="btn ghost small" data-hint="${pid}">${T("Súgó kérése")} (${n + 1}/${all})</button>` : "";
    return `<div class="hints">${shown}</div>${btn ? `<div class="row">${btn}</div>` : ""}`;
  }
  const solvedBlock = (pid, label) => {
    const p = C.puzzles[pid];
    return `<span class="found">✓ ${T(label)}</span><p class="typed">${esc(C.clues[p.reward].x)}</p>${p.afterSolve || ""}`;
  };

  const PUZ = {
    code: {
      render(pid, p) {
        if (S.solved[pid]) return p.body + solvedBlock(pid, "Kinyílt");
        return `${p.body}<div class="digits">${Array.from({ length: p.length }, (_, i) => `<input id="${pid}-d${i}" inputmode="numeric" autocomplete="off" maxlength="1" aria-label="${T("{0}. számjegy", i + 1)}">`).join("")}</div>
          <div class="row"><button class="btn" data-try>${T("Kipróbálom")}</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`;
      },
      bind(pid, p, root, msg) {
        const d = Array.from(root.querySelectorAll(".digits input"));
        d.forEach((el, i) => {
          el.oninput = () => { el.value = el.value.replace(/\D/g, "").slice(-1); if (el.value && d[i + 1]) d[i + 1].focus(); };
          el.onkeydown = e => { if (e.key === "Backspace" && !el.value && d[i - 1]) d[i - 1].focus(); if (e.key === "Enter") root.querySelector("[data-try]").click(); };
        });
        root.querySelector("[data-try]").onclick = () => {
          const c = d.map(x => x.value).join("");
          if (p.answers.includes(c)) { solve(pid); renderCase(); }
          else msg(c.length < p.length ? T("{0} számjegy kell.", p.length) : p.wrong);
        };
      }
    },
    choice: {
      render(pid, p) {
        const done = S.solved[pid];
        return `${p.body}<div class="samples">${p.options.map(o => `<label class="sample"><span class="row"><input type="radio" name="${pid}" value="${o.v}" ${done ? "disabled" : ""} ${done && o.v === p.answer ? "checked" : ""}> <b>${o.v}</b> · ${esc(o.label)}</span>${o.sample ? `<div class="typed">${o.sample}</div>` : ""}</label>`).join("")}</div>
          ${done ? solvedBlock(pid, "Azonosítva") : `<div class="row"><button class="btn" data-try>${esc(p.confirm || T("Ez az"))}</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        root.querySelector("[data-try]").onclick = () => {
          const v = (root.querySelector(`input[name="${pid}"]:checked`) || {}).value;
          if (!v) return msg(T("Előbb válassz egyet."));
          if (v === p.answer) { solve(pid); renderCase(); } else msg((typeof p.wrong === "string" ? p.wrong : p.wrong && p.wrong[v]) || T("Nem ez az. Nézd meg újra."));
        };
      }
    },
    assign: {
      render(pid, p) {
        const done = S.solved[pid], cur = S.inputs[pid] || {};
        return `${p.body}<ol class="facts">${p.facts.map(f => `<li>${esc(f)}</li>`).join("")}</ol>
          <div class="tablewrap"><table><thead><tr><th>${T("Gyanúsított")}</th><th>${esc(p.columnLabel)}</th></tr></thead><tbody>
          ${C.suspects.map(s => `<tr><td>${esc(s.name)}</td><td><select id="${pid}-${s.id}" data-row="${s.id}" ${done ? "disabled" : ""}><option value="">— ${T("válassz")} —</option>${p.choices.map(r => `<option ${(done ? p.answer[s.id] : cur[s.id]) === r ? "selected" : ""}>${esc(r)}</option>`).join("")}</select></td></tr>`).join("")}
          </tbody></table></div>
          ${done ? solvedBlock(pid, "Az idővonal összeállt") : `<div class="row"><button class="btn" data-try>${T("Ellenőrzöm")}</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        S.inputs[pid] = S.inputs[pid] || {};
        root.querySelectorAll("[data-row]").forEach(s => s.onchange = () => { S.inputs[pid][s.dataset.row] = s.value; save(); });
        root.querySelector("[data-try]").onclick = () => {
          const cur = S.inputs[pid], ids = C.suspects.map(s => s.id);
          if (ids.some(id => !cur[id])) return msg(T("Minden sort tölts ki."));
          if (p.unique !== false && new Set(ids.map(id => cur[id])).size < ids.length) return msg(p.uniqueMsg || T("Mindenki máshol volt: egy lehetőség csak egyszer szerepelhet."));
          const ok = ids.filter(id => cur[id] === p.answer[id]).length;
          if (ok === ids.length) { solve(pid); renderCase(); } else msg(T("{0} / {1} helyes. Olvasd újra a vallomásokat.", ok, ids.length));
        };
      }
    },
    caesar: {
      render(pid, p) {
        const done = S.solved[pid], k = done ? p.shift : (S.inputs[pid] || 0), cipher = shiftTxt(p.plain, p.shift);
        return `${p.body}<div class="typed cipher">${esc(cipher)}</div>
          <div class="dial"><button class="btn ghost" data-dm aria-label="${T("Eltolás csökkentése")}" ${done ? "disabled" : ""}>−</button><span class="num" data-dn>${k}</span><button class="btn ghost" data-dp aria-label="${T("Eltolás növelése")}" ${done ? "disabled" : ""}>+</button>
          <input type="range" id="${pid}-dial" min="0" max="25" value="${k}" aria-label="${T("Eltolás")}" ${done ? "disabled" : ""}></div>
          <div class="typed cipher" data-out>${esc(shiftTxt(cipher, -k))}</div>
          ${done ? solvedBlock(pid, "Megfejtve") : `<div class="row"><button class="btn" data-try>${T("Megvan!")}</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        const cipher = shiftTxt(p.plain, p.shift), r = root.querySelector("input[type=range]");
        const upd = k => { SND("tick"); k = (k + 26) % 26; S.inputs[pid] = k; r.value = k; root.querySelector("[data-dn]").textContent = k; root.querySelector("[data-out]").textContent = shiftTxt(cipher, -k); save(); };
        r.oninput = () => upd(+r.value);
        root.querySelector("[data-dm]").onclick = () => upd((S.inputs[pid] || 0) - 1);
        root.querySelector("[data-dp]").onclick = () => upd((S.inputs[pid] || 0) + 1);
        root.querySelector("[data-try]").onclick = () => { if ((S.inputs[pid] || 0) === p.shift) { solve(pid); renderCase(); } else msg(T("Ez még mindig zagyvaság. Forgasd tovább.")); };
      }
    },
    /* szabad szöveges válasz (név, szó, anagramma) */
    text: {
      render(pid, p) {
        if (S.solved[pid]) return p.body + solvedBlock(pid, "Megfejtve");
        return `${p.body}<div class="row"><input type="text" class="textin" id="${pid}-text" autocomplete="off" placeholder="${esc(p.placeholder || T("Válasz"))}" aria-label="${T("Válasz")}" value="${esc(S.inputs[pid] || "")}"><button class="btn" data-try>${T("Ellenőrzöm")}</button></div>
          <p class="msg" data-msg></p>${hintBlock(pid)}`;
      },
      bind(pid, p, root, msg) {
        const inp = root.querySelector("input");
        inp.oninput = () => { S.inputs[pid] = inp.value; save(); };
        inp.onkeydown = e => { if (e.key === "Enter") root.querySelector("[data-try]").click(); };
        root.querySelector("[data-try]").onclick = () => {
          if (!norm(inp.value)) return msg(T("Írj be valamit."));
          if (p.answers.some(a => sameWords(a, inp.value))) { solve(pid); renderCase(); } else msg(p.wrong || T("Nem ez a megoldás."));
        };
      }
    },
    /* időrend: elemek sorba rendezése fel/le gombokkal */
    order: {
      render(pid, p) {
        const done = S.solved[pid], cur = done ? p.answer : (S.inputs[pid] || p.initial);
        const byId = Object.fromEntries(p.items.map(i => [i.id, i.text]));
        return `${p.body}${p.facts ? `<ol class="facts">${p.facts.map(f => `<li>${esc(f)}</li>`).join("")}</ol>` : ""}
          <ol class="orderlist">${cur.map((id, i) => `<li><span class="ord">${i + 1}.</span><span class="otext">${esc(byId[id])}</span>${done ? "" : `<span class="omove"><button class="btn ghost small" data-up="${i}" aria-label="${T("Feljebb")}" ${i === 0 ? "disabled" : ""}>↑</button><button class="btn ghost small" data-down="${i}" aria-label="${T("Lejjebb")}" ${i === cur.length - 1 ? "disabled" : ""}>↓</button></span>`}</li>`).join("")}</ol>
          ${done ? solvedBlock(pid, "Az időrend összeállt") : `<div class="row"><button class="btn" data-try>${T("Ellenőrzöm")}</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        const cur = (S.inputs[pid] || p.initial).slice();
        const move = (i, d) => { SND("tick"); [cur[i], cur[i + d]] = [cur[i + d], cur[i]]; S.inputs[pid] = cur; save(); renderCase(); const b = app.querySelector(`[data-${d < 0 ? "up" : "down"}="${i + d}"]`); if (b && !b.disabled) b.focus(); };
        root.querySelectorAll("[data-up]").forEach(b => b.onclick = () => move(+b.dataset.up, -1));
        root.querySelectorAll("[data-down]").forEach(b => b.onclick = () => move(+b.dataset.down, 1));
        root.querySelector("[data-try]").onclick = () => {
          const ok = cur.filter((id, i) => id === p.answer[i]).length;
          if (ok === cur.length) { solve(pid); renderCase(); } else msg(T("{0} / {1} esemény van a helyén.", ok, cur.length));
        };
      }
    },
    /* kulcsszavas (Vigenère) titkosírás: a kulcsot máshol kell megtalálni */
    keyword: {
      render(pid, p) {
        const done = S.solved[pid], key = done ? p.key : (S.inputs[pid] || ""), cipher = vig(p.plain, p.key, 1);
        return `${p.body}<div class="typed cipher">${esc(cipher)}</div>
          <div class="row"><input type="text" class="textin" id="${pid}-key" autocomplete="off" placeholder="${T("Kulcsszó")}" aria-label="${T("Kulcsszó")}" value="${esc(key)}" ${done ? "disabled" : ""}>${done ? "" : `<button class="btn" data-try>${T("Ellenőrzöm")}</button>`}</div>
          <div class="typed cipher" data-out>${esc(norm(key) ? vig(cipher, key, -1) : T("Írd be a kulcsszót, és a szöveg itt rögtön visszafejtődik."))}</div>
          ${done ? solvedBlock(pid, "Megfejtve") : `<p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        const cipher = vig(p.plain, p.key, 1), inp = root.querySelector("input"), out = root.querySelector("[data-out]");
        inp.oninput = () => { S.inputs[pid] = inp.value; save(); out.textContent = norm(inp.value) ? vig(cipher, inp.value, -1) : T("Írd be a kulcsszót, és a szöveg itt rögtön visszafejtődik."); };
        inp.onkeydown = e => { if (e.key === "Enter") root.querySelector("[data-try]").click(); };
        root.querySelector("[data-try]").onclick = () => {
          if (norm(inp.value).replace(/ /g, "") === norm(p.key)) { solve(pid); renderCase(); } else msg(T("A szöveg még mindig értelmetlen. Rossz a kulcs."));
        };
      }
    },
    /* ellentmondás: a vallomás egyik kiemelt mondatrésze nem igaz, rá kell kattintani */
    spot: {
      render(pid, p) {
        const done = S.solved[pid], miss = (S.inputs[pid] || []);
        let i = 0;
        const txt = esc(p.statement).replace(/\[\[(.+?)\]\]/g, (m, t) => { const k = i++; const cls = done && k === p.answer ? " hit" : miss.includes(k) ? " miss" : ""; return done ? `<span class="phrase${cls}">${t}</span>` : `<span class="phrase${cls}" role="button" tabindex="0" data-ph="${k}">${t}</span>`; });
        return `${p.body}<div class="typed statement">${txt}</div>
          ${done ? solvedBlock(pid, "Megvan az ellentmondás") : `<p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        root.querySelectorAll("[data-ph]").forEach(b => b.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); b.click(); } });
        root.querySelectorAll("[data-ph]").forEach(b => b.onclick = () => {
          const k = +b.dataset.ph;
          if (k === p.answer) { solve(pid); renderCase(); return; }
          S.inputs[pid] = Array.from(new Set((S.inputs[pid] || []).concat(k))); save();
          b.classList.add("miss"); msg((p.wrong && p.wrong[k]) || T("Ez a mondat megáll. Keress tovább."));
        });
      }
    }
  };
  function renderPuzzle(pid) { const p = C.puzzles[pid]; return `<h3>✦ ${esc(p.title)}</h3>${PUZ[p.type].render(pid, p)}`; }

  /* ---------- eseménykezelők ---------- */
  const BIND = {
    ugy() { $("[data-go]").onclick = () => go("hely", C.intro.start); },
    hely() {
      $$("[data-loc]").forEach(b => b.onclick = () => go("hely", b.dataset.loc));
      const bk = $("[data-back]"); if (bk) bk.onclick = () => go("hely");
      $$("[data-take]").forEach(b => b.onclick = () => { gain(b.dataset.take); save(); SND("paper"); spend(COST.take); renderCase(); });
      $$("[data-hint]").forEach(b => b.onclick = () => { const id = b.dataset.hint; S.hints[id] = (S.hints[id] || 0) + 1; save(); SND("paper"); spend(COST.hint); renderCase(); });
      const box = $("[data-puzzle]");
      if (box && !S.solved[box.dataset.puzzle]) {
        const pid = box.dataset.puzzle, p = C.puzzles[pid], m = box.querySelector("[data-msg]");
        PUZ[p.type].bind(pid, p, box, t => { SND("wrong"); if (spend(COST.wrong)) return renderCase(); m.className = "msg bad"; m.textContent = t; updateClock(); });
      }
    },
    gyan() {
      $$("[data-ask]").forEach(b => b.onclick = () => { S.asked.push(b.dataset.ask); save(); SND("paper"); spend(COST.ask); const y = window.scrollY; renderCase(); window.scrollTo({ top: y }); });
      $$("[data-cf]").forEach(b => b.onclick = () => {
        const sid = b.dataset.cf, sel = $("#cf-" + sid), m = app.querySelector(`[data-cfmsg="${sid}"]`), clue = sel.value;
        const s = C.suspects.find(x => x.id === sid), first = s.short || (LANG === "en" ? s.name.split(" ")[0] : s.name.split(" ").slice(-1)[0]);
        if (!clue) { m.className = "msg bad"; m.textContent = T("Előbb válassz egy nyomot."); return; }
        const hit = contra(C, sid).find(k => !S.conf.includes(k.id) && has(k.clue, clue));
        if (hit) { S.conf.push(hit.id); if (hit.gives) gain(hit.gives); save(); SND(hit.lie === false ? "success" : "stamp"); spend(COST.confront); renderCase(); return; }
        if (contra(C, sid).some(k => S.conf.includes(k.id) && has(k.clue, clue))) { m.className = "msg"; m.textContent = T("Ezt már tisztáztátok."); return; }
        S.wrongConf = (S.wrongConf || 0) + 1; save(); SND("wrong");
        if (spend(COST.confront)) { renderCase(); return; }
        updateClock();
        m.className = "msg bad"; m.textContent = `${first} ${REBUFF[(S.wrongConf + sid.length) % REBUFF.length]}`;
      });
    },
    tabla() {
      const board = $("[data-board]"); if (!board) return;
      let threadMode = false, first = null;
      const hint = $("[data-boardhint]"), tbtn = $("[data-thread]");
      tbtn.onclick = () => { threadMode = !threadMode; first = null; tbtn.setAttribute("aria-pressed", String(threadMode)); app.querySelectorAll(".pin.sel").forEach(e => e.classList.remove("sel")); hint.textContent = threadMode ? T("Kattints két kártyára, hogy összekösd őket. Fonalra kattintva levághatod.") : ""; };
      $("[data-tidy]").onclick = () => { S.board = {}; save(); renderCase(); };
      $("[data-unthread]").onclick = () => { S.threads = []; save(); drawThreads(); };
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
      app.querySelectorAll("[data-pin]").forEach(el => {
        const id = el.dataset.pin;
        const place = (x, y) => { x = clamp(x, 0, BW - el.offsetWidth); y = clamp(y, 0, BH - el.offsetHeight); el.style.left = x + "px"; el.style.top = y + "px"; S.board[id] = { x, y }; drawThreads(); };
        el.onpointerdown = e => {
          if (threadMode) return;
          e.preventDefault(); el.setPointerCapture(e.pointerId); el.classList.add("drag");
          const sx = e.clientX, sy = e.clientY, ox = el.offsetLeft, oy = el.offsetTop;
          el.onpointermove = ev => place(ox + ev.clientX - sx, oy + ev.clientY - sy);
          el.onpointerup = () => { el.onpointermove = null; el.classList.remove("drag"); save(); };
        };
        el.onclick = () => {
          if (!threadMode) return;
          if (!first) { first = id; el.classList.add("sel"); return; }
          if (first !== id) {
            const i = S.threads.findIndex(([a, b]) => (a === first && b === id) || (a === id && b === first));
            if (i >= 0) S.threads.splice(i, 1); else { S.threads.push([first, id]); SND("tick"); }
            save(); drawThreads();
          }
          app.querySelectorAll(".pin.sel").forEach(e => e.classList.remove("sel")); first = null;
        };
        el.onkeydown = e => { const d = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] }[e.key]; if (d) { e.preventDefault(); place(el.offsetLeft + d[0], el.offsetTop + d[1]); save(); } if (e.key === "Enter" && threadMode) el.click(); };
      });
      requestAnimationFrame(drawThreads);
    },
    vad() {
      const rv = $("[data-rv]");
      if (rv) rv.onclick = () => {
        const st = C.reveal[S.rstep], v = $("#rv-proof").value, m = $("[data-rvmsg]");
        if (!v) { m.className = "msg bad"; m.textContent = T("Válassz egy bizonyítékot a jegyzetfüzetből."); return; }
        if (has(st.proof, v)) { S.rstep++; save(); SND(S.rstep >= C.reveal.length ? "stamp" : "success"); renderCase(); app.querySelector(".reveal .rv-say.lead, .ending")?.scrollIntoView({ block: "start" }); return; }
        S.rmiss = (S.rmiss || 0) + 1; save(); SND("wrong");
        const who = C.suspects.find(x => x.id === st.who);
        m.className = "msg bad"; m.textContent = T("{0} felnevet: „Ez semmit sem bizonyít!” A teremben morajlás támad.", who ? (who.short || (LANG === "en" ? who.name.split(" ")[0] : who.name.split(" ").slice(-1)[0])) : T("Valaki"));
      };
      $$("[data-share]").forEach(b => b.onclick = shareCard);
      $$("[data-restart]").forEach(b => b.onclick = () => { S = fresh(); save(); renderCase(); window.scrollTo({ top: 0 }); });
      $$("[data-reveal]").forEach(b => b.onclick = () => { S.ended = "reveal"; save(); renderCase(); window.scrollTo({ top: 0 }); });
      const btn = $("[data-accuse]"); if (!btn) return;
      const qs = C.accusation.questions, m = $("[data-accmsg]");
      const remember = () => { S.acc = {}; qs.forEach(q => { const r = app.querySelector(`input[name="q-${q.id}"]:checked`); if (r) S.acc[q.id] = r.value; const p = $("#p-" + q.id); if (p && p.value) S.acc["p-" + q.id] = p.value; }); save(); };
      $$("input[name^=q-], [data-proof]").forEach(el => el.onchange = remember);
      btn.onclick = () => {
        remember();
        const A = S.acc;
        if (qs.some(q => !A[q.id] || (q.proof && !A["p-" + q.id]))) { m.className = "msg bad"; m.textContent = T("Minden kérdésre válaszolj, és mindenhol jelöld meg a bizonyítékot."); return; }
        S.tries++;
        const wrong = qs.filter(q => !has(q.answer, A[q.id]) || (q.proof && !has(q.proof, A["p-" + q.id]))).length;
        if (!wrong) { S.ended = "win"; save(); SND("stamp"); renderCase(); window.scrollTo({ top: 0 }); return; }
        SND("wrong");
        if (spend(COST.accuse)) { renderCase(); window.scrollTo({ top: 0 }); return; }
        if (S.tries >= MAXTRIES(C)) { S.ended = "lose"; save(); renderCase(); window.scrollTo({ top: 0 }); return; }
        save(); updateClock(); m.className = "msg bad";
        const left = MAXTRIES(C) - S.tries;
        m.textContent = wrong === qs.length ? T("Néma csend. A vádlott felnevet: semmi sem stimmel. Még {0} próbálkozásod van.", left)
          : T("Az ügyvéd közbevág: a vádból {0} pont nem áll meg. Hogy melyik, azt neked kell kitalálnod. Még {1} próbálkozásod van.", wrong, left);
      };
    }
  };

  route();
})();
