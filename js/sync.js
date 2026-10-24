/* Játékállás szinkronizálása több eszköz között a Supabase-en (supabase_sync.sql).
   A játékos „nyomozói kódja” a kulcs: aki ismeri, az fel- és letöltheti a mentést. A kódot a szerver csak lenyomatként tárolja.
   Összefésülés: ügyenként az újabb állás nyer (_t időbélyeg), a kitüntetések és a napi napló egyesül. */
window.MM_SYNC = (function () {
  "use strict";
  const cfg = window.MM_ONLINE_CONFIG || {}, enabled = !!(cfg.url && cfg.key);
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const del = k => { try { localStorage.removeItem(k); } catch (e) {} };
  const H = () => Object.assign({ apikey: cfg.key, "Content-Type": "application/json" }, /^eyJ/.test(cfg.key) ? { Authorization: "Bearer " + cfg.key } : {});
  async function rpc(name, args, keepalive) {
    const r = await fetch(cfg.url.replace(/\/$/, "") + "/rest/v1/rpc/" + name, { method: "POST", headers: H(), body: JSON.stringify(args), keepalive: !!keepalive });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const t = await r.text(); return t ? JSON.parse(t) : null;
  }
  // ezek a kulcsok utaznak: minden ügyállás és a játékos saját beállításai
  const KEEP = ["mm:nick", "mm:avatar", "mm:ach", "mm:daily", "mm:stamped", "mm:s2seen", "mm:pid", "mm:noboard", "mm:nostats"];
  const synced = k => k.startsWith("mm3:") || KEEP.includes(k);
  const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  function newCode() {
    const a = new Uint8Array(20); crypto.getRandomValues(a);
    return Array.from(a, x => ALPHA[x % ALPHA.length]).join("").replace(/(.{4})(?=.)/g, "$1-");
  }
  const norm = c => String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const pretty = c => norm(c).replace(/(.{4})(?=.)/g, "$1-");
  const code = () => get("mm:sync") || "";
  function snapshot() {
    const d = {};
    try { Object.keys(localStorage).filter(synced).forEach(k => { d[k] = localStorage.getItem(k); }); } catch (e) {}
    return { v: 1, at: Date.now(), d };
  }
  const parse = (s, f) => { try { return JSON.parse(s); } catch (e) { return f; } };
  // a távoli mentést beolvasztja a helyibe; visszaadja, mely kulcsok változtak
  function merge(remote, adoptPid) {
    const changed = [];
    if (!remote || !remote.d) return changed;
    for (const [k, rv] of Object.entries(remote.d)) {
      if (!synced(k) || typeof rv !== "string") continue;
      const lv = get(k);
      let nv = lv;
      if (lv === null) nv = rv;
      else if (k.startsWith("mm3:")) {
        // első összekapcsoláskor a két eszköz külön haladt: a nagyobb előrehaladás nyer; utána a frissebb mentés
        const a = parse(lv, {}), b = parse(rv, {});
        const prog = x => (x.ended === "win" ? 10000 : x.ended ? 5000 : 0) + (x.clues || []).length * 10 + Object.keys(x.solved || {}).length * 20 + (x.conf || []).length * 5;
        if (adoptPid ? prog(b) > prog(a) || (prog(b) === prog(a) && (b._t || 0) > (a._t || 0)) : (b._t || 0) > (a._t || 0)) nv = rv;
      }
      else if (k === "mm:ach" || k === "mm:stamped") nv = JSON.stringify([...new Set([...parse(lv, []), ...parse(rv, [])])]);
      else if (k === "mm:daily") {
        const a = parse(lv, {}), b = parse(rv, {}), o = Object.assign({}, b);
        for (const [day, e] of Object.entries(a)) { const x = o[day]; if (!x || (e.ended === "win" && (x.ended !== "win" || (e.score || 0) > (x.score || 0)))) o[day] = e; }
        nv = JSON.stringify(o);
      }
      else if (k === "mm:pid") nv = adoptPid ? rv : lv;
      if (nv !== lv) { set(k, nv); changed.push(k); }
    }
    return changed;
  }
  let timer = 0, busy = false, again = false;
  async function push(keepalive) {
    clearTimeout(timer); timer = 0;
    if (!enabled || !code()) return;
    if (busy) { again = true; return; }
    busy = true;
    try { await rpc("sync_push", { p_key: norm(code()), p_data: snapshot() }, keepalive); set("mm:synclast", String(Date.now())); del("mm:syncerr"); }
    catch (e) { set("mm:syncerr", String(e.message || e)); }
    busy = false;
    if (again) { again = false; schedule(); }
  }
  function schedule() { if (enabled && code() && !timer) timer = setTimeout(push, 4000); }
  async function pull() {
    if (!enabled || !code()) return [];
    const r = await rpc("sync_pull", { p_key: norm(code()) });
    set("mm:synclast", String(Date.now()));
    return r && r.data ? merge(r.data, false) : [];
  }
  addEventListener("pagehide", () => { if (timer) push(true); });
  addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && timer) push(true); });
  return {
    enabled,
    on: () => enabled && !!code(),
    code: () => pretty(code()),
    last: () => +(get("mm:synclast") || 0),
    error: () => get("mm:syncerr") || "",
    schedule, push, pull, pretty,
    // új kód ezen az eszközön, a mostani állás feltöltésével
    async start() { const c = newCode(); set("mm:sync", c); await push(); if (get("mm:syncerr")) { del("mm:sync"); throw new Error(get("mm:syncerr")); } return pretty(c); },
    // meglévő kód megadása: letölti, beolvasztja (a ranglistás azonosítót is átveszi), majd visszatölti az egyesített állást
    async link(c) {
      const k = norm(c); if (k.length < 16) throw new Error("short");
      const r = await rpc("sync_pull", { p_key: k });
      if (!r || !r.data) throw new Error("notfound");
      const ch = merge(r.data, true); set("mm:sync", pretty(k)); await push(); return ch;
    },
    off() { clearTimeout(timer); timer = 0; del("mm:sync"); del("mm:synclast"); del("mm:syncerr"); }
  };
})();
