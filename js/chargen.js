/* Karakterkészítő: a játékos megalkothatja a saját nyomozóját (bőr, szem, frizura, hajszín, ruha, ruhaszín, kalap, arc).
   A rétegek az images/world/chargen.png képen vannak (tools/chargen_parts.py), a leírójuk a js/chargen-data.js.
   Az összerakott 384x64-es lap (állás + járás, 4 irány × 6 kocka) a böngészőben marad (mm:charpng), és a pixeles pályán
   meg az irodában ez jelenik meg a tokos detektív helyett. */
window.MM_CHAR = (function () {
  "use strict";
  const D = window.MM_CHARGEN;
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const del = k => { try { localStorage.removeItem(k); } catch (e) {} };
  const DEF = { body: "03", eyes: "01", hair: "06", hairc: 4, outfit: "18", outc: 2, hat: 3, face: "" };
  const pad = n => String(n).padStart(2, "0");
  const HAIRS = D ? [...new Set(Object.keys(D.idx.hair).map(k => k.split("_")[0]))] : [];
  const OUTFITS = D ? [...new Set(Object.keys(D.idx.outfit).map(k => k.split("_")[0]))] : [];
  const outColors = o => Object.keys(D.idx.outfit).filter(k => k.startsWith(o + "_")).map(k => +k.split("_")[1]);
  const FACES = [["", "Semmi"], ["Mustache", "Bajusz"], ["Beard", "Szakáll"], ["Glasses", "Szemüveg"], ["Monocle", "Monokli"]];
  // a választott jellemzőkből a rétegek sorszámai, alulról felfelé
  function layersOf(s) {
    const L = [D.idx.body[s.body], D.idx.eyes[s.eyes], D.idx.outfit[s.outfit + "_" + pad(s.outc)]];
    if (s.hair) L.push(D.idx.hair[s.hair + "_" + pad(s.hairc)]);
    if (s.face) {
      const kind = s.face.split(":")[0], c = +(s.face.split(":")[1] || 1);
      const key = kind === "Mustache" ? "12_Mustache_" + pad(Math.min(5, s.hairc)) : kind === "Beard" ? "13_Beard_" + pad(Math.min(5, s.hairc))
        : kind === "Glasses" ? "15_Glasses_" + pad(c) : kind === "Monocle" ? "16_Monocle_01" : "";
      if (D.idx.face[key] !== undefined) L.push(D.idx.face[key]);
    }
    if (s.hat) L.push(D.idx.hat["08_Detective_Hat_" + pad(s.hat)]);
    return L.filter(x => x !== undefined);
  }
  let atlas = null;
  function load() {
    if (atlas) return atlas;
    atlas = new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = "images/world/chargen.png"; });
    return atlas;
  }
  async function compose(s) {
    const im = await load(), cv = document.createElement("canvas"); cv.width = D.w; cv.height = D.h;
    const g = cv.getContext("2d");
    layersOf(s).forEach(i => g.drawImage(im, (i % D.cols) * D.w, Math.floor(i / D.cols) * D.h, D.w, D.h, 0, 0, D.w, D.h));
    return cv;
  }
  const spec = () => Object.assign({}, DEF, JSON.parse(get("mm:char") || "{}"));
  const sheet = () => get("mm:charpng") || "";
  function apply() { window.MM_PLAYER_SHEET = sheet() || null; }
  apply();
  const rnd = a => a[Math.floor(Math.random() * a.length)];
  function random() {
    const o = rnd(OUTFITS), f = rnd(FACES.concat([["", ""], ["", ""]]))[0];
    return { body: rnd(Object.keys(D.idx.body)), eyes: rnd(Object.keys(D.idx.eyes)), hair: rnd(HAIRS), hairc: 1 + Math.floor(Math.random() * 7), outfit: o, outc: rnd(outColors(o)), hat: rnd([0, 1, 2, 3, 3]), face: f === "Glasses" ? "Glasses:" + (1 + Math.floor(Math.random() * 3)) : f };
  }
  // fej (16x16) vagy egész alak kicsinyített képe egy vászonra
  function thumb(src, full, scale) {
    const c = document.createElement("canvas"), h = full ? 32 : 18; c.width = 16 * scale; c.height = h * scale;
    const g = c.getContext("2d"); g.imageSmoothingEnabled = false;
    g.drawImage(src, 18 * 16, full ? 0 : 1, 16, h, 0, 0, 16 * scale, h * scale);
    return c;
  }

  /* ---------- a szerkesztő ablak ---------- */
  function open(opts) {
    opts = opts || {};
    const T = (window.MM_I18N && window.MM_I18N.T) || (s => s), SND = window.MM_AUDIO ? n => window.MM_AUDIO.sfx(n) : () => {};
    let s = spec(), dir = 3, walk = true, raf = 0, cur = null;
    const ov = document.createElement("div"); ov.className = "intro on"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", T("Nyomozód megalkotása"));
    ov.innerHTML = `<div class="intro-card chargen"><span class="eyebrow">🎨 ${T("Nyomozód megalkotása")}</span>
      <div class="cg-wrap">
        <div class="cg-prev"><canvas width="96" height="192" data-cgprev aria-label="${T("Előnézet")}"></canvas>
          <div class="row cg-dirs"><button class="btn ghost small" data-cgrot="-1" aria-label="${T("Forgatás balra")}">↺</button><button class="btn ghost small" data-cgwalk>${T("Áll")}</button><button class="btn ghost small" data-cgrot="1" aria-label="${T("Forgatás jobbra")}">↻</button></div>
          <button class="btn ghost small" data-cgrand>🎲 ${T("Véletlen")}</button></div>
        <div class="cg-opts" data-cgopts></div>
      </div>
      <div class="row"><button class="btn" data-cgsave>${T("Ez lesz a nyomozóm")}</button><button class="btn ghost" data-cgreset>${T("Alapértelmezett")}</button><button class="link" data-close>${T("Mégse")}</button></div>
      <p class="meta">${T("A nyomozód a pixeles helyszíneken és az irodádban jelenik meg.")}</p></div>`;
    document.body.appendChild(ov);
    const pv = ov.querySelector("[data-cgprev]"), pg = pv.getContext("2d"); pg.imageSmoothingEnabled = false;
    const close = () => { cancelAnimationFrame(raf); ov.remove(); };
    ov.querySelector("[data-close]").onclick = close; ov.onclick = e => { if (e.target === ov) close(); };
    const t0 = performance.now();
    function frame(now) {
      if (!ov.isConnected) return;
      pg.clearRect(0, 0, 96, 192);
      if (cur) { const f = dir * 6 + Math.floor((now - t0) / (walk ? 100 : 200)) % 6; pg.drawImage(cur, f * 16, walk ? 32 : 0, 16, 32, 0, 0, 96, 192); }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    const row = (label, html) => `<div class="cg-row"><span class="cg-k">${label}</span><div class="cg-v">${html}</div></div>`;
    const swb = (attr, val, col, on, title) => `<button class="sw ${on ? "on" : ""}" data-${attr}="${val}" style="--c:${col}" aria-label="${title}" aria-pressed="${on}" title="${title}"></button>`;
    async function draw() {
      cur = await compose(s);
      const o = ov.querySelector("[data-cgopts]"), sw = i => D.sw[i] || "#888";
      // frizura és ruha: kis képek a többi jellemző mostani értékével
      const hairThumbs = await Promise.all([""].concat(HAIRS).map(async h => { const c = await compose(Object.assign({}, s, { hair: h, hat: 0 })); return [h, thumb(c, false, 3).toDataURL()]; }));
      const outThumbs = await Promise.all(OUTFITS.map(async x => { const c = await compose(Object.assign({}, s, { outfit: x, outc: outColors(x).includes(s.outc) ? s.outc : outColors(x)[0], hat: 0, face: "" })); return [x, thumb(c, true, 2).toDataURL()]; }));
      o.innerHTML =
        row(T("Bőr"), Object.keys(D.idx.body).map(b => swb("cgbody", b, sw(D.idx.body[b]), s.body === b, T("Bőrszín"))).join("")) +
        row(T("Szem"), Object.keys(D.idx.eyes).map(e => swb("cgeyes", e, sw(D.idx.eyes[e]), s.eyes === e, T("Szemszín"))).join("")) +
        row(T("Frizura"), hairThumbs.map(([h, u]) => `<button class="pic ${s.hair === h ? "on" : ""}" data-cghair="${h}" aria-pressed="${s.hair === h}" title="${h ? T("Frizura") : T("Kopasz")}"><img src="${u}" alt=""></button>`).join("")) +
        (s.hair || s.face.startsWith("Mustache") || s.face.startsWith("Beard") ? row(T("Hajszín"), [1, 2, 3, 4, 5, 6, 7].map(c => swb("cghairc", c, sw(D.idx.hair[(s.hair || "06") + "_" + pad(c)]), s.hairc === c, T("Hajszín"))).join("")) : "") +
        row(T("Ruha"), outThumbs.map(([x, u]) => `<button class="pic tall ${s.outfit === x ? "on" : ""}" data-cgout="${x}" aria-pressed="${s.outfit === x}" title="${T("Ruha")}"><img src="${u}" alt=""></button>`).join("")) +
        row(T("Ruhaszín"), outColors(s.outfit).map(c => swb("cgoutc", c, sw(D.idx.outfit[s.outfit + "_" + pad(c)]), s.outc === c, T("Ruhaszín"))).join("")) +
        row(T("Kalap"), `<button class="chip ${!s.hat ? "on" : ""}" data-cghat="0">${T("Nincs")}</button>` + [1, 2, 3].map(c => swb("cghat", c, sw(D.idx.hat["08_Detective_Hat_" + pad(c)]), s.hat === c, T("Detektívkalap"))).join("")) +
        row(T("Arc"), FACES.map(([k, l]) => `<button class="chip ${(s.face.split(":")[0] || "") === k ? "on" : ""}" data-cgface="${k}">${T(l)}</button>`).join("") +
          (s.face.startsWith("Glasses") ? [1, 2, 3].map(c => swb("cgglass", c, sw(D.idx.face["15_Glasses_" + pad(c)]), +(s.face.split(":")[1] || 1) === c, T("Szemüveg színe"))).join("") : ""));
      const bind = (attr, fn) => o.querySelectorAll(`[data-${attr}]`).forEach(b => b.onclick = () => { fn(b.dataset[attr.replace(/-./g, m => m[1].toUpperCase())]); SND("tick"); draw(); });
      bind("cgbody", v => s.body = v); bind("cgeyes", v => s.eyes = v); bind("cghair", v => s.hair = v); bind("cghairc", v => s.hairc = +v);
      bind("cgout", v => { s.outfit = v; if (!outColors(v).includes(s.outc)) s.outc = outColors(v)[0]; }); bind("cgoutc", v => s.outc = +v);
      bind("cghat", v => s.hat = +v); bind("cgface", v => s.face = v === "Glasses" ? "Glasses:1" : v); bind("cgglass", v => s.face = "Glasses:" + v);
    }
    ov.querySelectorAll("[data-cgrot]").forEach(b => b.onclick = () => { dir = (dir + 4 + (+b.dataset.cgrot === 1 ? 1 : 3)) % 4; });
    ov.querySelector("[data-cgwalk]").onclick = e => { walk = !walk; e.currentTarget.textContent = T(walk ? "Áll" : "Sétál"); };
    ov.querySelector("[data-cgrand]").onclick = () => { s = random(); SND("paper"); draw(); };
    ov.querySelector("[data-cgreset]").onclick = () => { del("mm:char"); del("mm:charpng"); apply(); SND("paper"); close(); opts.onSave && opts.onSave(); };
    ov.querySelector("[data-cgsave]").onclick = async () => {
      const c = await compose(s);
      set("mm:char", JSON.stringify(s)); set("mm:charpng", c.toDataURL("image/png")); apply();
      SND("stamp"); close(); opts.onSave && opts.onSave();
    };
    draw().catch(() => { ov.querySelector("[data-cgopts]").textContent = T("A karakterkészítő most nem tölthető be."); });
  }
  return { available: !!D, open, sheet, spec, custom: () => !!sheet() };
})();
