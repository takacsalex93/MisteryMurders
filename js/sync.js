/* Bejelentkezés (Supabase Auth: Google vagy e-mail + jelszó) és a játékállás tárolása a játékos fiókjában (supabase_sync.sql).
   Külső könyvtár nélkül, a Supabase REST felületén. A munkamenet a böngészőben marad (mm:auth), a token magától frissül.
   Összefésülés: egy eszköz első bejelentkezésekor ügyenként a nagyobb előrehaladás nyer, utána a frissebb mentés;
   a kitüntetések és a napi napló egyesül, a ranglistás azonosító közös lesz. */
window.MM_SYNC = (function () {
  "use strict";
  const cfg = window.MM_ONLINE_CONFIG || {}, enabled = !!(cfg.url && cfg.key);
  const URL0 = (cfg.url || "").replace(/\/$/, "");
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const del = k => { try { localStorage.removeItem(k); } catch (e) {} };
  const parse = (s, f) => { try { return JSON.parse(s); } catch (e) { return f; } };
  const jwt = t => { try { return JSON.parse(decodeURIComponent(escape(atob(t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))))); } catch (e) { return {}; } };
  const home = () => location.origin + location.pathname;

  /* ---------- munkamenet ---------- */
  let sess = parse(get("mm:auth"), null);
  function keep(d) {
    const p = jwt(d.access_token);
    sess = { access_token: d.access_token, refresh_token: d.refresh_token, expires_at: d.expires_at || (Math.floor(Date.now() / 1000) + (+d.expires_in || 3600)),
      user: { id: (d.user && d.user.id) || p.sub, email: (d.user && d.user.email) || p.email || "", name: (d.user && d.user.user_metadata && (d.user.user_metadata.full_name || d.user.user_metadata.name)) || (p.user_metadata && (p.user_metadata.full_name || p.user_metadata.name)) || "" } };
    set("mm:auth", JSON.stringify(sess));
  }
  // visszatérés a Google-bejelentkezésből vagy a jelszó-visszaállító levélből: a token a címsor # része mögött érkezik
  let recovery = false, authErr = "";
  (function readHash() {
    const h = location.hash.slice(1);
    if (!/(^|&)(access_token|error)=/.test(h)) return;
    const q = Object.fromEntries(new URLSearchParams(h));
    if (q.access_token) { keep(q); recovery = q.type === "recovery"; set("mm:authnew", "1"); }
    else if (q.error) authErr = q.error_description || q.error;
    history.replaceState(null, "", location.pathname + location.search);
  })();

  async function api(path, opts, auth) {
    const h = { apikey: cfg.key, "Content-Type": "application/json" };
    if (auth) h.Authorization = "Bearer " + (await token());
    const r = await fetch(URL0 + path, Object.assign({}, opts, { headers: Object.assign(h, (opts && opts.headers) || {}) }));
    const t = await r.text(), j = t ? parse(t, {}) : {};
    if (!r.ok) { const e = new Error(j.error_code || j.code || j.error || ("HTTP " + r.status)); e.msg = j.msg || j.error_description || j.message || ""; e.status = r.status; throw e; }
    return j;
  }
  async function token() {
    if (!sess) throw new Error("nosession");
    if (sess.expires_at - 60 > Date.now() / 1000) return sess.access_token;
    try { const d = await api("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: JSON.stringify({ refresh_token: sess.refresh_token }) }); keep(d); return sess.access_token; }
    catch (e) { if (e.status === 400 || e.status === 401) { sess = null; del("mm:auth"); } throw e; }
  }

  /* ---------- mentés és összefésülés ---------- */
  const KEEP = ["mm:nick", "mm:avatar", "mm:ach", "mm:daily", "mm:stamped", "mm:s2seen", "mm:pid", "mm:noboard", "mm:nostats"];
  const synced = k => k.startsWith("mm3:") || KEEP.includes(k);
  function snapshot() {
    const d = {};
    try { Object.keys(localStorage).filter(synced).forEach(k => { d[k] = localStorage.getItem(k); }); } catch (e) {}
    return { v: 1, at: Date.now(), d };
  }
  function merge(remote, first) {
    const changed = [];
    if (!remote || !remote.d) return changed;
    for (const [k, rv] of Object.entries(remote.d)) {
      if (!synced(k) || typeof rv !== "string") continue;
      const lv = get(k);
      let nv = lv;
      if (lv === null) nv = rv;
      else if (k.startsWith("mm3:")) {
        const a = parse(lv, {}), b = parse(rv, {});
        const prog = x => (x.ended === "win" ? 10000 : x.ended ? 5000 : 0) + (x.clues || []).length * 10 + Object.keys(x.solved || {}).length * 20 + (x.conf || []).length * 5;
        if (first ? prog(b) > prog(a) || (prog(b) === prog(a) && (b._t || 0) > (a._t || 0)) : (b._t || 0) > (a._t || 0)) nv = rv;
      }
      else if (k === "mm:ach" || k === "mm:stamped") nv = JSON.stringify([...new Set([...parse(lv, []), ...parse(rv, [])])]);
      else if (k === "mm:daily") {
        const a = parse(lv, {}), b = parse(rv, {}), o = Object.assign({}, b);
        for (const [day, e] of Object.entries(a)) { const x = o[day]; if (!x || (e.ended === "win" && (x.ended !== "win" || (e.score || 0) > (x.score || 0)))) o[day] = e; }
        nv = JSON.stringify(o);
      }
      else if (k === "mm:pid") nv = first ? rv : lv;
      if (nv !== lv) { set(k, nv); changed.push(k); }
    }
    return changed;
  }
  let timer = 0, busy = false, again = false;
  const on = () => enabled && !!sess;
  async function push(keepalive) {
    clearTimeout(timer); timer = 0;
    if (!on()) return;
    if (busy) { again = true; return; }
    busy = true;
    try {
      await api("/rest/v1/user_saves?on_conflict=user_id", { method: "POST", keepalive: !!keepalive, headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify({ user_id: sess.user.id, data: snapshot() }) }, true);
      set("mm:synclast", String(Date.now())); del("mm:syncerr");
    } catch (e) { set("mm:syncerr", e.message); }
    busy = false;
    if (again) { again = false; schedule(); }
  }
  function schedule() { if (on() && !timer) timer = setTimeout(push, 4000); }
  // letölti a fiókban lévő mentést és beolvasztja; az eszköz első bejelentkezésekor utána fel is tölti az egyesített állást
  async function pull() {
    if (!on()) return [];
    const rows = await api(`/rest/v1/user_saves?select=data,updated_at&user_id=eq.${sess.user.id}`, { method: "GET" }, true);
    const first = get("mm:authlinked") !== sess.user.id;
    const ch = rows && rows[0] ? merge(rows[0].data, first) : [];
    set("mm:synclast", String(Date.now()));
    if (first) { set("mm:authlinked", sess.user.id); await push(); }
    return ch;
  }
  addEventListener("pagehide", () => { if (timer) push(true); });
  addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && timer) push(true); });

  /* ---------- bejelentkezés ---------- */
  return {
    enabled, on, schedule, push, pull,
    user: () => sess && sess.user,
    last: () => +(get("mm:synclast") || 0),
    error: () => get("mm:syncerr") || "",
    recovery: () => recovery,
    authError: () => authErr,
    // most jött vissza a Google-ből (egyszer igaz)
    justSignedIn() { const v = get("mm:authnew") === "1"; del("mm:authnew"); return v; },
    google() { location.href = `${URL0}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(home())}`; },
    async signUp(email, password) {
      const d = await api(`/auth/v1/signup?redirect_to=${encodeURIComponent(home())}`, { method: "POST", body: JSON.stringify({ email, password }) });
      if (d.access_token) { keep(d); return { ok: true }; }
      return { confirm: true };
    },
    async signIn(email, password) { keep(await api("/auth/v1/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) })); },
    async recover(email) { await api(`/auth/v1/recover?redirect_to=${encodeURIComponent(home())}`, { method: "POST", body: JSON.stringify({ email }) }); },
    async setPassword(password) { await api("/auth/v1/user", { method: "PUT", body: JSON.stringify({ password }) }, true); recovery = false; },
    async signOut() {
      if (timer) await push();
      try { await api("/auth/v1/logout", { method: "POST" }, true); } catch (e) {}
      sess = null; del("mm:auth"); del("mm:authlinked"); del("mm:synclast"); del("mm:syncerr");
    }
  };
})();
