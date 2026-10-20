/* Bejárható pixelvilág: felülnézetes térkép, amelyen a nyomozó végigjárja a helyszínt.
   Az adatokat a tools/world/build_world.py készíti (cases/<ügy>.world.js), a grafika LimeZu Modern Interiors csomagja (limezu.itch.io).
   A motor (engine.js) a belső függvényeit egy API-objektumon adja át. */
window.MM_WORLD_ENGINE = function (A) {
  "use strict";
  const TS = 16, SPEED = 72, DIRS = { right: 0, up: 1, left: 2, down: 3 };
  const imgs = {};
  const img = src => { if (!imgs[src]) { const i = new Image(); i.src = src; i.onload = () => { dirty = true; }; imgs[src] = i; } return imgs[src]; };
  let P = null, dlg = null, path = null, pending = null, root = null, cv = null, ctx = null, raf = 0;
  let dirty = true, last = 0, flash = 0, nextFlash = 0, lastSave = 0, lastToast = 0, near = null, z = 2, dpr = 1, cam = { x: 0, y: 0 }, keys = new Set(), npcDir = {}, fade = 0;
  const W = () => A.data();
  const S = () => A.S, C = () => A.C, T = A.T, esc = A.esc;
  const map = () => W().maps[P.map];
  const locById = id => C().locations.find(l => l.id === id);
  const locOfSpot = id => C().locations.find(l => (l.items || []).some(i => i.clue === id) || (l.decoys && id in l.decoys));
  const locOfPuzzle = pid => C().locations.find(l => l.puzzle === pid);
  const sus = id => C().suspects.find(s => s.id === id);
  const shortName = s => s.short || s.name.split(" ").slice(-1)[0];

  /* ---------- térkép-lekérdezések ---------- */
  function roomAt(m, x, y) {
    const tx = Math.floor(x / TS), ty = Math.floor((y - 1) / TS), r = (m.reg[ty] || "")[tx];
    return r && r !== "." ? m.rooms[r.charCodeAt(0) - 97] : null;
  }
  const overlap = (a, b) => a[0] < b[0] + b[2] && a[0] + a[2] > b[0] && a[1] < b[1] + b[3] && a[1] + a[3] > b[1];
  const npcs = m => m.npcs.filter(n => !n.static);
  function blocked(m, x, y) {
    const box = [x - 5, y - 6, 10, 6];
    if (box[0] < 0 || box[1] < 0 || x + 5 > m.w * TS || y > m.h * TS) return true;
    for (let ty = Math.floor(box[1] / TS); ty <= Math.floor((y - .01) / TS); ty++)
      for (let tx = Math.floor(box[0] / TS); tx <= Math.floor((x + 4.99) / TS); tx++) if ((m.walls[ty] || "")[tx] === "1") return true;
    if (m.solids.some(s => overlap(box, s))) return true;
    return npcs(m).some(n => overlap(box, [n.x * TS - 6, n.y * TS - 5, 12, 5]));
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
      if (n.static) return;
      const r = [n.x * TS - 8, n.y * TS - 28, 16, 28], s = sus(n.id);
      if (n.spot) out.push({ kind: "spot", id: n.spot, r, label: T("A kertész"), done: itemState(n.spot).done, npc: n });
      else if (s) {
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

  /* ---------- helyiségzár ---------- */
  function lockMsg(locId) {
    const L = locById(locId), st = S(), cur = st.cur && locById(st.cur);
    if (!L) return null;
    if (L.requires && !st.solved[L.requires]) return T("Az ajtó zárva: {0}. Előbb máshol kell továbbjutnod.", L.name);
    if (cur && cur.id !== locId && A.remaining(cur)) return T("Előbb fejezd be itt: {0}. Valami még elkerülte a figyelmedet.", cur.name);
    return null;
  }
  function say(msg) { const n = performance.now(); if (n - lastToast > 1600) { lastToast = n; A.SND("wrong"); A.toast(msg); } }
  function enterLoc(locId) {
    const st = S(); st.cur = locId; A.save(); banner(locById(locId).name); hud();
    st.wvis = st.wvis || [];
    if (!st.wvis.includes(locId)) { st.wvis.push(locId); A.save(); if (!document.querySelector(".intro:not(.wdlg)")) openDlg("scene", locId); }
  }

  /* ---------- mozgás ---------- */
  function tryMove(dx, dy) {
    const m = map(); let moved = false;
    const step = (nx, ny) => {
      if (blocked(m, nx, ny)) return false;
      const r1 = roomAt(m, nx, ny);
      if (r1 && r1.loc && r1.loc !== S().cur) {
        const msg = lockMsg(r1.loc); if (msg) { say(msg); path = null; pending = null; return false; }
        P.x = nx; P.y = ny; enterLoc(r1.loc); return true;
      }
      P.x = nx; P.y = ny; return true;
    };
    if (dx && step(P.x + dx, P.y)) moved = true;
    if (dy && step(P.x, P.y + dy)) moved = true;
    if (moved) checkWarp();
    return moved;
  }
  function checkWarp() {
    const m = map(), w = m.warps.find(w => P.x > w.r[0] && P.x < w.r[0] + w.r[2] && P.y > w.r[1] && P.y < w.r[1] + w.r[3]);
    if (!w) return;
    const [mid, tx, ty] = w.to, M2 = W().maps[mid], r = roomAt(M2, tx * TS, ty * TS);
    if (r && r.loc && r.loc !== S().cur) {
      const msg = lockMsg(r.loc);
      if (msg) { say(msg); path = null; pending = null; P.y += 6; return; }
    }
    P.map = mid; P.x = tx * TS; P.y = ty * TS; path = null; pending = null; fade = 1; A.SND("tick"); savePos(true);
    if (r && r.loc && r.loc !== S().cur) enterLoc(r.loc); else banner(r && (r.label || (r.loc && locById(r.loc).name)) || M2.name);
    hud();
  }
  function savePos(now) {
    const t = performance.now();
    if (!now && t - lastSave < 1500) return;
    lastSave = t; S().wpos = { map: P.map, x: Math.round(P.x), y: Math.round(P.y), dir: P.dir }; A.save();
  }

  /* ---------- útkeresés 8 pixeles rácson ---------- */
  const G = 8;
  function bfs(goal) {
    const m = map(), gw = Math.floor(m.w * TS / G), gh = Math.floor(m.h * TS / G);
    const ok = (i, j) => i >= 0 && j >= 0 && i < gw && j < gh && !blocked(m, i * G + 4, j * G + 4) && !lockedAt(m, i * G + 4, j * G + 4);
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
    if (t.npc) npcDir[t.npc.id] = Math.abs(cx - P.x) > Math.abs(cy - P.y) ? (cx > P.x ? "left" : "right") : (cy > P.y ? "up" : "down");
    savePos(true);
    if (t.kind === "spot") examine(t.id);
    else if (t.kind === "puzzle") { A.SND("paper"); openDlg("puzzle", t.id); }
    else if (t.kind === "npc") { A.SND("paper"); openDlg("npc", t.id); }
  }
  function examine(id) {
    const { L, it } = itemState(id); if (!L) return;
    const st = S();
    if (it) {
      if (!st.clues.includes(id)) { A.gain(id); A.save(); A.SND("paper"); if (A.spend(A.COST.take)) return A.renderCase(); }
    } else {
      const key = L.id + ":" + id;
      if (!st.seen.includes(key)) { st.seen.push(key); A.save(); A.SND("tick"); if (A.spend(A.COST.look)) return A.renderCase(); }
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
      if (it) {
        const k = C().clues[id], rest = A.remaining(L);
        return `<span class="eyebrow">${T("Közelebbről megnézed")}</span><h2>${esc(label)}</h2><p>${A.rich(it.text)}</p><span class="found">✓ ${T("Nyom feljegyezve:")} ${esc(k.t)}</span><p class="typed">${A.rich(k.x)}</p>
          <p class="meta">${rest ? T("Ebben a helyiségben még {0} nyom vár rád.", rest) : T("Ebben a helyiségben minden nyomot megtaláltál. Mehetsz tovább.")}</p>${close}`;
      }
      return `<span class="eyebrow">${T("Közelebbről megnézed")}</span><h2>${esc(label)}</h2><p>${A.rich(L.decoys[id])}</p><p class="meta">${T("Nem tűnik nyomnak. De ki tudja.")}</p>${close}`;
    }
    if (kind === "npc") return `${A.susCard(sus(id))}${close}`;
    if (kind === "puzzle") return `<div class="item" data-puzzle="${id}">${A.renderPuzzle(id)}</div>${st.solved[id] ? close : `<div class="row"><button class="link" data-wclose>${T("Később folytatom")}</button></div>`}`;
    return close;
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
    if (kind === "npc") A.bindGyan(card);
    if (kind === "puzzle") A.bindPuzzleIn(card);
    if (!refresh) (card.querySelector("input,select,[data-wclose]") || card).focus({ preventScroll: true });
  }
  function closeDlg() {
    const ov = document.querySelector(".wdlg"); if (ov) ov.remove();
    dlg = null; A.rerender();
  }

  /* ---------- felület ---------- */
  function banner(text) {
    const b = root && root.querySelector(".w-banner"); if (!b || !text) return;
    b.textContent = text; b.classList.remove("on"); void b.offsetWidth; b.classList.add("on");
  }
  function curRoom() { const m = map(), r = roomAt(m, P.x, P.y); return r; }
  function hudHtml() {
    const st = S(), r = curRoom(), L = r && r.loc ? locById(r.loc) : null;
    if (!L) return `<b>${esc((r && r.label) || map().name)}</b>`;
    const tot = (L.items || []).length, got = tot - A.remaining(L);
    const pz = L.puzzle ? ` · ✦ ${st.solved[L.puzzle] ? T("rejtvény megoldva") : T("rejtvény")}` : "";
    return `<b>${esc(L.name)}</b>${r.label ? ` <span class="meta">(${esc(r.label)})</span>` : ""} · ${T("{0}/{1} nyom", got, tot)}${pz}`;
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
    ctx.imageSmoothingEnabled = false; dirty = true;
  }
  function drawChar(id, x, y, dir, moving, t, opt) {
    const im = img(W().chars[id]); if (!im.complete || !im.naturalWidth) return;
    const di = DIRS[dir] ?? 3, fr = di * 6 + (opt && opt.still ? 0 : Math.floor(t * (moving ? 10 : 5) + ((opt && opt.ph) || 0)) % 6);
    const sit = (opt && opt.sit) || 0, dy = (opt && opt.dy) || 0;
    ctx.drawImage(im, fr * 16, moving ? 32 : 0, 16, 32 - sit, Math.round(x - 8), Math.round(y - 32 + dy), 16, 32 - sit);
  }
  function sparkle(x, y, t, col) {
    const a = (Math.sin(t * 4 + x) + 1) / 2, s = 1 + Math.round(a * 2);
    ctx.fillStyle = col; ctx.globalAlpha = .45 + a * .55;
    ctx.fillRect(Math.round(x) - s, Math.round(y), s * 2 + 1, 1); ctx.fillRect(Math.round(x), Math.round(y) - s, 1, s * 2 + 1);
    ctx.globalAlpha = 1;
  }
  function draw(t) {
    const m = map(), w = W(), vw = cv.width / dpr / z, vh = cv.height / dpr / z, MW = m.w * TS, MH = m.h * TS;
    cam.x = MW <= vw ? (MW - vw) / 2 : Math.max(0, Math.min(MW - vw, P.x - vw / 2));
    cam.y = MH <= vh ? (MH - vh) / 2 : Math.max(0, Math.min(MH - vh, P.y - 16 - vh / 2));
    const k = z * dpr, ox = Math.round(cam.x * k), oy = Math.round(cam.y * k);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = "#17131d"; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.setTransform(k, 0, 0, k, -ox, -oy); ctx.imageSmoothingEnabled = false;
    const bg = img(m.bg); if (bg.complete && bg.naturalWidth) ctx.drawImage(bg, 0, 0);
    const at = img(w.atlas), list = [];
    m.fg.forEach(f => list.push({ base: f.base, f }));
    m.npcs.forEach(n => list.push({ base: n.y * TS + (n.static ? 1 : 0), n }));
    list.push({ base: P.y, p: true });
    list.sort((a, b) => a.base - b.base);
    list.forEach(o => {
      if (o.f) { const r = w.sprites[o.f.s]; if (r && at.complete) ctx.drawImage(at, r[0], r[1], r[2], r[3], o.f.x, o.f.y, r[2], r[3]); }
      else if (o.n) drawChar(o.n.id, o.n.x * TS, o.n.y * TS, npcDir[o.n.id] || o.n.dir, false, t, { sit: o.n.sit, dy: o.n.dy, still: o.n.static, ph: o.n.x * 3 });
      else drawChar("detektiv", P.x, P.y, P.dir, P.moving, t);
    });
    // ami még nincs megvizsgálva, az csillog; a rejtvény arany jelet kap; akinek van mondanivalója, annál buborék
    targets().forEach(tg => {
      if (tg.done) return;
      const cx = tg.r[0] + tg.r[2] / 2;
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
    // éjszaka és vihar: sötétkék fátyol, szélein mélyebb árnyék, időnként villámlás
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "rgba(18,20,52,.16)"; ctx.fillRect(0, 0, cv.width, cv.height);
    const px = (P.x - cam.x) * k, py = (P.y - 12 - cam.y) * k, g = ctx.createRadialGradient(px, py, 40 * k, px, py, 190 * k);
    g.addColorStop(0, "rgba(10,8,24,0)"); g.addColorStop(1, "rgba(10,8,24,.55)"); ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
    if (flash > 0) { ctx.fillStyle = `rgba(235,240,255,${flash * .55})`; ctx.fillRect(0, 0, cv.width, cv.height); }
    if (fade > 0) { ctx.fillStyle = `rgba(10,8,16,${fade})`; ctx.fillRect(0, 0, cv.width, cv.height); }
  }
  function loop(now) {
    if (!cv || !document.body.contains(cv)) { raf = 0; return; }
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
    P.moving = false;
    if (dx || dy) {
      const l = Math.hypot(dx, dy), sp = SPEED * dt; dx = dx / l * sp; dy = dy / l * sp;
      P.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
      const ox = P.x, oy = P.y; tryMove(dx, dy);
      P.moving = P.x !== ox || P.y !== oy;
      if (!P.moving && path) { path = null; pending = null; }
      if (P.moving) { savePos(); const n2 = findNear(); if ((n2 && n2.id) !== (near && near.id)) hud(); }
    }
    near = dlg ? null : findNear(); actButton();
    if (now > nextFlash) { flash = 1; nextFlash = now + 22000 + Math.random() * 26000; }
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
    npcDir = {}; dlg = null; path = null; pending = null;
  }
  return {
    html() {
      ensure();
      return `<div class="stack world-wrap">
        <div class="row" style="justify-content:space-between"><span class="eyebrow">${T("Helyszínelés · {0}", esc(map().name))}</span>${A.viewSwitch ? A.viewSwitch() : ""}</div>
        <div class="world" data-world><canvas aria-label="${T("A helyszín térképe. Nyilakkal vagy WASD-vel mozogsz, E-vel vizsgálsz.")}"></canvas><div class="w-banner" aria-live="polite"></div><button class="w-act" hidden></button></div>
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
      [W().atlas, m.bg, ...Object.values(W().chars)].forEach(img);
      if (dlg) openDlg(dlg.kind, dlg.id, true);
      else if (r && r.loc && !st.wvis.includes(r.loc)) { st.wvis.push(r.loc); A.save(); if (!document.querySelector(".intro:not(.wdlg)")) openDlg("scene", r.loc); }
      if (!nextFlash) nextFlash = performance.now() + 9000;
      if (!raf) { last = 0; raf = requestAnimationFrame(loop); }
    },
    // tesztekhez és a súgóhoz
    debug: () => ({ P, near: near && { kind: near.kind, id: near.id }, targets: targets().map(t => ({ kind: t.kind, id: t.id, done: t.done, r: t.r })), cur: S().cur, map: P && P.map }),
    tp(mapId, x, y) { P.map = mapId; P.x = x; P.y = y; },
    interact(kind, id) { const t = targets().find(t => t.kind === kind && t.id === id); if (t) interact(t); return !!t; },
    walk(x, y) { walkTo(x, y); }
  };
};
