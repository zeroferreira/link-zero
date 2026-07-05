import { useEffect, useRef } from 'react';

const PALETTE_DARK = [
  'rgba(59,130,246,0.88)',
  'rgba(96,165,250,0.80)',
  'rgba(147,197,253,0.70)',
  'rgba(99,102,241,0.85)',
  'rgba(139,92,246,0.82)',
  'rgba(167,139,250,0.72)',
  'rgba(6,182,212,0.75)',
  'rgba(255,255,255,0.55)',
  'rgba(224,231,255,0.60)',
];

const PALETTE_WARM = [
  'rgba(249,115,22,0.85)',
  'rgba(251,146,60,0.78)',
  'rgba(253,186,116,0.68)',
  'rgba(236,72,153,0.82)',
  'rgba(244,114,182,0.75)',
  'rgba(251,191,36,0.80)',
  'rgba(252,211,77,0.70)',
  'rgba(255,160,50,0.72)',
  'rgba(255,255,255,0.50)',
];

function sphere(r) {
  const u  = Math.random(), v = Math.random();
  const th = 2 * Math.PI * u;
  const ph = Math.acos(2 * v - 1);
  const rr = r * 1.28 * (0.78 + 0.22 * Math.random());
  return {
    x: rr * Math.sin(ph) * Math.cos(th),
    y: rr * Math.cos(ph),
    z: rr * Math.sin(ph) * Math.sin(th),
  };
}

export default function ParticleCanvas({ theme = 'dark' }) {
  const canvasRef = useRef(null);
  // Persist rotation across theme re-renders so the orb doesn't snap back to 0
  const rotRef = useRef({ rotX: 0, rotY: 0, velX: 0.00015, velY: 0.00022 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const PALETTE = theme === 'warm' ? PALETTE_WARM : PALETTE_DARK;

    let W = 0, H = 0, dpr = 1, base = 300;
    let pts = [];
    let lastT = 0;
    let rafId;

    function build() {
      const mobile = W <= 540;
      const n = mobile ? 400 : 850;
      pts = [];
      for (let i = 0; i < n; i++) {
        const p = sphere(base);
        pts.push({
          x: p.x, y: p.y, z: p.z,
          tx: p.x, ty: p.y, tz: p.z,
          c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          s: (mobile ? 1.4 : 1.1) + Math.random() * 1.3,
        });
      }
    }

    function resize() {
      W    = window.innerWidth;
      H    = window.innerHeight;
      dpr  = window.devicePixelRatio || 1;
      base = Math.min(W, H) * 0.40;
      canvas.width        = W * dpr;
      canvas.height       = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function frame(t) {
      if (!lastT) lastT = t;
      const dt = t - lastT; lastT = t;

      const rot = rotRef.current;
      // Minimum base velocity so the orb never fully stops
      const MIN_VEL = 8e-5;
      rot.velX = rot.velX * 0.986 + (rot.velX >= 0 ? MIN_VEL : -MIN_VEL) * 0.014;
      rot.velY = rot.velY * 0.986 + (rot.velY >= 0 ? MIN_VEL : -MIN_VEL) * 0.014;
      rot.rotX += (rot.velX + 4e-5) * dt;
      rot.rotY += (rot.velY + 9e-5) * dt;

      ctx.clearRect(0, 0, W, H);

      const cx  = W / 2, cy = H / 2;
      const cX  = Math.cos(rot.rotX), sX = Math.sin(rot.rotX);
      const cY  = Math.cos(rot.rotY), sY = Math.sin(rot.rotY);
      const fov = base * 2.3;
      const lp  = 0.038;
      const proj = [];

      for (let i = 0; i < pts.length; i++) {
        const p  = pts[i];
        p.x += (p.tx - p.x) * lp;
        p.y += (p.ty - p.y) * lp;
        p.z += (p.tz - p.z) * lp;

        const x1 =  p.x * cY + p.z * sY;
        const z1 = -p.x * sY + p.z * cY;
        const y1 =  p.y * cX - z1  * sX;
        const z2 =  p.y * sX + z1  * cX;
        const sc = fov / (fov + z2 + base);

        proj.push({ px: cx + x1 * sc, py: cy + y1 * sc, z: z2, c: p.c, s: p.s * sc });
      }

      proj.sort((a, b) => a.z - b.z);

      for (let j = 0; j < proj.length; j++) {
        const q = proj[j];
        ctx.beginPath();
        ctx.fillStyle = q.c;
        ctx.arc(q.px, q.py, Math.max(0.15, q.s), 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(frame);
    }

    function kick() {
      rotRef.current.velY += 0.0025 * (Math.random() > 0.5 ? 1 : -1);
      rotRef.current.velX += 0.0015 * (Math.random() > 0.5 ? 1 : -1);
    }

    resize();
    window.addEventListener('resize',            resize, { passive: true });
    window.addEventListener('orientationchange', resize);
    window.addEventListener('pointerdown',       kick,   { passive: true });
    window.addEventListener('touchstart',        kick,   { passive: true });
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize',            resize);
      window.removeEventListener('orientationchange', resize);
      window.removeEventListener('pointerdown',       kick);
      window.removeEventListener('touchstart',        kick);
    };
  }, [theme]); // re-init on theme change — rotation state preserved via rotRef

  return (
    <canvas
      ref={canvasRef}
      id="orb-background"
      aria-hidden="true"
      tabIndex={-1}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
