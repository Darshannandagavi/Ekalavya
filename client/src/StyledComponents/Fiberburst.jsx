import { useEffect, useRef, useState, useCallback } from "react";

// ─── Helper to detect system/HTML theme ──────────────────────────────────────
function getCurrentThemeMode() {
  // Check if the HTML tag has data-theme="dark"
  if (typeof document !== "undefined") {
    const html = document.documentElement;
    const attr = html.getAttribute("data-theme");
    if (attr === "dark") return "dark";
    if (attr === "light") return "light";
    
    // Fallback to system preference if no attribute found
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return "dark";
    }
  }
  return "light";
}

// ─── Theme Definitions (Dynamically chosen based on CSS Theme) ──────────────
const LIGHT_THEME = {
  id: "day-light",
  lineStart: "#b45309", // Deep amber/orange
  lineEnd: "#d97706",   // Golden
  dotColor: "#78350f",  // Darkest brown
  burstCore: "rgba(245, 173, 66, 0.25)", 
  burstMid:  "rgba(180, 83, 9, 0.10)",
  edgeColor: "rgba(120, 53, 15, 0.35)",
};

const DARK_THEME = {
  id: "night-dark",
  lineStart: "#67e8f9", // Cyan electric
  lineEnd: "#c084fc",   // Purple soft
  dotColor: "#f0abfc",  // Pinkish-purple
  burstCore: "rgba(192, 132, 252, 0.35)",
  burstMid:  "rgba(103, 232, 249, 0.10)",
  edgeColor: "rgba(192, 132, 252, 0.40)",
};

// ─── Utility Functions ──────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function lerpColor(hex1, hex2, t) {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return `rgb(${Math.round(lerp(r1,r2,t))},${Math.round(lerp(g1,g2,t))},${Math.round(lerp(b1,b2,t))})`;
}

// ─── FiberLine ──────────────────────────────────────────────────────────────
class FiberLine {
  constructor(w, h, index, total) {
    this.originX = w / 2;
    this.originY = h + 10;

    const minAngle = -Math.PI + 0.1;
    const maxAngle = -0.1;
    this.angle = minAngle + (index / (total - 1)) * (maxAngle - minAngle);

    const baseDist = Math.min(w, h) * 0.82;
    this.length = baseDist * (0.45 + Math.random() * 0.6);

    this.wobbleOffset = Math.random() * Math.PI * 2;
    this.wobbleSpeed  = 0.0007 + Math.random() * 0.0006;
    this.opacity      = 0.55 + Math.random() * 0.45;
    this.dotRadius    = 1.5 + Math.random() * 2.5; // Slightly smaller dots for density

    this.currentX = this.originX + Math.cos(this.angle) * this.length;
    this.currentY = this.originY + Math.sin(this.angle) * this.length;
    this.ctrlX    = this.originX + Math.cos(this.angle) * this.length * 0.5;
    this.ctrlY    = this.originY + Math.sin(this.angle) * this.length * 0.5;
  }

  update(mouse, time) {
    const wobble = Math.sin(time * this.wobbleSpeed + this.wobbleOffset) * 5;
    let tx = this.originX + Math.cos(this.angle) * this.length + wobble;
    let ty = this.originY + Math.sin(this.angle) * this.length;
    let cx = this.originX + Math.cos(this.angle) * this.length * 0.5;
    let cy = this.originY + Math.sin(this.angle) * this.length * 0.5;

    if (mouse.x !== null) {
      // Reduced maxR from 200 to 120 to prevent chaotic pushing with dense lines
      const maxR = 120; 
      const dx = tx - mouse.x, dy = ty - mouse.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < maxR && d > 0) {
        const f = ((maxR - d) / maxR) ** 2;
        tx += (dx / d) * f * 100;
        ty += (dy / d) * f * 100;
      }
      const cdx = cx - mouse.x, cdy = cy - mouse.y;
      const cd  = Math.sqrt(cdx * cdx + cdy * cdy);
      if (cd < maxR * 0.7 && cd > 0) {
        const cf = ((maxR * 0.7 - cd) / (maxR * 0.7)) ** 2;
        cx += (cdx / cd) * cf * 50;
        cy += (cdy / cd) * cf * 50;
      }
    }

