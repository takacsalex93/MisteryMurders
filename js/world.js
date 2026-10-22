/* Bejárható pixelvilág: felülnézetes térkép, amelyen a nyomozó végigjárja a helyszínt.
   Az adatokat a tools/world/build_world.py készíti (cases/<ügy>.world.js), a grafika LimeZu Modern Interiors csomagja (limezu.itch.io).
   A motor (engine.js) a belső függvényeit egy API-objektumon adja át. */
window.MM_WORLD_ENGINE = function (A) {
  "use strict";
  const TS = 16, SPEED = 72, NPC_SPEED = 26, DIRS = { right: 0, up: 1, left: 2, down: 3 };
  const imgs = {};
  const img = src => { if (!imgs[src]) { const i = new Image(); i.src = src; imgs[src] = i; } return imgs[src]; };
  let P = null, dlg = null, path = null, pending = null, root = null, cv = null, ctx = null, raf = 0, dark = null;
  let last = 0, flash = 0, nextFlash = 0, lastSave = 0, lastToast = 0, near = null, z = 2, dpr = 1, cam = { x: 0, y: 0 }, keys = new Set(), fade = 0;
  let NS = {}, bark = null, talk = null, stepAcc = 0, tickAt = 0;
  const W = () => A.data();
  const S = () => A.S, C = () => A.C, T = A.T, esc = A.esc;
  const map = () => W().maps[P.map];
  const SFX = n => A.SND(n);
  const locById = id => C().locations.find(l => l.id === id);
  const locOfSpot = id => C().locations.find(l => (l.items || []).some(i => i.clue === id) || (l.decoys && id in l.decoys));
  const sus = id => C().suspects.find(s => s.id === id);
  const who = id => {
    const n = Object.values(W().maps).flatMap(m => m.npcs).find(n => n.id === id), s = sus(id);
    return (n && n.nick) || (s ? (s.short || s.name.split(" ").slice(-1)[0]) : id === "kertesz" ? T("A kertész") : id);
  };

  /* ---------- térkép-lekérdezések ---------- */
  const regAt = (m, tx, ty) => { const r = (m.reg[ty] || "")[tx]; return r && r !== "." ? m.rooms[r.charCodeAt(0) - 97] : null; };
  const roomAt = (m, x, y) => regAt(m, Math.floor(x / TS), Math.floor((y - 1) / TS));
  const overlap = (a, b) => a[0] < b[0] + b[2] && a[0] + a[2] > b[0] && a[1] < b[1] + b[3] && a[1] + a[3] > b[1];
  const walkers = m => m.npcs.filter(n => !n.static);
  const pos = n => NS[n.id] || { x: n.x * TS, y: n.y * TS, dir: n.dir };
  const npcBox = n => { const p = pos(n); return [p.x - 6, p.y - 5, 12, 5]; };
  function blocked(m, x, y, skipNpc) {
    const box = [x - 5, y - 6, 10, 6];
    if (box[0] < 0 || box[1] < 0 || x + 5 > m.w * TS || y > m.h * TS) return true;
    for (let ty = Math.floor(box[1] / TS); ty <= Math.floor((y - .01) / TS); ty++)
      for (let tx = Math.floor(box[0] / TS); tx <= Math.floor((x + 4.99) / TS); tx++) if ((m.walls[ty] || "")[tx] === "1") return true;
    if (m.solids.some(s => overlap(box, s))) return true;
    if (lockedDoors(m).some(d => overlap(box, d.r))) return true;
    return !skipNpc && walkers(m).some(n => overlap(box, npcBox(n)));
  }
  // zárt ajtók: amelyik nyílás egy még zárt helyiségbe vezet, oda ajtó kerül
  function lockedDoors(m) {
    return (m.doors || []).map(([x, y, w, h]) => {
      const sides = h >= 3 ? [regAt(m, x, y + h), regAt(m, x, y - 1)] : [regAt(m, x - 1, y), regAt(m, x + w, y)];
      const L = sides.map(r => r && r.loc && locById(r.loc)).find(L => L && L.requires && !S().solved[L.requires]);
      return L ? { r: [x * TS, y * TS, w * TS, h * TS], L, x, y, w, h } : null;
    }).filter(Boolean);
  }

  /* ---------- állapotok ---------- */
  function itemState(id) {
    const L = locOfSpot(id); if (!L) return { done: true };
    const it = A.itemOf(L, id);
    return { L, it, done: it ? S().clues.includes(id) : S().seen.includes(L.id + ":" + id) };
  }
  function targets() {
    const m = map(), out = [];
    m.inter.forEach(t => {
      if (t.k === "puzzle") { if (!C().puzzles[t.id]) return; out.push({ kind: "puzzle", id: t.id, r: t.r, label: t.label || C().puzzles[t.id].title, done: !!S().solved[t.id], glint: t.glint }); }
      else out.push({ kind: "spot", id: t.id, r: t.r, label: t.label, done: itemState(t.id).done, glint: t.glint });
    });
    m.npcs.forEach(n => {
      const p = pos(n), r = n.lie ? [p.x - 16, p.y - 12, 32, 16] : [p.x - 8, p.y - 28, 16, 28], s = sus(n.id);
      // akinél nyom van (pl. a kertész), azt előbb meg kell vizsgálni; utána, ha gyanúsított, beszélgetni is lehet vele
      if (n.spot && (!s || !itemState(n.spot).done)) out.push({ kind: "spot", id: n.spot, r, label: n.label || who(n.id), done: itemState(n.spot).done, npc: n.static ? null : n });
      else if (s && !n.static) {
        const qs = ((C().interviews || {})[s.id] || []).filter(q => (!q.after || S().clues.includes(q.after)) && (!q.afterConf || S().conf.includes(q.afterConf)));
        out.push({ kind: "npc", id: s.id, r, label: s.name, done: !qs.some(q => !S().asked.includes(s.id + ":" + q.id)), npc: n });
      }
    });
    return out;
  }
  function distTo(r, x, y) {
    const dx = Math.max(r[0] - x, 0, x - (r[0] + r[2])), dy = Math.max(r[1] - y, 0, y - (r[1] + r[3]));
    return Math.hypot(dx, dy);
  }
  function findNear() {
    const fx = P.x + [8, 0, -8, 0][DIRS[P.dir]], fy = P.y - 3 + [0, -8, 0, 8][DIRS[P.dir]];
    let best = null, bd = 1e9;
    targets().forEach(t => {
      const d = distTo(t.r, P.x, P.y - 3), df = distTo(t.r, fx, fy);
      if (d > 17) return;
      const sc = Math.min(d, df) + (df < d ? 0 : 4);
      if (sc < bd) { bd = sc; best = t; }
    });
    return best;
  }
  // áramszünet: az ügy világleírása mondja meg, melyik fordulat után sötétül el a ház, és hol tér vissza a fény
  // szabályok: {after, lit, msg} egy fordulat után sötét, amíg a "lit" helyiségbe nem érsz; {map} mindig sötét pálya; {room, tint} sötét helyiség színes fénnyel
  const DK = () => [].concat(W().dark || []);
  function darkRule() {
    const st = S(), r = P && curRoom();
    return DK().find(k => (k.map && k.map === P.map) || (k.room && r && r.loc === k.room) || (k.after && (st.events || []).includes(k.after) && !st.wlit)) || null;
  }
  const isDark = () => !!darkRule();

  /* ---------- helyiségzár ---------- */
  function lockMsg(locId) {
    const L = locById(locId), st = S(), cur = st.cur && locById(st.cur);
    if (!L) return null;
    if (L.requires && !st.solved[L.requires]) return T("Az ajtó zárva: {0}. Előbb máshol kell továbbjutnod.", L.name);
    if (cur && cur.id !== locId && A.remaining(cur)) return T("Még nem mehetsz tovább: itt, a(z) {0} helyiségben még {1} nyom vár rád. Keresd a csillogó dolgokat!", cur.name, A.remaining(cur));
    return null;
  }
  function say(msg) { const n = performance.now(); if (n - lastToast > 1600) { lastToast = n; SFX("wrong"); A.toast(msg); } }
  function enterLoc(locId) {
    const st = S(); st.cur = locId; A.save(); banner(locById(locId).name); hud();
    window.MM_AUDIO && window.MM_AUDIO.setScene((C().sounds || {})[locId] || C().sound);
    const lr = DK().find(k => k.after && k.lit === locId && (st.events || []).includes(k.after) && !st.wlit);
    if (lr) { st.wlit = true; A.save(); SFX("door"); A.toast(lr.msg || T("Visszatér a fény.")); }
    st.wvis = st.wvis || [];
    if (!st.wvis.includes(locId)) { st.wvis.push(locId); A.save(); if (!document.querySelector(".intro:not(.wdlg)")) openDlg("scene", locId); }
  }

  /* ---------- mozgás ---------- */
  function tryMove(dx, dy) {
    const m = map(); let moved = false;
    const ox = P.x, oy = P.y;
    const step = (nx, ny) => {
      const box = [nx - 5, ny - 6, 10, 6], ld = lockedDoors(m).find(d => overlap(box, d.r));
      if (ld) { say(T("Az ajtó zárva: {0}. Előbb máshol kell továbbjutnod.", ld.L.name)); path = null; pending = null; return false; }
      // ha a nyomozó valahogy beszorult (falba, tárgyba, szereplőbe), szabadon kiléphet onnan
      if (blocked(m, nx, ny) && !blocked(m, P.x, P.y)) return false;
      const r1 = roomAt(m, nx, ny), r0 = roomAt(m, P.x, P.y);
      if (r1 && r1.loc && r1.loc !== S().cur) {
        // ha már ebben a helyiségben áll (pl. a szöveges nézetből tért vissza), nem zárjuk ki
        const msg = r0 && r0.loc === r1.loc ? null : lockMsg(r1.loc); if (msg) { say(msg); path = null; pending = null; return false; }
        P.x = nx; P.y = ny; enterLoc(r1.loc); return true;
      }
      P.x = nx; P.y = ny; return true;
    };
    if (dx && step(P.x + dx, P.y)) moved = true;
    if (dy && step(P.x, P.y + dy)) moved = true;
    if (moved && checkWarp(ox, oy) === false) { P.x = ox; P.y = oy; }
    return moved;
  }
  // a lépcső csak akkor visz át, ha most lépsz rá; ha a túloldal zárva, a nyomozó visszalép oda, ahonnan jött
  const inRect = (r, x, y) => x > r[0] && x < r[0] + r[2] && y > r[1] && y < r[1] + r[3];
  function checkWarp(ox, oy) {
    const m = map(), w = m.warps.find(w => inRect(w.r, P.x, P.y) && !inRect(w.r, ox, oy));
    if (!w) return;
    const [mid, tx, ty] = w.to, M2 = W().maps[mid], r = roomAt(M2, tx * TS, ty * TS);
    if (r && r.loc && r.loc !== S().cur) {
      const msg = lockMsg(r.loc);
      if (msg) { say(msg); path = null; pending = null; return false; }
    }
    P.map = mid; P.x = tx * TS; P.y = ty * TS; path = null; pending = null; fade = 1; SFX("stairs"); savePos(true);
    bark = null; talk = null; sub(null);
    if (r && r.loc && r.loc !== S().cur) enterLoc(r.loc); else banner(r && (r.label || (r.loc && locById(r.loc).name)) || M2.name);
    hud();
  }
  function savePos(now) {
    const t = performance.now();
    if (!now && t - lastSave < 1500) return;
    lastSave = t; S().wpos = { map: P.map, x: Math.round(P.x), y: Math.round(P.y), dir: P.dir }; A.save();
  }

  /* ---------- a szereplők járkálnak, és ha odaérsz, megállnak ---------- */
  function initNpcs() {
    NS = {};
    Object.values(W().maps).forEach(m => m.npcs.forEach(n => { NS[n.id] = { x: n.x * TS, y: n.y * TS, dir: n.dir, ri: 0, wait: 1 + Math.random() * 3, moving: false, bi: 0, quiet: 0 }; }));
  }
  function faceTo(s, x, y) { const dx = x - s.x, dy = y - s.y; s.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"); }
  function updNpcs(dt) {
    const m = map();
    walkers(m).forEach(n => {
      const s = NS[n.id]; s.moving = false;
      const close = Math.hypot(P.x - s.x, P.y - s.y) < 30;
      if ((dlg && dlg.kind === "npc" && dlg.id === n.id) || close) { if (close) faceTo(s, P.x, P.y); return; }
      if (!n.route) { s.dir = n.dir; return; }
      if (s.wait > 0) { s.wait -= dt; return; }
      const [tx, ty, wt] = n.route[s.ri], dx = tx * TS - s.x, dy = ty * TS - s.y, d = Math.hypot(dx, dy);
      if (d < 1) { s.x = tx * TS; s.y = ty * TS; s.wait = wt; s.ri = (s.ri + 1) % n.route.length; if (wt) s.dir = n.dir; return; }
      const st = Math.min(d, NPC_SPEED * dt), nx = s.x + dx / d * st, ny = s.y + dy / d * st;
      if (overlap([nx - 6, ny - 5, 12, 5], [P.x - 5, P.y - 6, 10, 6])) return;
      s.x = nx; s.y = ny; s.moving = true; faceTo(s, tx * TS, ty * TS);
    });
  }
  // rövid mondatok buborékban, ha a közelükben jársz
  function updBark(now) {
    if (dlg || talk) { if (bark) { bark = null; sayEl(null); } return; }
    if (bark && now < bark.until) { const s = NS[bark.id]; if (s && Math.hypot(P.x - s.x, P.y - s.y) < 70) return; }
    bark = null;
    const cand = map().npcs.filter(n => n.barks && !n.static).map(n => ({ n, s: NS[n.id], d: Math.hypot(P.x - NS[n.id].x, P.y - NS[n.id].y) }))
      .filter(o => o.d < 46 && now > o.s.quiet).sort((a, b) => a.d - b.d)[0];
    if (!cand) { sayEl(null); return; }
    const { n, s } = cand; bark = { id: n.id, text: n.barks[s.bi % n.barks.length], until: now + 4800 };
    s.bi++; s.quiet = now + 13000;
  }
  // kihallgatott beszélgetés: ha a megadott helyen jársz, feliratként hallod
  function updTalk(now) {
    const m = map(), st = S(); st.heard = st.heard || [];
    if (talk) {
      if (dlg) { talk.at = now + 600; return; }
      if (now < talk.at) return;
      if (talk.i >= talk.lines.length) {
        st.heard.push(talk.id); A.save(); sub(null);
        A.addNote(T("Kihallgatott beszélgetés:") + "\n" + talk.lines.map(([n, t]) => `${who(n)}: ${t}`).join("\n"));
        talk = null; return;
      }
      const [n, t] = talk.lines[talk.i++]; sub(who(n), t); talk.at = now + 1800 + t.length * 45; return;
    }
    const tk = (m.talks || []).find(k => !st.heard.includes(k.id) && (!k.after || st.clues.includes(k.after)) &&
      P.x > k.zone[0] * TS && P.x < (k.zone[0] + k.zone[2]) * TS && P.y > k.zone[1] * TS && P.y < (k.zone[1] + k.zone[3]) * TS);
    if (tk && !dlg) { talk = { id: tk.id, lines: tk.lines, i: 0, at: now + 400 }; SFX("paper"); A.toast(T("Hangokat hallasz… Maradj csendben, és figyelj.")); }
  }

  /* ---------- útkeresés 8 pixeles rácson ---------- */
  const G = 8;
  function bfs(goal) {
    const m = map(), gw = Math.floor(m.w * TS / G), gh = Math.floor(m.h * TS / G);
    const ok = (i, j) => i >= 0 && j >= 0 && i < gw && j < gh && !blocked(m, i * G + 4, j * G + 4, true) && !lockedAt(m, i * G + 4, j * G + 4);
    const si = Math.floor(P.x / G), sj = Math.floor(P.y / G), prev = new Int32Array(gw * gh).fill(-2);
    const q = [si + sj * gw]; prev[q[0]] = -1; let best = -1, bd = 1e9;
    for (let h = 0; h < q.length; h++) {
      const c = q[h], i = c % gw, j = (c - i) / gw, d = goal(i * G + 4, j * G + 4);
      if (d === 0) { best = c; break; }
      if (d < bd) { bd = d; best = c; }
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        const ni = i + di, nj = j + dj, n = ni + nj * gw;
        if (ni < 0 || nj < 0 || ni >= gw || nj >= gh || prev[n] !== -2 || !ok(ni, nj)) continue;
        if (di && dj && (!ok(i + di, j) || !ok(i, j + dj))) continue;
        prev[n] = c; q.push(n);
      }
    }
    if (best < 0) return null;
    const pts = []; for (let c = best; c >= 0 && c !== q[0]; c = prev[c]) { const i = c % gw; pts.unshift([i * G + 4, (c - i) / gw * G + 4]); }
    return pts;
  }
  function lockedAt(m, x, y) { const r = roomAt(m, x, y); return r && r.loc && r.loc !== S().cur && !!lockMsg(r.loc); }
  function walkTo(x, y, act) {
    pending = act || null;
    const pts = act ? bfs((px, py) => distTo(act.r, px, py - 3) <= 12 ? 0 : 1 + distTo(act.r, px, py - 3)) : bfs((px, py) => Math.hypot(px - x, py - y) <= 5 ? 0 : Math.hypot(px - x, py - y));
    path = pts && pts.length ? pts : null;
    if (!path && act && distTo(act.r, P.x, P.y - 3) <= 17) { interact(act); pending = null; }
  }

  /* ---------- interakciók ---------- */
  function interact(t) {
    keys.clear(); path = null; pending = null;
    const cx = t.r[0] + t.r[2] / 2, cy = t.r[1] + t.r[3] / 2;
    P.dir = Math.abs(cx - P.x) > Math.abs(cy - P.y) ? (cx > P.x ? "right" : "left") : (cy > P.y ? "down" : "up");
    if (t.npc && NS[t.npc.id]) faceTo(NS[t.npc.id], P.x, P.y);
    savePos(true);
    if (t.kind === "spot") examine(t.id, t);
    else if (t.kind === "puzzle") { SFX("paper"); openDlg("puzzle", t.id); }
    else if (t.kind === "npc") { SFX("paper"); openDlg("npc", t.id); }
  }
  function examine(id) {
    const { L, it } = itemState(id); if (!L) return;
    const st = S();
    if (it) {
      if (!st.clues.includes(id)) { A.gain(id); A.save(); SFX("paper"); if (A.spend(A.COST.take)) return A.renderCase(); }
    } else {
      const key = L.id + ":" + id;
      if (!st.seen.includes(key)) { st.seen.push(key); A.save(); SFX("tick"); if (A.spend(A.COST.look)) return A.renderCase(); }
    }
    openDlg("spot", id);
  }

  /* ---------- párbeszédablakok ---------- */
  function dlgHtml(kind, id) {
    const st = S(), close = `<div class="row"><button class="btn" data-wclose>${T(kind === "scene" ? "Körülnézek" : "Tovább")}</button></div>`;
    if (kind === "scene") {
      const L = locById(id);
      return `<div class="art locart">${A.ART.scene(L, L.name)}</div><span class="eyebrow">${T("Helyszín")}</span><h2>${esc(L.name)}</h2><p>${esc(L.desc)}</p>${close}`;
    }
    if (kind === "spot") {
      const { L, it } = itemState(id), t = targets().find(x => x.kind === "spot" && x.id === id);
      const label = (t && t.label) || (it && it.label) || "";
      const head = `<div class="w-head"><div class="w-zoom" data-zoom></div><div><span class="eyebrow">${T("Közelebbről megnézed")}</span><h2>${esc(label)}</h2></div></div>`;
      if (it) {
        const k = C().clues[id], rest = A.remaining(L);
        return `${head}<p>${A.rich(it.text)}</p><span class="found">✓ ${T("Nyom feljegyezve:")} ${esc(k.t)}</span><p class="typed">${A.rich(k.x)}</p>
          <p class="meta">${rest ? T("Ebben a helyiségben még {0} nyom vár rád.", rest) : T("Ebben a helyiségben minden nyomot megtaláltál. Mehetsz tovább.")}</p>${close}`;
      }
      return `${head}<p>${A.rich(L.decoys[id])}</p><p class="meta">${T("Nem tűnik nyomnak. De ki tudja.")}</p>${close}`;
    }
    if (kind === "npc") return `${A.susCard(sus(id))}${close}`;
    if (kind === "help") return helpHtml();
    if (kind === "puzzle") return `<div class="item" data-puzzle="${id}">${A.renderPuzzle(id)}</div>${st.solved[id] ? close : `<div class="row"><button class="link" data-wclose>${T("Később folytatom")}</button></div>`}`;
    return close;
  }
  function helpHtml() {
    const row = (ico, h, p) => `<li><span class="w-ico">${ico}</span><div><b>${h}</b><p>${p}</p></div></li>`;
    return `<span class="eyebrow">${T("Útmutató")}</span><h2>${T("Így nyomozol a térképen")}</h2>
      <ol class="w-helplist">
        ${row("🚶", T("Mozgás"), T("Nyilak vagy W A S D. Telefonon koppints oda, ahová menjen a nyomozó: magától odatalál."))}
        ${row("✨", T("Ami csillog, azt meg lehet vizsgálni"), T("Állj mellé, és nyomd meg az E betűt, vagy a térkép alján megjelenő gombot. Vigyázz: nem minden csillogó dolog nyom, van, ami csak csali."))}
        ${row("💬", T("Beszélgetés"), T("Akinek a feje fölött „…” buborék van, annak van még mondanivalója. Menj oda hozzá: kérdezd ki, és ha egy nyomod ellentmond a vallomásának, szembesítsd vele."))}
        ${row("✦", T("Rejtvények"), T("Az arany kereszt rejtvényt jelöl (számzár, titkosírás, összevetés). Mindet meg kell oldanod, mielőtt vádat emelhetsz."))}
        ${row("🔒", T("Egy helyiség egyszerre"), T("A következő helyiségbe csak akkor léphetsz be, ha az aktuálisban minden nyomot megtaláltál. A térkép alatti sor mutatja, hány van még hátra."))}
        ${row("🃏", T("Szókártyák"), T("A nyomok szövegében az aláhúzott szavakra kattintva gyűjtöd a szókártyákat: nevek, tárgyak, helyek, időpontok."))}
        ${row("🧵", T("Következtetés"), T("A Tábla fülön köss össze két összetartozó nyomot. Megnyílik egy hiányos mondat: a szókártyáiddal töltsd ki."))}
        ${row("⚖️", T("Vádemelés"), T("Ha minden következtetés és rejtvény megvan, a Vádemelés fülön elmondod, mi történt. Ha ártatlant vádolsz, nincs visszaút."))}
      </ol>
      <p class="meta">${T("A lap tetején a „Következő lépés” sáv mindig megmondja, mi a teendő. Ezt az útmutatót a térkép sarkában lévő ? gombbal bármikor újra megnyithatod.")}</p>
      <div class="row"><button class="btn" data-wclose>${T("Értem, kezdjük")}</button></div>`;
  }
  function openDlg(kind, id, refresh) {
    keys.clear(); path = null;
    dlg = { kind, id };
    let ov = document.querySelector(".wdlg");
    if (!ov) {
      if (refresh) { dlg = null; return; }
      ov = document.createElement("div"); ov.className = "intro wdlg"; ov.setAttribute("role", "dialog");
      ov.innerHTML = `<div class="intro-card"></div>`; document.body.appendChild(ov);
      requestAnimationFrame(() => ov.classList.add("on"));
      ov.onclick = e => { if (e.target === ov) closeDlg(); };
    }
    const card = ov.querySelector(".intro-card"), y = card.scrollTop;
    card.className = "intro-card wcard w-" + kind;
    card.innerHTML = dlgHtml(kind, id); card.scrollTop = refresh ? y : 0;
    card.querySelectorAll("[data-wclose]").forEach(b => b.onclick = closeDlg);
    const zb = card.querySelector("[data-zoom]"); if (zb) zoomInto(zb, id);
    if (kind === "npc") A.bindGyan(card);
    if (kind === "puzzle") A.bindPuzzleIn(card);
    if (!refresh) (card.querySelector("input,select,[data-wclose]") || card).focus({ preventScroll: true });
  }
  function closeDlg() {
    const ov = document.querySelector(".wdlg"); if (ov) ov.remove();
    const was = dlg; dlg = null; A.rerender();
    if (was && was.kind === "help") { const r = curRoom(), st = S(); if (r && r.loc && !(st.wvis || []).includes(r.loc)) { st.wvis.push(r.loc); A.save(); openDlg("scene", r.loc); } }
  }
  // nagyító: a megvizsgált részlet pixeles közelképe
  function zoomInto(box, id) {
    const t = targets().find(x => x.kind === "spot" && x.id === id); if (!t) return;
    const R = 22, cx = Math.round(t.r[0] + t.r[2] / 2), cy = Math.round(t.r[1] + Math.min(t.r[3], 40) / 2 + (t.glint ? 4 : 0));
    const c = document.createElement("canvas"), K = 5; c.width = c.height = R * 2 * K;
    const g = c.getContext("2d"); g.imageSmoothingEnabled = false;
    g.setTransform(K, 0, 0, K, -(cx - R) * K, -(cy - R) * K);
    const draw = () => { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = "#17131d"; g.fillRect(0, 0, c.width, c.height); g.restore(); drawLayer(g, performance.now() / 1000, true); };
    draw(); [map().bg, W().atlas].forEach(s => { const i = img(s); if (!i.complete) i.addEventListener("load", draw, { once: true }); });
    c.setAttribute("aria-hidden", "true"); box.appendChild(c);
  }

  /* ---------- felület ---------- */
  function banner(text) {
    const b = root && root.querySelector(".w-banner"); if (!b || !text) return;
    b.textContent = text; b.classList.remove("on"); void b.offsetWidth; b.classList.add("on");
  }
  function sub(name, text) {
    const el = root && root.querySelector(".w-sub"); if (!el) return;
    if (!name) { el.hidden = true; return; }
    el.innerHTML = `<b>${esc(name)}:</b> ${esc(text)}`; el.hidden = false;
  }
  function sayEl(b) {
    const el = root && root.querySelector(".w-say"); if (!el) return;
    if (!b) { el.hidden = true; el.dataset.t = ""; return; }
    if (el.dataset.t !== b.text) { el.dataset.t = b.text; el.textContent = b.text; }
    const s = NS[b.id];
    el.style.left = Math.round((s.x - cam.x) * z) + "px"; el.style.top = Math.round((s.y - 34 - cam.y) * z) + "px"; el.hidden = false;
  }
  function curRoom() { return roomAt(map(), P.x, P.y); }
  function hudHtml() {
    const st = S(), r = curRoom(), L = r && r.loc ? locById(r.loc) : null;
    const dk = isDark() ? ` · <span class="w-dark">${T("áramszünet")}</span>` : "";
    if (!L) return `<b>${esc((r && r.label) || map().name)}</b>${dk}`;
    const tot = (L.items || []).length, got = tot - A.remaining(L);
    const pz = L.puzzle ? ` · ✦ ${st.solved[L.puzzle] ? T("rejtvény megoldva") : T("rejtvény")}` : "";
    return `<b>${esc(L.name)}</b>${r.label ? ` <span class="meta">(${esc(r.label)})</span>` : ""} · ${T("{0}/{1} nyom", got, tot)}${pz}${dk}`;
  }
  function foundHtml() {
    const r = curRoom(), L = r && r.loc ? locById(r.loc) : null; if (!L) return "";
    const st = S(), items = (L.items || []).filter(it => st.clues.includes(it.clue));
    const seen = Object.keys(L.decoys || {}).filter(k => st.seen.includes(L.id + ":" + k));
    return items.map(it => `<div class="item" data-item="${it.clue}"><h3>${esc(it.label)}</h3><span class="found">✓ ${esc(C().clues[it.clue].t)}</span><p class="typed">${A.rich(C().clues[it.clue].x)}</p></div>`).join("")
      + (seen.length ? `<div class="seenlist">${seen.map(k => `<p><span class="meta">${T("Megnézted:")}</span> ${A.rich(L.decoys[k])}</p>`).join("")}</div>` : "");
  }
  function hud() {
    if (!root) return;
    const h = root.parentNode.querySelector(".w-hud"), f = root.parentNode.querySelector(".w-found");
    if (h) h.innerHTML = hudHtml(); if (f) f.innerHTML = foundHtml();
    A.updateCoach && A.updateCoach();
  }
  function actButton() {
    const b = root.querySelector(".w-act"); if (!b) return;
    if (!near || dlg) { b.hidden = true; return; }
    const verb = near.kind === "npc" ? T("Beszélek vele") : near.kind === "puzzle" ? T("Nekiállok") : T("Megvizsgálom");
    const txt = `${verb}: ${near.label}`;
    if (b.dataset.t !== txt) { b.dataset.t = txt; b.innerHTML = `<kbd>E</kbd> ${esc(txt)}`; }
    b.hidden = false;
  }

  /* ---------- rajzolás ---------- */
  function resize() {
    if (!cv) return;
    const w = root.clientWidth, h = Math.max(300, Math.min(Math.round(window.innerHeight * .62), 580));
    dpr = Math.min(2, window.devicePixelRatio || 1); z = w >= 640 ? 3 : 2;
    cv.style.height = h + "px"; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    ctx.imageSmoothingEnabled = false;
  }
  function drawChar(g, id, x, y, dir, moving, t, opt) {
    const im = img(W().chars[id]); if (!im.complete || !im.naturalWidth) return;
    const di = DIRS[dir] ?? 3, fr = di * 6 + (opt && opt.still ? 0 : Math.floor(t * (moving ? 10 : 5) + ((opt && opt.ph) || 0)) % 6);
    const sit = (opt && opt.sit) || 0, dy = (opt && opt.dy) || 0;
    if (opt && opt.lie) { g.save(); g.translate(Math.round(x - 16), Math.round(y + 4)); g.rotate(-Math.PI / 2); g.drawImage(im, 18 * 16, 0, 16, 32, 0, 0, 16, 32); g.restore(); return; }
    g.drawImage(im, fr * 16, moving ? 32 : 0, 16, 32 - sit, Math.round(x - 8), Math.round(y - 32 + dy), 16, 32 - sit);
  }
  function sparkle(x, y, t, col) {
    const a = (Math.sin(t * 4 + x) + 1) / 2, s = 1 + Math.round(a * 2);
    ctx.fillStyle = col; ctx.globalAlpha = .45 + a * .55;
    ctx.fillRect(Math.round(x) - s, Math.round(y), s * 2 + 1, 1); ctx.fillRect(Math.round(x), Math.round(y) - s, 1, s * 2 + 1);
    ctx.globalAlpha = 1;
  }
  // lábnyomok: a nedves cipőnyom csak az áramszünet után jelenik meg
  function drawDecals(g, m) {
    (m.decals || []).forEach(dc => {
      if (dc.after && !(S().events || []).includes(dc.after)) return;
      const pts = dc.pts.map(([x, y]) => [x * TS, y * TS]);
      let k = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], L = Math.hypot(x1 - x0, y1 - y0), nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
        for (let d = 0; d < L; d += 9, k++) {
          const sd = k % 2 ? 2 : -2, x = Math.round(x0 + (x1 - x0) * d / L + nx * sd), y = Math.round(y0 + (y1 - y0) * d / L + ny * sd);
          g.fillStyle = dc.kind === "wet" ? "rgba(26,40,66,.62)" : "rgba(70,52,40,.65)";
          g.fillRect(x, y, 2, 4); g.fillRect(x, y + 5, 2, 1);
          if (dc.kind === "wet") { g.fillStyle = "rgba(200,225,255,.45)"; g.fillRect(x, y, 1, 1); }
        }
      }
    });
  }
  function drawDoors(g, m) {
    const at = img(W().atlas), r = W().sprites.door; if (!r || !at.complete) return;
    lockedDoors(m).forEach(d => {
      for (let i = 0; i < d.w; i++) {
        const x = (d.x + i) * TS, y = (d.y + d.h) * TS - r[3];
        g.drawImage(at, r[0], r[1], r[2], r[3], x, y, TS, r[3]);
      }
    });
  }
  function drawLayer(g, t, still) {
    const m = map(), w = W();
    const bg = img(m.bg); if (bg.complete && bg.naturalWidth) g.drawImage(bg, 0, 0);
    drawDecals(g, m); drawDoors(g, m);
    const at = img(w.atlas), list = [];
    m.fg.forEach(f => list.push({ base: f.base, f }));
    m.npcs.forEach(n => list.push({ base: pos(n).y + (n.lie ? 4 : n.static ? 1 : 0), n }));
    if (!still) list.push({ base: P.y, p: true });
    list.sort((a, b) => a.base - b.base);
    list.forEach(o => {
      if (o.f) { const r = w.sprites[o.f.s]; if (r && at.complete) g.drawImage(at, r[0], r[1], r[2], r[3], o.f.x, o.f.y, r[2], r[3]); }
      else if (o.n) { const p = pos(o.n); drawChar(g, o.n.id, p.x, p.y, p.dir, p.moving, t, { sit: o.n.sit, dy: o.n.dy, still: o.n.static, lie: o.n.lie, ph: o.n.x * 3 }); }
      else drawChar(g, "detektiv", P.x, P.y, P.dir, P.moving, t);
    });
  }
  function draw(t) {
    const m = map(), vw = cv.width / dpr / z, vh = cv.height / dpr / z, MW = m.w * TS, MH = m.h * TS;
    cam.x = MW <= vw ? (MW - vw) / 2 : Math.max(0, Math.min(MW - vw, P.x - vw / 2));
    cam.y = MH <= vh ? (MH - vh) / 2 : Math.max(0, Math.min(MH - vh, P.y - 16 - vh / 2));
    const k = z * dpr, ox = Math.round(cam.x * k), oy = Math.round(cam.y * k);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = "#17131d"; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.setTransform(k, 0, 0, k, -ox, -oy); ctx.imageSmoothingEnabled = false;
    drawLayer(ctx, t);
    const rule = darkRule(), dk = !!rule;
    // ami még nincs megvizsgálva, az csillog; a rejtvény arany jelet kap; akinek van mondanivalója, annál buborék
    targets().forEach(tg => {
      if (tg.done) return;
      const cx = tg.r[0] + tg.r[2] / 2;
      if (dk && Math.hypot(cx - P.x, tg.r[1] + tg.r[3] / 2 - P.y) > 70) return;
      if (tg.kind === "npc") {
        const bx = Math.round(cx) - 5, by = Math.round(tg.r[1] - 9 + Math.sin(t * 3) * 1.2);
        ctx.fillStyle = "#fff8e8"; ctx.fillRect(bx, by, 11, 7); ctx.fillRect(bx + 3, by + 7, 2, 2);
        ctx.fillStyle = "#3a3346"; [2, 5, 8].forEach(d => ctx.fillRect(bx + d, by + 3, 1, 1));
      } else if (tg.kind === "puzzle") {
        const y = tg.r[1] + 2 + Math.sin(t * 3) * 1.5; ctx.fillStyle = "#ffd76a"; ctx.globalAlpha = .9;
        ctx.fillRect(Math.round(cx) - 1, Math.round(y) - 3, 3, 7); ctx.fillRect(Math.round(cx) - 3, Math.round(y) - 1, 7, 3); ctx.globalAlpha = 1;
      } else sparkle(cx + (tg.glint ? 0 : (tg.r[2] / 4) * Math.sin(tg.r[0])), tg.r[1] + (tg.glint ? tg.r[3] / 2 : Math.min(8, tg.r[3] / 3)), t, "#fffbe0");
    });
    if (near && !dlg) {
      const cx = near.r[0] + near.r[2] / 2, y = Math.round(near.r[1] - (near.kind === "npc" && !near.done ? 16 : 7) + Math.sin(t * 5) * 1.5);
      ctx.fillStyle = "#ffffff"; ctx.fillRect(Math.round(cx) - 3, y, 7, 2); ctx.fillRect(Math.round(cx) - 2, y + 2, 5, 1); ctx.fillRect(Math.round(cx) - 1, y + 3, 3, 1); ctx.fillRect(Math.round(cx), y + 4, 1, 1);
    }
    weather(m, t);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const px = (P.x - cam.x) * k, py = (P.y - 14 - cam.y) * k;
    if (dk) {
      // áramszünet: csak a nyomozó lámpása és a tűz világít, villámláskor egy pillanatra minden látszik
      if (!dark || dark.width !== cv.width || dark.height !== cv.height) { dark = document.createElement("canvas"); dark.width = cv.width; dark.height = cv.height; }
      const d = dark.getContext("2d");
      d.globalCompositeOperation = "source-over"; d.clearRect(0, 0, dark.width, dark.height);
      d.fillStyle = `rgba(4,4,12,${(rule.alpha || .94) * (1 - Math.min(1, flash))})`; d.fillRect(0, 0, dark.width, dark.height);
      d.globalCompositeOperation = "destination-out";
      const hole = (x, y, r, a) => { const gr = d.createRadialGradient(x, y, r * .25, x, y, r); gr.addColorStop(0, `rgba(0,0,0,${a})`); gr.addColorStop(1, "rgba(0,0,0,0)"); d.fillStyle = gr; d.fillRect(x - r, y - r, r * 2, r * 2); };
      const fl = 1 + Math.sin(t * 9) * .03 + Math.sin(t * 23) * .02;
      hole(px, py, (rule.lamp || 62) * k * fl, 1);
      (m.lights || []).forEach(([lx, ly, lr]) => hole((lx - cam.x) * k, (ly - cam.y) * k, lr * k * (1 + Math.sin(t * 7 + lx) * .06), .95));
      ctx.drawImage(dark, 0, 0);
      ctx.globalCompositeOperation = "lighter";
      const tint = rule.tint === "red" ? "255,40,40" : "255,170,70";
      const warm = (x, y, r, a) => { const gr = ctx.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(${tint},${a})`); gr.addColorStop(1, `rgba(${tint},0)`); ctx.fillStyle = gr; ctx.fillRect(x - r, y - r, r * 2, r * 2); };
      warm(px, py, 50 * k, .10 * fl);
      (m.lights || []).forEach(([lx, ly, lr]) => warm((lx - cam.x) * k, (ly - cam.y) * k, lr * k * .8, (rule.tint === "red" ? .35 : .16) * fl));
      ctx.globalCompositeOperation = "source-over";
    } else {
      // éjszaka és vihar: sötétkék fátyol, szélein mélyebb árnyék; gyertyafény az áramszünet után
      ctx.fillStyle = S().wlit ? "rgba(40,22,6,.16)" : "rgba(18,20,52,.16)"; ctx.fillRect(0, 0, cv.width, cv.height);
      const g = ctx.createRadialGradient(px, py, 40 * k, px, py, 190 * k);
      g.addColorStop(0, "rgba(10,8,24,0)"); g.addColorStop(1, "rgba(10,8,24,.55)"); ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
    }
    if (flash > 0) { ctx.fillStyle = `rgba(235,240,255,${Math.min(1, flash) * .5})`; ctx.fillRect(0, 0, cv.width, cv.height); }
    if (fade > 0) { ctx.fillStyle = `rgba(10,8,16,${fade})`; ctx.fillRect(0, 0, cv.width, cv.height); }
    if (bark) sayEl(bark); else sayEl(null);
  }
  // időjárás a szabadtéri helyiségeken: eső, köd, hó
  function weather(m, t) {
    const W2 = m.weather || {}; if (!Object.keys(W2).length) return;
    m.rooms.forEach(r => {
      const kind = W2[r.loc || r.label]; if (!kind) return;
      const [rx, ry, rw, rh] = r.rect.map(v => v * TS);
      ctx.save(); ctx.beginPath(); ctx.rect(rx, ry - TS * 2, rw, rh + TS * 2); ctx.clip();
      if (kind === "rain") {
        ctx.strokeStyle = "rgba(190,210,240,.45)"; ctx.lineWidth = 1; ctx.beginPath();
        for (let i = 0; i < rw * rh / 260; i++) { const x = rx + ((i * 97.3 + t * 40) % rw), y = ry - TS * 2 + ((i * 61.7 + t * 230) % (rh + TS * 2)); ctx.moveTo(x, y); ctx.lineTo(x - 2, y + 6); }
        ctx.stroke();
      } else if (kind === "snow") {
        ctx.fillStyle = "rgba(255,255,255,.8)";
        for (let i = 0; i < rw * rh / 300; i++) { const x = rx + ((i * 97.3 + Math.sin(t + i) * 6 + t * 8) % rw), y = ry + ((i * 61.7 + t * 30) % rh); ctx.fillRect(x, y, 1, 1); }
      } else if (kind === "fog") {
        for (let i = 0; i < 7; i++) {
          const x = rx + ((i * 173 + t * 6 * (i % 2 ? 1 : -1)) % (rw + 160) + rw + 160) % (rw + 160) - 80, y = ry + (i * 53) % rh, R = 60 + (i % 3) * 20;
          const g = ctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, "rgba(220,226,230,.45)"); g.addColorStop(1, "rgba(220,226,230,0)"); ctx.fillStyle = g; ctx.fillRect(x - R, y - R, R * 2, R * 2);
        }
      }
      ctx.restore();
    });
  }
  function sounds(now, moved) {
    const m = map();
    if (moved) {
      stepAcc += moved;
      if (stepAcc > 14) { stepAcc = 0; const r = curRoom(), i = r ? m.rooms.indexOf(r) : -1; SFX("step_" + ((m.snd || [])[i] || "wood")); }
    }
    if (now > tickAt) { tickAt = now + 1000; if ((m.ticks || []).some(([x, y]) => Math.hypot(P.x - x, P.y - y) < 80)) SFX("clock"); }
  }
  function loop(now) {
    if (!cv || !document.body.contains(cv)) { raf = 0; sub(null); return; }
    const t = now / 1000, dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
    let dx = 0, dy = 0;
    if (!dlg) {
      if (keys.has("l")) dx--; if (keys.has("r")) dx++; if (keys.has("u")) dy--; if (keys.has("d")) dy++;
      if (dx || dy) path = null, pending = null;
      else if (path) {
        const [tx, ty] = path[0], ddx = tx - P.x, ddy = ty - P.y, d = Math.hypot(ddx, ddy);
        if (d < 1.5) { path.shift(); if (!path.length) { path = null; if (pending) { const a = pending; pending = null; interact(a); } } }
        else { dx = ddx / d; dy = ddy / d; }
      }
    }
    P.moving = false; let moved = 0;
    if (dx || dy) {
      const l = Math.hypot(dx, dy), sp = SPEED * dt; dx = dx / l * sp; dy = dy / l * sp;
      P.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
      const ox = P.x, oy = P.y; tryMove(dx, dy);
      moved = Math.hypot(P.x - ox, P.y - oy); P.moving = moved > 0;
      if (!P.moving && path) { path = null; pending = null; }
      if (P.moving) savePos();
    }
    updNpcs(dt); updBark(now); updTalk(now); sounds(now, moved);
    const n2 = dlg ? null : findNear();
    if ((n2 && n2.id) !== (near && near.id)) { near = n2; hud(); } else near = n2;
    actButton();
    if (now > nextFlash) { nextFlash = now + 22000 + Math.random() * 26000; window.dispatchEvent(new CustomEvent("mm:lightning")); }
    flash = Math.max(0, flash - dt * 1.6); fade = Math.max(0, fade - dt * 2.5);
    draw(t);
    raf = requestAnimationFrame(loop);
  }

  /* ---------- billentyűzet és érintés ---------- */
  const KEYMAP = { ArrowLeft: "l", a: "l", A: "l", ArrowRight: "r", d: "r", D: "r", ArrowUp: "u", w: "u", W: "u", ArrowDown: "d", s: "d", S: "d" };
  let keysBound = false;
  function bindKeys() {
    if (keysBound) return; keysBound = true;
    const live = e => cv && document.body.contains(cv) && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName || "") && !document.querySelector(".intro:not(.wdlg)");
    document.addEventListener("keydown", e => {
      if (!live(e)) return;
      if (dlg) { if (e.key === "Escape") { e.preventDefault(); closeDlg(); } return; }
      const k = KEYMAP[e.key];
      if (k) { e.preventDefault(); keys.add(k); return; }
      if ((e.key === "e" || e.key === "E" || e.key === " " || e.key === "Enter") && near && !e.target.closest(".word")) { e.preventDefault(); interact(near); }
    });
    document.addEventListener("keyup", e => { const k = KEYMAP[e.key]; if (k) keys.delete(k); });
    window.addEventListener("blur", () => keys.clear());
    window.addEventListener("resize", resize);
    window.addEventListener("mm:lightning", () => { flash = 1.4; });
  }
  function onTap(e) {
    if (dlg) return;
    const r = cv.getBoundingClientRect(), x = cam.x + (e.clientX - r.left) / z, y = cam.y + (e.clientY - r.top) / z;
    const hit = targets().filter(t => x >= t.r[0] - 3 && x <= t.r[0] + t.r[2] + 3 && y >= t.r[1] - 3 && y <= t.r[1] + t.r[3] + 3)
      .sort((a, b) => a.r[2] * a.r[3] - b.r[2] * b.r[3])[0];
    if (hit) { if (distTo(hit.r, P.x, P.y - 3) <= 17) interact(hit); else walkTo(0, 0, hit); }
    else walkTo(x, y);
  }

  /* ---------- a motor felé ---------- */
  function ensure() {
    const st = S();
    if (P && P.case === C().id) return;
    const sp = st.wpos && W().maps[st.wpos.map] ? st.wpos : null, s0 = W().start;
    P = { case: C().id, map: sp ? sp.map : s0[0], x: sp ? sp.x : s0[1] * TS, y: sp ? sp.y : s0[2] * TS, dir: (sp && sp.dir) || "down", moving: false };
    initNpcs(); dlg = null; path = null; pending = null; bark = null; talk = null;
    unstick();
  }
  // ha egy régi mentés falba vagy tárgyba tette a nyomozót, a legközelebbi szabad helyre kerül
  function unstick() {
    const m = map(); if (!blocked(m, P.x, P.y, true)) return;
    for (let r = 4; r < 200; r += 4) for (let a = 0; a < 16; a++) {
      const x = P.x + Math.cos(a / 16 * Math.PI * 2) * r, y = P.y + Math.sin(a / 16 * Math.PI * 2) * r;
      if (!blocked(m, x, y, true) && roomAt(m, x, y) === roomAt(m, P.x, P.y)) { P.x = x; P.y = y; return; }
    }
    const s0 = W().start; P.map = s0[0]; P.x = s0[1] * TS; P.y = s0[2] * TS;
  }
  return {
    html() {
      ensure();
      return `<div class="stack world-wrap">
        <div class="row" style="justify-content:space-between"><span class="eyebrow">${T("Helyszínelés · {0}", esc(map().name))}</span>${A.viewSwitch ? A.viewSwitch() : ""}</div>
        <div class="world" data-world><canvas aria-label="${T("A helyszín térképe. Nyilakkal vagy WASD-vel mozogsz, E-vel vizsgálsz.")}"></canvas><div class="w-banner" aria-live="polite"></div><div class="w-say" hidden></div><div class="w-sub" aria-live="polite" hidden></div><button class="w-act" hidden></button><button class="w-help-btn" data-whelp aria-label="${T("Útmutató")}" title="${T("Útmutató")}">?</button></div>
        <p class="w-hud">${hudHtml()}</p>
        <p class="meta">${T("Mozgás: nyilak vagy WASD, illetve koppints oda, ahová menjen a nyomozó. A csillogó dolgokat E-vel vagy a gombbal vizsgálod meg, a szereplőkkel beszélgethetsz is. Amíg egy helyiség minden nyomát meg nem találod, a következőbe nem léphetsz be.")}</p>
        <div class="w-found">${foundHtml()}</div>
        <p class="meta credit">${T("Pixelgrafika: LimeZu, Modern Interiors")} (limezu.itch.io)</p>
      </div>`;
    },
    mount(el) {
      if (!el) return;
      ensure(); root = el; cv = el.querySelector("canvas"); ctx = cv.getContext("2d");
      bindKeys(); resize();
      const m = map(), r = roomAt(m, P.x, P.y), st = S();
      if (r && r.loc && st.cur !== r.loc) { st.cur = r.loc; A.save(); }
      st.wvis = st.wvis || [];
      cv.onpointerdown = e => { e.preventDefault(); onTap(e); };
      el.querySelector(".w-act").onclick = () => { if (near) interact(near); };
      el.querySelector("[data-whelp]").onclick = () => openDlg("help");
      [W().atlas, m.bg, ...Object.values(W().chars)].forEach(img);
      if (talk && talk.i > 0) sub(who(talk.lines[talk.i - 1][0]), talk.lines[talk.i - 1][1]);
      if (dlg) openDlg(dlg.kind, dlg.id, true);
      else if (!st.wtut && !document.querySelector(".intro:not(.wdlg)")) { st.wtut = 1; A.save(); openDlg("help"); }
      else if (r && r.loc && !st.wvis.includes(r.loc)) { st.wvis.push(r.loc); A.save(); if (!document.querySelector(".intro:not(.wdlg)")) openDlg("scene", r.loc); }
      if (!nextFlash) nextFlash = performance.now() + 9000;
      if (!raf) { last = 0; raf = requestAnimationFrame(loop); }
    },
    // tesztekhez
    debug: () => ({ P, near: near && { kind: near.kind, id: near.id }, targets: targets().map(t => ({ kind: t.kind, id: t.id, done: t.done, r: t.r })), cur: S().cur, map: P && P.map, dark: isDark(), npcs: NS, talk: talk && talk.id, bark: bark && bark.id }),
    tp(mapId, x, y) { P.map = mapId; P.x = x; P.y = y; },
    freeIn(locId) {
      for (const [mid, m] of Object.entries(W().maps)) {
        const pts = [];
        for (let ty = 0; ty < m.h; ty++) for (let tx = 0; tx < m.w; tx++) { const r = regAt(m, tx, ty); if (r && r.loc === locId) { const x = tx * TS + 8, y = ty * TS + 12; if (!blocked(m, x, y) && !blocked(m, x, y + 6)) pts.push([x, y]); } }
        if (pts.length) { const c = pts[Math.floor(pts.length / 2)]; return { map: mid, x: c[0], y: c[1] }; }
      }
      return null;
    },
    interact(kind, id) { const t = targets().find(t => t.kind === kind && t.id === id); if (t) interact(t); return !!t; },
    walk(x, y) { walkTo(x, y); }
  };
};
