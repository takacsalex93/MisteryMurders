/* Nyomozós játékmotor. Az ügyeket a cases/*.js fájlok töltik be a window.MM_CASES tömbbe. */
(function () {
  "use strict";
  const I = window.MM_I18N || { T: s => s, lang: "hu", apply: () => {} };
  const T = I.T, LANG = I.lang;
  const CASES = (window.MM_CASES || []).slice().sort((a, b) => a.number - b.number);
  CASES.forEach(c => {
    Object.assign(c, (window.MM_EXTRAS || {})[c.id] || {}); I.apply(c);
    c._raw = { clues: Object.assign({}, c.clues), words: Object.assign({}, c.words || {}) };
    // a következtetések a nyomok közé kerülnek: bizonyítékként, szembesítéshez is használhatók
    (c.deductions || []).forEach(d => { c.clues[d.id] = { t: d.t, x: d.x, src: T("Következtetés"), ded: true }; });
    // szókártyák: a gyanúsítottak nevei mindig megvannak, a többit a szövegekből kell összegyűjteni
    c.W = Object.assign({}, c.words || {});
    c.suspects.forEach(s => { if (!c.W[s.id]) c.W[s.id] = [s.short || s.name, "személy"]; });
  });
  // változó tettes: az ügy egyik előre megírt változata; a sorsolás a mentésben marad
  function withVariant(base, vi) {
    if (!base.variants || !base.variants.length) return base;
    const v = base.variants[vi % base.variants.length], { id: vid, ...vv } = v, c = Object.assign({}, base, vv);
    c.clues = Object.assign({}, base._raw.clues, v.clues || {});
    c.words = Object.assign({}, base._raw.words, v.words || {});
    c.suspects = base.suspects.map(x => Object.assign({}, x, (v.suspectsPatch || {})[x.id] || {}));
    (c.deductions || []).forEach(d => { c.clues[d.id] = { t: d.t, x: d.x, src: T("Következtetés"), ded: true }; });
    c.W = Object.assign({}, c.words); c.suspects.forEach(x => { if (!c.W[x.id]) c.W[x.id] = [x.short || x.name, "személy"]; });
    c.variantId = vid; return c;
  }
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
    cover: (c, big) => pic(!big && HAS.has(`${c.id}/cover-sm.webp`) ? `${c.id}/cover-sm.webp` : `${c.id}/cover.webp`, () => RAW.cover(c.cover, c.title), c.title),
    portrait: (s, c) => pic(`${(c || C).id}/portrait-${s.id}.webp`, () => RAW.portrait(s.look, s.name), s.name),
    scene: (l, alt) => pic(`${C.id}/scene-${l.id}.webp`, () => RAW.scene(l.art || l.id, alt), alt)
  };
  const coverOf = c => c.cover ? `<div class="art cover" data-fx="${c.fx || ""}">${ART.cover(c)}</div>` : "";
  const SND = n => window.MM_AUDIO && window.MM_AUDIO.sfx(n);
  const SCENE = n => window.MM_AUDIO && window.MM_AUDIO.setScene(n);
  const FX = () => window.MM_FX && window.MM_FX.scan(app);
  const langSwitch = () => "";
  /* ---------- szókártyák és jelírás a szövegekben ----------
     {{látható szöveg|szóazonosító}} kattintható szó, amely a szókártyák közé kerül;
     ⟪jel⟫ a fekete szegfű jelírásának egy jele. */
  const KINDS = [["személy", "Személyek"], ["tárgy", "Tárgyak"], ["hely", "Helyek"], ["idő", "Időpontok"], ["tett", "Tettek"], ["indíték", "Indítékok"]];
  const GLYPHS = {
    ido: '<circle cx="12" cy="12" r="8"/><path d="M12 6v6l4 3"/>',
    mereg: '<path d="M8 3h8M10 3v5l-5 10a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3"/><path d="M7 15h10"/>',
    vevo: '<path d="M4 12h16M12 4l8 8-8 8"/><circle cx="6" cy="6" r="2"/>',
    ajto: '<rect x="6" y="3" width="12" height="18"/><circle cx="15" cy="12" r="1.2"/>',
    penz: '<circle cx="12" cy="12" r="8"/><path d="M9 9h6M9 15h6M12 6v12"/>',
    fent: '<path d="M4 18L12 6l8 12"/><path d="M12 6V2"/>',
    lent: '<path d="M4 6l8 12 8-12"/><path d="M12 18v4"/>',
    tuz: '<path d="M12 3c3 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-7 1 2 2 3 3 3 0-2 0-4 0-7z"/>'
  };
  const glyph = id => `<svg class="glyph" viewBox="0 0 24 24" aria-label="${T("ismeretlen jel")}" role="img"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${GLYPHS[id] || ""}</g></svg>`;
  const SYMMEAN = { ido: "idő", mereg: "méreg", vevo: "vásárlás", ajto: "ajtó", penz: "pénz", fent: "fent", lent: "lent", tuz: "tűz" };
  const MEANINGS = Object.values(SYMMEAN).slice().sort((a, b) => a.localeCompare(b, "hu"));
  const glyphText = s => esc(s || "").replace(/⟪(\w+)⟫/g, (m, g) => glyph(g));
  const SYMKEY = "mm:sym";
  const symState = () => { try { return Object.assign({ g: {}, ok: [] }, JSON.parse(localStorage.getItem(SYMKEY)) || {}); } catch (e) { return { g: {}, ok: [] }; } };
  const symSave = v => { try { localStorage.setItem(SYMKEY, JSON.stringify(v)); } catch (e) {} };
  // determinisztikus ál-véletlen az ujjlenyomatokhoz
  const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  function fingerprint(seed, type, partial) {
    const r = rng(seed * 7919 + 13), cx = 50 + (r() - .5) * 10, cy = 56 + (r() - .5) * 8;
    let paths = "";
    for (let i = 1; i <= 13; i++) {
      const sp = 3.6 * i, gap = r() < .45 ? `stroke-dasharray="${(8 + r() * 70).toFixed(1)} ${(4 + r() * 5).toFixed(1)} 200"` : "";
      const wob = (r() - .5) * 2.4;
      let d;
      if (type === "orveny") d = `M ${cx - sp} ${cy} a ${sp} ${sp * 1.25 + wob} 0 1 1 ${sp * 2} 0 a ${sp} ${sp * 1.25 - wob} 0 1 1 ${-sp * 2} 0`;
      else if (type === "hurok") d = `M ${cx - sp} ${100} L ${cx - sp} ${cy} A ${sp} ${sp * 1.3 + wob} 0 0 1 ${cx + sp} ${cy} L ${cx + sp + i * 1.2} ${100}`;
      else d = `M 0 ${cy + 40 - i * 7} Q ${cx + wob * 4} ${cy + 18 - i * 7 - 16 - wob * 3} 100 ${cy + 40 - i * 7}`;
      paths += `<path d="${d}" pathLength="100" ${gap}/>`;
    }
    const clip = partial ? `<clipPath id="fpc${seed}"><path d="M22 30 C 40 8, 78 14, 82 40 S 74 92, 46 88 S 8 60, 22 30 Z"/></clipPath>` : "";
    return `<svg class="fprint" viewBox="0 0 100 110" aria-hidden="true">${clip}<g ${partial ? `clip-path="url(#fpc${seed})"` : ""} fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><ellipse cx="50" cy="56" rx="44" ry="52" stroke-opacity=".15"/>${paths}</g></svg>`;
  }
  const plain = s => String(s || "").replace(/\{\{(.+?)\|(.+?)\}\}/g, "$1").replace(/⟪(\w+)⟫/g, "");
  const haveWord = id => S && (S.words.includes(id) || (C && C.suspects.some(x => x.id === id)));
  // a nyers szövegből HTML: szavak és jelek
  const rich = s => esc(s || "").replace(/\{\{(.+?)\|(.+?)\}\}/g, (m, t, id) => C && C.W[id] && S && !S.ended ? `<span class="word ${haveWord(id) ? "got" : ""}" role="button" tabindex="0" data-word="${id}" title="${esc(KINDS.find(k => k[0] === C.W[id][1])[1])}">${t}</span>` : t).replace(/⟪(\w+)⟫/g, (m, g) => glyph(g));
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("on"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("on"), 2200);
  }
  function collectWord(id) {
    if (!C || !S || !C.W[id] || haveWord(id)) return;
    S.words.push(id); save(); SND("tick");
    document.querySelectorAll(`[data-word="${CSS.escape(id)}"]`).forEach(e => e.classList.add("got"));
    toast(T("Új szókártya: {0}", C.W[id][0]));
    if (["jegy", "vad", "tabla"].includes(S.tab)) rerender();
  }
  document.addEventListener("click", e => { const w = e.target.closest && e.target.closest("[data-word]"); if (w) collectWord(w.dataset.word); });
  document.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.dataset && e.target.dataset.word) { e.preventDefault(); collectWord(e.target.dataset.word); } });
  const bindLang = () => app.querySelectorAll("[data-lang]").forEach(b => b.onclick = () => { if (b.dataset.lang !== LANG) I.set(b.dataset.lang); });
  const LEVELS = [
    ["Könnyű", T("Öt gyanúsított, egy elültetett hamis nyom. Kétlépcsős súgó rejtvényenként.")],
    ["Közepes", T("Trükkös tetthelyek, több hazug, új rejtvénytípusok. Kétlépcsős súgó.")],
    ["Nehéz", T("Hat gyanúsított, egymásra épülő rejtvények, és egynél több embert kell leleplezned. Csak egy súgó rejtvényenként.")]
  ];

  /* ---------- mentés ---------- */
  const KEY = id => "mm3:" + id;
  const fresh = () => ({ words: [], unl: [], dsel: {}, notes: "", mode: "normal", noir: false, pairs: [], tab: "ugy", loc: null, clues: [], solved: {}, hints: {}, inputs: {}, tries: 0, ended: null, conf: [], wrongConf: 0, acc: {}, board: {}, threads: [], introSeen: false, timed: false, used: 0, asked: [], rstep: 0, rmiss: 0, seen: [], wrongDed: 0, events: [], master: false, accused: null });
  function loadState(id) {
    try { const v = JSON.parse(localStorage.getItem(KEY(id))); if (v && v.clues) return Object.assign(fresh(), v); } catch (e) {}
    return fresh();
  }
  // a régi (mm:) mentések a korábbi játékszabályokhoz tartoztak, töröljük őket
  try { Object.keys(localStorage).filter(k => (k.startsWith("mm:") && !["mm:sound", "mm:lang", "mm:sym", "mm:daily", "mm:ach", "mm:nick", "mm:pid", "mm:noboard", "mm:avatar", "mm:stamped", "mm:s2seen", "mm:nostats", "mm:stats", "mm:auth", "mm:authlinked", "mm:authnew", "mm:synclast", "mm:syncerr"].includes(k)) || k.startsWith("mm2:")).forEach(k => localStorage.removeItem(k)); } catch (e) {}
  let C = null, S = null, confirmReset = false, SKEY = null;
  function save() { if (S) S._t = Date.now(); if (window.MM_SYNC) window.MM_SYNC.schedule(); const wd = WDATA(); if (wd && wd.secrets && wd.secrets.length) S.secAll = wd.secrets.every(k => (S.secrets || []).includes(k.id)); try { localStorage.setItem(SKEY || KEY(C.id), JSON.stringify(S)); } catch (e) {} }
  const loadKey = k => { try { const v = JSON.parse(localStorage.getItem(k)); if (v && v.clues) return Object.assign(fresh(), v); } catch (e) {} return fresh(); };
  function gain(id) { if (id && !S.clues.includes(id)) S.clues.push(id); }
  function solve(pid) { S.solved[pid] = true; gain(C.puzzles[pid].reward); save(); SND("success"); TR("puzzle", pid); }
  const hintsUsed = st => Object.values(st.hints).reduce((a, b) => a + b, 0);
  const pids = c => Object.keys(c.puzzles);
  const MAXTRIES = c => (S && S.onetry) ? 1 : c.maxTries || 3;
  const score = st => Math.max(0, 100 - 20 * Math.max(0, st.tries - 1) - 6 * hintsUsed(st) - 4 * (st.wrongConf || 0) - 4 * (st.rmiss || 0) - 3 * (st.wrongDed || 0)
    - 5 * (st.traps || 0) - 5 * (st.chase === "escaped" ? 1 : 0) - 5 * (st.dead || []).length);
  const isDed = k => C.clues[k] && C.clues[k].ded;
  const rawIds = c => Object.keys(c.clues).filter(k => !c.clues[k].ded);
  const dedsOf = c => c.deductions || [];
  const rank = (n, st) => (st || S) && (st || S).master && n >= 90 ? T("Mesterdetektív: Poirot is tőled tanulna") : T(n >= 90 ? "Hercule Poirot is megsüvegelné" : n >= 70 ? "A kapitányság dicséretét kapod" : n >= 45 ? "Megbízható nyomozó" : "Szerencsés kezdő");
  const contra = (c, sid) => (c.contradictions || []).filter(k => !sid || k.suspect === sid);
  const has = (list, v) => [].concat(list).includes(v);
  // időre játszott mód: minden lépés perceket visz el a csendőrök érkezéséig
  const COST = { take: 10, wrong: 5, hint: 20, confront: 15, accuse: 30, ask: 5, look: 5, deduce: 5 };
  const budget = c => 10 * c.locations.reduce((n, l) => n + (l.items || []).length + Object.keys(l.decoys || {}).length / 2, 0) + 15 * (c.contradictions || []).length + 15 * pids(c).length + 10 * (c.deductions || []).length + 90;
  const fmtLeft = m => { m = Math.max(0, m); const h = Math.floor(m / 60), mm = m % 60; return h ? T("{0} óra {1} perc", h, mm) : T("{0} perc", mm); };
  // valódi, aktív játékidő (másodperc): csak nyitott ügyben, látható lapon, és ha az utolsó 2 percben volt egér- vagy billentyűmozgás
  let lastAct = Date.now();
  ["pointerdown", "keydown", "wheel", "touchstart"].forEach(ev => document.addEventListener(ev, () => { lastAct = Date.now(); }, { passive: true, capture: true }));
  setInterval(() => {
    if (!C || !S || S.ended || !S.introSeen || document.hidden || Date.now() - lastAct > 120000 || !location.hash || location.hash === "#") return;
    S.secs = (S.secs || 0) + 5; save();
  }, 5000);
  function spend(min) {
    if (S.ended) return false;
    S.min = (S.min || 0) + min;
    if (!S.timed) { save(); return false; }
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
  const noteCard = (c, open) => `<div class="cnote ${open ? "" : "locked"}"><span class="eyebrow">${esc(c.meta.split("·")[1] || "")}</span><b>${esc(c.title)}</b>${open ? `<p>${glyphText(c.carnation.note)}</p>` : `<p class="meta">${T("Még megoldatlan")}</p>`}<span class="cletter" aria-label="${T("Bekarikázott betű")}">${open ? esc(c.carnation.letter) : "?"}</span></div>`;
  const REBUFF = ["vállat von: »Ez semmit sem bizonyít.«", "rezzenéstelen arccal néz rád.", "felhúzza a szemöldökét: »Ehhez nekem semmi közöm.«", "elneveti magát: »Ezzel akar sarokba szorítani?«"].map(x => T(x));

  /* ---------- saját jegyzetlap ("papír és toll") ---------- */
  function notesUI(on) {
    let btn = document.querySelector(".notes-btn"), pane = document.querySelector(".notes-pane");
    if (!on) { if (btn) btn.remove(); if (pane) pane.remove(); return; }
    if (!btn) {
      btn = document.createElement("button"); btn.className = "notes-btn"; btn.type = "button";
      btn.innerHTML = `✎ ${T("Jegyzetlap")}`; document.body.appendChild(btn);
      pane = document.createElement("aside"); pane.className = "notes-pane"; pane.setAttribute("aria-label", T("Jegyzetlap"));
      pane.innerHTML = `<div class="row" style="justify-content:space-between"><b>${T("Jegyzetlap")}</b><button class="link" data-nclose>${T("Bezárás")}</button></div>
        <p class="meta">${T("A te papírod és tollad. A játék semmit sem ír ide helyetted. A nyomok szövegéből kijelölt részt a felugró gombbal ide másolhatod.")}</p>
        <textarea spellcheck="false" aria-label="${T("Saját jegyzetek")}"></textarea>`;
      document.body.appendChild(pane);
      btn.onclick = () => { pane.classList.toggle("on"); if (pane.classList.contains("on")) pane.querySelector("textarea").focus(); };
      pane.querySelector("[data-nclose]").onclick = () => pane.classList.remove("on");
      pane.querySelector("textarea").oninput = e => { if (S) { S.notes = e.target.value; save(); } };
    }
    const ta = pane.querySelector("textarea");
    if (document.activeElement !== ta) ta.value = S.notes || "";
  }
  function addNote(txt) {
    if (!S) return;
    S.notes = (S.notes ? S.notes.replace(/\s*$/, "") + "\n" : "") + txt; save();
    const ta = document.querySelector(".notes-pane textarea"); if (ta) ta.value = S.notes;
    toast(T("Feljegyezve a jegyzetlapra"));
  }
  // kijelölt szövegrészlet a jegyzetlapra
  function hlCheck() {
    let b = document.querySelector(".hl-btn");
    const sel = window.getSelection(), txt = sel && String(sel).trim();
    const node = sel && sel.anchorNode && (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement);
    const host = node && node.closest && node.closest("[data-hl]");
    if (!txt || !host || !C || txt.length > 400) { if (b) b.hidden = true; return; }
    if (!b) { b = document.createElement("button"); b.className = "hl-btn"; b.type = "button"; b.textContent = "✎ " + T("Jegyzetlapra"); document.body.appendChild(b); }
    const r = sel.getRangeAt(0).getBoundingClientRect();
    b.style.left = Math.max(8, Math.min(window.innerWidth - 160, r.left)) + "px"; b.style.top = Math.max(8, r.top - 44) + "px"; b.hidden = false;
    b.onpointerdown = e => e.preventDefault();
    b.onclick = () => { addNote(`„${txt}” (${host.dataset.hl})`); b.hidden = true; sel.removeAllRanges(); };
  }
  document.addEventListener("selectionchange", () => { clearTimeout(hlCheck._t); hlCheck._t = setTimeout(hlCheck, 250); });

  /* ---------- névtelen statisztika (js/online.js track) ---------- */
  function TR(ev, detail, extra) {
    if (!ON || !C || !S) return;
    const vi = C.variants && C.variants.length ? C.variants[S.variant % C.variants.length].id : null;
    ON.track(C.id, ev, detail, Object.assign({ secs: S.secs || 0, run: runOf(S), variant: vi ? String(vi) : null }, extra || {}));
  }
  function feedbackBox() {
    if (!ON || S.fb) return S.fb === 1 ? `<div class="fbbox done"><p>${T("Köszönjük a visszajelzést! Minden üzenetet elolvasunk.")}</p></div>` : "";
    return `<div class="fbbox"><span class="eyebrow">${T("Milyen volt ez az ügy?")}</span>
      <div class="stars" role="radiogroup" aria-label="${T("Értékelés")}">${[1, 2, 3, 4, 5].map(n => `<button role="radio" aria-checked="false" data-star="${n}" aria-label="${T("{0} csillag", n)}">★</button>`).join("")}</div>
      <div class="row fbdiff">${[[1, "Túl könnyű"], [2, "Épp jó"], [3, "Túl nehéz"]].map(([v, t]) => `<label><input type="radio" name="fbd" value="${v}"> ${T(t)}</label>`).join("")}</div>
      <textarea data-fbtext maxlength="1000" rows="3" placeholder="${T("Hol akadtál el, mi tetszett, mi nem? (nem kötelező)")}" aria-label="${T("Szöveges visszajelzés")}"></textarea>
      <div class="row"><button class="btn" data-fbsend disabled>${T("Elküldöm")}</button><button class="link" data-fbskip>${T("Most nem")}</button></div><p class="msg" data-fbmsg></p></div>`;
  }
  function bindFeedback() {
    const box = document.querySelector(".fbbox:not(.done)"); if (!box) return;
    let rating = 0;
    box.querySelectorAll("[data-star]").forEach(b => b.onclick = () => {
      rating = +b.dataset.star; box.querySelectorAll("[data-star]").forEach(x => { const on = +x.dataset.star <= rating; x.classList.toggle("on", on); x.setAttribute("aria-checked", String(+x.dataset.star === rating)); });
      box.querySelector("[data-fbsend]").disabled = false;
    });
    box.querySelector("[data-fbskip]").onclick = () => { S.fb = 2; save(); box.remove(); };
    box.querySelector("[data-fbsend]").onclick = e => {
      const btn = e.currentTarget, m = box.querySelector("[data-fbmsg]"), d = box.querySelector("input[name=fbd]:checked");
      btn.disabled = true;
      ON.feedback({ case_id: C.id, outcome: S.ended === "win" ? "win" : S.ended === "wrong" ? "wrong" : "lose", rating, difficulty: d ? +d.value : null, comment: box.querySelector("[data-fbtext]").value.trim().slice(0, 1000) || null })
        .then(ok => { if (!ok) throw 0; S.fb = 1; save(); SND("success"); box.outerHTML = feedbackBox(); })
        .catch(() => { btn.disabled = false; m.className = "msg bad"; m.textContent = T("Most nem sikerült elküldeni. Próbáld újra később."); });
    };
  }

  /* ---------- billentyűzet: Esc bezárja a felugró ablakot, a megnyíló ablakba kerül a fókusz ---------- */
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    const ovs = [...document.querySelectorAll("body > .intro.on, body > .verdict")], top = ovs[ovs.length - 1];
    const x = top && top.querySelector("[data-close], [data-vclose], [data-wclose]"); if (x) { e.preventDefault(); x.click(); }
  });
  if (window.MutationObserver) new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => {
    if (n.nodeType !== 1 || !n.matches || !n.matches(".intro, .verdict") || n.matches(".titlecard, .wdlg")) return;
    const back = document.activeElement;
    setTimeout(() => { const f = n.querySelector("input:not([type=hidden]), select, textarea, button, a[href], [tabindex='0']"); if (f && n.isConnected) f.focus({ preventScroll: true }); }, 30);
    const mo = new MutationObserver(() => { if (!n.isConnected) { mo.disconnect(); if (back && back.isConnected) back.focus({ preventScroll: true }); } });
    mo.observe(document.body, { childList: true });
  }))).observe(document.body, { childList: true });

  /* ---------- filmes átmenetek ---------- */
  const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  // ügy megnyitásakor: írógépes főcím (munkamenetenként ügyenként egyszer, és csak ha az ügy még nincs lezárva)
  function titleCard() {
    if (!C || S.ended || REDUCE) return;
    const cc = C, k = "mm:tc:" + C.id; try { if (sessionStorage.getItem(k)) return; sessionStorage.setItem(k, "1"); } catch (e) {}
    const ov = document.createElement("div"); ov.className = "titlecard"; ov.setAttribute("aria-hidden", "true");
    const has = HAS.has(`${C.id}/cover.webp`);
    ov.innerHTML = `${has ? `<div class="tc-bg" style="background-image:url('images/${C.id}/cover.webp')"></div>` : ""}<div class="tc-in"><span class="tc-meta"></span><h1 class="tc-title"></h1><span class="tc-no">${S.daily ? T("Napi kihívás") : C.weekly ? T("Heti rejtély") : T("{0}. ügy", C.number)}</span></div><span class="tc-skip">${T("Kattints a továbblépéshez")}</span>`;
    document.body.appendChild(ov);
    let done = false, timers = [];
    const end = () => { if (done) return; done = true; timers.forEach(clearTimeout); ov.classList.add("out"); setTimeout(() => ov.remove(), 600); document.removeEventListener("keydown", end, true); };
    ov.onclick = end; document.addEventListener("keydown", end, true);
    const type = (el, txt, speed, cb) => { let i = 0; const step = () => { if (done || !ov.isConnected) return; el.textContent = txt.slice(0, ++i); if (txt[i - 1] !== " ") SND("type"); if (i < txt.length) timers.push(setTimeout(step, speed)); else cb && cb(); }; step(); };
    const meta = ov.querySelector(".tc-meta"), title = ov.querySelector(".tc-title");
    timers.push(setTimeout(() => type(meta, cc.meta, 28, () => timers.push(setTimeout(() => { title.textContent = cc.title; title.classList.add("on"); ov.querySelector(".tc-no").classList.add("on"); SND("bell"); timers.push(setTimeout(end, 1900)); }, 250))), 350));
  }
  function trackStart() {
    if (!C || S.ended) return;
    const k = "mm:st:" + (SKEY || C.id); try { if (sessionStorage.getItem(k)) return; sessionStorage.setItem(k, "1"); } catch (e) {}
    TR("start", S.clues.length ? "folytatás" : "új");
  }
  // a leleplezés végén: tárgyalótermi ítélet (egyszer)
  function verdict() {
    if (!C || S.ended !== "win" || S.verdict !== 0 || (C.reveal && S.rstep < C.reveal.length)) return;
    S.verdict = 1; save();
    const cu = C.suspects.find(x => x.id === culpritId());
    if (!cu || REDUCE) return;
    const ov = document.createElement("div"); ov.className = "verdict"; ov.setAttribute("role", "dialog");
    ov.innerHTML = `<div class="vd-in"><span class="vd-k">${T("A bíróság ítélete")}</span><div class="art portrait vd-p">${ART.portrait(cu)}</div><b class="vd-name">${esc(cu.name)}</b><span class="vd-stamp">${T("Bűnös")}</span><p class="vd-t">${T("A vád megállt. Az ügyet {0} pont értékben zártad le.", score(S))}</p><button class="btn" data-vclose>${T("Tovább a zárójelentéshez")} →</button></div>`;
    document.body.appendChild(ov);
    SND("gavel"); setTimeout(() => SND("stamp"), 1500);
    const close = () => { ov.classList.add("out"); setTimeout(() => ov.remove(), 500); };
    ov.querySelector("[data-vclose]").onclick = close; ov.onclick = e => { if (e.target === ov) close(); };
  }

  /* ---------- útvonal ---------- */
  // a pályák (cases/<id>.world.js) csak akkor töltődnek le, amikor az ügyet megnyitják
  const VER = ((document.querySelector('script[src*="js/engine.js"]') || {}).src || "").split("v=")[1] || "1";
  const worldTried = {};
  function needWorld(id) {
    if (!id || (window.MM_WORLDS && window.MM_WORLDS[id]) || worldTried[id] || (CASES.find(c => c.id === id) || {}).noWorld) return false;
    worldTried[id] = true;
    app.innerHTML = `<div class="wrap"><p class="meta loading">${T("Betöltés…")}</p></div>`;
    const sc = document.createElement("script"); sc.src = `cases/${id}.world.js?v=${VER}`;
    sc.onload = sc.onerror = () => route();
    document.head.appendChild(sc);
    return true;
  }
  function route() {
    const id = (location.hash || "").slice(1);
    if (needWorld(id === "napi" ? daily().id : (CASES.find(x => x.id === id) || {}).id)) return;
    document.querySelectorAll("body > .intro, body > .titlecard, body > .verdict").forEach(x => x.remove());
    if (id === "napi") {
      const d = daily(), base = CASES.find(x => x.id === d.id);
      SKEY = "mm3:" + d.id + "@" + d.key; S = loadKey(SKEY);
      if (!S.daily) Object.assign(S, { daily: d.key, timed: d.rule.id === "timed", mode: d.rule.id === "master" || d.rule.id === "noir" ? d.rule.id : "normal", master: d.rule.id === "master" || d.rule.id === "noir", noir: d.rule.id === "noir", onetry: d.rule.id === "onetry", used: 0 });
      if (S.variant === undefined) S.variant = Math.floor(Math.random() * 97);
      if (S.seed === undefined) S.seed = Math.floor(Math.random() * 1e6);
      C = withVariant(base, S.variant); save(); renderCase(); titleCard(); trackStart(); window.scrollTo({ top: 0 }); return;
    }
    const c = CASES.find(x => x.id === id);
    if (c && !unlocked(c)) { location.hash = ""; return; }
    if (c) {
      SKEY = KEY(c.id); S = loadState(c.id);
      if (S.variant === undefined) S.variant = Math.floor(Math.random() * 97);
      if (S.seed === undefined) S.seed = Math.floor(Math.random() * 1e6);
      C = withVariant(c, S.variant); renderCase(); titleCard(); trackStart();
    }
    else { C = null; S = null; SKEY = null; renderHome(); }
    window.scrollTo({ top: 0 });
  }
  /* ---------- kitüntetések és rangok ---------- */
  function badges() {
    const sts = CASES.map(c => ({ c, st: loadState(c.id) })), won = sts.filter(x => x.st.ended === "win");
    const main = CASES.filter(c => !c.finale && !c.weekly && !c.tutorial), log = Object.values(dailyLog()), dwins = log.filter(x => x.ended === "win").length;
    const secretsAll = x => { if (x.st.secAll) return true; const w = window.MM_WORLDS && window.MM_WORLDS[x.c.id]; return w && w.secrets && w.secrets.length && w.secrets.every(k => (x.st.secrets || []).includes(k.id)); };
    const B = [
      ["elso", "🔎", "Első ügy", "Oldj meg egy ügyet.", won.length > 0],
      ["sugo", "🧠", "Súgó nélkül", "Oldj meg egy ügyet egyetlen súgó nélkül.", won.some(x => !hintsUsed(x.st))],
      ["elsore", "⚖️", "Elsőre jó vád", "Az első vádad legyen hibátlan.", won.some(x => x.st.tries === 1)],
      ["titok", "✶", "Minden titok", "Találd meg egy ügy mindhárom titkát.", sts.some(secretsAll)],
      ["hazug", "🎭", "Hazugságvadász", "Leplezd le egy ügyben az összes hazugságot.", won.some(x => contra(x.c).every(k => x.st.conf.includes(k.id)))],
      ["hajnal", "⏱", "Hajnal előtt", "Oldj meg egy ügyet időre.", won.some(x => x.st.timed)],
      ["mester", "🎩", "Mesterdetektív", "Oldj meg egy ügyet Mester módban.", won.some(x => x.st.master && !x.st.noir)],
      ["noir", "🌑", "Noir", "Oldj meg egy ügyet Noir módban.", won.some(x => x.st.noir)],
      ["hibatlan", "💯", "Hibátlan", "Érj el 100 pontot.", won.some(x => score(x.st) === 100)],
      ["elkap", "🏃", "Elkaptad", "Kapd el a menekülő tettest.", sts.some(x => x.st.chase === "caught")],
      ["csapda", "🪤", "Nem dőltél be", "Oldj meg egy hamis bizonyítékos ügyet úgy, hogy nem dőlsz be neki.", won.some(x => contra(x.c).some(k => k.trap) && !x.st.traps)],
      ["szal", "🥀", "A fekete szegfű nyomában", "Oldd meg mind a hat ügyet.", main.every(c => loadState(c.id).ended === "win")],
      ["finale", "🗝", "A kör bezárul", "Oldd meg a záró ügyet.", !!FINALE && loadState(FINALE.id).ended === "win"],
      ["heti", "📰", "Heti rejtély", "Oldj meg egy heti rejtélyt.", won.some(x => x.c.weekly)],
      ["napi", "📅", "Napi nyomozó", "Teljesíts egy napi kihívást.", dwins > 0],
      ["sorozat", "🔥", "Három nap egymás után", "Teljesítsd a napi kihívást három egymást követő napon.", dailyStreak() >= 3]
    ];
    let earned = []; try { earned = JSON.parse(localStorage.getItem("mm:ach")) || []; } catch (e) {}
    return B.map(([id, ico, t, d, got]) => ({ id, ico, t: T(t), d: T(d), got: !!got || earned.includes(id) }));
  }
  function newBadges() {
    let seen = []; try { seen = JSON.parse(localStorage.getItem("mm:ach")) || []; } catch (e) {}
    const now = badges().filter(b => b.got && !seen.includes(b.id));
    if (!now.length) return;
    try { localStorage.setItem("mm:ach", JSON.stringify(seen.concat(now.map(b => b.id)))); } catch (e) {}
    now.forEach((b, i) => setTimeout(() => toast(`${b.ico} ${T("Új kitüntetés:")} ${b.t}`), 600 + i * 2400));
  }
  const RANKS = [[0, "Újonc"], [100, "Segédnyomozó"], [250, "Nyomozó"], [450, "Felügyelő"], [650, "Főfelügyelő"], [800, "Legenda"]];
  const RANKICO = ["🔰", "🔍", "🕵️", "🎖️", "⭐", "👑"];
  const AVATARS = ["🕵️", "🎩", "🔍", "🦉", "🐈‍⬛", "🌹", "🗝️", "📜", "☂️", "🎻", "🕯️", "🦊"];
  const lsGet = (k2, d) => { try { return localStorage.getItem(k2) || d; } catch (e) { return d; } };
  const lsSet = (k2, v) => { try { localStorage.setItem(k2, v); } catch (e) {} if (window.MM_SYNC) window.MM_SYNC.schedule(); };
  const profile = () => ({ nick: lsGet("mm:nick", ""), avatar: lsGet("mm:avatar", "🕵️") });
  function timeOfDay() {
    const h = new Date().getHours(), p = profile(), who = p.nick || T("nyomozó");
    return { night: h >= 19 || h < 6, greet: h < 6 ? T("Késő éjjel van, {0}. A legjobb ügyek ilyenkor nyílnak meg.", who) : h < 10 ? T("Jó reggelt, {0}!", who) : h < 19 ? T("Jó napot, {0}!", who) : T("Jó estét, {0}. Hosszú éjszaka lesz.", who) };
  }
  function openProfile() {
    const p = profile(), k = career();
    const ov = document.createElement("div"); ov.className = "intro on"; ov.setAttribute("role", "dialog");
    ov.innerHTML = `<div class="intro-card profile"><span class="eyebrow">${T("Nyomozói igazolvány")}</span>
      <div class="idbig"><span class="av" data-avshow>${esc(p.avatar)}</span><div><input class="nick" data-pnick maxlength="20" placeholder="${T("Becenév")}" value="${esc(p.nick)}" aria-label="${T("Becenév")}"><p class="meta">${RANKICO[k.i]} ${esc(k.rank)} · ${T("{0} pont", k.pts)}</p></div></div>
      <span class="eyebrow">${T("Válassz jelképet")}</span><div class="avgrid">${AVATARS.map(a => `<button class="${a === p.avatar ? "on" : ""}" data-av="${a}">${a}</button>`).join("")}</div>
      <span class="eyebrow">${T("Rangok")}</span><ol class="ranks">${RANKS.map(([pt, n], i) => `<li class="${i < k.i ? "done" : i === k.i ? "cur" : ""}"><span>${RANKICO[i]}</span><b>${T(n)}</b><span class="meta">${T("{0} ponttól", pt)}</span></li>`).join("")}</ol>
      <p class="meta">${T("A beceneved és a jelképed a ranglistán is látszik. Pontot a megoldott ügyek és a napi kihívások adnak.")}</p>
      ${window.MM_SYNC && window.MM_SYNC.enabled ? `<button class="btn ghost" data-psync>☁️ ${window.MM_SYNC.on() ? T("Bejelentkezve: {0}", esc(window.MM_SYNC.user().email || window.MM_SYNC.user().name || "")) : T("Bejelentkezés: folytasd bármelyik eszközön")}</button>` : ""}
      <div class="row"><button class="btn" data-psave>${T("Mentés")}</button><button class="link" data-close>${T("Bezárás")}</button></div><p class="msg" data-pmsg></p></div>`;
    document.body.appendChild(ov);
    let av = p.avatar;
    ov.querySelectorAll("[data-av]").forEach(b => b.onclick = () => { av = b.dataset.av; ov.querySelectorAll("[data-av]").forEach(x => x.classList.toggle("on", x === b)); ov.querySelector("[data-avshow]").textContent = av; SND("tick"); });
    const close = () => ov.remove();
    ov.querySelector("[data-close]").onclick = close; ov.onclick = e => { if (e.target === ov) close(); };
    const ps = ov.querySelector("[data-psync]"); if (ps) ps.onclick = () => { ov.remove(); openAccount(); };
    ov.querySelector("[data-psave]").onclick = () => {
      const n = ov.querySelector("[data-pnick]").value.trim();
      if (n && n.length < 2) { const m = ov.querySelector("[data-pmsg]"); m.className = "msg bad"; m.textContent = T("A becenév legalább 2 karakter legyen."); return; }
      lsSet("mm:nick", n); lsSet("mm:avatar", av); SND("stamp"); close(); if (!C) renderHome();
    };
  }
  /* ---------- játékállás exportálása és visszatöltése (másik böngészőbe, gépre) ---------- */
  const b64e = t => { const u = new TextEncoder().encode(t); let bin = ""; for (let i = 0; i < u.length; i += 8192) bin += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(bin); };
  const b64d = t => new TextDecoder().decode(Uint8Array.from(atob(t), ch => ch.charCodeAt(0)));
  function exportSave() {
    const o = {};
    try { Object.keys(localStorage).filter(k => (k.startsWith("mm3:") || k.startsWith("mm:")) && !k.startsWith("mm:sync")).forEach(k => { o[k] = localStorage.getItem(k); }); } catch (e) {}
    return "MM1:" + b64e(JSON.stringify({ v: 1, at: new Date().toISOString(), d: o }));
  }
  function importSave(code) {
    const t = String(code || "").trim().replace(/\s+/g, "");
    if (!t.startsWith("MM1:")) throw new Error("fmt");
    const j = JSON.parse(b64d(t.slice(4)));
    if (!j || !j.d || typeof j.d !== "object") throw new Error("fmt");
    const keys = Object.keys(j.d).filter(k => (k.startsWith("mm3:") || k.startsWith("mm:")) && typeof j.d[k] === "string");
    if (!keys.length) throw new Error("empty");
    keys.forEach(k => localStorage.setItem(k, j.d[k]));
    return keys.filter(k => k.startsWith("mm3:")).length;
  }
  /* ---------- fiók: bejelentkezés Google-lel vagy e-maillel, a játékállás a fiókban (js/sync.js) ---------- */
  const AUTHERR = e => {
    const c = (e && e.message) || "";
    if (/invalid_credentials|invalid_grant/.test(c)) return T("Hibás e-mail cím vagy jelszó.");
    if (/user_already_exists|already/.test(c) || /already registered/i.test(e.msg || "")) return T("Ezzel az e-mail címmel már van fiók. Jelentkezz be.");
    if (/weak_password/.test(c) || /password/i.test(e.msg || "") && /6/.test(e.msg || "")) return T("A jelszó legalább 6 karakter legyen.");
    if (/email_address_invalid|validation_failed/.test(c)) return T("Ez nem tűnik érvényes e-mail címnek.");
    if (/over_email_send_rate_limit|over_request_rate_limit/.test(c)) return T("Túl sok próbálkozás. Várj pár percet, és próbáld újra.");
    if (/email_not_confirmed/.test(c)) return T("Előbb erősítsd meg az e-mail címed a kapott levélben.");
    if (/provider_disabled|validation_failed/.test(c)) return T("Ez a bejelentkezési mód még nincs bekapcsolva.");
    return T("Most nem érem el a szervert. Ellenőrizd a netet, és próbáld újra.");
  };
  function openAccount(mode) {
    const Y = window.MM_SYNC;
    if (!Y || !Y.enabled) { openBackup(); return; }
    mode = mode || (Y.recovery() ? "newpw" : "login");
    const ov = document.createElement("div"); ov.className = "intro on"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", T("Fiók"));
    const when = t => t ? new Date(t).toLocaleString("hu-HU", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "–";
    const close = () => ov.remove();
    const draw = (msg, ok) => {
      const u = Y.user();
      let body;
      if (mode === "newpw") body = `<p>${T("Adj meg egy új jelszót a fiókodhoz.")}</p>
        <form class="authform" data-aform="newpw"><input type="password" name="pw" autocomplete="new-password" placeholder="${T("Új jelszó (legalább 6 karakter)")}" aria-label="${T("Új jelszó")}" minlength="6" required><button class="btn" type="submit">${T("Jelszó mentése")}</button></form>`;
      else if (Y.on()) body = `<div class="acct"><span class="av">${esc(profile().avatar)}</span><div><b>${esc(u.name || u.email || T("Bejelentkezve"))}</b>${u.name && u.email ? `<span class="meta">${esc(u.email)}</span>` : ""}</div></div>
        <p>${T("A haladásod a fiókodban van: bármelyik eszközön folytathatod, ahol bejelentkezel. Mentés után pár másodperccel magától felkerül.")}</p>
        <p class="meta">${T("Legutóbbi szinkron: {0}", when(Y.last()))}${Y.error() ? " · ⚠️ " + T("az utolsó feltöltés nem sikerült, később újrapróbálom") : ""}</p>
        <div class="row"><button class="btn ghost" data-anow>${T("Szinkronizálás most")}</button><button class="link" data-aout>${T("Kijelentkezés")}</button></div>`;
      else body = `<p>${T("Jelentkezz be, és a haladásod a fiókodba kerül: telefonon, gépen, bármelyik böngészőben ott folytathatod, ahol abbahagytad.")}</p>
        <button class="btn gbtn" data-agoogle><span class="g" aria-hidden="true">G</span> ${T("Folytatás Google-fiókkal")}</button>
        <div class="orline"><span>${T("vagy e-mail címmel")}</span></div>
        <div class="btabs atabs"><button class="chip ${mode === "login" ? "on" : ""}" data-amode="login">${T("Belépés")}</button><button class="chip ${mode === "signup" ? "on" : ""}" data-amode="signup">${T("Új fiók")}</button></div>
        <form class="authform" data-aform="${mode}">
          <input type="email" name="email" autocomplete="email" placeholder="${T("E-mail cím")}" aria-label="${T("E-mail cím")}" required>
          ${mode === "forgot" ? "" : `<input type="password" name="pw" autocomplete="${mode === "signup" ? "new-password" : "current-password"}" placeholder="${T(mode === "signup" ? "Jelszó (legalább 6 karakter)" : "Jelszó")}" aria-label="${T("Jelszó")}" minlength="6" required>`}
          <button class="btn" type="submit">${T(mode === "signup" ? "Fiók létrehozása" : mode === "forgot" ? "Küldd el a visszaállító levelet" : "Belépés")}</button>
        </form>
        ${mode === "login" ? `<button class="link" data-amode="forgot">${T("Elfelejtettem a jelszavam")}</button>` : mode === "forgot" ? `<button class="link" data-amode="login">← ${T("Vissza a belépéshez")}</button>` : ""}
        <p class="meta">${T("A meglévő haladásod nem vész el: bejelentkezéskor összefésülöm a fiókban lévővel, ügyenként a nagyobb előrehaladás marad meg.")}</p>`;
      ov.innerHTML = `<div class="intro-card authbox"><span class="eyebrow">☁️ ${T(Y.on() && mode !== "newpw" ? "Fiókod" : "Bejelentkezés")}</span>${body}
        <div class="row"><button class="link" data-close>${T("Bezárás")}</button></div><p class="msg ${msg ? (ok ? "ok" : "bad") : ""}" data-amsg>${esc(msg || "")}</p></div>`;
      const q = sel => ov.querySelector(sel), say = (t, good) => { const m = q("[data-amsg]"); m.className = "msg " + (good ? "ok" : "bad"); m.textContent = t; };
      q("[data-close]").onclick = close;
      ov.querySelectorAll("[data-amode]").forEach(b => b.onclick = () => { mode = b.dataset.amode; draw(); const f = q("input[name=email]"); if (f) f.focus(); });
      if (q("[data-agoogle]")) q("[data-agoogle]").onclick = () => { say(T("Átirányítalak a Google-höz…"), true); Y.google(); };
      if (q("[data-aout]")) q("[data-aout]").onclick = async () => { await Y.signOut(); SND("paper"); draw(T("Kijelentkeztél. Ezen az eszközön az állásod megmaradt."), true); if (!C) renderHome(); };
      if (q("[data-anow]")) q("[data-anow]").onclick = async e => { e.currentTarget.disabled = true; try { const ch = await Y.pull(); await Y.push(); draw(ch.length ? T("Kész: {0} változást töltöttem le.", ch.length) : T("Kész, minden naprakész."), true); if (ch.length && !C) renderHome(); } catch (err) { draw(AUTHERR(err)); } };
      const f = q("[data-aform]");
      if (f) f.onsubmit = async e => {
        e.preventDefault();
        const em = f.email ? f.email.value.trim() : "", pw = f.pw ? f.pw.value : "", btn = f.querySelector("button"); btn.disabled = true;
        try {
          if (mode === "login") { await Y.signIn(em, pw); await afterLogin(); }
          else if (mode === "signup") { const r = await Y.signUp(em, pw); if (r.confirm) { draw(T("Küldtem egy megerősítő levelet erre a címre: {0}. Kattints a benne lévő linkre, és már be is vagy jelentkezve.", em), true); return; } await afterLogin(); }
          else if (mode === "forgot") { await Y.recover(em); draw(T("Ha van fiók ezzel a címmel, elküldtem a jelszó-visszaállító levelet."), true); return; }
          else if (mode === "newpw") { await Y.setPassword(pw); mode = "login"; draw(T("Az új jelszavad mentve."), true); return; }
        } catch (err) { btn.disabled = false; say(AUTHERR(err)); }
      };
    };
    async function afterLogin() {
      SND("stamp"); draw(T("Bejelentkezve. Összefésülöm az állásodat…"), true);
      try { const ch = await Y.pull(); const n = ch.filter(k => k.startsWith("mm3:")).length; draw(n ? T("Kész! {0} ügy állását töltöttem le a fiókodból.", n) : T("Kész! A haladásod mostantól a fiókodban van."), true); }
      catch (e) { draw(T("Bejelentkeztél, de a mentést most nem értem el. Később magától újrapróbálom."), false); }
      if (!C) renderHome(); else renderCase();
    }
    ov.onclick = e => { if (e.target === ov) close(); };
    draw();
    document.body.appendChild(ov);
  }
  // az ügy végén, ha a játékos nincs bejelentkezve
  const saveNudge = () => window.MM_SYNC && window.MM_SYNC.enabled && !window.MM_SYNC.on()
    ? `<div class="nudge"><span>☁️ ${T("Ne veszítsd el a haladásod: jelentkezz be, és bármelyik eszközön folytathatod.")}</span><button class="btn ghost" data-account>${T("Bejelentkezés")}</button></div>` : "";
  function openBackup() {
    const code = exportSave();
    const ov = document.createElement("div"); ov.className = "intro on"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", T("Játékállás"));
    ov.innerHTML = `<div class="intro-card backup"><span class="eyebrow">${T("Játékállás")}</span>
      <p>${T("A haladásod ebben a böngészőben van. Ha másik gépen vagy böngészőben szeretnéd folytatni, mentsd el ezt a kódot (vagy fájlt), és ott töltsd be.")}</p>
      ${window.MM_SYNC && window.MM_SYNC.enabled ? `<p class="tip">☁️ ${T("Kényelmesebb, ha bejelentkezel: akkor magától frissül minden eszközödön.")} <button class="link" data-gosync>${T("Bejelentkezés")}</button></p>` : ""}
      <textarea readonly data-bcode rows="4" aria-label="${T("Mentési kód")}">${esc(code)}</textarea>
      <div class="row"><button class="btn" data-bcopy>${T("Kód másolása")}</button><a class="btn ghost" data-bfile download="rejtelyes-gyilkossagok-mentes.txt">${T("Mentés fájlba")}</a></div>
      <hr><span class="eyebrow">${T("Betöltés")}</span>
      <textarea data-bin rows="3" placeholder="MM1:…" aria-label="${T("Beillesztett mentési kód")}"></textarea>
      <div class="row"><button class="btn" data-bload>${T("Betöltöm")}</button><label class="btn ghost">${T("Fájl kiválasztása")}<input type="file" accept=".txt,text/plain" data-bupload hidden></label><button class="link" data-close>${T("Bezárás")}</button></div>
      <p class="meta">${T("A betöltés felülírja az itteni állást azoknál az ügyeknél, amelyek a mentésben szerepelnek.")}</p><p class="msg" data-bmsg></p></div>`;
    document.body.appendChild(ov);
    const m = ov.querySelector("[data-bmsg]"), close = () => ov.remove();
    const gs = ov.querySelector("[data-gosync]"); if (gs) gs.onclick = () => { close(); openAccount(); };
    ov.querySelector("[data-close]").onclick = close; ov.onclick = e => { if (e.target === ov) close(); };
    ov.querySelector("[data-bfile]").href = URL.createObjectURL(new Blob([code], { type: "text/plain" }));
    ov.querySelector("[data-bcopy]").onclick = () => { const ta = ov.querySelector("[data-bcode]"); ta.select(); try { navigator.clipboard.writeText(code).then(() => { m.className = "msg ok"; m.textContent = T("Kimásolva."); }); } catch (e) { document.execCommand && document.execCommand("copy"); } };
    const load = txt => {
      try { const n = importSave(txt); m.className = "msg ok"; m.textContent = T("Betöltve: {0} ügy állása. Újratöltöm az oldalt…", n); SND("success"); setTimeout(() => location.reload(), 1200); }
      catch (e) { m.className = "msg bad"; m.textContent = T("Ez nem érvényes mentési kód. A kód „MM1:” kezdetű, és egyben kell bemásolni."); }
    };
    ov.querySelector("[data-bload]").onclick = () => load(ov.querySelector("[data-bin]").value);
    ov.querySelector("[data-bupload]").onchange = e => { const f = e.target.files[0]; if (f) f.text().then(load); };
  }
  function career() {
    const pts = CASES.reduce((n, c) => { const st = loadState(c.id); return n + (st.ended === "win" ? score(st) : 0); }, 0) + Object.values(dailyLog()).reduce((n, x) => n + Math.round((x.score || 0) / 4), 0);
    let i = 0; while (i + 1 < RANKS.length && pts >= RANKS[i + 1][0]) i++;
    return { pts, i, rank: T(RANKS[i][1]), next: RANKS[i + 1] ? RANKS[i + 1][0] : null, nextName: RANKS[i + 1] ? T(RANKS[i + 1][1]) : "" };
  }
  /* ---------- napi kihívás: minden nap ugyanaz az ügy és szabály mindenkinek ---------- */
  const RULES = [{ id: "timed", t: "Hajnalig, időre" }, { id: "master", t: "Mester mód: súgó és jelölés nélkül" }, { id: "noir", t: "Noir mód" }, { id: "onetry", t: "Egyetlen vád: nincs második esély" }];
  function daily(dt) {
    const now = dt || new Date(), key = now.getFullYear() + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0");
    let h = 0; for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const pool = CASES.filter(c => !c.finale && !c.weekly && !c.tutorial);
    return { key, id: pool[h % pool.length].id, rule: Object.assign({}, RULES[(h >> 3) % RULES.length], { t: T(RULES[(h >> 3) % RULES.length].t) }), label: now.toLocaleDateString("hu-HU") };
  }
  const dailyLog = () => { try { return JSON.parse(localStorage.getItem("mm:daily")) || {}; } catch (e) { return {}; } };
  function dailyStreak() {
    const log = dailyLog(); let n = 0; const d = new Date();
    for (;;) { const k = daily(d).key; if (log[k] && log[k].ended === "win") { n++; d.setDate(d.getDate() - 1); } else break; }
    return n;
  }
  function dailyShareText() {
    const d = daily(), base = CASES.find(x => x.id === d.id), sc = score(S);
    const pz = pids(C).map(p => !S.solved[p] ? "⬛" : (S.hints[p] ? "🟨" : "🟩")).join("");
    const raw = rawIds(C), got = raw.filter(k => S.clues.includes(k)).length;
    return `${T("Rejtélyes gyilkosságok")} · ${T("Napi kihívás")} ${d.label}\n🏛 ${base.title} · ${d.rule.t}\n${S.ended === "win" ? "⚖️ " + T("{0}. vádra", S.tries) : "❌ " + T("elszalasztva")} · 🔎 ${got}/${raw.length} · 💡 ${hintsUsed(S)}\n${pz}\n🏅 ${sc} ${T("pont")}${S.timed ? " · ⏱ " + fmtLeft(budget(C) - S.used) : ""}\n${location.origin + location.pathname}#napi`;
  }
  window.addEventListener("hashchange", route);

  /* ---------- címoldal ---------- */
  function renderHome() {
    document.title = T("Rejtélyes gyilkosságok"); notesUI(false);
    let stamped = []; try { stamped = JSON.parse(localStorage.getItem("mm:stamped")) || []; } catch (e) {}
    const stampedNow = [];
    const card = c => {
      const st = loadState(c.id);
      const done = pids(c).filter(p => st.solved[p]).length, total = pids(c).length;
      const started = st.clues.length > 0 || st.tries > 0;
      const status = st.ended && st.ended !== "win" ? `<span class="stamp">${T("Elszalasztva")}</span>` : "";
      const won = st.ended === "win", fresh = won && !stamped.includes(c.id);
      if (fresh) stampedNow.push(c.id);
      const tag = won ? `<div class="bigstamp ${fresh ? "fresh" : ""}"><b>${T("Lezárva")}</b><span>${T("{0} pont", score(st))}</span></div>`
        : started && !st.ended ? `<div class="filetag open">${T("Folyamatban")}</div><div class="fileprog"><i style="width:${Math.round(100 * (done + Math.min(st.clues.length, 20) / 20) / (total + 1))}%"></i></div>`
        : !st.ended ? (c.tutorial ? `<div class="filetag open">${T("Kezdd itt · 5 perc")}</div>` : `<div class="filetag secret">${T("Szigorúan titkos")}</div>`) : "";
      const label = T(st.ended === "win" ? "Újraolvasom" : st.ended ? "Megnézem" : started ? "Folytatom" : "Nyomozás indítása");
      return `<article class="casecard ${won ? "s-won" : started && !st.ended ? "s-open" : !st.ended ? "s-new" : ""}">${c.cover ? coverOf(c).replace(/<\/div>$/, tag + "</div>") : tag}${status}
        <span class="eyebrow">${T("{0}. ügy · {1} rejtvény · {2} gyanúsított", c.number, pids(c).length, c.suspects.length)}</span>
        <h2>${esc(c.title)}</h2>
        <span class="meta">${esc(c.meta)}</span>
        <p>${esc(c.teaser)}</p>
        ${st.ended === "win" ? `<span class="meta">${T("{0} pont", score(st))} · ${rank(score(st), st)}</span>` : ""}
        ${started && !st.ended ? `<span class="meta">${T("{0}/{1} rejtvény · {2}/{3} nyom", done, total, st.clues.length, Object.keys(c.clues).length)}</span>` : ""}
        <span class="meta solvers" data-solvers="${c.id}"></span>
        <div class="row"><a class="btn" href="#${c.id}">${label} →</a></div>
      </article>`;
    };
    const sections = LEVELS.map(([lvl, desc]) => {
      const list = CASES.filter(c => c.difficulty === lvl && !c.weekly);
      if (!list.length) return "";
      return `<section class="level"><div class="level-head"><h2>${T(lvl)}</h2><p>${esc(desc)}</p></div><div class="cases">${list.map(card).join("")}</div></section>`;
    }).join("");
    // a hős-sáv: a félbehagyott ügy folytatása, különben a következő megoldatlan
    const mainCases = CASES.filter(c => !c.weekly && !c.finale && !c.tutorial).sort((x, y) => x.number - y.number);
    const resume = mainCases.concat(CASES.filter(c => c.weekly)).find(c => { const st = loadState(c.id); return !st.ended && (st.clues.length || st.tries); });
    const TUT = CASES.find(c => c.tutorial), fresh = !CASES.some(c => { const st = loadState(c.id); return st.ended || st.clues.length; });
    const nextC = resume || (fresh && TUT) || mainCases.find(c => loadState(c.id).ended !== "win") || mainCases[0];
    const heroImg = (window.MM_IMAGES || []).includes(nextC.id + "/cover.webp") ? nextC.id : "szegfu-villa";
    const tod = timeOfDay(), prof = profile();
    const k = career(), solvedN = mainCases.filter(wonCase).length, bAll = badges(), bGot = bAll.filter(x => x.got).length;
    const curWeek = CASES.filter(c => c.weekly && new Date(c.weekly) <= new Date()).sort((a, b) => b.weekly.localeCompare(a.weekly))[0];
    const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
    let secN = 0;
    const head = (title, desc) => `<div class="level-head"><span class="secno" aria-hidden="true">${roman[secN++]}.</span><h2>${title}</h2>${desc ? `<p>${desc}</p>` : ""}</div>`;
    const levelSecs = LEVELS.map(([lvl, desc]) => {
      const list = CASES.filter(c => c.difficulty === lvl && !c.weekly).sort((x, y) => x.number - y.number);
      if (!list.length) return "";
      return `<section class="level" data-lvl="${esc(lvl)}">${head(T(lvl), esc(desc))}<div class="cases">${list.map(card).join("")}</div></section>`;
    }).join("");
    const steps = [
      ["🔎", T("Kutasd át a helyszíneket. A nyomok a leírásban rejtőznek: kattints arra, ami gyanús, de vigyázz, nem minden részlet nyom.")],
      ["🃏", T("Gyűjtsd a szókártyákat: a szövegekben aláhúzott nevekre, tárgyakra, helyekre és időpontokra kattints.")],
      ["🔐", T("Oldd meg a rejtvényeket: számzárak, titkosírások, naplók, ujjlenyomatok. Ha elakadsz, kérj súgót, de az a végén látszani fog.")],
      ["🧵", T("A Táblán köss össze piros fonallal két összetartozó nyomot. Ha együtt többet árulnak el, megnyílik egy hiányos mondat, amit a szókártyáidból kell kiegészítened.")],
      ["🗣", T("Szembesítsd a gyanúsítottakat a nyomokkal. Mindenki elhallgat valamit, de csak egyikük gyilkos.")],
      ["⚖️", T("A vádban mondd el az egész történetet a szókártyáidból. Ha ártatlant nevezel meg, azt letartóztatják, és az ügy elveszett.")],
      ["✒️", T("A Jegyzetlap a te papírod és tollad: a játék semmit sem ír rá helyetted.")]];
    app.innerHTML = `<div class="wrap home">
      <header class="hero ${tod.night ? "night" : "day"}">
        <div class="hero-bg" style="background-image:url('images/${heroImg}/cover.webp')"></div>
        <div class="hero-fx cover" data-fx="${nextC.fx || "rain"}"></div>
        <div class="hero-glow"></div>
        <div class="hero-in">
          <div class="topnav"><span class="hero-eyebrow">${esc(tod.greet)}</span><button class="idcard" data-profile title="${T("Nyomozói igazolvány")}"><span class="av">${esc(prof.avatar)}</span><span class="idtx"><b>${prof.nick ? esc(prof.nick) : T("Névtelen nyomozó")}</b><small>${RANKICO[k.i]} ${esc(k.rank)}${window.MM_SYNC && window.MM_SYNC.on() ? " · ☁️" : ""}</small></span></button>${langSwitch()}</div>
          <h1>${T("Rejtélyes gyilkosságok")}</h1>
          <p class="hero-lead">${T("Halott a házban, mindenkinek van titka, és csak egyikük gyilkos. Járd be a helyszíneket, fejtsd meg a rejtvényeket, és nevezd meg a tettest.")}</p>
          <div class="hero-cta">
            <a class="btn hero-btn" href="#${nextC.id}">${resume ? T("Folytatom: {0}", esc(nextC.title)) : nextC.tutorial ? T("Kezdd itt: {0} (5 perc)", esc(nextC.title)) : solvedN ? T("Következő ügy: {0}", esc(nextC.title)) : T("Első ügy: {0}", esc(nextC.title))} →</a>
            <a class="btn ghost hero-ghost" href="#napi">${T("Napi kihívás")}</a>
          </div>
          <div class="hero-stats">
            <div><b>${solvedN}<small>/${mainCases.length}</small></b><span>${T("megoldott ügy")}</span></div>
            <div><b>${k.pts}</b><span>${T("pont")}</span></div>
            <div><b>${bGot}<small>/${bAll.length}</small></b><span>${T("kitüntetés")}</span></div>
            <div class="hero-rank"><span class="stamp">${RANKICO[k.i]} ${esc(k.rank)}</span><span>${k.next !== null ? T("még {0} pont: {1}", k.next - k.pts, k.nextName) : T("a legmagasabb rang")}</span></div>
          </div>
        </div>
      </header>
      ${ON ? `<div class="ticker" data-ticker hidden><span class="tk-k">${T("Friss jelentések")}</span><div class="tk-w"><div class="tk-in" data-tkin></div></div></div>` : ""}
      ${ON && !ON.statsAsked() ? `<div class="consent" data-consent><div><b>📊 ${T("Segítesz jobbá tenni a játékot?")}</b><p>${T("Névtelenül rögzítenénk, hol akadnak el a játékosok: melyik ügy, melyik rejtvény, hány súgó. Nevet, e-mail címet vagy más személyes adatot nem gyűjtünk, és bármikor kikapcsolhatod a lap alján.")}</p></div><div class="row"><button class="btn" data-consent-yes>${T("Igen, segítek")}</button><button class="btn ghost" data-consent-no>${T("Nem, köszönöm")}</button></div></div>` : ""}
      <section class="today">${dailyCard()}${curWeek ? weeklyCard(curWeek, true) : ""}</section>
      ${levelSecs}
      ${weeklyPast()}
      ${FINALE ? threadSection().replace('<div class="level-head">', `<div class="level-head"><span class="secno" aria-hidden="true">${roman[secN++]}.</span>`) : ""}
      <div class="homegrid">
        ${ON ? `<div>${boardSection().replace('<div class="level-head">', `<div class="level-head"><span class="secno" aria-hidden="true">${roman[secN++]}.</span>`)}</div>` : ""}
        ${window.MM_OFFICE && window.MM_WORLDS && window.MM_WORLDS.iroda ? `<section class="level office">${head(T("Az irodád"), T("A megoldott ügyek emlékei a polcra kerülnek, a fekete szegfű cédulái a parafatáblára. Kattints egy tárgyra, és újra elolvashatod az ügyét."))}<canvas data-office aria-label="${T("A nyomozó irodája")}"></canvas></section>` : ""}
      </div>
      <details class="badgebox"><summary><span class="eyebrow">${T("Kitüntetések")}</span><span class="bbar"><i style="width:${Math.round(100 * bGot / bAll.length)}%"></i></span><b>${bGot} / ${bAll.length}</b><span class="meta">${T("Mutasd mind")}</span></summary>${badgeGrid()}</details>
      <section class="howto">${head(T("Hogyan játssz?"), T("Hét lépés a vádemelésig. A játékállás ebben a böngészőben mentődik, bármikor folytathatod."))}
        <ol class="steps">${steps.map(([i, t]) => `<li><span class="sico">${i}</span><p>${t}</p></li>`).join("")}</ol>
      </section>
      <footer class="homefoot"><span>${T("Rejtélyes gyilkosságok")}</span>${window.MM_SYNC && window.MM_SYNC.enabled ? `<button class="link" data-account>☁️ ${window.MM_SYNC.on() ? T("Fiókod: {0}", esc(window.MM_SYNC.user().email || window.MM_SYNC.user().name || "")) : T("Bejelentkezés: játék több eszközön")}</button>` : ""}<button class="link" data-backup>💾 ${T("Játékállás mentése vagy betöltése")}</button>${ON ? `<button class="link" data-stats aria-pressed="${ON.statsOn()}">📊 ${T(ON.statsOn() ? "Névtelen statisztika: be" : "Névtelen statisztika: ki")}</button>` : ""}<span>${T("Pixelgrafika:")} <a href="https://limezu.itch.io/" target="_blank" rel="noopener">LimeZu</a></span></footer>
    </div>`;
    const oc = app.querySelector("[data-office]");
    if (oc) window.MM_OFFICE.mount(oc, { won: CASES.filter(wonCase).map(c => c.id), titles: Object.fromEntries(CASES.map(c => [c.id, c.title])),
      thread: THREAD.map(c => ({ won: wonCase(c), letter: (c.carnation || {}).letter || "?" })) });
    bindLang(); bindGloss(); bindBoards(); SCENE("home"); FX();
    if (stampedNow.length) { lsSet("mm:stamped", JSON.stringify(stamped.concat(stampedNow))); setTimeout(() => SND("stamp"), 500); }
    const pb = app.querySelector("[data-profile]"); if (pb) pb.onclick = openProfile;
    const bk = app.querySelector("[data-backup]"); if (bk) bk.onclick = openBackup;
    app.querySelectorAll("[data-account]").forEach(x => x.onclick = () => openAccount());
    const cy = app.querySelector("[data-consent-yes]"), cn = app.querySelector("[data-consent-no]");
    if (cy) cy.onclick = () => { ON.setStats(true); SND("success"); renderHome(); };
    if (cn) cn.onclick = () => { ON.setStats(false); renderHome(); };
    const sb = app.querySelector("[data-stats]"); if (sb) { sb.title = T("Névtelenül rögzítjük, hol akadnak el a játékosok, hogy javíthassuk az ügyeket. Nevet, e-mailt vagy más személyes adatot nem gyűjtünk."); sb.onclick = () => { ON.setStats(!ON.statsOn()); renderHome(); }; }
    bindTicker(); bindCountdown();
  }

  function dailyCard() {
    const d = daily(), base = CASES.find(x => x.id === d.id), st = loadKey("mm3:" + d.id + "@" + d.key), streak = dailyStreak();
    const status = st.ended === "win" ? T("Teljesítve: {0} pont", score(st)) : st.ended ? T("Ma nem sikerült") : st.introSeen ? T("Folyamatban") : "";
    return `<section class="daily"><div><span class="eyebrow">${T("Napi kihívás")} · ${esc(d.label)}</span><h2>${esc(base.title)}</h2><p><b>${T("A mai szabály:")}</b> ${esc(d.rule.t)}</p>
      <p class="cd" data-countdown></p><p class="meta">${T("Mindenki ugyanazt kapja ma. Holnap új ügy és új szabály jön.")}${streak ? " · 🔥 " + T("{0} nap egymás után", streak) : ""}</p></div>
      <div class="dstat">${status ? `<span class="stamp">${esc(status)}</span>` : ""}<a class="btn" href="#napi">${T(st.ended ? "Megnézem" : st.introSeen ? "Folytatom" : "Elfogadom a kihívást")} →</a></div></section>`;
  }
  function weeklyCard(c, cur) {
    const st = loadState(c.id);
    return `<article class="casecard weekly ${cur ? "current" : ""}">${st.ended === "win" ? `<span class="stamp">${T("Megoldva")}</span>` : ""}<span class="eyebrow">${cur ? T("E heti rejtély") : T("Korábbi hét")} · ${esc(c.weeklyLabel || "")}</span><h2>${esc(c.title)}</h2><p>${esc(c.teaser)}</p>${cur ? `<p class="meta">${T("Rövid eset, egyetlen helyszín. Minden újrakezdésnél más lehet a tettes.")}</p>` : ""}<span class="meta solvers" data-solvers="${c.id}"></span><div class="row"><a class="btn" href="#${c.id}">${T(st.ended === "win" ? "Újrajátszom" : st.clues.length ? "Folytatom" : "Nyomozás indítása")} →</a></div></article>`;
  }
  function weeklyPast() {
    const wk = CASES.filter(c => c.weekly && new Date(c.weekly) <= new Date()).sort((a, b) => b.weekly.localeCompare(a.weekly)).slice(1);
    if (!wk.length) return "";
    return `<section class="level weeklies"><div class="level-head"><span class="secno" aria-hidden="true">✦</span><h2>${T("Korábbi heti rejtélyek")}</h2><p>${T("A múlt hetek esetei is újrajátszhatók, mindig más változattal.")}</p></div><div class="cases">${wk.map(c => weeklyCard(c, false)).join("")}</div></section>`;
  }
  function badgeGrid() {
    const b = badges();
    return `<div class="badges"><span class="eyebrow">${T("Kitüntetések: {0} / {1}", b.filter(x => x.got).length, b.length)}</span><div class="bgrid">${b.map(x => `<div class="badge ${x.got ? "got" : ""}" title="${esc(x.d)}"><span class="bico">${x.got ? x.ico : "?"}</span><b>${esc(x.t)}</b><span class="meta">${esc(x.d)}</span></div>`).join("")}</div></div>`;
  }
  function threadSection() {
    const n = THREAD.filter(wonCase).length, open = n === THREAD.length;
    const st = loadState(FINALE.id);
    const finaleCard = open
      ? `<article class="casecard finale">${coverOf(FINALE)}${st.ended === "win" ? `<span class="stamp">${T("Megoldva")}</span>` : ""}
          <span class="eyebrow">${T("{0}. ügy", FINALE.number)} · ${T("Zárás")}</span><h2>${esc(FINALE.title)}</h2><span class="meta">${esc(FINALE.meta)}</span><p>${esc(FINALE.teaser)}</p>
          ${st.ended === "win" ? `<span class="meta">${T("{0} pont", score(st))} · ${rank(score(st), st)}</span>` : ""}
          <div class="row"><a class="btn" href="#${FINALE.id}">${T(st.ended === "win" ? "Újraolvasom" : st.clues.length ? "Folytatom" : "Nyomozás indítása")} →</a></div></article>`
      : `<article class="casecard finale locked"><span class="eyebrow">${T("{0}. ügy", FINALE.number)} · ${T("Zárás")}</span><h2>${T("Lezárt ügy")}</h2>
          <p>${T("Mind a hat ügy végén egy préselt fekete szegfű és egy cédula vár. Ha mindet megtalálod, kiderül, ki áll mögöttük.")}</p>
          <span class="meta">${T("{0} / {1} cédula", n, THREAD.length)}</span></article>`;
    // 2. évad: amíg a záró ügy nincs meg, pecsétes, elmosott kártya; utána az első visszatéréskor feltörik a pecsét
    const s2open = st.ended === "win", s2fresh = s2open && lsGet("mm:s2seen", "") !== "1";
    if (s2fresh) { lsSet("mm:s2seen", "1"); setTimeout(() => SND("paper"), 700); }
    const s2 = `<article class="casecard finale season2 ${s2open ? "open" : "sealed"} ${s2fresh ? "fresh" : ""}"><div class="wax" aria-hidden="true"><span>F</span></div>
      <span class="eyebrow">${T("2. évad")}</span>
      <h2 class="s2t">${s2open ? T("A vörös pecsét") : "▇▇▇▇ ▇▇▇▇▇ ▇▇▇▇▇▇"}</h2>
      <p class="s2p">${s2open ? T("Fekete Szilárd a börtönben hallgat. De a cellájában valaki egy vörös viaszpecsétes levelet hagyott. Hamarosan.") : T("Valaki már a következő levelet írja. A borítékot vörös viasz zárja, és csak az törheti fel, aki az egész titkos szálat végigjárta.")}</p>
      <span class="meta">${s2open ? T("Hamarosan") : T("Oldd meg a záró ügyet, és feltörheted a pecsétet.") + " · " + T("{0} / {1} cédula", n, THREAD.length)}</span></article>`;
    return `<section class="level thread"><div class="level-head"><h2>${T("A titkos szál")}</h2><p>${T("Hat gyilkosság, hat cédula, egy aláírás: F. Sz.")}</p></div>
      <div class="cnotes">${THREAD.map(c => noteCard(c, wonCase(c))).join("")}</div>
      ${glossary()}
      <div class="cases">${finaleCard}${s2}</div></section>`;
  }
  // a cédulákon látott jelek szótára: a jelentést a játékos következteti ki, a játék csak csoportosan ellenőrzi
  function glossary() {
    const seen = {};
    THREAD.filter(wonCase).forEach(c => (c.carnation.note.match(/⟪\w+⟫[^⟪”]*/g) || []).forEach(m => { const g = m.slice(1, m.indexOf("⟫")); (seen[g] = seen[g] || []).push(m.slice(m.indexOf("⟫") + 1).trim().replace(/\s*—\s*F\. Sz\.?$/, "").replace(/[.,]$/, "")); }));
    const ids = Object.keys(seen); if (!ids.length) return "";
    const st = symState();
    return `<div class="gloss"><span class="eyebrow">${T("Jelírás")}</span>
      <p>${T("A cédulákon furcsa jelek állnak, mindig valami fontos előtt. Figyeld meg, milyen szavak mellett tűnnek fel, és találd ki, mit jelentenek. Ha legalább három jelnek adtál jelentést, ellenőrizheted őket, de csak együtt: azt nem árulom el, melyik a rossz.")}</p>
      <div class="glist">${ids.map(g => `<div class="gitem ${st.ok.includes(g) ? "ok" : ""}">${glyph(g)}<div><p class="meta">${seen[g].map(x => "„…" + esc(x) + "”").join("<br>")}</p>${st.ok.includes(g) ? `<b>✓ ${esc(SYMMEAN[g])}</b>` : `<select data-gl="${g}" aria-label="${T("A jel jelentése")}"><option value="">?</option>${MEANINGS.map(m => `<option ${st.g[g] === m ? "selected" : ""}>${esc(m)}</option>`).join("")}</select>`}</div></div>`).join("")}</div>
      ${ids.every(g => st.ok.includes(g)) ? "" : `<div class="row"><button class="btn ghost small" data-glcheck>${T("Ellenőrzöm a jelentéseket")}</button></div><p class="msg" data-glmsg></p>`}</div>`;
  }
  function bindGloss() {
    app.querySelectorAll("[data-gl]").forEach(el => el.onchange = () => { const st = symState(); st.g[el.dataset.gl] = el.value; symSave(st); });
    const b = app.querySelector("[data-glcheck]"); if (!b) return;
    b.onclick = () => {
      const st = symState(), m = app.querySelector("[data-glmsg]");
      const pend = Object.keys(st.g).filter(g => st.g[g] && !st.ok.includes(g));
      if (pend.length + st.ok.length < 3 || !pend.length) { m.className = "msg bad"; m.textContent = T("Legalább három jelnek adj jelentést."); return; }
      if (pend.every(g => st.g[g] === SYMMEAN[g])) { st.ok = st.ok.concat(pend); symSave(st); SND("success"); renderHome(); return; }
      SND("wrong"); m.className = "msg bad"; m.textContent = T("Valamelyik jelentés nem stimmel. Nézd meg újra, milyen szavak mellett áll.");
    };
  }

  /* ---------- ügy nézet ---------- */
  const TABS = [["ugy", "Ügyirat"], ["hely", "Helyszínek"], ["gyan", "Gyanúsítottak"], ["jegy", "Jegyzetfüzet"], ["tabla", "Tábla"], ["vad", "Vádemelés"]].map(([a, b]) => [a, T(b)]);
  function renderCase() {
    document.title = C.title;
    if (S.tab !== "hely" || !worldOn()) document.querySelectorAll(".wdlg").forEach(e => e.remove());
    app.innerHTML = `<div class="wrap ${S.master ? "master" : ""}">
      <div class="topnav"><a class="link" href="#">← ${T("Összes ügy")}</a>${langSwitch()}</div>
      <header class="case">
        <div class="stack" style="gap:6px"><span class="meta">${esc(C.meta)}</span><h1>${esc(C.title)}</h1>${S.master ? `<span class="badge">${T(S.noir ? "Noir mód" : "Mester mód")}</span>` : ""}${S.timed && !S.ended ? `<span class="clock ${budget(C) - S.used < 60 ? "low" : ""}">⏱ ${T("Még {0} a csendőrök érkezéséig", fmtLeft(budget(C) - S.used))}</span>` : ""}</div>
        <span class="stamp">${T(S.ended === "win" ? "Ügy lezárva" : S.ended ? "Elszalasztva" : "Nyomozás folyamatban")}</span>
      </header>
      <div class="coach" data-coachbar>${coachHtml()}</div>
      <nav class="tabs" role="tablist">${TABS.map(([id, l]) => `<button role="tab" aria-selected="${S.tab === id}" data-tab="${id}">${l}${id === "jegy" && S.clues.length ? `<span class="count">${S.clues.length}</span>` : ""}${id === "vad" && !S.ended && !ready() ? " 🔒" : ""}</button>`).join("")}</nav>
      <main class="sheet" aria-live="polite">${VIEWS[S.tab]()}</main>
      <footer><span>${T("{0}. ügy", C.number)}</span><button data-reset>${T(confirmReset ? "Biztosan? Kattints újra a törléshez" : "Ügy újrakezdése")}</button></footer>
    </div>`;
    $$("[data-tab]").forEach(b => b.onclick = () => { S.tab = b.dataset.tab; S.loc = null; confirmReset = false; save(); renderCase(); });
    $("[data-reset]").onclick = () => {
      if (!confirmReset) { confirmReset = true; renderCase(); return; }
      confirmReset = false; const dl = S.daily; S = fresh(); if (dl) S.daily = undefined; save(); route();
    };
    BIND[S.tab] && BIND[S.tab]();
    bindCoach(); bindLang(); notesUI(true);
    if (S.daily && S.ended && !S.dailyRec) { const log = dailyLog(); log[S.daily] = { id: C.id, ended: S.ended, score: S.ended === "win" ? score(S) : 0 }; try { localStorage.setItem("mm:daily", JSON.stringify(log)); } catch (e) {} S.dailyRec = 1; save(); }
    if (S.ended) newBadges();
    const dc = document.querySelector("[data-dcopy]");
    if (dc) dc.onclick = () => { const t = dailyShareText(), m = document.querySelector("[data-dmsg]"); try { navigator.clipboard.writeText(t).then(() => { m.className = "msg ok"; m.textContent = T("Kimásolva, beillesztheted bárhová."); }); } catch (e) { m.textContent = T("Jelöld ki és másold ki a fenti szöveget."); } };
    bindOnline(); verdict(); bindFeedback();
    document.querySelectorAll("[data-account]").forEach(x => x.onclick = () => openAccount());
    if (S.ended && S.ended !== "reveal" && !S.trk) { S.trk = 1; save(); TR(S.ended === "win" ? "win" : S.ended === "wrong" ? "wrong" : "lose", S.ended === "wrong" ? S.accused : S.ended); }
    if (!S.introSeen && !S.ended && !S.clues.length) showIntro();
    else checkEvents();
    const sl = S.loc || (worldOn() && S.cur);
    SCENE((S.tab === "hely" && sl && C.sounds && C.sounds[sl]) || C.sound || "home");
    FX();
  }
  const go = (tab, loc) => { S.tab = tab; S.loc = loc || null; save(); renderCase(); window.scrollTo({ top: 0 }); };

  /* ---------- alaprajz: kattintható szobák, ajtók és térbeli megjegyzések ---------- */
  function planSvg() {
    const P = C.plan; if (!P) return "";
    const U = 44, pad = 10, W = P.w * U + pad * 2, H = P.h * U + pad * 2;
    const X = v => pad + v * U;
    const lines = (t, w) => { const max = Math.max(6, Math.floor(w * U / 8.5)); if (t.length <= max) return [t]; const ws = t.split(" "); const out = [""]; ws.forEach(x => { const l = out[out.length - 1]; if ((l + " " + x).trim().length > max && l) out.push(x); else out[out.length - 1] = (l + " " + x).trim(); }); return out.slice(0, 3); };
    let g = `<rect x="0" y="0" width="${W}" height="${H}" class="pl-bg"/>`;
    Object.entries(P.rooms).forEach(([id, r]) => {
      const [x, y, w, h, label] = r, loc = C.locations.find(l => l.id === id);
      const locked = loc && loc.requires && !S.solved[loc.requires];
      const name = loc ? loc.name : label;
      const star = loc && loc.puzzle && !S.master && !S.solved[loc.puzzle] ? "✦ " : "";
      const ls = lines(star + name, w), cy = X(y) + h * U / 2 - (ls.length - 1) * 8;
      const cls = loc ? (locked ? "pl-room locked" : "pl-room") : "pl-hall";
      g += `<g class="${cls}" ${loc && !locked ? `data-ploc="${id}" role="button" tabindex="0" aria-label="${esc(name)}"` : ""}><rect x="${X(x)}" y="${X(y)}" width="${w * U}" height="${h * U}"/>${locked ? `<rect x="${X(x)}" y="${X(y)}" width="${w * U}" height="${h * U}" class="pl-hatch"/>` : ""}${ls.map((t, i) => `<text x="${X(x) + w * U / 2}" y="${cy + i * 16}">${esc(t)}</text>`).join("")}</g>`;
    });
    (P.doors || []).forEach(([x1, y1, x2, y2]) => { g += `<line x1="${X(x1)}" y1="${X(y1)}" x2="${X(x2)}" y2="${X(y2)}" class="pl-door"/>`; });
    (P.marks || []).forEach(([x, y, t]) => { g += `<text x="${X(x)}" y="${X(y)}" class="pl-mark">${esc(t)}</text>`; });
    return `<div class="plan"><svg viewBox="0 0 ${W} ${H}" role="group" aria-label="${T("Alaprajz")}">${g}</svg>${P.note ? `<p class="meta">${esc(P.note)}</p>` : ""}</div>`;
  }

  const pips = () => `<div class="progress">${pids(C).map(p => `<span class="pip ${S.solved[p] ? "done" : ""}">${S.solved[p] ? "✓ " : ""}${esc(C.puzzles[p].title)}</span>`).join("")}</div>`;

  const clueOpts = () => S.clues.map(k => `<option value="${k}">${isDed(k) ? "◆ " : ""}${esc(plain(C.clues[k].t))}</option>`).join("");
  function susCard(s, opts) {
    const legacy = !C.contradictions; opts = opts || clueOpts();
    let notes = "", liar = false;
    if (legacy) {
      const ex = s.extra && (S.solved[s.extra.after] || S.clues.includes(s.extra.after));
      if (ex) { notes = `<p class="note">${esc(s.extra.text)}</p>`; liar = s.extra.lie; }
    } else {
      const found = contra(C, s.id).filter(k => S.conf.includes(k.id));
      liar = found.some(k => k.lie !== false);
      notes = found.map(k => `<p class="note">${rich(k.reveal)}</p>`).join("");
    }
    const cool = (S.cool || {})[s.id] > Date.now();
    const tool = legacy || S.ended ? "" : S.clues.length
      ? `<div class="confront" data-cfbox="${s.id}"><span class="eyebrow">${T("Szembesítés")}</span><p class="meta">${cool ? T("Sértődötten hallgat. Próbáld újra egy kicsit később.") : T("Válaszd ki azt a nyomot, amelyik ellentmond a szavainak, és tedd elé.")}</p>
        <div class="cfcards">${S.clues.map(k => `<button class="cfcard ${isDed(k) ? "ded" : ""}" data-cfpick="${s.id}" data-k="${k}" ${cool ? "disabled" : ""}>${isDed(k) ? "◆ " : ""}${esc(plain(C.clues[k].t))}</button>`).join("")}</div>
        <button class="btn small" data-cf="${s.id}" ${cool ? "disabled" : ""}>${T("Elé teszem")}</button></div><p class="msg" data-cfmsg="${s.id}"></p>`
      : `<p class="meta">${T("Még nincs nyomod, amivel szembesíthetnéd.")}</p>`;
    const qs = ((C.interviews || {})[s.id] || []).filter(q => (!q.after || S.clues.includes(q.after)) && (!q.afterConf || S.conf.includes(q.afterConf)));
    const asked = qs.filter(q => S.asked.includes(s.id + ":" + q.id)), open = S.ended ? [] : qs.filter(q => !S.asked.includes(s.id + ":" + q.id));
    const talk = qs.length ? `<div class="talk">${asked.map(q => `<p class="qa"><b>${esc(q.q)}</b> ${rich(q.a)}</p>`).join("")}${open.length ? `<div class="asks">${open.map(q => `<button class="btn ghost small ask" data-ask="${s.id}:${q.id}">${esc(q.q)}</button>`).join("")}</div>` : ""}</div>` : "";
    return `<div class="suspect">${liar ? `<span class="stamp anim">${T("Hazudott")}</span>` : ""}<div class="head"><div class="art portrait">${ART.portrait(s)}</div><div class="who"><h3>${esc(s.name)}</h3><span class="role">${esc(s.role)}</span></div></div><p>${rich(s.stmt)}</p>${talk}${notes}${tool}</div>`;
  }

  const VIEWS = {
    ugy: () => `<div class="stack">
      ${coverOf(C)}
      <span class="eyebrow">${esc(C.intro.eyebrow)}</span>
      <h2>${esc(C.intro.heading)}</h2>
      <p class="lead">${esc(C.intro.lead)}</p>
      <p>${esc(C.intro.body)}</p>
      <div class="typed">${T("TEENDŐ:\n1. Járd végig a helyszíneket. A nyomokra neked kell rábukkannod a leírásban, és nem minden gyanús részlet nyom.\n2. Gyűjtsd a szókártyákat: a szövegekben aláhúzott nevekre, tárgyakra, helyekre kattints.\n3. Oldd meg a(z) {0} rejtvényt.\n4. A Táblán köss össze piros fonallal két összetartozó nyomot, és egészítsd ki a megnyíló mondatot a szókártyáidból.\n5. Szembesítsd a gyanúsítottakat. Aki hazudik, nem feltétlenül gyilkos.\n6. A vádban mondd el az egész történetet. Ha ártatlant nevezel meg, azt letartóztatják, és nincs visszaút.", pids(C).length)}</div>
      ${C.dossier ? `<div class="stack dossier"><span class="eyebrow">${esc(C.dossier.heading)}</span><p>${esc(C.dossier.text)}</p><div class="cnotes">${THREAD.map(c => noteCard(c, true)).join("")}</div></div>` : ""}
      ${pips()}
      <div class="row"><button class="btn" data-go>${T("Helyszínelés indítása")} →</button></div>
    </div>`,

    hely: () => {
      if (worldOn()) return WORLD.html();
      if (S.loc) return viewLoc(C.locations.find(l => l.id === S.loc));
      return `<div class="stack"><div class="row" style="justify-content:space-between"><span class="eyebrow">${T("A helyszín alaprajza")}</span>${viewSwitch()}</div><h2>${T("Helyszínek")}</h2>
        <p>${T(S.master ? "Válassz egy helyiséget." : "Válassz egy helyiséget. A rejtvényt rejtő helyszíneket ✦ jelöli.")}</p>
        ${(() => { const cur = S.cur && C.locations.find(l => l.id === S.cur); return cur && remaining(cur) ? `<p class="warn">${T("Itt tartasz: {0}. Amíg minden nyomát meg nem találod, másik helyiségbe nem mehetsz.", esc(cur.name))} <button class="link" data-gocur>${T("Vissza oda")} →</button></p>` : ""; })()}
        ${planSvg()}
        <div class="grid2">${C.locations.map(l => {
          const locked = l.requires && !S.solved[l.requires];
          const items = l.items || [];
          const total = items.length + (l.puzzle ? 1 : 0);
          const got = items.filter(i => S.clues.includes(i.clue)).length + (l.puzzle && S.solved[l.puzzle] ? 1 : 0);
          const status = locked ? `<span class="status locked">${T("Zárva")}</span>` : S.master ? (got ? `<span class="status">${T("{0} nyom innen", got)}</span>` : "") : got === total ? `<span class="status done">${T("Átkutatva")}</span>` : `<span class="status">${T("{0}/{1} felderítve", got, total)}</span>`;
          return `<button class="loc" data-loc="${l.id}" ${locked ? "disabled" : ""}><div class="art" aria-hidden="true">${ART.scene(l, "")}</div><h3>${l.puzzle && !S.master ? "✦ " : ""}${esc(l.name)}</h3><p>${esc(l.desc)}</p>${status}</button>`;
        }).join("")}</div></div>`;
    },

    gyan: () => {
      const legacy = !C.contradictions, opts = clueOpts();
      return `<div class="stack"><span class="eyebrow">${T("Kihallgatási jegyzőkönyvek")}</span><h2>${T("Gyanúsítottak")}</h2>
      <p>${T(legacy ? "Mindenki mond valamit, és mindenki elhallgat valamit." : "Válassz egy nyomot a jegyzetfüzetből, és szembesítsd vele azt, akinek a vallomásával ütközik. A téves szembesítés pontlevonással jár.")}</p>
      <div class="grid2">${C.suspects.map(s => susCard(s, opts)).join("")}</div></div>`;
    },

    jegy: () => {
      const ids = rawIds(C).filter(k => S.clues.includes(k));
      const dids = dedsOf(C).map(d => d.id).filter(k => S.clues.includes(k));
      const body = k => S.noir && !isDed(k) ? `<p class="meta noir">${T("A részleteket nem jegyezted fel. Ha kell, nézd meg újra a helyszínen, vagy írd fel a jegyzetlapodra.")}</p>` : `<p data-hl="${esc(plain(C.clues[k].t))}">${rich(C.clues[k].x)}</p>`;
      return `<div class="stack"><span class="eyebrow">${T("Saját jegyzeteid")}</span><h2>${T("Jegyzetfüzet")}</h2>${pips()}
        ${dedPanel()}
        ${S.ended ? "" : wordBank()}
        ${dids.length ? `<span class="eyebrow">${T("Következtetéseid")}</span><div class="stack">${dids.map(k => `<div class="clue ded"><span class="src">${T("Következtetés")}</span><h3>${esc(C.clues[k].t)}</h3>${body(k)}</div>`).join("")}</div>` : ""}
        ${ids.length ? `<span class="eyebrow">${T("Nyomok")}</span>` : ""}
        ${ids.length ? `<div class="stack">${ids.map(k => `<div class="clue"><span class="src">${esc(C.clues[k].src)}</span><h3>${esc(C.clues[k].t)}</h3>${body(k)}</div>`).join("")}</div>`
          : `<p class="typed">${T("Még üres a füzet. Kezdd ott, ahol a holttestet megtalálták.")}</p>`}
        ${S.conf.length ? `<span class="eyebrow">${T("Feltárt ellentmondások")}</span><div class="stack">${contra(C).filter(k => S.conf.includes(k.id)).map(k => `<div class="clue"><span class="src">${esc(C.suspects.find(x => x.id === k.suspect).name)}</span><p data-hl="${esc(C.suspects.find(x => x.id === k.suspect).name)}">${rich(k.reveal)}</p></div>`).join("")}</div>` : ""}
        <p class="eyebrow">${S.master ? T("{0} nyom", ids.length) : T("{0} / {1} nyom", ids.length, rawIds(C).length)}</p></div>`;
    },

    tabla: () => `<div class="stack"><span class="eyebrow">${T("A nyomozó parafatáblája")}</span><h2>${T("Tábla")}</h2>
      <p>${T("Kattints egy nyomra, aztán egy másikra: piros fonal köti össze őket. Ha a kettő együtt többet árul el, a fonal megnyit egy következtetést, és megjelenik egy arany kártya, amelyet a szókártyáidból kell kitöltened. A kártyákat húzással rendezheted, a fonalra kattintva levághatod.")} ${S.clues.length ? "" : T("Még nincs nyomod: a talált nyomok maguktól felkerülnek a táblára.")}</p>
      <div class="row"><button class="btn ghost small" data-tidy>${T("Rendezés")}</button><button class="btn ghost small" data-unthread>${T("Fonalak le")}</button><span class="meta" data-boardhint></span></div>
      <div class="board-wrap"><div class="board" data-board style="width:${BW}px;height:${BH}px"><svg class="threads" data-threads aria-hidden="true"></svg>${boardCards().map(k => `<div class="pin ${k.kind}" tabindex="0" data-pin="${k.id}" style="left:${k.x}px;top:${k.y}px" aria-label="${esc(k.label)}">${k.html}</div>`).join("")}</div></div></div>`,

    vad: () => {
      if (S.ended === "win") return C.reveal && S.rstep < C.reveal.length ? viewReveal() : viewEnding();
      if (S.ended === "lose" || S.ended === "timeout") return viewLose();
      if (S.ended === "reveal") return viewEnding(true);
      if (S.ended === "wrong") return viewWrong();
      const left = pids(C).filter(p => !S.solved[p]).length, triesLeft = MAXTRIES(C) - S.tries;
      const A = C.accusation;
      if (!ready()) {
        const dn = dedsOf(C).filter(d => S.clues.includes(d.id)).length, dt = dedsOf(C).length, pn = pids(C).length - left;
        const row = (ok, txt) => `<li class="${ok ? "ok" : ""}">${ok ? "✓" : "○"} ${txt}</li>`;
        return `<div class="stack"><span class="eyebrow">${T("Még nem állsz készen")}</span><h2>${T("Vádemelés")}</h2>
          <p>${T("Az ügyész nem enged a gyanúsítottak elé egy megérzéssel. Előbb rakd össze az ügyet: oldd meg a rejtvényeket, és vond le a következtetéseket a Táblán. Néhány következtetéshez előbb szembesítened kell valakit, mert csak a vallomása adja meg a hiányzó nyomot.")}</p>
          <ul class="checklist">${row(pn === pids(C).length, T("Rejtvények: {0} / {1}", pn, pids(C).length))}${row(dn === dt, T("Levont következtetések: {0} / {1}", dn, dt))}</ul>
          <div class="row"><button class="btn ghost" data-gotab="tabla">${T("A Táblához")} →</button><button class="btn ghost" data-gotab="gyan">${T("A gyanúsítottakhoz")} →</button></div></div>`;
      }
      const pointed = S.pointed && C.suspects.find(x => x.id === S.pointed);
      return `<div class="stack">${pointed ? `<div class="pointed"><div class="art portrait">${ART.portrait(pointed)}</div><div><span class="eyebrow">${T("Mindenki elhallgat")}</span><p>${T("Rámutatsz: {0}. A teremben megáll a levegő. Most mondd el, hogyan történt.", pointed.name)}</p></div></div>` : ""}<span class="eyebrow">${T("Mindenki rád vár")}</span><h2>${T("Vádemelés")}</h2>
        <p>${T("Összehívod a ház lakóit, és elmondod, mi történt. Egészítsd ki a történetet a szókártyáidból. Az ügyvéd csak akkor fogadja el, ha minden szó a helyén van.")}</p>
        <p class="meta">${T("Még {0} próbálkozásod van.", triesLeft)}${left && !S.master ? " " + T("{0} rejtvény megoldatlan.", left) : ""}</p>
        <p class="warn">${T("Vigyázz: akit tettesként megnevezel, azt a csendőrök letartóztatják. Ha ártatlan, nincs visszaút. A részletekben tévedhetsz, a személyben nem.")}</p>
        <div class="story">${sentence("acc", A.story, A.b, A.who || [0])}</div>
        <div class="row"><button class="btn" data-accuse>${T("Kimondom a vádat")}</button></div><p class="msg" data-accmsg></p></div>`;
    }
  };


  /* ---------- összevetés és hiányos mondatok ----------
     Két összetartozó nyom összekötése (a Táblán fonallal, vagy itt) megnyit egy következtetést.
     A következtetést a játékos a saját szókártyáiból rakja össze; csak a teljesen helyes mondat fogadható el. */
  const pairOk = (d, a, b) => d.from && ((has(d.from[0], a) && has(d.from[1], b)) || (has(d.from[0], b) && has(d.from[1], a)));
  const kindOf = ans => (C.W[[].concat(ans)[0]] || ["", "tárgy"])[1];
  const kindName = k => (KINDS.find(x => x[0] === k) || ["", k])[1];
  function tryPair(a, b) {
    const d = dedsOf(C).find(x => pairOk(x, a, b));
    if (!d) return null;
    if (S.clues.includes(d.id) || S.unl.includes(d.id)) return { d, old: true };
    S.unl.push(d.id); save(); SND("success");
    return { d, old: false };
  }
  // egy hiányos mondat kitöltő űrlapja; key: következtetés azonosítója vagy "acc" a vádhoz
  function sentence(key, text, blanks, susOnly) {
    const cur = S.dsel[key] || [];
    const parts = text.split("{}");
    const mine = Object.keys(C.W).filter(haveWord);
    let h = "";
    parts.forEach((p, i) => {
      h += esc(p).replace(/\n/g, "<br>");
      if (i < blanks.length) {
        const k = kindOf(blanks[i]);
        const opts = mine.filter(w => C.W[w][1] === k && (!susOnly || !susOnly.includes(i) || C.suspects.some(x => x.id === w)));
        h += `<select class="blank" data-blank="${key}:${i}" aria-label="${esc(kindName(k))}"><option value="">${esc(kindName(k))}…</option>${opts.map(w => `<option value="${w}" ${cur[i] === w ? "selected" : ""}>${esc(C.W[w][0])}</option>`).join("")}</select>`;
      }
    });
    return `<p class="sentence">${h}</p>`;
  }
  const wrongBlanks = (key, blanks) => blanks.map((b, i) => !has(b, (S.dsel[key] || [])[i])).filter(Boolean).length;
  const missingBlanks = (key, blanks) => blanks.some((b, i) => !(S.dsel[key] || [])[i]);
  const errMsg = n => S.master ? T("Nem stimmel.") : n <= 2 ? T("{0} szó nem stimmel. Hogy melyik, azt neked kell kitalálnod.", n) : T("Több szó sem stimmel.");
  function dedForm(d) {
    return `<div class="dq" data-dform="${d.id}"><p class="meta">${T("Összekötve:")} ${d.from.map(f => esc(plain((C.clues[[].concat(f).find(x => S.clues.includes(x)) || [].concat(f)[0]] || {}).t || "?"))).join(" + ")}</p>
      ${sentence(d.id, d.text, d.b)}${dedSources(d)}<div class="row"><button class="btn small" data-dok="${d.id}">${T("Ez a következtetésem")}</button></div><p class="msg" data-dmsg="${d.id}"></p></div>`;
  }
  // hol található egy szókártya: melyik nyomban, kinek a vallomásában vagy melyik helyszínen
  function wordHome(w) {
    const tag = "|" + w + "}}";
    const ck = Object.keys(C.clues).find(k => (C.clues[k].x || "").includes(tag));
    if (ck) return { clue: ck };
    const su = C.suspects.find(x => JSON.stringify(x).includes(tag) || JSON.stringify((C.interviews || {})[x.id] || "").includes(tag));
    if (su) return { label: T("{0} vallomásában", su.name) };
    const lo = C.locations.find(l => JSON.stringify(l).includes(tag));
    if (lo) return { label: T("ezen a helyszínen: {0}", lo.name) };
    return null;
  }
  const locOfClue = k => (C.locations.find(l => (l.items || []).some(i => i.clue === k)) || {}).name;
  // a két összekötött nyom szövege, hogy a hiányzó szókártyák itt helyben is összegyűjthetők legyenek;
  // ha egy szükséges szó máshol van, megmondja, hol keresse (de magát a szót nem árulja el)
  function dedSources(d) {
    if (S.noir) return "";
    const ks = d.from.map(f => [].concat(f).find(x => S.clues.includes(x))).filter(Boolean);
    const src = ks.map(k => C.clues[k].x || "").join(" ");
    const extra = [], tips = [];
    d.b.forEach(b => {
      const ws = [].concat(b);
      if (ws.some(haveWord) || ws.some(w => src.includes("|" + w + "}}") || C.suspects.some(x => x.id === w))) return;
      const h = wordHome(ws[0]); if (!h) return;
      if (h.clue && S.clues.includes(h.clue)) { if (!extra.includes(h.clue) && !ks.includes(h.clue)) extra.push(h.clue); }
      else if (h.clue) { const where = locOfClue(h.clue) || C.clues[h.clue].src; tips.push(T("Egy szükséges szó egy olyan nyomban van, amit még nem találtál meg{0}.", where ? " " + T("(itt keresd: {0})", where) : "")); }
      else tips.push(T("Egy szükséges szót {0} találsz.", h.label));
    });
    const miss = d.b.some(x => ![].concat(x).some(haveWord));
    return `<details class="dsrc" ${miss ? "open" : ""}><summary>${T("Hiányzik egy szókártya? A két nyom szövege")}</summary>${ks.concat(extra).map(k => `<p>${extra.includes(k) ? `<span class="meta">${T("Ez is kellhet:")}</span> ` : ""}<b>${esc(C.clues[k].t)}:</b> ${rich(C.clues[k].x)}</p>`).join("")}${[...new Set(tips)].map(t => `<p class="tip">🔎 ${esc(t)}</p>`).join("")}<p class="meta">${T("Kattints az aláhúzott szavakra, és bekerülnek a legördülő listába.")}</p></details>`;
  }
  function wordBank() {
    const mine = Object.keys(C.W).filter(haveWord);
    return `<div class="bank"><span class="eyebrow">${T("Szókártyák")}</span><p class="meta">${T("A szövegekben aláhúzott szavakra kattintva gyűjtheted őket. Ezekből rakod össze a következtetéseket és a vádat.")}</p>
      ${KINDS.map(([k, n]) => { const w = mine.filter(x => C.W[x][1] === k); return w.length ? `<div class="bankrow"><b>${esc(n)}</b>${w.map(x => `<span class="chip">${esc(C.W[x][0])}</span>`).join("")}</div>` : ""; }).join("")}</div>`;
  }
  function dedPanel() {
    if (!dedsOf(C).length || S.ended) return "";
    const n = dedsOf(C).filter(d => S.clues.includes(d.id)).length;
    const open = dedsOf(C).filter(d => S.unl.includes(d.id) && !S.clues.includes(d.id));
    const opts = S.clues.map(k => `<option value="${k}">${isDed(k) ? "◆ " : ""}${esc(plain(C.clues[k].t))}</option>`).join("");
    const sel = (id, ph) => `<select id="${id}" aria-label="${ph}"><option value="">${ph}</option>${opts}</select>`;
    return `<div class="deduce"><span class="eyebrow">${T("Összevetés")}</span>
      <p>${T("Köss össze két nyomot a Táblán piros fonallal, vagy válaszd ki őket itt. Ha együtt többet árulnak el, megnyílik egy hiányos mondat, amelyet a szókártyáidból kell kiegészítened.")}</p>
      ${S.clues.length < 2 ? `<p class="meta">${T("Ehhez legalább két nyom kell.")}</p>` : `<div class="dsel">${sel("dd-a", T("Első nyom…"))}<span aria-hidden="true">+</span>${sel("dd-b", T("Második nyom…"))}<button class="btn ghost small" data-dd>${T("Összekötöm")}</button></div>`}
      <p class="msg" data-ddmsg></p>
      ${open.map(dedForm).join("")}
      <p class="meta">${S.master ? T("Levont következtetések: {0}", n) : T("Levont következtetések: {0} / {1}", n, dedsOf(C).length)}</p></div>`;
  }
  // elakadásgátló: két rossz próba után (Mester mód kivételével) súgóért megmutatja, melyik szó rossz
  function markWrong(root, key, blanks) {
    blanks.forEach((b, i) => { const el = root.querySelector(`[data-blank="${key}:${i}"]`); if (el && !has(b, (S.dsel[key] || [])[i])) el.classList.add("wrongpick"); });
  }
  function whichBtn(m, root, key, blanks, cost) {
    if (S.master) return;
    const btn = document.createElement("button"); btn.className = "link whichbtn"; btn.textContent = T("Melyik szó rossz? (súgó, −{0} pont)", cost * 6);
    btn.onclick = () => { S.hints["w:" + key] = (S.hints["w:" + key] || 0) + cost; save(); TR("hint", "w:" + key); SND("paper"); markWrong(root, key, blanks); btn.remove(); m.textContent = T("Pirossal jelöltem, amelyik nem stimmel. Nézd meg újra a hozzá tartozó nyomot."); };
    m.appendChild(document.createTextNode(" ")); m.appendChild(btn);
  }
  function bindSentences(root, after) {
    root.querySelectorAll("[data-blank]").forEach(el => el.onchange = () => { const [k, i] = el.dataset.blank.split(":"); (S.dsel[k] = S.dsel[k] || [])[+i] = el.value; el.classList.remove("wrongpick"); save(); });
    root.querySelectorAll("[data-dok]").forEach(b => b.onclick = () => {
      const d = dedsOf(C).find(x => x.id === b.dataset.dok), m = root.querySelector(`[data-dmsg="${d.id}"]`);
      if (missingBlanks(d.id, d.b)) { m.className = "msg bad"; m.textContent = T("Minden üres helyet tölts ki."); return; }
      const n = wrongBlanks(d.id, d.b);
      if (!n) { gain(d.id); save(); SND("success"); TR("deduce", d.id); spend(COST.deduce); toast(T("Következtetés: {0}", plain(d.t))); (after || rerender)(); return; }
      S.wrongDed = (S.wrongDed || 0) + 1; save(); SND("wrong");
      if (spend(COST.deduce)) return renderCase();
      updateClock(); m.className = "msg bad"; m.textContent = errMsg(n);
      S.dw = S.dw || {}; S.dw[d.id] = (S.dw[d.id] || 0) + 1; save(); TR("ded_wrong", d.id);
      if (S.dw[d.id] >= 2) whichBtn(m, root, d.id, d.b, 1);
    });
  }
  function bindDed() {
    const b = $("[data-dd]");
    if (b) b.onclick = () => {
      const a = $("#dd-a").value, c = $("#dd-b").value, m = $("[data-ddmsg]");
      if (!a || !c || a === c) { m.className = "msg bad"; m.textContent = T("Válassz két különböző nyomot."); return; }
      const r = tryPair(a, c);
      if (r && r.old) { m.className = "msg"; m.textContent = T("Ezt a kettőt már összekötötted."); return; }
      if (r) { rerender(); return; }
      SND("tick"); m.className = "msg"; m.textContent = T("Ez a kettő együtt sem mond többet, mint külön-külön.");
    };
    bindSentences(app);
  }
  const rerender = () => { const y = window.scrollY; renderCase(); window.scrollTo({ top: y }); };

  /* ---------- váratlan fordulatok ---------- */
  function checkEvents() {
    if (S.ended || !S.introSeen || !C.events || document.querySelector(".intro")) return;
    const got = rawIds(C).filter(k => S.clues.includes(k)).length;
    const ev = C.events.find(e => !S.events.includes(e.id) && ((e.after && got >= e.after) || (e.afterClue && S.clues.includes(e.afterClue)) || (e.afterSolved && S.solved[e.afterSolved])));
    if (!ev) return;
    S.events.push(ev.id); if (ev.gives) gain(ev.gives); save();
    const ov = document.createElement("div"); ov.className = "intro event"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", ev.title);
    ov.innerHTML = `<div class="intro-card"><span class="eyebrow">${T("Váratlan fordulat")}</span><h2>${esc(ev.title)}</h2>${ev.text.split(/\n\n+/).map(t => `<p>${rich(t)}</p>`).join("")}${ev.gives ? `<p class="found">✓ ${T("Új nyom:")} ${esc(C.clues[ev.gives].t)}</p>` : ""}<div class="row"><button class="btn" data-close>${T("Folytatom a nyomozást")}</button></div></div>`;
    document.body.appendChild(ov);
    SND(ev.sound || "stamp");
    if (ev.flash) window.dispatchEvent(new CustomEvent("mm:lightning"));
    requestAnimationFrame(() => ov.classList.add("on"));
    const btn = ov.querySelector("[data-close]"); btn.focus();
    btn.onclick = () => { ov.remove(); rerender(); };
  }

  function openDedModal(id) {
    const d = dedsOf(C).find(x => x.id === id); if (!d) return;
    const ov = document.createElement("div"); ov.className = "intro on"; ov.setAttribute("role", "dialog");
    ov.innerHTML = `<div class="intro-card"><span class="eyebrow">${T("Következtetés")}</span>${dedForm(d)}<div class="row"><button class="link" data-close>${T("Bezárás")}</button></div></div>`;
    document.body.appendChild(ov);
    const close = () => { ov.remove(); rerender(); };
    ov.querySelector("[data-close]").onclick = close;
    ov.onclick = e => { if (e.target === ov) close(); };
    bindSentences(ov, close);
    // új szókártya után frissül az ablak, a már kiválasztott szavak megmaradnak
    ov.addEventListener("click", e => { if (e.target.closest("[data-word]")) setTimeout(() => { if (!ov.isConnected) return; const card = ov.querySelector(".intro-card"); card.innerHTML = `<span class="eyebrow">${T("Következtetés")}</span>${dedForm(d)}<div class="row"><button class="link" data-close>${T("Bezárás")}</button></div>`; card.querySelector("[data-close]").onclick = close; bindSentences(ov, close); }, 0); });
  }

  /* ---------- nyomozótábla ---------- */
  const BW = 1120, BH = 1160;
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
      out.push({ id: "c:" + k, kind: isDed(k) ? "pin-clue pin-ded" : "pin-clue", label: C.clues[k].t, x: p.x, y: p.y,
        html: `<span class="src">${esc(C.clues[k].src)}</span><b>${esc(C.clues[k].t)}</b>${S.noir && !isDed(k) ? "" : `<span class="tx" title="${esc(plain(C.clues[k].x))}">${esc(plain(C.clues[k].x))}</span>`}` });
    });
    // megnyitott, de még ki nem töltött következtetések
    dedsOf(C).filter(d => S.unl.includes(d.id) && !S.clues.includes(d.id)).forEach((d, i) => {
      const p = S.board["d:" + d.id] || { x: 24 + (i % 4) * 240, y: 300 + Math.ceil(S.clues.length / 5) * 140 + Math.floor(i / 4) * 130 };
      out.push({ id: "d:" + d.id, kind: "pin-clue pin-ded open", label: T("Kitöltetlen következtetés"), x: p.x, y: p.y,
        html: `<span class="src">${T("Következtetés")}</span><b>?</b><button class="btn small" data-fill="${d.id}">${T("Kitöltöm")}</button>` });
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
        <fieldset class="modes"><legend class="meta">${T("Nehézség")}</legend>
          <label class="opt master-opt"><input type="radio" name="lvl" value="normal" checked> <span><b>${T("Nyomozó")}</b> · ${T("súgók, jelölések és visszajelzés.")}</span></label>
          <label class="opt master-opt"><input type="radio" name="lvl" value="master" data-master> <span><b>${T("Mester mód")}</b> · ${T("nincs súgó, nincs ✦ jelölés és számláló, és senki sem mondja meg, mennyire jársz közel.")}</span></label>
          <label class="opt master-opt"><input type="radio" name="lvl" value="noir" data-noir> <span><b>${T("Noir mód")}</b> · ${T("mint a Mester mód, de a jegyzetfüzet csak a nyomok címét jegyzi fel. A kódokat, időpontokat neked kell leírnod a jegyzetlapodra.")}</span></label>
        </fieldset>
      </div>
      <button class="link intro-skip" data-skip>${T("Kihagyom")} ›</button></div>`;
    document.body.appendChild(ov);
    const box = ov.querySelector(".intro-text"), choose = ov.querySelector(".intro-choose");
    let i = 0, t = null;
    const finish = () => { clearInterval(t); box.textContent = full; choose.hidden = false; ov.querySelector("[data-skip]").hidden = true; const b = ov.querySelector("[data-mode]"); if (b) b.focus(); };
    if (reduce) finish(); else t = setInterval(() => { i += 2; box.textContent = full.slice(0, i); if (i % 6 === 0) SND("tick"); if (i >= full.length) finish(); }, 28);
    ov.querySelector("[data-skip]").onclick = finish;
    if (S.daily) {
      const d = daily(); choose.innerHTML = `<p class="meta">${T("Napi kihívás · {0}", d.label)}</p><p><b>${T("A mai szabály:")}</b> ${esc(d.rule.t)}</p><div class="row"><button class="btn" data-dstart>${T("Indulás")}</button></div><p class="meta">${T("Mindenki ugyanazt az ügyet kapja ma, ugyanazzal a szabállyal. A végén megoszthatod az eredményedet.")}</p>`;
      choose.querySelector("[data-dstart]").onclick = () => { S.introSeen = true; save(); ov.remove(); renderCase(); };
    }
    ov.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => { S.introSeen = true; S.timed = b.dataset.mode === "timed"; const lv = (ov.querySelector("input[name=lvl]:checked") || {}).value || "normal"; S.mode = lv; S.master = lv !== "normal"; S.noir = lv === "noir"; S.used = 0; save(); ov.remove(); renderCase(); });
    requestAnimationFrame(() => ov.classList.add("on"));
  }

  /* ---------- megosztható eredménykártya ---------- */
  async function shareCard(fmt) {
    fmt = fmt === "story" ? "story" : "post";
    const sc = score(S), W = 1080, H = fmt === "story" ? 1920 : 1350;
    try { await Promise.all(['italic 700 72px "Bodoni Moda"', '700 30px "Courier Prime"', '28px "Crimson Pro"'].map(f => document.fonts.load(f))); } catch (e) {}
    const img = new Image();
    if (HAS.has(`${C.id}/cover.webp`)) await new Promise(r => { img.onload = r; img.onerror = r; img.src = `images/${C.id}/cover.webp`; });
    let url;
    // ha a borító valamiért nem rajzolható vásznra, a kártya borító nélkül készül
    for (const withCover of [true, false]) { try { url = paintCard(sc, W, H, withCover && img.naturalWidth ? img : null); break; } catch (e) {} }
    if (!url) return;
    openShare(url, sc, fmt);
  }
  function paintCard(sc, W, H, img) {
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const g = cv.getContext("2d");
    g.fillStyle = "#12151c"; g.fillRect(0, 0, W, H);
    const story = H > 1600, CH = story ? 780 : 400, GAP = story ? 40 : 0;
    if (img) { const r = W / CH, ir = img.naturalWidth / img.naturalHeight, sw = ir > r ? img.naturalHeight * r : img.naturalWidth, sh = ir > r ? img.naturalHeight : img.naturalWidth / r; g.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, W, CH); }
    else { g.strokeStyle = "rgba(201,164,92,.18)"; g.lineWidth = 2; for (let i = 0; i <= 24; i++) { const a = Math.PI * i / 24; g.beginPath(); g.moveTo(W / 2, CH); g.lineTo(W / 2 - Math.cos(a) * 900, CH - Math.sin(a) * 900); g.stroke(); } }
    const grd = g.createLinearGradient(0, CH - 160, 0, CH); grd.addColorStop(0, "rgba(18,21,28,0)"); grd.addColorStop(1, "#12151c"); g.fillStyle = grd; g.fillRect(0, CH - 160, W, 160);
    g.strokeStyle = "#c9a45c"; g.lineWidth = 3; g.strokeRect(40, 40, W - 80, H - 80);
    const wrap = (txt, x, y, maxW, lh) => { const words = txt.split(" "); let line = ""; for (const w of words) { const t = line ? line + " " + w : w; if (g.measureText(t).width > maxW && line) { g.fillText(line, x, y); y += lh; line = w; } else line = t; } g.fillText(line, x, y); return y; };
    g.textAlign = "center";
    g.fillStyle = "#9ba1b3"; g.font = '700 26px "Courier Prime", monospace'; g.fillText(`${T("Rejtélyes gyilkosságok").toUpperCase()} · ${T("{0}. ügy", C.number).toUpperCase()} · ${T(C.difficulty).toUpperCase()}`, W / 2, CH + 40);
    g.fillStyle = "#e8e0c9"; g.font = 'italic 700 74px "Bodoni Moda", Georgia, serif'; let y = wrap(C.title, W / 2, CH + 130, W - 200, 84);
    g.save(); g.translate(W / 2, y + 80); g.rotate(-0.06); g.strokeStyle = "#e2595e"; g.lineWidth = 6; g.strokeRect(-220, -46, 440, 74);
    g.fillStyle = "#e2595e"; g.font = '700 44px "Courier Prime", monospace'; g.fillText(T("Ügy lezárva").toUpperCase(), 0, 6); g.restore();
    y += 280 + GAP; g.fillStyle = "#c9a45c"; g.font = 'italic 700 170px "Bodoni Moda", Georgia, serif'; g.fillText(String(sc), W / 2, y);
    g.font = '700 28px "Courier Prime", monospace'; g.fillText(T("pont").toUpperCase(), W / 2, y + 44);
    g.fillStyle = "#e8e0c9"; g.font = 'italic 46px "Crimson Pro", Georgia, serif'; y = wrap(rank(sc), W / 2, y + 120, W - 220, 54);
    g.fillStyle = "#9ba1b3"; g.font = '28px "Courier Prime", monospace';
    g.fillText(`${T("{0}. vádra", S.tries)} · ${hintsUsed(S) ? T("{0} súgó", hintsUsed(S)) : T("súgó nélkül")} · ${T("{0}/{1} ellentmondás", S.conf.length, contra(C).length)}`, W / 2, y + 64);
    if (S.timed) { g.fillStyle = "#7cc68e"; g.fillText(T("Hajnal előtt, {0} tartalékkal", fmtLeft(budget(C) - S.used)), W / 2, y + 108); }
    const pf = profile(), kc = career();
    const yEnd = y + 64 + (S.timed ? 44 : 0);
    if (story) { g.fillStyle = "#c9a45c"; g.font = 'italic 44px "Crimson Pro", Georgia, serif'; g.fillText(T("Te rájönnél, ki a gyilkos?"), W / 2, yEnd + 110); }
    g.fillStyle = "#e8e0c9"; g.font = '34px "Crimson Pro", Georgia, serif'; g.fillText(`${pf.avatar} ${pf.nick || T("Névtelen nyomozó")} · ${RANKICO[kc.i]} ${kc.rank}`, W / 2, story ? yEnd + 220 : Math.max(yEnd + 70, H - 150));
    g.fillStyle = "#c9a45c"; g.font = '700 26px "Courier Prime", monospace'; g.fillText("takacsalex93.github.io/MisteryMurders", W / 2, H - 80);
    return cv.toDataURL("image/png");
  }
  async function openShare(url, sc, fmt) {
    const text = `🕵️ ${T("Rejtélyes gyilkosságok")} – ${C.title}\n${T("{0} pont", sc)} · ${rank(sc)}\n${T("{0}. vádra", S.tries)}, ${hintsUsed(S) ? T("{0} súgóval", hintsUsed(S)) : T("súgó nélkül")}${S.timed ? ", " + T("hajnal előtt") : ""}\nhttps://takacsalex93.github.io/MisteryMurders/`;
    const ov = document.createElement("div"); ov.className = "intro on"; ov.setAttribute("role", "dialog");
    ov.innerHTML = `<div class="intro-card sharebox"><div class="btabs fmt"><button class="chip ${fmt === "post" ? "on" : ""}" data-fmt="post">${T("Bejegyzés")} · 4:5</button><button class="chip ${fmt === "story" ? "on" : ""}" data-fmt="story">${T("Story")} · 9:16</button></div><img class="sharecard ${fmt}" src="${url}" alt="${T("Eredménykártya")}"><div class="row"><button class="btn" data-native hidden>${T("Megosztás")}</button><a class="btn ghost" href="${url}" download="${C.id}-${fmt}.png">${T("Kép letöltése")}</a><button class="btn ghost" data-copytext>${T("Szöveg másolása")}</button><button class="link" data-close>${T("Bezárás")}</button></div><p class="msg" data-sharemsg></p></div>`;
    document.body.appendChild(ov);
    const m = ov.querySelector("[data-sharemsg]");
    ov.querySelector("[data-close]").onclick = () => ov.remove();
    ov.onclick = e => { if (e.target === ov) ov.remove(); };
    ov.querySelectorAll("[data-fmt]").forEach(b => b.onclick = () => { if (b.dataset.fmt === fmt) return; ov.remove(); shareCard(b.dataset.fmt); });
    ov.querySelector("[data-copytext]").onclick = () => { try { navigator.clipboard.writeText(text).then(() => { m.className = "msg ok"; m.textContent = T("Kimásolva, beillesztheted bárhová."); }, () => { m.textContent = text; }); } catch (e) { m.textContent = text; } };
    try {
      const blob = await (await fetch(url)).blob(), file = new File([blob], `${C.id}-eredmeny.png`, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { const b = ov.querySelector("[data-native]"); b.hidden = false; b.onclick = () => navigator.share({ files: [file], text }).catch(() => {}); }
    } catch (e) {}
  }

  const itemOf = (l, id) => (l.items || []).find(i => i.clue === id);
  function lookHtml(l) {
    return l.look.split(/\n\n+/).map(par => `<p>${esc(par).replace(/\[\[(.+?)\|(.+?)\]\]/g, (m, txt, id) => {
      const it = itemOf(l, id), done = it ? S.clues.includes(id) : S.seen.includes(l.id + ":" + id);
      return `<span class="spot ${done ? (it ? "got" : "seen") : ""}" role="button" tabindex="0" data-spot="${id}">${txt}</span>`;
    })}</p>`).join("");
  }
  const remaining = l => (l.items || []).filter(it => !S.clues.includes(it.clue)).length;
  /* ---------- bejárható pixelvilág (js/world.js), ha az ügyhöz van térkép ---------- */
  const WDATA = () => window.MM_WORLDS && C && window.MM_WORLDS[C.id];
  const worldOn = () => !!(WDATA() && WORLD) && S.view !== "text";
  const viewSwitch = () => WDATA() && WORLD ? `<div class="viewsw" role="group"><button class="link" data-view="world" aria-pressed="${worldOn()}">🎮 ${T("Bejárás")}</button><button class="link" data-view="text" aria-pressed="${!worldOn()}">📜 ${T("Leírás")}</button></div>` : "";
  function viewLoc(l) {
    let h = `<div class="stack"><div class="row" style="justify-content:space-between"><button class="link" data-back>← ${T("Vissza az alaprajzhoz")}</button>${viewSwitch()}</div>
      <div class="art locart">${ART.scene(l, l.name)}</div>
      <span class="eyebrow">${T("Helyszín")}</span><h2>${esc(l.name)}</h2>`;
    if (l.look) {
      h += `<p class="meta">${T("Kattints arra a részletre, amit közelebbről megnéznél. Nem minden gyanús dolog nyom.")}</p><div class="look">${lookHtml(l)}</div>`;
      const seen = Object.keys(l.decoys || {}).filter(k => S.seen.includes(l.id + ":" + k));
      if (seen.length) h += `<div class="seenlist">${seen.map(k => `<p><span class="meta">${T("Megnézted:")}</span> ${rich(l.decoys[k])}</p>`).join("")}</div>`;
      (l.items || []).filter(it => S.clues.includes(it.clue)).forEach(it => {
        h += `<div class="item" data-item="${it.clue}"><h3>${esc(it.label)}</h3><p>${rich(it.text)}</p><span class="found">✓ ${T("Nyom feljegyezve:")} ${esc(C.clues[it.clue].t)}</span><p class="typed" data-hl="${esc(plain(C.clues[it.clue].t))}">${rich(C.clues[it.clue].x)}</p></div>`;
      });
      if (l.puzzle) h += `<div class="item" data-puzzle="${l.puzzle}">${renderPuzzle(l.puzzle)}</div>`;
      return h + `</div>`;
    }
    h += `<p>${esc(l.desc)}</p>`;
    (l.items || []).forEach(it => {
      const has = S.clues.includes(it.clue);
      h += `<div class="item"><h3>${esc(it.label)}</h3><p>${esc(it.text)}</p>${has
        ? `<span class="found">✓ ${T("Nyom feljegyezve:")} ${esc(C.clues[it.clue].t)}</span><p class="typed">${esc(C.clues[it.clue].x)}</p>`
        : `<div class="row"><button class="btn ghost" data-take="${it.clue}">${T("Megvizsgálom")}</button></div>`}</div>`;
    });
    if (l.puzzle) h += `<div class="item" data-puzzle="${l.puzzle}">${renderPuzzle(l.puzzle)}</div>`;
    return h + `</div>`;
  }

  // „Mit hagytál ki?”: titkok, le nem leplezett hazugságok, meg nem nézett részletek
  function missedHtml() {
    const sec = (WDATA() && WDATA().secrets) || [], got = sec.filter(x => (S.secrets || []).includes(x.id));
    const lies = contra(C).filter(k => k.lie !== false), hidden = lies.filter(k => !S.conf.includes(k.id));
    const dec = C.locations.flatMap(l => Object.keys(l.decoys || {}).map(k => l.id + ":" + k)), seen = dec.filter(k => S.seen.includes(k)).length;
    const who = [...new Set(hidden.map(k => (C.suspects.find(x => x.id === k.suspect) || {}).name).filter(Boolean))];
    const row = (ok, t) => `<li class="${ok ? "ok" : ""}">${ok ? "✓" : "○"} ${t}</li>`;
    return `<div class="missed"><span class="eyebrow">${T("Mit hagytál ki?")}</span><ul class="checklist">
      ${sec.length ? row(got.length === sec.length, T("Titkok: {0} / {1}", got.length, sec.length)) : ""}
      ${lies.length ? row(!hidden.length, T("Leleplezett hazugságok: {0} / {1}", lies.length - hidden.length, lies.length) + (who.length ? " · " + T("titkát megtartotta: {0}", who.join(", ")) : "")) : ""}
      ${dec.length ? row(seen === dec.length, T("Megnézett részletek: {0} / {1}", seen, dec.length)) : ""}
      </ul>${sec.length > got.length ? `<p class="meta">${T("Rejtve maradt:")} ${sec.filter(x => !got.includes(x)).map(x => esc(x.hint)).join(" · ")}</p>` : ""}</div>`;
  }
  function viewEnding(revealOnly) {
    const hu = hintsUsed(S), sc = score(S);
    const culprit = C.suspects.find(s => s.id === culpritId());
    const conf = !revealOnly && C.confession ? `<div class="rv-obj confess"><div class="art portrait">${culprit ? ART.portrait(culprit) : ""}</div><div><b>${culprit ? esc(culprit.name) : ""}</b><p>${esc(C.confession)}</p></div></div>` : "";
    const stats = revealOnly ? `<p class="eyebrow">${T("A megoldás, amit nem sikerült bizonyítanod")}</p>`
      : `<p class="rank">${T("{0} pont", sc)} · ${rank(sc)}</p>${S.timed ? `<p class="found">⏱ ${T("Hajnal előtt megoldva, {0} tartalékkal", fmtLeft(budget(C) - S.used))}</p>` : ""}<p class="eyebrow">${T("{0}. vádra", S.tries)} · ${hu ? T("{0} súgó", hu) : T("súgó nélkül")} · ${T("{0} téves szembesítés", S.wrongConf || 0)}${S.rmiss ? " · " + T("{0} elhibázott bizonyíték", S.rmiss) : ""} · ${T("{0}/{1} ellentmondás", S.conf.length, contra(C).length)} · ${T("{0}/{1} nyom", rawIds(C).filter(k => S.clues.includes(k)).length, rawIds(C).length)}${S.wrongDed ? " · " + T("{0} elhamarkodott összevetés", S.wrongDed) : ""}${S.master ? " · " + T("Mester mód") : ""}</p>`;
    return `<div class="stack"><div class="ending ${revealOnly ? "lost" : ""}"><div class="row" style="justify-content:space-between;align-items:flex-start"><div class="art portrait" style="width:110px">${culprit ? ART.portrait(culprit) : ""}</div><span class="stamp anim">${T(revealOnly ? "Megoldás" : "Ügy lezárva")}</span></div>
      <h2>${esc(C.ending.heading)}</h2>
      ${conf}
      ${!revealOnly && C.carnation ? `<div class="carnation"><span class="eyebrow">${T("A titkos szál")}</span><p>${esc(C.carnation.found)}</p><p class="typed">${glyphText(C.carnation.note)}</p><span class="cletter big">${esc(C.carnation.letter)}</span><p class="meta">${FINALE && unlocked(FINALE) ? T("Megvan mind a hat cédula. A címoldalon megnyílt a záró ügy.") : T("{0} / {1} cédula a címoldalon, A titkos szál alatt.", THREAD.filter(wonCase).length, THREAD.length)}</p></div>` : ""}
      ${C.ending.paragraphs.map(p => `<p>${esc(p)}</p>`).join("")}
      ${revealOnly ? "" : aftermath()}
      ${revealOnly ? "" : missedHtml()}
      ${stats}</div>
      ${revealOnly ? "" : dailyBox()}
      ${revealOnly ? "" : onlineBox()}
      ${revealOnly ? "" : saveNudge()}
      ${revealOnly ? "" : feedbackBox()}
      ${!revealOnly && C.sequel ? `<div class="sequel"><span class="eyebrow">${T("Utóirat")}</span>${C.sequel.map(p => `<p>${esc(p)}</p>`).join("")}<p class="meta">${T("A második évad hamarosan.")}</p></div>` : ""}
      <div class="row"><a class="btn" href="#">${T("Vissza az ügyekhez")}</a>${revealOnly ? `<button class="btn ghost" data-restart>${T("Újrakezdem az ügyet")}</button>` : `<button class="btn ghost" data-share>${T("Eredménykártya")}</button>`}</div></div>`;
  }
  function viewReveal() {
    const steps = C.reveal, i = S.rstep, st = steps[i];
    const who = C.suspects.find(x => x.id === st.who);
    const past = steps.slice(0, i).map(p => `<div class="rv-done"><p class="rv-say">${esc(p.say)}</p><p class="rv-win">${esc(p.win)}</p></div>`).join("");
    const opts = S.clues.map(k => `<option value="${k}">${isDed(k) ? "◆ " : ""}${esc(plain(C.clues[k].t))}</option>`).join("");
    return `<div class="stack reveal"><span class="eyebrow">${T("A leleplezés · {0}. lépés / {1}", i + 1, steps.length)}</span><h2>${T("Az igazság pillanata")}</h2>
      <p class="meta">${T("A vád megállt. Most mondd el nekik, hogyan történt. Minden ellenvetésre felelj a megfelelő bizonyítékkal.")}</p>
      ${past}
      <p class="rv-say lead">${esc(st.say)}</p>
      <div class="rv-obj"><div class="art portrait">${who ? ART.portrait(who) : ""}</div><div><b>${who ? esc(who.name) : ""}</b><p>${esc(st.objection)}</p></div></div>
      <div class="confront"><select id="rv-proof" aria-label="${T("Bizonyíték")}"><option value="">${T("Felmutatom a bizonyítékot…")}</option>${opts}</select><button class="btn" data-rv>${T("Felmutatom")}</button></div>
      <p class="msg" data-rvmsg></p></div>`;
  }
  /* ---------- „Következő lépés”: mindig megmondja, mi a teendő (Mester módban nincs) ---------- */
  const openQs = sid => ((C.interviews || {})[sid] || []).filter(q => (!q.after || S.clues.includes(q.after)) && (!q.afterConf || S.conf.includes(q.afterConf)) && !S.asked.includes(sid + ":" + q.id));
  const haveAny = f => [].concat(f).some(x => S.clues.includes(x));
  function nextStep() {
    if (!C || S.ended || S.master) return null;
    const acc = l => !l.requires || S.solved[l.requires], locOfP = p => C.locations.find(l => l.puzzle === p), world = worldOn();
    const look = world ? T("keresd a csillogó dolgokat, és nyomd meg mellettük az E-t") : T("kattints a leírás kiemelt részleteire");
    const cur = S.cur && C.locations.find(l => l.id === S.cur);
    if (cur && remaining(cur)) return { k: "look", t: T("Kutasd át ezt a helyiséget: {0}. Még {1} nyom van itt: {2}.", cur.name, remaining(cur), look), tab: "hely" };
    const open = C.locations.find(l => acc(l) && remaining(l));
    if (open) return { k: "go", t: T("Menj tovább ide: {0}. Még {1} nyom vár ott.", open.name, remaining(open)), tab: "hely" };
    const lockedL = C.locations.find(l => !acc(l));
    if (lockedL) { const pl = locOfP(lockedL.requires); return { k: "puzzle", t: T("Zárva van: {0}. Kinyitásához oldd meg ezt a rejtvényt: {1}{2}.", lockedL.name, C.puzzles[lockedL.requires].title, pl ? ` (${pl.name})` : ""), tab: "hely" }; }
    const up = pids(C).find(p => !S.solved[p]);
    if (up) { const pl = locOfP(up); return { k: "puzzle", t: T("Oldd meg a rejtvényt: {0}{1}. {2}", C.puzzles[up].title, pl ? ` (${pl.name})` : "", world ? T("Az arany ✦ jel mutatja a térképen.") : ""), tab: "hely" }; }
    const sq = C.suspects.find(x => openQs(x.id).length);
    if (sq) return { k: "talk", t: T("Beszélj vele: {0}. Van még kérdésed hozzá. {1}", sq.name, world ? T("A térképen a „…” buborék jelzi.") : ""), tab: world ? "hely" : "gyan" };
    const cf = contra(C).find(k => !S.conf.includes(k.id) && haveAny(k.clue));
    if (cf) return { k: "confront", t: T("Valakinek a vallomása ütközik az egyik nyomoddal. Olvasd el újra a vallomásokat, és szembesítsd az illetőt a megfelelő nyommal (Gyanúsítottak fül)."), tab: "gyan" };
    const dd = dedsOf(C).filter(d => !S.clues.includes(d.id) && haveAny(d.from[0]) && haveAny(d.from[1]));
    if (dd.length) return S.unl.some(id => dd.find(d => d.id === id))
      ? { k: "fill", t: T("Van egy megnyitott következtetésed. Töltsd ki a hiányos mondatot a szókártyáiddal (a nyomok szövegében aláhúzott szavak)."), tab: "jegy" }
      : { k: "deduce", t: T("Gondold végig a nyomokat: a Táblán köss össze piros fonallal kettőt, amelyek összetartoznak. Még {0} következtetés vár rád.", dd.length), tab: "tabla" };
    if (ready()) return world && WDATA().gather ? { k: "accuse", t: T("Minden bizonyíték megvan. Mindenki összegyűlt: {0}. Menj oda a tettes elé, beszélj vele, és mutass rá. Utána a Vádemelés fülön mondd el, mi történt.", WDATA().gather.label), tab: "hely" }
      : { k: "accuse", t: T("Minden bizonyíték megvan. A Vádemelés fülön mondd el, mi történt, és nevezd meg a tettest."), tab: "vad" };
    return null;
  }
  const coachHtml = () => { const n = nextStep(); return n ? `<span class="coach-k">${T(C.tutor ? "Oktatás" : "Következő lépés")}</span><span class="coach-t">${esc(n.t)}${C.tutor && C.tutor[n.k] ? `<span class="coach-tut">💡 ${esc(C.tutor[n.k])}</span>` : ""}</span>${n.tab !== S.tab ? `<button class="link" data-coach="${n.tab}">${T("Odamegyek")} →</button>` : ""}` : ""; };
  function bindCoach() { const b = document.querySelector("[data-coachbar]"); if (!b) return; b.hidden = !b.innerHTML.trim(); b.querySelectorAll("[data-coach]").forEach(x => x.onclick = () => go(x.dataset.coach)); }
  function updateCoach() { const b = document.querySelector("[data-coachbar]"); if (b) { b.innerHTML = coachHtml(); bindCoach(); } }
  function pointAt(sid) {
    const A = C.accusation, wi = (A.who || [0])[0];
    S.dsel.acc = S.dsel.acc || []; S.dsel.acc[wi] = sid; S.pointed = sid; save(); SND("stamp"); go("vad");
  }
  const ready = () => dedsOf(C).every(d => S.clues.includes(d.id)) && pids(C).every(p => S.solved[p]);
  const culpritId = () => [].concat(C.accusation.b[(C.accusation.who || [0])[0]])[0];
  function viewWrong() {
    const s = C.suspects.find(x => x.id === S.accused);
    const fate = s ? ((C.fates || {})[s.id] || T("{0} hiába bizonygatta az ártatlanságát. A bíróság a te vallomásod alapján ítélte el.", s.name)) : T("Az ügyet balesetként zárták le, és senki sem kereste tovább a tettest.");
    return `<div class="stack"><div class="ending lost"><div class="row" style="justify-content:space-between;align-items:flex-start">${s ? `<div class="art portrait" style="width:110px">${ART.portrait(s)}</div>` : ""}<span class="stamp anim">${T("Téves vád")}</span></div>
      <h2>${s ? T("{0} letartóztatása", s.name) : T("Lezárt akta")}</h2>
      ${fate.split(/\n\n+/).map(p => `<p>${esc(p)}</p>`).join("")}
      <p>${T("A valódi tettes végignézte, ahogy elvezetik a megvádoltat. Másnap reggel ő is elhagyta a házat, szabadon.")}</p>
      <p class="meta">${T("Újrakezdheted az ügyet, vagy megnézheted, mi történt valójában.")}</p></div>
      ${feedbackBox()}
      <div class="row"><button class="btn" data-restart>${T("Újrakezdem az ügyet")}</button><button class="btn ghost" data-reveal>${T("Megmutatom a megoldást")}</button></div></div>`;
  }
  function aftermath() {
    const miss = contra(C).filter(k => !S.conf.includes(k.id));
    const names = [...new Set(miss.map(k => k.suspect))].map(id => C.suspects.find(x => x.id === id)).filter(Boolean).map(x => x.short || x.name);
    const dn = dedsOf(C).filter(d => S.clues.includes(d.id)).length, dt = dedsOf(C).length;
    const all = !miss.length && dn === dt;
    return `<div class="aftermath"><span class="eyebrow">${T("Ami kiderült, és ami rejtve maradt")}</span>
      <p>${all ? T("Semmi sem maradt rejtve. A ház minden titka napvilágra került, és a vádirat egyetlen kérdést sem hagyott nyitva.")
        : names.length ? T("Nem mindenki titka került napvilágra. {0} elhallgatott valamit, amire sosem kérdeztél rá, és ez a titok velük együtt távozott a házból.", names.join(", ")) : T("Minden hazugságot leleplezted, de nem minden következtetést vontál le.")}</p>
      ${dt ? `<p class="meta">${T("Levont következtetések: {0} / {1}", dn, dt)} · ${T("{0}/{1} ellentmondás", S.conf.length, contra(C).length)}</p>` : ""}</div>`;
  }
  /* ---------- közös ranglista (js/online.js; ha nincs beállítva, semmi sem látszik belőle) ---------- */
  const ON = window.MM_ONLINE && window.MM_ONLINE.enabled ? window.MM_ONLINE : null;
  const runOf = st => st.daily ? "daily:" + st.daily : C.weekly ? "weekly" : "normal";
  function onlineBox() {
    if (!ON || S.ended !== "win") return "";
    const form = !S.submitted ? `<p>${T("Tedd fel az eredményed a közös ranglistára, és nézd meg, hogyan teljesítettek a többiek.")}</p>
      <div class="row"><input class="nick" data-nick maxlength="20" placeholder="${T("Becenév")}" value="${esc(ON.nick())}" aria-label="${T("Becenév")}"><button class="btn" data-submit>${T("Felteszem")}</button><button class="link" data-noboard>${T("Most nem")}</button></div>
      <p class="meta">${T("Csak a beceneved, a pontszámod, a próbálkozások, a súgók és az idő kerül fel. Ne add meg a valódi neved, ha nem szeretnéd.")}</p><p class="msg" data-onmsg></p>` : "";
    return `<div class="onlinebox"><span class="eyebrow">${T(S.daily ? "A mai kihívás ranglistája" : "Ranglista: {0}", S.daily ? "" : C.title)}</span>${form}<div data-oblist>${S.submitted ? `<p class="meta">${T("Betöltés…")}</p>` : ""}</div></div>`;
  }
  function boardHtml(rows, kind) {
    if (!rows.length) return `<p class="meta">${T("Még senki sem került fel. Légy te az első!")}</p>`;
    const me = ON.me(), mi = rows.findIndex(r => r.player_id === me);
    const line = (r, i) => `<li class="${r.player_id === me ? "me" : ""}"><span class="pos">${i + 1}.</span><b>${esc(r.player)}</b>${kind === "tot"
      ? `<span class="meta">${T("{0} ügy", r.solved)}</span><span class="pts">${T("{0} pont", r.points)}</span>`
      : `<span class="meta">${T("{0}. vádra", r.tries)} · ${r.hints ? T("{0} súgó", r.hints) : T("súgó nélkül")}${r.minutes ? " · " + T("{0} perc", r.minutes) : ""}${r.mode && r.mode !== "normal" ? " · " + T(r.mode === "noir" ? "Noir" : "Mester") : ""}</span><span class="pts">${T("{0} pont", r.score)}</span>`}</li>`;
    let h = rows.slice(0, 10).map(line).join("");
    if (mi >= 10) h += `<li class="gap">…</li>` + line(rows[mi], mi);
    return `<ol class="lboard">${h}</ol><p class="meta">${T("{0} nyomozó a listán", rows.length)}${mi >= 0 ? " · " + T("a te helyed: {0}.", mi + 1) : ""}</p>`;
  }
  function loadBoard(el, p, kind) {
    if (!el) return;
    el.innerHTML = `<p class="meta">${T("Betöltés…")}</p>`;
    p.then(rows => { el.innerHTML = boardHtml(rows, kind); }).catch(() => { el.innerHTML = `<p class="meta">${T("A ranglista most nem érhető el. Próbáld újra később.")}</p>`; });
  }
  function bindOnline() {
    if (!ON || S.ended !== "win") return;
    const list = document.querySelector("[data-oblist]"), runId = runOf(S);
    if (S.submitted) { loadBoard(list, ON.board(C.id, runId)); return; }
    const sub = document.querySelector("[data-submit]"), m = document.querySelector("[data-onmsg]"), inp = document.querySelector("[data-nick]");
    if (!sub) return;
    document.querySelector("[data-noboard]").onclick = () => { S.submitted = "skip"; save(); renderCase(); };
    inp.onkeydown = e => { if (e.key === "Enter") sub.click(); };
    sub.onclick = () => {
      const n = inp.value.trim();
      if (n.length < 2) { m.className = "msg bad"; m.textContent = T("A becenév legalább 2 karakter legyen."); return; }
      ON.setNick(n); sub.disabled = true; m.className = "msg"; m.textContent = T("Küldés…");
      const vi = C.variants && C.variants.length ? C.variants[S.variant % C.variants.length].id : null;
      ON.submit({ player: profile().avatar + " " + n, case_id: C.id, run: runId, score: score(S), tries: Math.max(1, Math.min(5, S.tries || 1)), hints: hintsUsed(S), minutes: S.secs ? Math.max(1, Math.min(5000, Math.round(S.secs / 60))) : null, mode: S.noir ? "noir" : S.master ? "master" : "normal", timed: !!S.timed, variant: vi ? String(vi) : null })
        .then(ok => { if (!ok) throw 0; S.submitted = 1; save(); SND("stamp"); renderCase(); })
        .catch(() => { sub.disabled = false; m.className = "msg bad"; m.textContent = T("Nem sikerült elküldeni. Ellenőrizd a netet, és próbáld újra."); });
    };
  }
  let cdTimer = 0;
  function bindCountdown() {
    clearInterval(cdTimer);
    const tick = () => {
      const el = document.querySelector("[data-countdown]"); if (!el) { clearInterval(cdTimer); return; }
      const now = new Date(), mid = new Date(now); mid.setHours(24, 0, 0, 0);
      const m = Math.max(0, Math.round((mid - now) / 60000)), h = Math.floor(m / 60);
      el.textContent = "⏳ " + (h ? T("Új ügy {0} óra {1} perc múlva", h, m % 60) : T("Új ügy {0} perc múlva", m));
    };
    tick(); cdTimer = setInterval(tick, 30000);
  }
  function ago(iso) {
    const m = Math.max(0, Math.round((Date.now() - new Date(iso)) / 60000));
    return m < 1 ? T("az imént") : m < 60 ? T("{0} perce", m) : m < 1440 ? T("{0} órája", Math.floor(m / 60)) : T("{0} napja", Math.floor(m / 1440));
  }
  function bindTicker() {
    const box = document.querySelector("[data-ticker]"); if (!ON || !box) return;
    const d = daily(), title = id => (CASES.find(c => c.id === id) || {}).title || id;
    Promise.all([ON.recent().catch(() => []), ON.board(d.id, "daily:" + d.key).catch(() => [])]).then(([rows, today]) => {
      const items = [];
      if (today.length) items.push(T("Ma már {0} nyomozó teljesítette a napi kihívást. A legjobb: {1}, {2} ponttal.", today.length, today[0].player, today[0].score));
      rows.slice(0, 12).forEach(r => items.push(`<b>${esc(r.player)}</b> ${r.run.startsWith("daily") ? T("teljesítette a napi kihívást") : T("megoldotta: {0}", "<i>" + esc(title(r.case_id)) + "</i>")} · ${T("{0} pont", r.score)} · <span>${ago(r.created_at)}</span>`));
      if (!items.length) return;
      const line = items.map(t => `<span class="tk-it">${t.includes("<") ? t : esc(t)}</span>`).join('<span class="tk-sep">✦</span>');
      const inn = box.querySelector("[data-tkin]"); inn.innerHTML = line + '<span class="tk-sep">✦</span>' + line + '<span class="tk-sep">✦</span>';
      box.hidden = false; inn.style.animationDuration = Math.max(25, items.length * 9) + "s";
    });
  }
  // a nyitókép háttere lassabban mozdul, mint a szöveg
  if (!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    let pr = 0;
    window.addEventListener("scroll", () => { if (pr) return; pr = requestAnimationFrame(() => { pr = 0; const b = document.querySelector(".hero-bg"); if (b && scrollY < 900) b.style.transform = `translate3d(0,${(scrollY * 0.32).toFixed(1)}px,0) scale(1.08)`; }); }, { passive: true });
  }
  function boardSection() {
    if (!ON) return "";
    const opts = CASES.filter(c => !c.finale || unlocked(c)).map(c => `<option value="${c.id}">${esc(c.title)}</option>`).join("");
    return `<section class="level boards"><div class="level-head"><h2>${T("Ranglista")}</h2><p>${T("Nézd meg, hogyan teljesítettek a többi nyomozók. Ha megoldasz egy ügyet, a végén felteheted az eredményed.")}</p></div>
      <div class="btabs"><button class="chip on" data-btab="napi">${T("Mai kihívás")}</button><button class="chip" data-btab="ossz">${T("Összesített")}</button><button class="chip" data-btab="ugy">${T("Ügyenként")}</button><select data-bcase hidden aria-label="${T("Ügy")}">${opts}</select></div>
      <div data-blist></div></section>`;
  }
  function bindBoards() {
    if (!ON) return;
    const el = document.querySelector("[data-blist]"); if (!el) return;
    const sel = document.querySelector("[data-bcase]");
    const show = t => {
      document.querySelectorAll("[data-btab]").forEach(b => b.classList.toggle("on", b.dataset.btab === t)); sel.hidden = t !== "ugy";
      if (t === "napi") { const d = daily(); loadBoard(el, ON.board(d.id, "daily:" + d.key)); }
      else if (t === "ossz") loadBoard(el, ON.totals(), "tot");
      else { const c = CASES.find(x => x.id === sel.value); loadBoard(el, ON.board(sel.value, c && c.weekly ? "weekly" : "normal")); }
    };
    document.querySelectorAll("[data-btab]").forEach(b => b.onclick = () => show(b.dataset.btab));
    sel.onchange = () => show("ugy");
    show("napi");
    ON.counts().then(cn => document.querySelectorAll("[data-solvers]").forEach(x => { const n = cn[x.dataset.solvers]; if (n) x.textContent = "👥 " + T("{0} nyomozó oldotta meg", n); })).catch(() => {});
  }
  function dailyBox() {
    if (!S.daily) return "";
    return `<div class="dailybox"><span class="eyebrow">${T("Napi kihívás")}</span><pre class="typed" data-dtext>${esc(dailyShareText())}</pre><div class="row"><button class="btn" data-dcopy>${T("Eredmény másolása")}</button><a class="btn ghost" href="#">${T("Vissza a címoldalra")}</a></div><p class="msg" data-dmsg></p></div>`;
  }
  function viewLose() {
    return `<div class="stack">${dailyBox()}<div class="ending lost"><span class="stamp" style="align-self:flex-start">${T("Elszalasztva")}</span>
      <h2>${T(S.ended === "timeout" ? "Megérkeztek a csendőrök." : "A tettes kicsúszott a kezeid közül.")}</h2>
      <p>${T(S.ended === "timeout" ? "Kifutottál az időből. Hajnalban megérkeztek a csendőrök, és a bizonyítékok hiányában mindenkit elengedtek. A gyilkos még aznap reggel eltűnt." : "Harmadszor sem állt meg a vád. Reggel megérkeztek a csendőrök, de a bizonyítékok addigra összekuszálódtak, és a gyilkos szabadon távozott. Ilyen is előfordul a legjobbakkal.")}</p>
      <p>${T("Újrakezdheted az ügyet tiszta lappal, vagy megnézheted, mi történt valójában.")}</p></div>
      ${feedbackBox()}
      <div class="row"><button class="btn" data-restart>${T("Újrakezdem az ügyet")}</button><button class="btn ghost" data-reveal>${T("Megmutatom a megoldást")}</button></div></div>`;
  }

  /* ---------- rejtvények ---------- */
  function hintBlock(pid) {
    const p = C.puzzles[pid], n = S.hints[pid] || 0, all = (p.hints || []).length;
    if (!all || S.master) return "";
    const shown = p.hints.slice(0, n).map((t, i) => `<p class="hint"><b>${i + 1}.</b> ${esc(t)}</p>`).join("");
    const btn = !S.solved[pid] && n < all ? `<button class="btn ghost small" data-hint="${pid}">${T("Súgó kérése")} (${n + 1}/${all})</button>` : "";
    return `<div class="hints">${shown}</div>${btn ? `<div class="row">${btn}</div>` : ""}`;
  }
  const solvedBlock = (pid, label) => {
    const p = C.puzzles[pid];
    return `<span class="found">✓ ${T(label)}</span><p class="typed" data-hl="${esc(plain(C.clues[p.reward].t))}">${rich(C.clues[p.reward].x)}</p>${p.afterSolve || ""}`;
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
          if (ok === ids.length) { solve(pid); renderCase(); } else msg(S.master ? T("Nem stimmel.") : T("{0} / {1} helyes. Olvasd újra a vallomásokat.", ok, ids.length));
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
          if (ok === cur.length) { solve(pid); renderCase(); } else msg(S.master ? T("Nem stimmel.") : T("{0} / {1} esemény van a helyén.", ok, cur.length));
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
    },
    /* dokumentumelemzés: egy hosszú naplóból ki kell jelölni a döntő sor(oka)t */
    log: {
      render(pid, p) {
        const done = S.solved[pid], sel = done ? [].concat(p.answer) : (S.inputs[pid] || []);
        return `${p.body}<div class="tablewrap"><table class="logtable"><thead><tr>${p.cols.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>
          ${p.rows.map((r, i) => `<tr class="${sel.includes(i) ? "picked" : ""}" ${done ? "" : `data-lrow="${i}" tabindex="0" role="button" aria-pressed="${sel.includes(i)}"`}>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}
          </tbody></table></div>
          ${done ? solvedBlock(pid, "Megvan") : `<p class="meta">${T("Kattints a sorokra a kijelöléshez.")} ${S.master ? "" : T("Jelölj ki {0} sort.", [].concat(p.answer).length)}</p><div class="row"><button class="btn" data-try>${T("Ellenőrzöm")}</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        root.querySelectorAll("[data-lrow]").forEach(tr => {
          const tog = () => { const i = +tr.dataset.lrow, cur = S.inputs[pid] || []; S.inputs[pid] = cur.includes(i) ? cur.filter(x => x !== i) : cur.concat(i); save(); SND("tick"); tr.classList.toggle("picked"); tr.setAttribute("aria-pressed", String(S.inputs[pid].includes(i))); };
          tr.onclick = tog; tr.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tog(); } };
        });
        root.querySelector("[data-try]").onclick = () => {
          const cur = (S.inputs[pid] || []).slice().sort((a, b) => a - b), ans = [].concat(p.answer).slice().sort((a, b) => a - b);
          if (!cur.length) return msg(T("Előbb jelölj ki legalább egy sort."));
          if (cur.join() === ans.join()) { solve(pid); renderCase(); return; }
          msg((cur.length === 1 && p.wrong && p.wrong[cur[0]]) || (S.master ? T("Nem stimmel.") : T("Nem ezek a sorok. Vesd össze újra a vallomásokkal.")));
        };
      }
    },
    /* ujjlenyomat-összehasonlítás: a részleges nyomot kell azonosítani */
    print: {
      render(pid, p) {
        const done = S.solved[pid], ans = p.options.find(o => o.v === p.answer);
        return `${p.body}<div class="prints"><figure class="ref">${fingerprint(ans.seed, ans.type, true)}<figcaption>${esc(p.refLabel)}</figcaption></figure></div>
          <div class="prints">${p.options.map(o => `<label class="pr ${done && o.v === p.answer ? "hit" : ""}"><input type="radio" name="${pid}" value="${o.v}" ${done ? "disabled" : ""} ${done && o.v === p.answer ? "checked" : ""}>${fingerprint(o.seed, o.type, false)}<span><b>${o.v}</b> · ${esc(o.label)}</span></label>`).join("")}</div>
          ${done ? solvedBlock(pid, "Azonosítva") : `<div class="row"><button class="btn" data-try>${esc(p.confirm || T("Ez egyezik"))}</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        root.querySelector("[data-try]").onclick = () => {
          const v = (root.querySelector(`input[name="${pid}"]:checked`) || {}).value;
          if (!v) return msg(T("Előbb válassz egyet."));
          if (v === p.answer) { solve(pid); renderCase(); } else msg(S.master ? T("Nem stimmel.") : T("Nem egyezik. Figyeld a rajzolat típusát és a megszakadó vonalakat."));
        };
      }
    },
    /* jelírás: a fekete szegfű jeleinek jelentését a korábbi cédulákból kell kikövetkeztetni */
    glyph: {
      render(pid, p) {
        const done = S.solved[pid], cur = S.inputs[pid] || {}, gl = symState().g;
        return `${p.body}<div class="glyphmsg">${p.msg.map((g, i) => `<div class="gcell">${glyph(g)}${done ? `<b>${esc(SYMMEAN[g])}</b>` : `<select data-gsel="${i}" aria-label="${T("A(z) {0}. jel jelentése", i + 1)}"><option value="">?</option>${MEANINGS.map(m => `<option ${(cur[i] || gl[g]) === m ? "selected" : ""}>${esc(m)}</option>`).join("")}</select>`}</div>`).join("")}</div>
          ${done ? solvedBlock(pid, "Megfejtve") : `<div class="row"><button class="btn" data-try>${T("Elolvasom")}</button></div><p class="msg" data-msg></p>${hintBlock(pid)}`}`;
      },
      bind(pid, p, root, msg) {
        const gl = symState().g;
        S.inputs[pid] = S.inputs[pid] || {};
        p.msg.forEach((g, i) => { if (!S.inputs[pid][i] && gl[g]) S.inputs[pid][i] = gl[g]; });
        root.querySelectorAll("[data-gsel]").forEach(el => el.onchange = () => { S.inputs[pid][+el.dataset.gsel] = el.value; save(); });
        root.querySelector("[data-try]").onclick = () => {
          const cur = S.inputs[pid];
          if (p.msg.some((g, i) => !cur[i])) return msg(T("Minden jelnek adj jelentést."));
          const bad = p.msg.filter((g, i) => cur[i] !== SYMMEAN[g]).length;
          if (!bad) { solve(pid); renderCase(); return; }
          msg(S.master ? T("Az üzenet értelmetlen.") : T("Az üzenet még értelmetlen: {0} jel jelentése nem stimmel.", bad));
        };
      }
    }
  };
  function renderPuzzle(pid) { const p = C.puzzles[pid]; return `<h3>✦ ${esc(p.title)}</h3>${PUZ[p.type].render(pid, p)}`; }

  function bindGyan(root) {
    const q = sel => root.querySelectorAll(sel);
    q("[data-ask]").forEach(b => b.onclick = () => { S.asked.push(b.dataset.ask); save(); SND("paper"); spend(COST.ask); const y = window.scrollY; renderCase(); window.scrollTo({ top: y }); });
    q("[data-cfpick]").forEach(b => b.onclick = () => {
      const box = root.querySelector(`[data-cfbox="${b.dataset.cfpick}"]`); box.dataset.pick = b.dataset.k;
      box.querySelectorAll("[data-cfpick]").forEach(x => x.classList.toggle("on", x === b)); SND("tick");
    });
    q("[data-cf]").forEach(b => b.onclick = () => {
        const sid = b.dataset.cf, m = root.querySelector(`[data-cfmsg="${sid}"]`), clue = root.querySelector(`[data-cfbox="${sid}"]`).dataset.pick || "";
        S.cool = S.cool || {}; S.wrongBy = S.wrongBy || {};
        if (S.cool[sid] > Date.now()) { m.className = "msg bad"; m.textContent = T("Sértődötten hallgat. Próbáld újra egy kicsit később."); return; }
        const s = C.suspects.find(x => x.id === sid), first = s.short || (LANG === "en" ? s.name.split(" ")[0] : s.name.split(" ").slice(-1)[0]);
        if (!clue) { m.className = "msg bad"; m.textContent = T("Előbb válassz egy nyomot."); return; }
        const hit = contra(C, sid).find(k => !S.conf.includes(k.id) && has(k.clue, clue));
        if (hit && hit.trap) { S.conf.push(hit.id); S.traps = (S.traps || 0) + 1; save(); SND("wrong"); toast(T("Bedőltél egy hamis bizonyítéknak!")); spend(COST.confront); renderCase(); return; }
        if (hit) { S.conf.push(hit.id); S.wrongBy[sid] = 0; if (hit.gives) gain(hit.gives); save(); SND(hit.lie === false ? "success" : "stamp"); spend(COST.confront); renderCase(); return; }
        if (contra(C, sid).some(k => S.conf.includes(k.id) && has(k.clue, clue))) { m.className = "msg"; m.textContent = T("Ezt már tisztáztátok."); return; }
        S.wrongConf = (S.wrongConf || 0) + 1; S.wrongBy[sid] = (S.wrongBy[sid] || 0) + 1; TR("conf_wrong", sid);
        const sulk = S.wrongBy[sid] >= 2; if (sulk) { S.wrongBy[sid] = 0; S.cool[sid] = Date.now() + 40000; }
        save(); SND("wrong");
        if (sulk) { toast(T("{0} megsértődött, és most nem hajlandó beszélni.", first)); spend(COST.confront); renderCase(); return; }
        if (spend(COST.confront)) { renderCase(); return; }
        updateClock();
        m.className = "msg bad"; m.textContent = `${first} ${REBUFF[(S.wrongConf + sid.length) % REBUFF.length]}`;
      });
  }
  function bindPuzzleIn(root) {
    root.querySelectorAll("[data-hint]").forEach(b => b.onclick = () => { const id = b.dataset.hint; S.hints[id] = (S.hints[id] || 0) + 1; save(); TR("hint", id); SND("paper"); spend(COST.hint); renderCase(); });
    const box = root.querySelector("[data-puzzle]");
    if (box && !S.solved[box.dataset.puzzle]) {
      const pid = box.dataset.puzzle, p = C.puzzles[pid], m = box.querySelector("[data-msg]");
      PUZ[p.type].bind(pid, p, box, t => { SND("wrong"); if (spend(COST.wrong)) return renderCase(); m.className = "msg bad"; m.textContent = t; updateClock(); });
    }
  }

  /* ---------- eseménykezelők ---------- */
  const BIND = {
    ugy() { $("[data-go]").onclick = () => go("hely", C.intro.start); },
    hely() {
      // egy helyiségből addig nem lehet másikba menni, amíg minden nyomát meg nem találtad
      const enter = id => {
        const cur = S.cur && C.locations.find(l => l.id === S.cur);
        if (cur && cur.id !== id && remaining(cur)) { SND("wrong"); toast(T("Előbb fejezd be itt: {0}. Valami még elkerülte a figyelmedet.", cur.name)); return; }
        S.cur = id; go("hely", id);
      };
      $$("[data-loc]").forEach(b => b.onclick = () => enter(b.dataset.loc));
      $$("[data-ploc]").forEach(b => { b.onclick = () => enter(b.dataset.ploc); b.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); enter(b.dataset.ploc); } }; });
      const bk = $("[data-back]"); if (bk) bk.onclick = () => go("hely");
      const cb = $("[data-gocur]"); if (cb) cb.onclick = () => enter(S.cur);
      $$("[data-take]").forEach(b => b.onclick = () => { gain(b.dataset.take); save(); SND("paper"); spend(COST.take); renderCase(); });
      const L = S.loc && C.locations.find(l => l.id === S.loc);
      if (L) { const cur = S.cur && C.locations.find(l => l.id === S.cur); if (!cur || !remaining(cur)) { S.cur = L.id; save(); } }
      // egy részlet megvizsgálása; séta módban a talált szöveg a színpadon jelenik meg
      const examine = id => {
        const it = itemOf(L, id);
        if (it) {
          if (S.clues.includes(id)) { app.querySelector(`[data-item="${id}"]`)?.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
          gain(id); save(); SND("paper"); spend(COST.take);
          rerender();
          app.querySelector(`[data-item="${id}"]`)?.scrollIntoView({ block: "center", behavior: "smooth" });
        } else {
          const key = L.id + ":" + id; if (S.seen.includes(key)) return;
          S.seen.push(key); save(); SND("tick"); spend(COST.look);
          rerender();
        }
      };
      $$("[data-spot]").forEach(b => {
        b.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); b.click(); } };
        b.onclick = () => examine(b.dataset.spot);
      });
      $$("[data-view]").forEach(b => b.onclick = () => { S.view = b.dataset.view; S.loc = null; save(); rerender(); });
      if (worldOn()) WORLD.mount($("[data-world]"));
      bindPuzzleIn(app);
    },
    gyan() { bindGyan(app); },
    jegy() { bindDed(); },
    tabla() {
      bindDed();
      const board = $("[data-board]"); if (!board) return;
      // kattintás: kártya kijelölése, majd a második kártyára kattintva fonal; húzás: áthelyezés
      let first = null;
      const hint = $("[data-boardhint]");
      $("[data-tidy]").onclick = () => { S.board = {}; save(); renderCase(); };
      $("[data-unthread]").onclick = () => { S.threads = []; save(); drawThreads(); };
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
      const select = (el, id) => {
        if (!first) { first = id; el.classList.add("sel"); hint.textContent = T("Most kattints arra a kártyára, amelyikkel össze akarod kötni."); return; }
        app.querySelectorAll(".pin.sel").forEach(e => e.classList.remove("sel"));
        const a0 = first; first = null; hint.textContent = "";
        if (a0 === id) return;
        const i = S.threads.findIndex(([a, b]) => (a === a0 && b === id) || (a === id && b === a0));
        if (i >= 0) { S.threads.splice(i, 1); save(); drawThreads(); return; }
        S.threads.push([a0, id]); SND("tick");
        const r = a0[0] === "c" && id[0] === "c" ? tryPair(a0.slice(2), id.slice(2)) : null;
        if (r && !r.old) { save(); toast(T("A fonal megnyitott egy következtetést! Töltsd ki az arany kártyán.")); const y = window.scrollY; renderCase(); window.scrollTo({ top: y }); return; }
        if (r && r.old) toast(T("Ezt a kettőt már összekötötted."));
        else if (a0[0] === "c" && id[0] === "c") toast(T("Összekötötted őket, de együtt nem mondanak újat."));
        save(); drawThreads();
      };
      app.querySelectorAll("[data-pin]").forEach(el => {
        const id = el.dataset.pin;
        const place = (x, y) => { x = clamp(x, 0, BW - el.offsetWidth); y = clamp(y, 0, BH - el.offsetHeight); el.style.left = x + "px"; el.style.top = y + "px"; S.board[id] = { x, y }; drawThreads(); };
        el.onpointerdown = e => {
          if (e.target.closest("[data-fill]")) return;
          e.preventDefault(); el.setPointerCapture(e.pointerId);
          const sx = e.clientX, sy = e.clientY, ox = el.offsetLeft, oy = el.offsetTop; let moved = false;
          el.onpointermove = ev => { if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return; moved = true; el.classList.add("drag"); place(ox + ev.clientX - sx, oy + ev.clientY - sy); };
          el.onpointerup = () => { el.onpointermove = null; el.onpointerup = null; el.classList.remove("drag"); if (moved) save(); else select(el, id); };
        };
        el.onkeydown = e => { const d = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] }[e.key]; if (d) { e.preventDefault(); place(el.offsetLeft + d[0], el.offsetTop + d[1]); save(); } if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(el, id); } };
      });
      app.querySelectorAll("[data-fill]").forEach(b => { b.onpointerdown = e => e.stopPropagation(); b.onclick = e => { e.stopPropagation(); openDedModal(b.dataset.fill); }; });
      requestAnimationFrame(drawThreads);
    },
    vad() {
      $$("[data-gotab]").forEach(b => b.onclick = () => go(b.dataset.gotab));
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
      $$("[data-restart]").forEach(b => b.onclick = () => { S = fresh(); save(); route(); });
      $$("[data-reveal]").forEach(b => b.onclick = () => { S.ended = "reveal"; save(); renderCase(); window.scrollTo({ top: 0 }); });
      const btn = $("[data-accuse]"); if (!btn) return;
      bindSentences(app);
      const m = $("[data-accmsg]"), A = C.accusation;
      btn.onclick = () => {
        if (missingBlanks("acc", A.b)) { m.className = "msg bad"; m.textContent = T("Minden üres helyet tölts ki a történetben."); return; }
        S.tries++;
        const pick = S.dsel.acc || [];
        const whoWrong = (A.who || [0]).find(i => !has(A.b[i], pick[i]));
        if (whoWrong !== undefined) { S.ended = "wrong"; S.accused = pick[whoWrong]; save(); SND("wrong"); renderCase(); window.scrollTo({ top: 0 }); return; }
        const n = wrongBlanks("acc", A.b);
        if (!n) { S.ended = "win"; S.verdict = 0; save(); SND("stamp"); renderCase(); window.scrollTo({ top: 0 }); return; }
        SND("wrong");
        if (spend(COST.accuse)) { renderCase(); window.scrollTo({ top: 0 }); return; }
        if (S.tries >= MAXTRIES(C)) { S.ended = "lose"; save(); renderCase(); window.scrollTo({ top: 0 }); return; }
        save(); updateClock(); m.className = "msg bad";
        m.textContent = T("Az ügyvéd közbevág: {0} Még {1} próbálkozásod van.", errMsg(n), MAXTRIES(C) - S.tries);
        whichBtn(m, app, "acc", A.b, 2); TR("acc_wrong", String(n));
      };
    }
  };

  // a pixelvilág a motor belső függvényeit ezen keresztül éri el
  const WORLD = window.MM_WORLD_ENGINE ? window.MM_WORLD_ENGINE({
    get C() { return C; }, get S() { return S; }, save, T, esc, rich, plain, ART, SND, toast, gain, spend, COST, remaining, itemOf,
    renderPuzzle, bindPuzzleIn, susCard, bindGyan, renderCase, rerender, data: WDATA, contra, viewSwitch, addNote, updateCoach, ready: () => ready(), pointAt, go, culprit: () => culpritId(), pendingDed: () => dedsOf(C).filter(d => !S.clues.includes(d.id) && !S.unl.includes(d.id) && haveAny(d.from[0]) && haveAny(d.from[1])).map(d => d.id)
  }) : null;
  window.MM_WORLD = WORLD;
  window.MM_DEBUG = { C: () => C, S: () => S };

  // induláskor, ha be van kapcsolva a szinkron, előbb letöltjük a felhőből az esetleg újabb állást (legfeljebb 2,5 mp-ig várunk)
  const SY = window.MM_SYNC && window.MM_SYNC.enabled ? window.MM_SYNC : null;
  function afterPull(changed) {
    if (!changed || !changed.length) return;
    if (!C) { renderHome(); return; }
    if (changed.includes(SKEY || KEY(C.id))) { toast(T("Újabb állást töltöttem le egy másik eszközödről.")); route(); }
  }
  if (SY && SY.recovery()) setTimeout(() => openAccount("newpw"), 300);
  else if (SY && SY.authError()) setTimeout(() => toast(T("A bejelentkezés nem sikerült: {0}", SY.authError())), 600);
  if (SY && SY.on() && SY.justSignedIn()) setTimeout(() => { const u = SY.user(); toast(T("Bejelentkezve: {0}. A haladásod a fiókodban van.", u.email || u.name || "")); }, 1200);
  if (SY && SY.on()) {
    let started = false;
    const go1 = () => { if (!started) { started = true; route(); } };
    const t = setTimeout(go1, 2500);
    SY.pull().then(ch => { clearTimeout(t); if (!started) go1(); else afterPull(ch); }).catch(() => { clearTimeout(t); go1(); });
  } else route();
  // ha visszatérsz a lapra (pl. közben a telefonodon játszottál), újra megnézi a felhőt
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && SY && SY.on()) SY.pull().then(afterPull).catch(() => {}); });
})();
