/* Hangok: minden hang Web Audio szintézissel készül, hangfájl nélkül.
   MM_AUDIO.setScene(név) vált háttérhangot, MM_AUDIO.sfx(név) lejátszik egy effektet. */
(function () {
  "use strict";
  const KEY = "mm:sound";
  let on = false;
  try { on = localStorage.getItem(KEY) === "1"; } catch (e) {}

  let ctx = null, master = null, white = null, brown = null;
  let want = "home", cur = null, pumpTimer = null;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const midi = n => 440 * Math.pow(2, (n - 69) / 12);

  function ensure() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    const len = ctx.sampleRate * 3;
    white = ctx.createBuffer(1, len, ctx.sampleRate);
    brown = ctx.createBuffer(1, len, ctx.sampleRate);
    const w = white.getChannelData(0), b = brown.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { const r = Math.random() * 2 - 1; w[i] = r; last = (last + 0.02 * r) / 1.02; b[i] = last * 3.5; }
    return true;
  }

  /* ---------- építőkockák ---------- */
  function chain(src, filters, out) {
    let n = src;
    (filters || []).forEach(([type, f, q]) => { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q) b.Q.value = q; n.connect(b); n = b; });
    n.connect(out);
    return n;
  }
  function loop(buf, filters, level, bus, lfo) {
    const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.loopStart = rnd(0, 1);
    const g = ctx.createGain(); g.gain.value = level; g.connect(bus);
    const last = chain(s, filters, g);
    if (lfo && last.frequency) {
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.frequency.value = lfo[0]; og.gain.value = lfo[1]; o.connect(og); og.connect(last.frequency); o.start();
      bus._stops.push(o);
    }
    s.start(0, rnd(0, 2)); bus._stops.push(s);
  }
  function burst(t, dur, filters, peak, bus, buf, attack) {
    const s = ctx.createBufferSource(); s.buffer = buf || white;
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + (attack || 0.004));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(bus || master); chain(s, filters, g);
    s.start(t, rnd(0, 2)); s.stop(t + dur + 0.05);
  }
  function tone(t, freq, dur, peak, type, bus, glideTo) {
    const o = ctx.createOscillator(); o.type = type || "sine"; o.frequency.setValueAtTime(freq, t);
    if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(bus || master); o.start(t); o.stop(t + dur + 0.05);
  }
  function piano(t, note, vel, bus, len) {
    const f = midi(note), d = len || (note < 50 ? 3.2 : 2.4);
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2600; lp.connect(bus || master);
    [[1, 1], [2, 0.35], [3, 0.12]].forEach(([m, a]) => {
      const o = ctx.createOscillator(); o.type = m === 1 ? "triangle" : "sine"; o.frequency.value = f * m;
      const g = ctx.createGain(); g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vel * a, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d / m);
      o.connect(g); g.connect(lp); o.start(t); o.stop(t + d + 0.1);
    });
  }
  const thunder = (t, bus) => {
    burst(t, rnd(3.5, 5.5), [["lowpass", rnd(160, 260)]], 0.9, bus, brown, rnd(0.08, 0.3));
    burst(t + rnd(0.1, 0.4), 1.6, [["lowpass", 700]], 0.25, bus, brown, 0.02);
  };
  const creak = (t, bus) => tone(t, rnd(90, 160), rnd(0.4, 0.9), 0.05, "sawtooth", bus, rnd(60, 110));

  /* ---------- zenék ---------- */
  function arpeggio(chords, stepDur, vel, melody) {
    return (t, i, bus) => {
      const ch = chords[Math.floor(i / 6) % chords.length], k = i % 6;
      piano(t, ch[k], vel * (k === 0 ? 1.3 : 0.8), bus);
      if (melody && k === 0 && Math.random() < 0.7) piano(t + 0.01, ch[3] + 12 + [0, 2, 4][Math.floor(Math.random() * 3)], vel * 0.9, bus);
      return stepDur * (k === 5 ? 1.25 : 1);
    };
  }
  const NOCTURNE = arpeggio([[40, 47, 52, 55, 59, 55], [45, 52, 57, 60, 64, 60], [47, 54, 57, 59, 63, 59], [40, 47, 52, 55, 59, 55]], 0.34, 0.07, true);
  const MYSTERY = arpeggio([[45, 52, 57, 60, 64, 60], [41, 48, 53, 57, 60, 57], [40, 47, 52, 56, 59, 56], [45, 52, 57, 60, 64, 60]], 0.48, 0.05, false);
  function waltz(t, i, bus) {
    const bars = [[45, [57, 60, 64]], [40, [56, 59, 62]], [45, [57, 60, 64]], [38, [57, 62, 65]], [40, [56, 59, 64]], [45, [57, 60, 64]]];
    const [bass, ch] = bars[Math.floor(i / 3) % bars.length], beat = i % 3;
    if (beat === 0) piano(t, bass, 0.07, bus); else ch.forEach(n => piano(t, n, 0.028, bus, 1.2));
    if (beat === 0 && Math.random() < 0.6) piano(t, ch[2] + 12, 0.05, bus);
    return 0.42;
  }
  function jazz(t, i, bus) {
    const prog = [[[43, 46, 50, 47], [53, 58, 62]], [[48, 52, 55, 40], [52, 58, 62]], [[41, 45, 48, 49], [52, 57, 60]], [[50, 54, 57, 44], [54, 60, 64]]];
    const beat = Math.floor(i / 2) % 4, bar = Math.floor(i / 8) % 4, [walk, voice] = prog[bar];
    if (i % 2 === 0) {
      tone(t, midi(walk[beat]), 0.45, 0.11, "triangle", bus);
      burst(t, 0.18, [["highpass", 7000]], 0.025, bus);
      if (beat === 1 || beat === 3) voice.forEach(n => piano(t, n, 0.035, bus, 0.9));
      return 0.333;
    }
    if (beat === 1 || beat === 3) burst(t, 0.12, [["highpass", 7500]], 0.018, bus);
    return 0.167;
  }

  /* ---------- hangulatok ---------- */
  const RAIN = (bus, lvl) => { loop(white, [["highpass", 500], ["lowpass", 5500]], 0.09 * lvl, bus); loop(white, [["bandpass", 2400, 0.6]], 0.035 * lvl, bus); };
  const PROFILES = {
    home: { setup: b => loop(brown, [["lowpass", 180]], 0.05, b), next: MYSTERY },
    storm: { setup: b => RAIN(b, 1), next: (t, i, b) => { burst(t, 0.03, [["bandpass", rnd(2500, 6000), 2]], rnd(0.01, 0.04), b); return rnd(0.06, 0.25); }, thunder: true, auto: [28, 45] },
    "storm-piano": { setup: b => RAIN(b, 0.5), next: NOCTURNE, thunder: true, auto: [35, 60] },
    city: { setup: b => { RAIN(b, 0.7); loop(brown, [["lowpass", 220]], 0.07, b); }, next: (t, i, b) => { if (Math.random() < 0.15) creak(t, b); return rnd(2, 5); } },
    jazz: { setup: b => loop(brown, [["lowpass", 300]], 0.05, b), next: jazz },
    train: {
      setup: b => { loop(white, [["bandpass", 420, 1.2]], 0.07, b, [0.07, 180]); loop(white, [["bandpass", 900, 2]], 0.025, b, [0.11, 300]); loop(brown, [["lowpass", 120]], 0.12, b); },
      next: (t, i, b) => { if (Math.random() < 0.35) creak(t, b); else if (Math.random() < 0.2) burst(t, 1.6, [["highpass", 3000]], 0.04, b, white, 0.2); return rnd(3, 7); }
    },
    clock: { setup: b => loop(brown, [["lowpass", 140]], 0.06, b), next: (t, i, b) => { burst(t, 0.035, [["bandpass", i % 2 ? 2600 : 3200, 6]], 0.06, b); return 1; } },
    cold: { setup: b => { loop(white, [["bandpass", 700, 1.5]], 0.05, b, [0.09, 250]); loop(brown, [["lowpass", 90]], 0.1, b); }, next: (t, i, b) => { creak(t, b); return rnd(5, 10); } },
    theatre: { setup: b => loop(brown, [["bandpass", 400, 0.8]], 0.08, b, [0.13, 120]), next: waltz },
    loft: { setup: b => { loop(white, [["bandpass", 500, 1.2]], 0.04, b, [0.08, 200]); loop(brown, [["lowpass", 150]], 0.06, b); }, next: (t, i, b) => { creak(t, b); if (Math.random() < 0.5) creak(t + 0.5, b); return rnd(2.5, 6); } },
    cellar: {
      setup: b => loop(brown, [["lowpass", 110]], 0.1, b),
      next: (t, i, b) => {
        if (Math.random() < 0.5) tone(t, rnd(900, 1500), 0.18, 0.05, "sine", b, rnd(500, 700));
        else for (let k = 0; k < 3; k++) tone(t + k * rnd(0.08, 0.16), rnd(160, 260), 0.12, 0.05, "sine", b, rnd(300, 420));
        return rnd(0.8, 2.4);
      }
    },
    country: {
      setup: b => loop(white, [["bandpass", 600, 1]], 0.025, b, [0.05, 150]),
      next: (t, i, b) => {
        if (Math.random() < 0.12) { tone(t, 520, 0.35, 0.05, "sine", b, 440); tone(t + 0.5, 480, 0.6, 0.05, "sine", b, 400); return rnd(3, 6); }
        for (let k = 0; k < 3; k++) tone(t + k * 0.06, rnd(4200, 4600), 0.04, 0.012, "sine", b);
        return rnd(0.25, 0.7);
      }
    }
  };

  function startProfile(name) {
    const P = PROFILES[name] || PROFILES.home;
    const bus = ctx.createGain(); bus.gain.value = 0; bus.connect(master); bus._stops = [];
    bus.gain.linearRampToValueAtTime(1, ctx.currentTime + 1.5);
    P.setup(bus);
    return { name, P, bus, at: ctx.currentTime + 0.3, i: 0, nextAuto: P.auto ? ctx.currentTime + rnd(4, 9) : Infinity };
  }
  function stopProfile(p) {
    if (!p) return;
    const t = ctx.currentTime;
    p.bus.gain.cancelScheduledValues(t); p.bus.gain.setValueAtTime(p.bus.gain.value, t); p.bus.gain.linearRampToValueAtTime(0, t + 1.2);
    setTimeout(() => { p.bus._stops.forEach(s => { try { s.stop(); } catch (e) {} }); p.bus.disconnect(); }, 1500);
  }
  function pump() {
    if (!cur || !ctx || ctx.state !== "running") return;
    while (cur.at < ctx.currentTime + 0.3) { cur.at += cur.P.next(cur.at, cur.i++, cur.bus); }
    if (ctx.currentTime > cur.nextAuto) { thunder(ctx.currentTime + 0.1, cur.bus); cur.nextAuto = ctx.currentTime + rnd(cur.P.auto[0], cur.P.auto[1]); }
  }
  function apply() {
    if (!on || !ctx) return;
    if (!cur || cur.name !== want) { stopProfile(cur); cur = startProfile(want); }
  }

  function setOn(v) {
    on = v;
    try { localStorage.setItem(KEY, v ? "1" : "0"); } catch (e) {}
    btn.setAttribute("aria-pressed", String(v));
    btn.innerHTML = v ? "♪ Hang: be" : "♪ Hang: ki";
    if (v) {
      if (!ensure()) return;
      ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.75, ctx.currentTime + 0.8);
      apply();
      if (!pumpTimer) pumpTimer = setInterval(pump, 60);
    } else if (ctx) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      stopProfile(cur); cur = null;
    }
  }

  const SFX = {
    paper: t => burst(t, 0.28, [["bandpass", 3200, 0.6]], 0.16, master, white, 0.03),
    tick: t => burst(t, 0.03, [["bandpass", 3000, 4]], 0.12),
    success: t => { piano(t, 72, 0.12); piano(t + 0.12, 79, 0.12); piano(t + 0.26, 84, 0.14); },
    wrong: t => { tone(t, midi(47), 0.35, 0.09, "triangle"); tone(t, midi(48), 0.35, 0.08, "triangle"); },
    stamp: t => { tone(t, 95, 0.3, 0.5, "sine", master, 42); burst(t, 0.1, [["lowpass", 900]], 0.4, master, brown, 0.002); }
  };

  /* ---------- kapcsoló gomb ---------- */
  const btn = document.createElement("button");
  btn.className = "soundtoggle"; btn.type = "button";
  btn.addEventListener("click", () => setOn(!on));
  document.body.appendChild(btn);
  btn.setAttribute("aria-pressed", "false"); btn.innerHTML = "♪ Hang: ki";
  // a böngésző csak felhasználói mozdulat után enged hangot: az első kattintásra indulunk, ha korábban be volt kapcsolva
  if (on) {
    const first = () => { document.removeEventListener("pointerdown", first, true); document.removeEventListener("keydown", first, true); if (on) setOn(true); };
    document.addEventListener("pointerdown", first, true); document.addEventListener("keydown", first, true);
    btn.innerHTML = "♪ Hang: be"; btn.setAttribute("aria-pressed", "true");
  }
  document.addEventListener("visibilitychange", () => { if (!ctx) return; if (document.hidden) ctx.suspend(); else if (on) ctx.resume(); });
  window.addEventListener("mm:lightning", () => { if (on && ctx && cur && cur.P.thunder) thunder(ctx.currentTime + rnd(0.5, 1.6), cur.bus); });

  window.MM_AUDIO = {
    setScene(name) { want = name || "home"; apply(); },
    sfx(name) { if (on && ctx && ctx.state === "running" && SFX[name]) SFX[name](ctx.currentTime + 0.01); }
  };
})();