    this.currentX = lerp(this.currentX, tx, 0.09);
    this.currentY = lerp(this.currentY, ty, 0.09);
    this.ctrlX    = lerp(this.ctrlX, cx, 0.07);
    this.ctrlY    = lerp(this.ctrlY, cy, 0.07);
  }

  draw(ctx, theme) {
    const t     = Math.min(1, Math.max(0, (this.length - 60) / 320));
    const color = lerpColor(theme.lineEnd, theme.lineStart, t);

    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth   = 0.6; // Reduced thickness for better density

    ctx.beginPath();
    ctx.moveTo(this.originX, this.originY);
    ctx.quadraticCurveTo(this.ctrlX, this.ctrlY, this.currentX, this.currentY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.currentX, this.currentY, this.dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = theme.dotColor;
    ctx.fill();

    ctx.restore();
  }
}

function drawBurstBackground(ctx, w, h, theme) {
  const cx = w / 2;
  const cy = h + 10;
  
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, 0.55);
  
  const radius1 = Math.max(w, h) * 1.2;
  const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, radius1);
  g1.addColorStop(0, theme.burstCore);
  g1.addColorStop(0.3, theme.burstMid);
  g1.addColorStop(0.6, "rgba(0, 0, 0, 0.02)");
  g1.addColorStop(1, "transparent");
  
  ctx.beginPath();
  ctx.arc(0, 0, radius1, Math.PI, 0);
  ctx.fillStyle = g1;
  ctx.filter = "blur(20px)";
  ctx.fill();
  
  const radius2 = Math.max(w, h) * 0.8;
  const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, radius2);
  g2.addColorStop(0, theme.burstCore);
  g2.addColorStop(0.4, theme.burstMid);
  g2.addColorStop(0.8, "transparent");
  
  ctx.beginPath();
  ctx.arc(0, 0, radius2, Math.PI, 0);
  ctx.fillStyle = g2;
  ctx.filter = "blur(12px)";
  ctx.fill();
  
  const radius3 = Math.max(w, h) * 0.4;
  const g3 = ctx.createRadialGradient(0, 0, 0, 0, 0, radius3);
  g3.addColorStop(0, "rgba(255, 255, 255, 0.4)");
  g3.addColorStop(0.2, theme.burstCore);
  g3.addColorStop(0.6, "transparent");
  
  ctx.beginPath();
  ctx.arc(0, 0, radius3, Math.PI, 0);
  ctx.fillStyle = g3;
  ctx.filter = "blur(6px)";
  ctx.fill();
  
  const g4 = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
  g4.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  g4.addColorStop(0.3, theme.burstCore);
  g4.addColorStop(1, "transparent");
  
  ctx.beginPath();
  ctx.arc(0, 0, 40, 0, Math.PI * 2);
  ctx.fillStyle = g4;
  ctx.filter = "blur(3px)";
  ctx.fill();
  
  ctx.filter = "none";
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.restore();
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function FiberBurst({ style = {} }) {
  const canvasRef   = useRef(null);
  const linesRef    = useRef([]);
  const mouseRef    = useRef({ x: null, y: null });
  const animRef     = useRef(null);
  
  // React state to track current CSS theme mode
  const [cssMode, setCssMode] = useState(getCurrentThemeMode());

  // Watch for changes to the data-theme attribute on HTML element
  useEffect(() => {
    const checkTheme = () => {
      setCssMode(getCurrentThemeMode());
    };

    // Use MutationObserver to detect when data-theme changes dynamically
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    // Also listen to system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => checkTheme();
    mediaQuery.addEventListener('change', handler);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  // Get the correct canvas colors based on detected CSS theme
  const theme = cssMode === 'dark' ? DARK_THEME : LIGHT_THEME;

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w   = canvas.offsetWidth;
    const h   = canvas.offsetHeight;

    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // ⚡ INCREASED LINE DENSITY FROM 160 TO 280 ⚡
    const total = 280; 
    linesRef.current = Array.from(
      { length: total },
      (_, i) => new FiberLine(w, h, i, total)
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    initCanvas();
    const ro = new ResizeObserver(initCanvas);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [initCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const tick = (time) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const t = cssMode === 'dark' ? DARK_THEME : LIGHT_THEME;

      ctx.clearRect(0, 0, w, h);
      drawBurstBackground(ctx, w, h, t);

      for (const line of linesRef.current) {
        line.update(mouseRef.current, time);
        line.draw(ctx, t);
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [cssMode]);

  const onMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: null, y: null };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "70vh",
        overflow: "hidden",
        background: "transparent",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          cursor: "crosshair",
        }}
      />
    </div>
  );
}