/* Nyomozós játékmotor. Az ügyeket a cases/*.js fájlok töltik be a window.MM_CASES tömbbe. */
(function () {
  "use strict";
  const CASES = (window.MM_CASES || []).slice().sort((a, b) => a.number - b.number);
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
  const ART = window.MM_ART || { portrait: () => "", scene: () => "", cover: () => "" };
  const coverOf = c => c.cover ? `<div class="art cover">${ART.cover(c.cover, c.title)}</div>` : "";
  const LEVELS = [
    ["Könnyű", "Rövid ügy, öt gyanúsított, egyértelmű nyomok. Háromlépcsős súgó minden rejtvényhez."],
    ["Közepes", "Zárt szoba, több hamis nyom, új rejtvénytípusok. Kétlépcsős súgó."],
    ["Nehéz", "Hat gyanúsított, egymásra épülő rejtvények, és a tettes nem egyedül dolgozott. Csak egy súgó rejtvényenként."]
  ];

  /* ---------- mentés ---------- */
  const KEY = id => "mm:" + id;
  const fresh = () => ({ tab: "ugy", loc: null, clues: [], solved: {}, hints: {}, inputs: {}, tries: 0, ended: null });
  function loadState(id) {
    try { const v = JSON.parse(localStorage.getItem(KEY(id))); if (v && v.clues) return Object.assign(fresh(), v); } catch (e) {}
    return fresh();
  }
  let C = null, S = null, confirmReset = false;
  function save() { try { localStorage.setItem(KEY(C.id), JSON.stringify(S)); } catch (e) {} }
  function gain(id) { if (id && !S.clues.includes(id)) S.clues.push(id); }
  function solve(pid) { S.solved[pid] = true; gain(C.puzzles[pid].reward); save(); }
  const hintsUsed = st => Object.values(st.hints).reduce((a, b) => a + b, 0);
  const pids = c => Object.keys(c.puzzles);

  /* ---------- útvonal ---------- */
  function route() {
    const id = (location.hash || "").slice(1);
    const c = CASES.find(x => x.id === id);
    if (c) { C = c; S = loadState(c.id); renderCase(); }
    else { C = null; S = null; renderHome(); }
    window.scrollTo({ top: 0 });
  }
  window.addEventListener("hashchange", route);

  /* ---------- címoldal ---------- */
  function renderHome() {
    document.title = "Rejtélyes gyilkosságok";
    const card = c => {
      const st = loadState(c.id);
      const done = pids(c).filter(p => st.solved[p]).length, total = pids(c).length;
      const started = st.clues.length > 0 || st.tries > 0;
      const status = st.ended === "win" ? `<span class="stamp">Megoldva</span>` : "";
      const label = st.ended === "win" ? "Újraolvasom" : started ? "Folytatom" : "Nyomozás indítása";
      return `<article class="casecard">${coverOf(c)}${status}
        <span class="eyebrow">${c.number}. ügy · ${pids(c).length} rejtvény · ${c.suspects.length} gyanúsított</span>
        <h2>${esc(c.title)}</h2>
        <span class="meta">${esc(c.meta)}</span>
        <p>${esc(c.teaser)}</p>
        ${started && st.ended !== "win" ? `<span class="meta">${done}/${total} rejtvény · ${st.clues.length}/${Object.keys(c.clues).length} nyom</span>` : ""}
        <div class="row"><a class="btn" href="#${c.id}">${label} →</a></div>
      </article>`;
    };
    const sections = LEVELS.map(([lvl, desc]) => {
      const list = CASES.filter(c => c.difficulty === lvl);
      if (!list.length) return "";
      return `<section class="level"><div class="level-head"><h2>${lvl}</h2><p>${esc(desc)}</p></div><div class="cases">${list.map(card).join("")}</div></section>`;
    }).join("");
    app.innerHTML = `<div class="wrap">
      <header class="home-head">
        <span class="meta">Klasszikus krimik a böngészőben</span>
        <h1>Rejtélyes gyilkosságok</h1>
        <p>Halott a házban, mindenkinek van titka, és csak egyikük gyilkos. Járd be a helyszíneket, fejtsd meg a rejtvényeket, és nevezd meg a tettest.</p>
      </header>
      ${sections}
      <section class="howto">
        <span class="eyebrow">Hogyan játssz?</span>
        <ol>
          <li>Kutasd át a helyszíneket, és gyűjtsd a nyomokat a jegyzetfüzetbe.</li>
          <li>Oldd meg a rejtvényeket. Ha elakadsz, kérj súgót, de az a végén látszani fog.</li>
          <li>Olvasd el a gyanúsítottak vallomásait, és keresd az ellentmondásokat.</li>
          <li>Nevezd meg a tettest, az eszközt és az indítékot.</li>
        </ol>
        <p>A játékállás ebben a böngészőben mentődik, bármikor folytathatod.</p>
      </section>
    </div>`;
  }

  /* ---------- ügy nézet ---------- */
  const TABS = [["ugy", "Ügyirat"], ["hely", "Helyszínek"], ["gyan", "Gyanúsítottak"], ["jegy", "Jegyzetfüzet"], ["vad", "Vádemelés"]];
  function renderCase() {
    document.title = C.title;
    app.innerHTML = `<div class="wrap">
      <div class="topnav"><a class="link" href="#">← Összes ügy</a></div>
      <header class="case">
        <div class="stack" style="gap:6px"><span class="meta">${esc(C.meta)}</span><h1>${esc(C.title)}</h1></div>
        <span class="stamp">${S.ended === "win" ? "Ügy lezárva" : "Nyomozás folyamatban"}</span>
      </header>
      <nav class="tabs" role="tablist">${TABS.map(([id, l]) => `<button role="tab" aria-selected="${S.tab === id}" data-tab="${id}">${l}${id === "jegy" && S.clues.length ? `<span class="count">${S.clues.length}</span>` : ""}</button>`).join("")}</nav>
      <main class="sheet" aria-live="polite">${VIEWS[S.tab]()}</main>
      <footer><span>${C.number}. ügy</span><button data-reset>${confirmReset ? "Biztosan? Kattints újra a törléshez" : "Ügy újrakezdése"}</button></footer>
    </div>`;
    $$("[data-tab]").forEach(b => b.onclick = () => { S.tab = b.dataset.tab; S.loc = null; confirmReset = false; save(); renderCase(); });
    $("[data-reset]").onclick = () => {
      if (!confirmReset) { confirmReset = true; renderCase(); return; }
      confirmReset = false; S = fresh(); save(); renderCase(); window.scrollTo({ top: 0 });
    };
    BIND[S.tab] && BIND[S.tab]();
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
      <div class="typed">TEENDŐ:
1. Járd végig a helyszíneket, gyűjts nyomokat.
2. Oldd meg a(z) ${pids(C).length} rejtvényt, mindegyik döntő bizonyítékot ad.
3. Hallgasd meg a gyanúsítottakat.
4. Nevezd meg a tettest, az eszközt és az indítékot.</div>
      ${pips()}
      <div class="row"><button class="btn" data-go>Helyszínelés indítása →</button></div>
    </div>`,

    hely: () => {
      if (S.loc) return viewLoc(C.locations.find(l => l.id === S.loc));
      return `<div class="stack"><span class="eyebrow">A helyszín alaprajza</span><h2>Helyszínek</h2>
        <p>Válassz egy helyiséget. A rejtvényt rejtő helyszíneket ✦ jelöli.</p>
        <div class="grid2">${C.locations.map(l => {
          const locked = l.requires && !S.solved[l.requires];
          const items = l.items || [];
          const total = items.length + (l.puzzle ? 1 : 0);
          const got = items.filter(i => S.clues.includes(i.clue)).length + (l.puzzle && S.solved[l.puzzle] ? 1 : 0);
          const status = locked ? `<span class="status locked">Zárva</span>` : got === total ? `<span class="status done">Átkutatva</span>` : `<span class="status">${got}/${total} felderítve</span>`;
          return `<button class="loc" data-loc="${l.id}" ${locked ? "disabled" : ""}><div class="art" aria-hidden="true">${ART.scene(l.art || l.id, "")}</div><h3>${l.puzzle ? "✦ " : ""}${esc(l.name)}</h3><p>${esc(l.desc)}</p>${status}</button>`;
        }).join("")}</div></div>`;
    },

    gyan: () => `<div class="stack"><span class="eyebrow">Kihallgatási jegyzőkönyvek</span><h2>Gyanúsítottak</h2>
      <p>Mindenki mond valamit, és mindenki elhallgat valamit. Újabb nyomok után a jegyzetek bővülnek.</p>
      <div class="grid2">${C.suspects.map(s => {
        const ex = s.extra && (S.solved[s.extra.after] || S.clues.includes(s.extra.after));
        return `<div class="suspect">${ex && s.extra.lie ? `<span class="stamp anim">Hazudott</span>` : ""}<div class="head"><div class="art portrait">${ART.portrait(s.look, s.name)}</div><div class="who"><h3>${esc(s.name)}</h3><span class="role">${esc(s.role)}</span></div></div><p>${esc(s.stmt)}</p>${ex ? `<p class="note">${esc(s.extra.text)}</p>` : ""}</div>`;
      }).join("")}</div></div>`,

    jegy: () => {
      const ids = Object.keys(C.clues).filter(k => S.clues.includes(k));
      return `<div class="stack"><span class="eyebrow">Saját jegyzeteid</span><h2>Jegyzetfüzet</h2>${pips()}
        ${ids.length ? `<div class="stack">${ids.map(k => `<div class="clue"><span class="src">${esc(C.clues[k].src)}</span><h3>${esc(C.clues[k].t)}</h3><p>${esc(C.clues[k].x)}</p></div>`).join("")}</div>`
          : `<p class="typed">Még üres a füzet. Kezdd ott, ahol a holttestet megtalálták.</p>`}
        <p class="eyebrow">${ids.length} / ${Object.keys(C.clues).length} nyom</p></div>`;
    },

    vad: () => {
      if (S.ended === "win") return viewEnding();
      const left = pids(C).filter(p => !S.solved[p]).length;
      return `<div class="stack"><span class="eyebrow">Mindenki rád vár</span><h2>Vádemelés</h2>
        <p>Ahogy a nagy detektívek szokták: összehívod a ház lakóit, és elmondod, mi történt. Nevezd meg a tettest, az eszközt és az indítékot.</p>
        ${left ? `<p class="msg bad">Még ${left} rejtvény megoldatlan. Vádolhatsz most is, de kockázatos.</p>` : ""}
        ${C.accusation.questions.map(q => {
          const opts = q.from === "suspects" ? C.suspects.map(s => ({ v: s.id, label: s.name })).concat(q.extra || []) : q.options;
          return `<fieldset><legend>${esc(q.legend)}</legend>${opts.map(o => `<label class="opt"><input type="radio" name="q-${q.id}" value="${o.v}"> ${esc(o.label)}</label>`).join("")}</fieldset>`;
        }).join("")}
        <div class="row"><button class="btn" data-accuse>Kimondom a nevet</button></div><p class="msg" data-accmsg></p></div>`;
    }
  };

  function viewLoc(l) {
    let h = `<div class="stack"><button class="link" data-back>← Vissza az alaprajzhoz</button>
      <div class="art locart">${ART.scene(l.art || l.id, l.name)}</div>
      <span class="eyebrow">Helyszín</span><h2>${esc(l.name)}</h2><p>${esc(l.desc)}</p>`;
    (l.items || []).forEach(it => {
      const has = S.clues.includes(it.clue);
      h += `<div class="item"><h3>${esc(it.label)}</h3><p>${esc(it.text)}</p>${has
        ? `<span class="found">✓ Nyom feljegyezve: ${esc(C.clues[it.clue].t)}</span><p class="typed">${esc(C.clues[it.clue].x)}</p>`
        : `<div class="row"><button class="btn ghost" data-take="${it.clue}">Megvizsgálom</button></div>`}</div>`;
    });
    if (l.puzzle) h += `<div class="item" data-puzzle="${l.puzzle}">${renderPuzzle(l.puzzle)}</div>`;
    return h + `</div>`;
  }

  function viewEnding() {
    const hu = hintsUsed(S);
    const culprit = C.suspects.find(s => s.id === C.accusation.questions[0].answer);
    return `<div class="stack"><div class="ending"><div class="row" style="justify-content:space-between;align-items:flex-start"><div class="art portrait" style="width:110px">${culprit ? ART.portrait(culprit.look, culprit.name) : ""}</div><span class="stamp anim">Ügy lezárva</span></div>
      <h2>${esc(C.ending.heading)}</h2>
      ${C.ending.paragraphs.map(p => `<p>${esc(p)}</p>`).join("")}
      <p class="eyebrow">${S.tries}. vádra megoldva · ${hu ? hu + " súgó" : "súgó nélkül"} · ${S.clues.length}/${Object.keys(C.clues).length} nyom</p></div>
      <div class="row"><a class="btn" href="#">Vissza az ügyekhez</a></div></div>`;
  }

  /* ---------- rejtvények ---------- */
  function hintBlock(pid) {
    const p = C.puzzles[pid], n = S.hints[pid] || 0, all = (p.hints || []).length;
    if (!all) return "";
    const shown = p.hints.slice(0, n).map((t, i) => `<p class="hint"><b>${i + 1}.</b> ${esc(t)}</p>`).join("");
    const btn = !S.solved[pid] && n < all ? `<button class="btn ghost small" data-hint="${pid}">Súgó kérése (${n + 1}/${all})</button>` : "";
    return `<div class="hints">${shown}</div>${btn ? `<div class="row">${btn}</div>` : ""}`;
  }
  const solvedBlock = (pid, label) => {
    const p = C.puzzles[pid];
    return `<span class="found">✓ ${label}</span><p class="typed">${esc(C.clues[p.reward].x)}</p>${p.afterSolve || ""}`;
  };

  const PUZ = {
    code: {
      render(pid, p) {
        if (S.solved[pid]) return p.body + solvedBlock(pid, "Kinyílt");
        return `${p.body}<div class="digits">${Array.from({ length: p.length }, (_, i) => `<input id="${pid}-d${i}" inputmode="numeric" autocomplete="off" maxlength="1" aria-label="${i + 1}. számjegy">`).join("")}</div>
          <div class="row"><button class="btn" data-try>Kipróbálom</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`;
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
          else msg(c.length < p.length ? `${p.length} számjegy kell.` : p.wrong);
        };
      }
    },
    choice: {
      render(pid, p) {
        const done = S.solved[pid];
        return `${p.body}<div class="samples">${p.options.map(o => `<label class="sample"><span class="row"><input type="radio" name="${pid}" value="${o.v}" ${done ? "disabled" : ""} ${done && o.v === p.answer ? "checked" : ""}> <b>${o.v}</b> · ${esc(o.label)}</span>${o.sample ? `<div class="typed">${o.sample}</div>` : ""}</label>`).join("")}</div>
          ${done ? solvedBlock(pid, "Azonosítva") : `<div class="row"><button class="btn" data-try>${esc(p.confirm || "Ez az")}</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        root.querySelector("[data-try]").onclick = () => {
          const v = (root.querySelector(`input[name="${pid}"]:checked`) || {}).value;
          if (!v) return msg("Előbb válassz egyet.");
          if (v === p.answer) { solve(pid); renderCase(); } else msg((p.wrong && p.wrong[v]) || "Nem ez az. Nézd meg újra.");
        };
      }
    },
    assign: {
      render(pid, p) {
        const done = S.solved[pid], cur = S.inputs[pid] || {};
        return `${p.body}<ol class="facts">${p.facts.map(f => `<li>${esc(f)}</li>`).join("")}</ol>
          <div class="tablewrap"><table><thead><tr><th>Gyanúsított</th><th>${esc(p.columnLabel)}</th></tr></thead><tbody>
          ${C.suspects.map(s => `<tr><td>${esc(s.name)}</td><td><select id="${pid}-${s.id}" data-row="${s.id}" ${done ? "disabled" : ""}><option value="">— válassz —</option>${p.choices.map(r => `<option ${(done ? p.answer[s.id] : cur[s.id]) === r ? "selected" : ""}>${esc(r)}</option>`).join("")}</select></td></tr>`).join("")}
          </tbody></table></div>
          ${done ? solvedBlock(pid, "Az idővonal összeállt") : `<div class="row"><button class="btn" data-try>Ellenőrzöm</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        S.inputs[pid] = S.inputs[pid] || {};
        root.querySelectorAll("[data-row]").forEach(s => s.onchange = () => { S.inputs[pid][s.dataset.row] = s.value; save(); });
        root.querySelector("[data-try]").onclick = () => {
          const cur = S.inputs[pid], ids = C.suspects.map(s => s.id);
          if (ids.some(id => !cur[id])) return msg("Mindenkinek adj meg egy helyiséget.");
          if (new Set(ids.map(id => cur[id])).size < ids.length) return msg("Mindenki más helyiségben volt: egy helyre csak egy ember kerülhet.");
          const ok = ids.filter(id => cur[id] === p.answer[id]).length;
          if (ok === ids.length) { solve(pid); renderCase(); } else msg(`${ok} / ${ids.length} helyes. Olvasd újra a vallomásokat.`);
        };
      }
    },
    caesar: {
      render(pid, p) {
        const done = S.solved[pid], k = done ? p.shift : (S.inputs[pid] || 0), cipher = shiftTxt(p.plain, p.shift);
        return `${p.body}<div class="typed cipher">${esc(cipher)}</div>
          <div class="dial"><button class="btn ghost" data-dm aria-label="Eltolás csökkentése" ${done ? "disabled" : ""}>−</button><span class="num" data-dn>${k}</span><button class="btn ghost" data-dp aria-label="Eltolás növelése" ${done ? "disabled" : ""}>+</button>
          <input type="range" id="${pid}-dial" min="0" max="25" value="${k}" aria-label="Eltolás" ${done ? "disabled" : ""}></div>
          <div class="typed cipher" data-out>${esc(shiftTxt(cipher, -k))}</div>
          ${done ? solvedBlock(pid, "Megfejtve") : `<div class="row"><button class="btn" data-try>Megvan!</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        const cipher = shiftTxt(p.plain, p.shift), r = root.querySelector("input[type=range]");
        const upd = k => { k = (k + 26) % 26; S.inputs[pid] = k; r.value = k; root.querySelector("[data-dn]").textContent = k; root.querySelector("[data-out]").textContent = shiftTxt(cipher, -k); save(); };
        r.oninput = () => upd(+r.value);
        root.querySelector("[data-dm]").onclick = () => upd((S.inputs[pid] || 0) - 1);
        root.querySelector("[data-dp]").onclick = () => upd((S.inputs[pid] || 0) + 1);
        root.querySelector("[data-try]").onclick = () => { if ((S.inputs[pid] || 0) === p.shift) { solve(pid); renderCase(); } else msg("Ez még mindig zagyvaság. Forgasd tovább."); };
      }
    },
    /* szabad szöveges válasz (név, szó, anagramma) */
    text: {
      render(pid, p) {
        if (S.solved[pid]) return p.body + solvedBlock(pid, "Megfejtve");
        return `${p.body}<div class="row"><input type="text" class="textin" id="${pid}-text" autocomplete="off" placeholder="${esc(p.placeholder || "Válasz")}" aria-label="Válasz" value="${esc(S.inputs[pid] || "")}"><button class="btn" data-try>Ellenőrzöm</button></div>
          <p class="msg" data-msg></p>${hintBlock(pid)}`;
      },
      bind(pid, p, root, msg) {
        const inp = root.querySelector("input");
        inp.oninput = () => { S.inputs[pid] = inp.value; save(); };
        inp.onkeydown = e => { if (e.key === "Enter") root.querySelector("[data-try]").click(); };
        root.querySelector("[data-try]").onclick = () => {
          if (!norm(inp.value)) return msg("Írj be valamit.");
          if (p.answers.some(a => sameWords(a, inp.value))) { solve(pid); renderCase(); } else msg(p.wrong || "Nem ez a megoldás.");
        };
      }
    },
    /* időrend: elemek sorba rendezése fel/le gombokkal */
    order: {
      render(pid, p) {
        const done = S.solved[pid], cur = done ? p.answer : (S.inputs[pid] || p.initial);
        const byId = Object.fromEntries(p.items.map(i => [i.id, i.text]));
        return `${p.body}${p.facts ? `<ol class="facts">${p.facts.map(f => `<li>${esc(f)}</li>`).join("")}</ol>` : ""}
          <ol class="orderlist">${cur.map((id, i) => `<li><span class="ord">${i + 1}.</span><span class="otext">${esc(byId[id])}</span>${done ? "" : `<span class="omove"><button class="btn ghost small" data-up="${i}" aria-label="Feljebb" ${i === 0 ? "disabled" : ""}>↑</button><button class="btn ghost small" data-down="${i}" aria-label="Lejjebb" ${i === cur.length - 1 ? "disabled" : ""}>↓</button></span>`}</li>`).join("")}</ol>
          ${done ? solvedBlock(pid, "Az időrend összeállt") : `<div class="row"><button class="btn" data-try>Ellenőrzöm</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        const cur = (S.inputs[pid] || p.initial).slice();
        const move = (i, d) => { [cur[i], cur[i + d]] = [cur[i + d], cur[i]]; S.inputs[pid] = cur; save(); renderCase(); const b = app.querySelector(`[data-${d < 0 ? "up" : "down"}="${i + d}"]`); if (b && !b.disabled) b.focus(); };
        root.querySelectorAll("[data-up]").forEach(b => b.onclick = () => move(+b.dataset.up, -1));
        root.querySelectorAll("[data-down]").forEach(b => b.onclick = () => move(+b.dataset.down, 1));
        root.querySelector("[data-try]").onclick = () => {
          const ok = cur.filter((id, i) => id === p.answer[i]).length;
          if (ok === cur.length) { solve(pid); renderCase(); } else msg(`${ok} / ${cur.length} esemény van a helyén.`);
        };
      }
    },
    /* kulcsszavas (Vigenère) titkosírás: a kulcsot máshol kell megtalálni */
    keyword: {
      render(pid, p) {
        const done = S.solved[pid], key = done ? p.key : (S.inputs[pid] || ""), cipher = vig(p.plain, p.key, 1);
        return `${p.body}<div class="typed cipher">${esc(cipher)}</div>
          <div class="row"><input type="text" class="textin" id="${pid}-key" autocomplete="off" placeholder="Kulcsszó" aria-label="Kulcsszó" value="${esc(key)}" ${done ? "disabled" : ""}>${done ? "" : `<button class="btn" data-try>Ellenőrzöm</button>`}</div>
          <div class="typed cipher" data-out>${esc(norm(key) ? vig(cipher, key, -1) : "Írd be a kulcsszót, és a szöveg itt rögtön visszafejtődik.")}</div>
          ${done ? solvedBlock(pid, "Megfejtve") : `<p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        const cipher = vig(p.plain, p.key, 1), inp = root.querySelector("input"), out = root.querySelector("[data-out]");
        inp.oninput = () => { S.inputs[pid] = inp.value; save(); out.textContent = norm(inp.value) ? vig(cipher, inp.value, -1) : "Írd be a kulcsszót, és a szöveg itt rögtön visszafejtődik."; };
        inp.onkeydown = e => { if (e.key === "Enter") root.querySelector("[data-try]").click(); };
        root.querySelector("[data-try]").onclick = () => {
          if (norm(inp.value).replace(/ /g, "") === norm(p.key)) { solve(pid); renderCase(); } else msg("A szöveg még mindig értelmetlen. Rossz a kulcs.");
        };
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
      $$("[data-take]").forEach(b => b.onclick = () => { gain(b.dataset.take); save(); renderCase(); });
      $$("[data-hint]").forEach(b => b.onclick = () => { const id = b.dataset.hint; S.hints[id] = (S.hints[id] || 0) + 1; save(); renderCase(); });
      const box = $("[data-puzzle]");
      if (box && !S.solved[box.dataset.puzzle]) {
        const pid = box.dataset.puzzle, p = C.puzzles[pid], m = box.querySelector("[data-msg]");
        PUZ[p.type].bind(pid, p, box, t => { m.className = "msg bad"; m.textContent = t; });
      }
    },
    vad() {
      const btn = $("[data-accuse]"); if (!btn) return;
      btn.onclick = () => {
        const qs = C.accusation.questions, m = $("[data-accmsg]");
        const ans = qs.map(q => (app.querySelector(`input[name="q-${q.id}"]:checked`) || {}).value);
        if (ans.some(a => a === undefined)) { m.className = "msg bad"; m.textContent = "Mindegyik kérdésre válaszolnod kell."; return; }
        S.tries++;
        const wrong = qs.filter((q, i) => ans[i] !== q.answer).map(q => q.name);
        if (!wrong.length) { S.ended = "win"; save(); renderCase(); window.scrollTo({ top: 0 }); return; }
        save(); m.className = "msg bad";
        m.textContent = wrong.length === qs.length ? "Néma csend. A vádlott felnevet. Semmi sem stimmel."
          : `A vádlott ügyvédje közbevág: ${wrong.join(" és ")} nem áll meg. Gondold át újra.`;
      };
    }
  };

  route();
})();
