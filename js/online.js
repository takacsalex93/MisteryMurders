/* Közös ranglista a Supabase-en keresztül. Ha nincs beállítva (üres URL vagy kulcs), a játék e nélkül is teljes értékű.
   A beállításhoz lásd a README „Közös ranglista” részét és a supabase.sql fájlt.
   Az „anon” kulcs nyilvános: a táblát a sorszintű szabályok védik (csak olvasni és új sort beszúrni lehet). */
window.MM_ONLINE_CONFIG = window.MM_ONLINE_CONFIG || {
  url: "",   // pl. https://abcdefgh.supabase.co
  key: ""    // Project Settings → API → anon public kulcs
};
window.MM_ONLINE = (function () {
  "use strict";
  const cfg = window.MM_ONLINE_CONFIG, enabled = !!(cfg.url && cfg.key);
  const base = () => cfg.url.replace(/\/$/, "") + "/rest/v1/results";
  const H = () => ({ apikey: cfg.key, Authorization: "Bearer " + cfg.key, "Content-Type": "application/json" });
  const get = (k, d) => { try { return localStorage.getItem(k) || d; } catch (e) { return d; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  function uuid() { return (crypto.randomUUID && crypto.randomUUID()) || "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (c ^ Math.random() * 16 >> c / 4).toString(16)); }
  function pid() { let p = get("mm:pid", ""); if (!p) { p = uuid(); set("mm:pid", p); } return p; }
  const cache = {};
  async function q(params, ttl) {
    if (!enabled) return [];
    const k = params; if (cache[k] && Date.now() - cache[k].t < (ttl || 30000)) return cache[k].v;
    const r = await fetch(base() + "?" + params, { headers: H() });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const v = await r.json(); cache[k] = { t: Date.now(), v }; return v;
  }
  // játékosonként a legjobb eredmény, pontszám, majd kevesebb próbálkozás és súgó szerint
  function best(rows) {
    const by = {};
    rows.forEach(r => { const b = by[r.player_id]; if (!b || r.score > b.score || (r.score === b.score && (r.minutes || 1e9) < (b.minutes || 1e9))) by[r.player_id] = r; });
    return Object.values(by).sort((a, b) => b.score - a.score || a.tries - b.tries || a.hints - b.hints || (a.minutes || 1e9) - (b.minutes || 1e9));
  }
  return {
    enabled,
    me: pid,
    nick: () => get("mm:nick", ""),
    setNick: n => set("mm:nick", String(n).trim().slice(0, 24)),
    optOut: () => get("mm:noboard", "") === "1",
    setOptOut: v => set("mm:noboard", v ? "1" : ""),
    async submit(rec) {
      if (!enabled) return false;
      const body = Object.assign({ player_id: pid(), player: get("mm:nick", "") }, rec);
      const r = await fetch(base(), { method: "POST", headers: Object.assign(H(), { Prefer: "return=minimal" }), body: JSON.stringify(body) });
      Object.keys(cache).forEach(k => delete cache[k]);
      return r.ok;
    },
    // egy ügy (vagy egy nap kihívása) ranglistája
    async board(caseId, run) {
      const rows = await q(`select=player_id,player,score,tries,hints,minutes,mode,timed&case_id=eq.${encodeURIComponent(caseId)}&run=eq.${encodeURIComponent(run)}&order=score.desc&limit=500`);
      return best(rows);
    },
    // összesített: játékosonként az ügyek legjobb pontjainak összege (a napi kihívások nélkül)
    async totals() {
      const rows = await q("select=player_id,player,case_id,score&run=in.(normal,weekly)&order=created_at.desc&limit=5000", 60000);
      const per = {};
      rows.forEach(r => { const p = per[r.player_id] = per[r.player_id] || { player: r.player, cases: {} }; p.cases[r.case_id] = Math.max(p.cases[r.case_id] || 0, r.score); });
      return Object.entries(per).map(([id, p]) => ({ player_id: id, player: p.player, solved: Object.keys(p.cases).length, points: Object.values(p.cases).reduce((a, b) => a + b, 0) }))
        .sort((a, b) => b.points - a.points || b.solved - a.solved);
    },
    // hány különböző játékos oldotta meg az egyes ügyeket
    async counts() {
      const rows = await q("select=player_id,case_id&run=in.(normal,weekly)&limit=5000", 60000);
      const c = {}; rows.forEach(r => { (c[r.case_id] = c[r.case_id] || new Set()).add(r.player_id); });
      return Object.fromEntries(Object.entries(c).map(([k, v]) => [k, v.size]));
    }
  };
})();
