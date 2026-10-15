/* Borító-animációk: eső, vihar villámmal, hó, lebegő por, köd.
   A borító data-fx attribútuma dönti el, melyik fut. Csak látható borítón animál, és kikapcsol, ha a látogató kéri a mozgás csökkentését. */
(function () {
  "use strict";
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function start(el, kind) {
    const cv = document.createElement("canvas"); cv.className = "fx"; cv.setAttribute("aria-hidden", "true");
    el.appendChild(cv);
    let flash = null;
    if (kind === "storm") { flash = document.createElement("div"); flash.className = "fx-flash"; el.appendChild(flash); }
    const g = cv.getContext("2d");
    let w = 0, h = 0, dpr = 1;
    const size = () => { dpr = Math.min(2, window.devicePixelRatio || 1); w = el.clientWidth; h = el.clientHeight; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); g.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    const N = { snow: 110, storm: 120, rain: 80, dust: 45, fog: 9 }[kind] || 60;
    const seed = any => {
      if (kind === "snow") return { x: Math.random() * w, y: any ? Math.random() * h : -6, r: 0.7 + Math.random() * 2.3, vy: 14 + Math.random() * 30, vx: -10 + Math.random() * 14, ph: Math.random() * 6.3 };
      if (kind === "dust") return { x: Math.random() * w, y: any ? Math.random() * h : h + 4, r: 0.6 + Math.random() * 1.6, vy: -4 - Math.random() * 9, ph: Math.random() * 6.3, a: 0.25 + Math.random() * 0.5 };
      if (kind === "fog") return { x: any ? Math.random() * w : -w * 0.4, y: h * (0.35 + Math.random() * 0.6), r: w * (0.18 + Math.random() * 0.22), vx: 6 + Math.random() * 10, a: 0.10 + Math.random() * 0.12 };
      return { x: Math.random() * (w + 120), y: any ? Math.random() * h : -20, l: 10 + Math.random() * 18, vy: (kind === "storm" ? 620 : 480) + Math.random() * 300 };
    };
    const P = Array.from({ length: N }, () => seed(true));
    let visible = false, raf = 0, last = 0, nextFlash = performance.now() + 2500 + Math.random() * 4000;
    const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); } });
    io.observe(el);
    function frame(now) {
      raf = 0;
      if (!el.isConnected) { io.disconnect(); return; }
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (Math.abs(el.clientWidth - w) > 1 || Math.abs(el.clientHeight - h) > 1) size();
      g.clearRect(0, 0, w, h);
      if (kind === "snow" || kind === "dust") {
        g.fillStyle = kind === "snow" ? "rgba(255,250,236,.85)" : "rgba(255,226,160,1)";
        for (const p of P) {
          p.ph += dt; p.y += p.vy * dt; p.x += ((p.vx || 0) + Math.sin(p.ph) * (kind === "snow" ? 10 : 6)) * dt;
          if (p.y > h + 6 || p.y < -6 || p.x < -6 || p.x > w + 6) Object.assign(p, seed(false));
          if (kind === "dust") g.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.ph * 1.7));
          g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.283); g.fill();
        }
        g.globalAlpha = 1;
      } else if (kind === "fog") {
        for (const p of P) {
          p.x += p.vx * dt; if (p.x - p.r > w) Object.assign(p, seed(false));
          const gr = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          gr.addColorStop(0, `rgba(225,228,236,${p.a})`); gr.addColorStop(1, "rgba(225,228,236,0)");
          g.fillStyle = gr; g.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
        }
      } else {
        g.strokeStyle = kind === "storm" ? "rgba(215,222,240,.38)" : "rgba(215,222,240,.28)"; g.lineWidth = 1;
        g.beginPath();
        for (const p of P) {
          p.y += p.vy * dt; p.x -= p.vy * dt * 0.18;
          if (p.y > h + 20 || p.x < -30) Object.assign(p, seed(false));
          g.moveTo(p.x, p.y); g.lineTo(p.x + p.l * 0.18, p.y - p.l);
        }
        g.stroke();
      }
      if (flash && now > nextFlash) {
        flash.classList.remove("on"); void flash.offsetWidth; flash.classList.add("on");
        window.dispatchEvent(new CustomEvent("mm:lightning"));
        nextFlash = now + 7000 + Math.random() * 9000;
      }
      raf = requestAnimationFrame(frame);
    }
  }

  window.MM_FX = {
    scan(root) {
      if (reduce || !window.IntersectionObserver) return;
      (root || document).querySelectorAll(".cover[data-fx]").forEach(el => {
        const k = el.dataset.fx;
        if (!k || el._fx) return;
        el._fx = true; start(el, k);
      });
    }
  };
})();
