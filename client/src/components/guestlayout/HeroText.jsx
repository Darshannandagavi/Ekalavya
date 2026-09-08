/**
 * HeroText.jsx
 * WebGL text distortion — JELLY SPRING EDITION v4 (FIXED DIRECTION)
 * 
 * Fixes:
 *  - DIRECTION FIXED: Warp now pulls text IN the direction of movement
 *  - Lowered font weight to 100 (Extra Light)
 *  - Kept the amazing asymmetric jelly bounce logic
 */

import { useEffect, useRef, useCallback } from "react";
import {
  Renderer,
  Camera,
  Transform,
  Program,
  Mesh,
  Texture,
  Triangle,
} from "ogl";

/* ─────────────────────────────────────────────
   GLSL SHADERS
───────────────────────────────────────────── */

const VERTEX = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2      uMouse;       
  uniform vec2      uWarpVec;     
  uniform float     uWarpAmt;     
  uniform float     uTime;
  uniform vec2      uResolution;
  uniform float     uRadius;
  uniform float     uSpringAge;   

  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
          dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
      mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
          dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
      u.y);
  }

  void main() {
    vec2 uv = vUv;

    float aspect = uResolution.x / uResolution.y;
    vec2  diff   = uv - uMouse;
    diff.x      *= aspect;
    float dist   = length(diff);

    // ── Large soft radial falloff ──
    float falloff = 1.0 - smoothstep(0.0, uRadius, dist);
    falloff = pow(falloff, 1.1); 

    // ── Jelly ripple rings during spring-back ──
    float ringFreq  = 18.0;
    float ringSpeed = 2.2;
    float ring = sin(dist * ringFreq - uSpringAge * ringSpeed) * 0.5 + 0.5;
    float ringStrength = uWarpAmt * falloff * ring * 0.018;
    vec2  ringWarp  = normalize(diff + 1e-5) * ringStrength;

    // ── ✅ FIX: Negate uWarpVec so it pulls WITH the mouse, not pushes against it ──
    vec2 warp = (-uWarpVec) * falloff * 0.09 + ringWarp;

    // ── Chromatic aberration along warp direction ──
    vec2  warpDir = normalize(-uWarpVec + 1e-5);
    vec2  perpDir = vec2(-warpDir.y, warpDir.x);
    float abStr   = uWarpAmt * falloff * 0.028;

    vec2 abR =  warpDir * abStr * 0.9 + perpDir * abStr * 0.2;
    vec2 abB = -warpDir * abStr * 0.9 - perpDir * abStr * 0.2;

    vec4 colR = texture2D(uTexture, uv + warp + abR);
    vec4 colG = texture2D(uTexture, uv + warp);
    vec4 colB = texture2D(uTexture, uv + warp + abB);

    // Glow while warping
    float glow = uWarpAmt * falloff * 0.13;

    gl_FragColor = vec4(
      colR.r + glow * 0.28,
      colG.g + glow * 0.05,
      colB.b + glow * 0.38,
      1.0
    );
  }
`;

/* ─────────────────────────────────────────────
   FONT LOADER
───────────────────────────────────────────── */

let _fontReady   = false;
let _fontPromise = null;

function ensureFont() {
  if (_fontReady)   return Promise.resolve();
  if (_fontPromise) return _fontPromise;
  if (!document.querySelector('link[data-hero-font]')) {
    const link = document.createElement("link");
    link.rel   = "stylesheet";
    link.href  = "https://fonts.googleapis.com/css2?family=Anton&display=swap";
    link.setAttribute("data-hero-font", "1");
    document.head.appendChild(link);
  }
  // ✅ REDUCED FONT WEIGHT TO 100
  _fontPromise = document.fonts
    .load('100 64px Anton')
    .then(() => { _fontReady = true; })
    .catch(() => { _fontReady = true; });
  return _fontPromise;
}

/* ─────────────────────────────────────────────
   TEXT → CANVAS TEXTURE
───────────────────────────────────────────── */

function buildTextCanvas(text, w, h, dpr) {
  const cw = Math.round(w * dpr);
  const ch = Math.round(h * dpr);
  const canvas = document.createElement("canvas");
  canvas.width  = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, cw, ch);
  const fontSize = Math.round(ch * 0.78);
  // ✅ APPLIED 100 WEIGHT TO CANVAS RENDER
  ctx.font         = `100 ${fontSize}px  Impact`;
  ctx.fillStyle    = "#ffffff";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.save();
  const measured = ctx.measureText(text).width;
  const scale    = measured > 0 ? (cw * 0.96) / measured : 1;
  ctx.translate(cw / 2, ch / 2);
  ctx.scale(scale, 1);
  ctx.fillText(text, 0, 0);
  ctx.restore();
  return canvas;
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function HeroText({ text = "EKALAVYA" }) {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);

  const oglRef = useRef({
    renderer: null, scene: null, camera: null,
    mesh: null, program: null, texture: null, raf: null,
  });

  const mouseRef = useRef({
    // Smoothed cursor position
    posX: 0.5, posY: 0.5,
    posTargetX: 0.5, posTargetY: 0.5,

    // Spring warp state — target is always (0,0)
    warpX: 0, warpY: 0,
    warpVx: 0, warpVy: 0,

    // Previous raw position for delta
    prevX: 0.5, prevY: 0.5,
    hasPrev: false,

    // Tracks time since last movement for ripple animation
    springAge: 0,
    isMoving: false,
    lastMoveTime: 0,
  });

  const rebuildTexture = useCallback((w, h, dpr) => {
    const { texture } = oglRef.current;
    if (!texture) return;
    texture.image = buildTextCanvas(text, w, h, dpr);
    texture.needsUpdate = true;
  }, [text]);

  const handleResize = useCallback(() => {
    const { renderer, program } = oglRef.current;
    if (!renderer || !program) return;
    const container = containerRef.current;
    if (!container) return;
    const w   = container.clientWidth;
    const h   = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(w, h);
    program.uniforms.uResolution.value = [w * dpr, h * dpr];
    rebuildTexture(w, h, dpr);
  }, [rebuildTexture]);

  const handleMouseMove = useCallback((e) => {
    const m         = mouseRef.current;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const nx   = (e.clientX - rect.left)  / rect.width;
    const ny   = (e.clientY - rect.top) / rect.height;

    m.posTargetX = nx;
    m.posTargetY = 1.0 - ny;

    if (m.hasPrev) {
      const dx =  (nx - m.prevX) * 10;
      const dy = -(ny - m.prevY) * 10;

      m.warpVx += dx;
      m.warpVy += dy;

      m.springAge   = 0;
      m.isMoving    = true;
      m.lastMoveTime = performance.now();
    }

    m.prevX   = nx;
    m.prevY   = ny;
    m.hasPrev = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.hasPrev  = false;
    mouseRef.current.isMoving = false;
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const t = e.touches[0];
    handleMouseMove({ clientX: t.clientX, clientY: t.clientY });
  }, [handleMouseMove]);

  const startLoop = useCallback(() => {
    const ogl = oglRef.current;

    const tick = (t) => {
      ogl.raf = requestAnimationFrame(tick);
      const m = mouseRef.current;

      m.posX += (m.posTargetX - m.posX) * 0.12;
      m.posY += (m.posTargetY - m.posY) * 0.12;

      const timeSinceMove = performance.now() - m.lastMoveTime;
      if (timeSinceMove > 50) m.isMoving = false;

      let stiffness, damping;
      if (m.isMoving) {
        stiffness = 0.28;
        damping   = 0.72;
      } else {
        stiffness = 0.055;
        damping   = 0.68;
      }

      m.warpVx += (0 - m.warpX) * stiffness;
      m.warpVy += (0 - m.warpY) * stiffness;
      m.warpVx *= damping;
      m.warpVy *= damping;
      m.warpX  += m.warpVx;
      m.warpY  += m.warpVy;

      if (!m.isMoving) m.springAge += 0.06;
      else m.springAge = 0;

      const warpAmt = Math.min(
        Math.sqrt(m.warpX * m.warpX + m.warpY * m.warpY),
        1.0
      );

      const { program, renderer, scene, camera } = ogl;
      if (!program) return;

      program.uniforms.uMouse.value     = [m.posX, m.posY];
      program.uniforms.uWarpVec.value   = [m.warpX, m.warpY];
      program.uniforms.uWarpAmt.value   = warpAmt;
      program.uniforms.uTime.value      = t * 0.001;
      program.uniforms.uSpringAge.value = m.springAge;

      renderer.render({ scene, camera });
    };

    ogl.raf = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let destroyed = false;

    ensureFont().then(() => {
      if (destroyed) return;
      const w   = container.clientWidth;
      const h   = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);

      const renderer = new Renderer({
        canvas: canvasRef.current, width: w, height: h,
        dpr, alpha: false, antialias: false,
      });
      const gl = renderer.gl;
      gl.clearColor(0.047, 0.337, 0.82, 1);

      const scene    = new Transform();
      const camera   = new Camera(gl);
      camera.position.z = 1;
      const geometry = new Triangle(gl);

      const tc      = buildTextCanvas(text, w, h, dpr);
      const texture = new Texture(gl, {
        image: tc, generateMipmaps: false,
        minFilter: gl.LINEAR, magFilter: gl.LINEAR,
        wrapS: gl.CLAMP_TO_EDGE, wrapT: gl.CLAMP_TO_EDGE,
      });

      const program = new Program(gl, {
        vertex: VERTEX, fragment: FRAGMENT,
        uniforms: {
          uTexture    : { value: texture },
          uMouse      : { value: [0.5, 0.5] },
          uWarpVec    : { value: [0, 0] },
          uWarpAmt    : { value: 0 },
          uTime       : { value: 0 },
          uResolution : { value: [w * dpr, h * dpr] },
          uRadius     : { value: 0.55 },   
          uSpringAge  : { value: 0 },
        },
        transparent: false,
      });

      const mesh = new Mesh(gl, { geometry, program });
      mesh.setParent(scene);

      oglRef.current = { renderer, scene, camera, mesh, program, texture, raf: null };
      startLoop();

      window.addEventListener("resize",       handleResize,     { passive: true });
      container.addEventListener("mousemove",  handleMouseMove,  { passive: true });
      container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      container.addEventListener("touchmove",  handleTouchMove,  { passive: false });
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(oglRef.current.raf);
      window.removeEventListener("resize", handleResize);
      const c = containerRef.current;
      if (c) {
        c.removeEventListener("mousemove",  handleMouseMove);
        c.removeEventListener("mouseleave", handleMouseLeave);
        c.removeEventListener("touchmove",  handleTouchMove);
      }
      try {
        oglRef.current.renderer?.gl
          ?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch (_) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !oglRef.current.texture) return;
    ensureFont().then(() => {
      const w   = container.clientWidth;
      const h   = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      rebuildTexture(w, h, dpr);
    });
  }, [text, rebuildTexture]);

  return (
    <div
      ref={containerRef}
      style={{
        position  : "relative",
        width     : "100vw",
        height    : "100vh",
        overflow  : "hidden",
        background: "#111111",
        cursor    : "none",
      }}
      onMouseMove={(e) => {
        const el   = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const dot  = el.querySelector("[data-cursor]");
        if (dot) {
          dot.style.left = (e.clientX - rect.left) + "px";
          dot.style.top  = (e.clientY - rect.top)  + "px";
        }
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", touchAction: "none" }}
      />
      <div
        data-cursor
        style={{
          position     : "absolute",
          top          : 0,
          left         : 0,
          width        : "8px",
          height       : "8px",
          borderRadius : "50%",
          background   : "rgba(255,255,255,0.6)",
          pointerEvents: "none",
          transform    : "translate(-50%,-50%)",
          mixBlendMode : "difference",
          zIndex       : 10,
        }}
        aria-hidden="true"
      />
    </div>
  );
}