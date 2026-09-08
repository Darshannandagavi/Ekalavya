import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   CSS injected once as a <style> tag
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --amber: #f5ad42;
  --amber-hover: #db9c3e;
  --serif: 'DM Serif Display', Georgia, serif;
  --mono: Georgia, 'Courier New', monospace;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-md: 0 8px 32px rgba(0,0,0,0.08);
}

/* ── LIGHT THEME (default) ── */
:root,
[data-theme="light"] {
  --ek-bg:           #FFF8E1;
  --ek-bg-card:      #ffffff;
  --ek-text:         #111827;
  --ek-text-muted:   #6b7280;
  --ek-text-faint:   #9ca3af;
  --ek-border:       #e5e7eb;
  --ek-border-light: rgba(0,0,0,0.06);
  --ek-amber-dim:    rgba(245,173,66,0.12);
  --ek-amber-faint:  rgba(245,173,66,0.06);
}

/* ── DARK THEME ── */
[data-theme="dark"] {
  --ek-bg:           #0f0f0f;
  --ek-bg-card:      #1a1a1a;
  --ek-text:         #ffffff;
  --ek-text-muted:   #9ca3af;
  --ek-text-faint:   #6b7280;
  --ek-border:       rgba(255,255,255,0.1);
  --ek-border-light: rgba(255,255,255,0.06);
  --ek-amber-dim:    rgba(245,173,66,0.15);
  --ek-amber-faint:  rgba(245,173,66,0.06);
}

html { scroll-behavior: auto; }
body { background: var(--ek-bg); overflow-x: hidden; font-family: var(--mono); color: var(--ek-text); }

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--ek-bg); }
::-webkit-scrollbar-thumb { background: var(--amber); border-radius: 2px; }

/* ── HORIZONTAL SCROLLER ── */
.ek-hscroll-wrapper { position: relative; background: var(--ek-bg); }
.ek-hscroll-sticky {
  position: sticky; top: 0; left: 0;
  width: 100%; height: 100vh;
  overflow: hidden;
  display: flex; flex-direction: column; justify-content: center;
  background: var(--ek-bg);
}
.ek-progress {
  position: absolute; top: 0; left: 0; height: 2px;
  background: var(--amber); z-index: 10;
  transition: width 0.04s linear;
}
.ek-panel-counter {
  position: absolute; bottom: 20px; right: 30px; z-index: 10;
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 0.15em;
  color: var(--ek-text-faint); display: flex; align-items: center; gap: 8px;
}
.ek-panel-counter-bar {
  width: 40px; height: 1px; background: var(--ek-border); position: relative;
}
.ek-panel-counter-fill {
  position: absolute; top: 0; left: 0; height: 100%;
  background: var(--amber); transition: width 0.3s ease;
}
.ek-track {
  display: flex; will-change: transform;
  transition: transform 0.0s;
}

/* ── PANELS ── */
.ek-panel {
  flex: 0 0 100vw; height: 100vh;
  display: flex; align-items: center;
  padding: 0 60px;
  position: relative; overflow: hidden;
  background: var(--ek-bg);
}
.ek-panel::before {
  content: '';
  position: absolute; right: 0; top: 8%; height: 84%;
  width: 1px;
  background: linear-gradient(to bottom,
    transparent 0%, var(--ek-border-light) 40%, var(--ek-border-light) 60%, transparent 100%);
}
.ek-panel-inner {
  display: flex; align-items: center;
  gap: 60px; width: 100%; max-width: 1100px; margin: 0 auto;
}
.ek-panel-text { flex: 1; min-width: 0; }
.ek-panel-visual {
  flex: 0 0 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── text styles ── */
.ek-eyebrow {
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--amber); margin-bottom: 12px;
  display: flex; align-items: center; gap: 10px;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.5s ease;
}
.ek-eyebrow::before {
  content: ''; display: block; width: 18px; height: 1px; background: var(--amber);
  flex-shrink: 0;
}
.ek-panel-h2 {
  font-family: var(--serif); font-size: clamp(1.5rem, 4vw, 3.2rem);
  font-weight: 400; line-height: 1.05; letter-spacing: -0.02em;
  color: var(--ek-text); overflow: hidden;
}
.ek-panel-h2 em { color: var(--amber); font-style: italic; }
.ek-h2-line {
  display: block; transform: translateY(108%);
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.ek-h2-line:nth-child(2) { transition-delay: 0.06s; }
.ek-h2-line:nth-child(3) { transition-delay: 0.12s; }
.ek-panel-desc {
  margin-top: 18px; max-width: 360px;
  font-family: var(--mono); font-size: 0.7rem; line-height: 1.6;
  color: var(--ek-text-muted);
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.5s 0.3s ease, transform 0.5s 0.3s ease;
}
.ek-panel-tags {
  margin-top: 20px; display: flex; flex-wrap: wrap; gap: 8px;
  opacity: 0; transition: opacity 0.5s 0.4s ease;
}
.ek-tag {
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--amber);
  border: 1px solid var(--ek-amber-dim); padding: 4px 10px; border-radius: 2px;
  background: var(--ek-amber-faint);
}

/* active state */
.ek-panel.is-active .ek-eyebrow { clip-path: inset(0 0% 0 0); }
.ek-panel.is-active .ek-h2-line { transform: translateY(0); }
.ek-panel.is-active .ek-panel-desc { opacity: 1; transform: translateY(0); }
.ek-panel.is-active .ek-panel-tags { opacity: 1; }

/* ── SVG ── */
.ek-svg { width: 100%; height: auto; }

/* ── MARQUEE ── */
.ek-marquee {
  background: var(--amber); padding: 12px 0; overflow: hidden;
  border-top: 1px solid rgba(0,0,0,0.15);
  border-bottom: 1px solid rgba(0,0,0,0.15);
}
.ek-marquee-inner {
  display: flex; width: max-content;
  animation: marqueeRoll 22s linear infinite;
}
.ek-marquee-item {
  font-family: var(--mono); font-size: 0.62rem; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: #0f0f0f; white-space: nowrap;
  padding: 0 24px; display: flex; align-items: center; gap: 24px;
}
.ek-marquee-item::after { content: '✦'; opacity: 0.4; }
@keyframes marqueeRoll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ── INTRO / OUTRO ── */
.ek-intro {
  display: flex; flex-direction: column;
  justify-content: center; align-items: center; text-align: center;
  padding: 40px 40px; background: var(--ek-bg);
}
.ek-intro-arrow {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; color: var(--ek-text-faint);
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 0.15em;
  text-transform: uppercase;
  animation: arrowBob 2.4s ease-in-out infinite;
}
@keyframes arrowBob {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

.ek-outro {
  min-height: 80vh; display: flex; flex-direction: column;
  justify-content: center; align-items: center; text-align: center;
  padding: 60px 40px; background: var(--ek-bg); position: relative;
}
.ek-outro-h2 {
  font-family: var(--serif); font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 400; line-height: 1.05; letter-spacing: -0.02em;
  color: var(--ek-text); max-width: 600px; position: relative; z-index: 1;
}
.ek-outro-h2 span { color: var(--amber); font-style: italic; }
.ek-outro-sub {
  margin-top: 20px;
  font-family: var(--mono); font-size: 0.7rem; line-height: 1.6;
  color: var(--ek-text-muted); max-width: 400px; position: relative; z-index: 1;
}

/* ── reveal ── */
.ek-reveal {
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.ek-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* ── responsive ── */
@media (max-width: 768px) {
  .ek-panel { padding: 0 24px; }
  .ek-panel-inner { gap: 30px; }
  .ek-panel-visual { flex: 0 0 0; display: none; }
  .ek-panel-text { flex: 1; }
  .ek-panel-counter { bottom: 14px; right: 20px; }
}
`;



/* ─────────────────────────────────────────────
   SVG ILLUSTRATIONS
───────────────────────────────────────────── */

const SvgNotes = () => (
  <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#f5ad42" />
        <stop offset="100%" stop-color="#e89c2e" />
      </linearGradient>
      <linearGradient id="progressGrad2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#f5ad42" />
        <stop offset="100%" stop-color="#d4881f" />
      </linearGradient>
      <linearGradient id="cardGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.04)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f5ad42" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.1)" />
      </linearGradient>
      <linearGradient id="calendarHead" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1a1a" />
        <stop offset="100%" stop-color="#111111" />
      </linearGradient>
      <filter id="glow3">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="cardShadow2">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="12"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="softShadow2">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="6"
          flood-color="#000"
          flood-opacity="0.3"
        />
      </filter>
      <clipPath id="progressClip1">
        <rect x="40" y="218" width="320" height="8" rx="4" />
      </clipPath>
      <clipPath id="progressClip2">
        <rect x="40" y="270" width="320" height="8" rx="4" />
      </clipPath>
      <clipPath id="progressClip3">
        <rect x="40" y="322" width="320" height="8" rx="4" />
      </clipPath>
    </defs>

    <rect width="800" height="500" rx="16" fill="url(#bgGrad3)" />

    <rect
      x="30"
      y="18"
      width="240"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.06)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.3s"
      />
    </rect>
    <text
      x="50"
      y="34"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="11"
      fill="rgba(245,173,66,0.7)"
      opacity="0"
    >
      LEARNING PROGRESS TRACKER
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.3s"
      />
    </text>

    <rect
      x="30"
      y="54"
      width="370"
      height="430"
      rx="14"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#cardShadow2)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.5s"
      />
    </rect>

    <rect
      x="50"
      y="72"
      width="330"
      height="28"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
    />
    <text
      x="65"
      y="90"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="10"
      fill="rgba(255,255,255,0.6)"
    >
      Web Technologies · 24MCA11
    </text>
    <rect
      x="290"
      y="78"
      width="76"
      height="16"
      rx="8"
      fill="rgba(245,173,66,0.12)"
    />
    <text
      x="328"
      y="90"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="7"
      fill="#f5ad42"
    >
      4th Sem
    </text>

    <circle
      cx="60"
      cy="130"
      r="52"
      fill="none"
      stroke="rgba(255,255,255,0.05)"
      stroke-width="6"
    />
    <circle
      cx="60"
      cy="130"
      r="52"
      fill="none"
      stroke="url(#progressGrad)"
      stroke-width="6"
      stroke-dasharray="326.7"
      stroke-dashoffset="78"
      stroke-linecap="round"
      filter="url(#glow3)"
    >
      <animate
        attributeName="stroke-dashoffset"
        values="326.7;78"
        dur="2s"
        fill="freeze"
        begin="0.8s"
      />
    </circle>
    <text
      x="60"
      y="125"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="20"
      fill="#f5ad42"
      opacity="0"
    >
      76%
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.8s"
        fill="freeze"
        begin="1.2s"
      />
    </text>
    <text
      x="60"
      y="140"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="7"
      fill="rgba(255,255,255,0.35)"
      opacity="0"
    >
      Complete
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.8s"
        fill="freeze"
        begin="1.4s"
      />
    </text>

    <text
      x="130"
      y="115"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      Chapter Completion
    </text>
    <rect
      x="130"
      y="125"
      width="100"
      height="6"
      rx="3"
      fill="rgba(255,255,255,0.03)"
    />
    <rect
      x="130"
      y="125"
      width="76"
      height="6"
      rx="3"
      fill="url(#progressGrad)"
      filter="url(#glow3)"
    >
      <animate
        attributeName="width"
        values="0;76"
        dur="1.5s"
        fill="freeze"
        begin="1.0s"
      />
    </rect>
    <text
      x="240"
      y="131"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      6/8
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.6s"
      />
    </text>

    <text
      x="130"
      y="148"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      Assignment Score
    </text>
    <rect
      x="130"
      y="158"
      width="100"
      height="6"
      rx="3"
      fill="rgba(255,255,255,0.03)"
    />
    <rect
      x="130"
      y="158"
      width="88"
      height="6"
      rx="3"
      fill="url(#progressGrad2)"
      filter="url(#glow3)"
    >
      <animate
        attributeName="width"
        values="0;88"
        dur="1.2s"
        fill="freeze"
        begin="1.3s"
      />
    </rect>
    <text
      x="240"
      y="164"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      88%
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.7s"
      />
    </text>

    <rect x="50" y="188" width="330" height="1" fill="rgba(255,255,255,0.04)" />

    <rect
      x="50"
      y="200"
      width="120"
      height="22"
      rx="6"
      fill="rgba(245,173,66,0.06)"
      stroke="rgba(245,173,66,0.12)"
      stroke-width="0.3"
    />
    <text
      x="110"
      y="215"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
    >
      📚 Chapters
    </text>

    <rect
      x="40"
      y="234"
      width="320"
      height="26"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.8s"
      />
    </rect>
    <circle cx="54" cy="247" r="5" fill="rgba(245,173,66,0.3)" opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.9s"
      />
    </circle>
    <text
      x="54"
      y="250"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="#f5ad42"
      opacity="0"
    >
      ✓
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.9s"
      />
    </text>
    <text
      x="66"
      y="249"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.55)"
    >
      Ch 1: Introduction to Web
    </text>
    <text
      x="340"
      y="249"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      ✓
    </text>

    <rect
      x="40"
      y="264"
      width="320"
      height="26"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.0s"
      />
    </rect>
    <circle cx="54" cy="277" r="5" fill="rgba(245,173,66,0.3)" opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.1s"
      />
    </circle>
    <text
      x="54"
      y="280"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="#f5ad42"
      opacity="0"
    >
      ✓
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.1s"
      />
    </text>
    <text
      x="66"
      y="279"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.55)"
    >
      Ch 2: HTML5 Fundamentals
    </text>
    <text
      x="340"
      y="279"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      ✓
    </text>

    <rect
      x="40"
      y="294"
      width="320"
      height="26"
      rx="6"
      fill="rgba(245,173,66,0.04)"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.2s"
      />
    </rect>
    <circle cx="54" cy="307" r="5" fill="rgba(245,173,66,0.3)" opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.3s"
      />
    </circle>
    <text
      x="54"
      y="310"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="#f5ad42"
      opacity="0"
    >
      ●
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.3s"
      />
    </text>
    <text
      x="66"
      y="309"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(245,173,66,0.85)"
    >
      Ch 3: CSS & Flexbox
    </text>
    <rect
      x="280"
      y="299"
      width="60"
      height="16"
      rx="4"
      fill="rgba(245,173,66,0.2)"
    />
    <text
      x="310"
      y="311"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="6"
      fill="#f5ad42"
    >
      In Progress
    </text>

    <rect
      x="40"
      y="324"
      width="320"
      height="26"
      rx="6"
      fill="rgba(255,255,255,0.01)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.4s"
      />
    </rect>
    <circle cx="54" cy="337" r="5" fill="rgba(255,255,255,0.06)" opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.5s"
      />
    </circle>
    <text
      x="54"
      y="340"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(255,255,255,0.2)"
      opacity="0"
    >
      ○
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.5s"
      />
    </text>
    <text
      x="66"
      y="339"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      Ch 4: CSS Grid Layout
    </text>
    <text
      x="340"
      y="339"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.15)"
    >
      Pending
    </text>

    <rect x="50" y="368" width="330" height="1" fill="rgba(255,255,255,0.04)" />

    <rect
      x="50"
      y="380"
      width="330"
      height="50"
      rx="8"
      fill="rgba(245,173,66,0.03)"
      stroke="rgba(245,173,66,0.08)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.8s"
      />
    </rect>
    <text
      x="65"
      y="399"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(245,173,66,0.7)"
    >
      📝 Faculty Update
    </text>
    <text
      x="65"
      y="416"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.35)"
    >
      New practical manual uploaded for Module 3
    </text>
    <circle cx="350" cy="405" r="4" fill="#f5ad42" opacity="0.6">
      <animate
        attributeName="opacity"
        values="0.6;0.2;0.6"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>

    <rect
      x="50"
      y="440"
      width="330"
      height="34"
      rx="8"
      fill="url(#progressGrad)"
      filter="url(#glow3)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.0s"
      />
    </rect>
    <text
      x="215"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="10"
      fill="#0a0a0a"
      opacity="0"
    >
      Continue Learning → Chapter 3
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.0s"
      />
    </text>

    <rect
      x="430"
      y="54"
      width="340"
      height="430"
      rx="14"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#cardShadow2)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.7s"
      />
    </rect>

    <rect
      x="450"
      y="72"
      width="300"
      height="40"
      rx="10"
      fill="url(#calendarHead)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
    />
    <rect x="450" y="72" width="300" height="16" rx="10" fill="#1a1a1a" />
    <text
      x="600"
      y="84"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      Academic Calendar · 4th Semester
    </text>
    <text
      x="520"
      y="102"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="7"
      fill="rgba(245,173,66,0.4)"
    >
      VTU · B.Tech · 2024-25
    </text>

    <rect
      x="460"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(245,173,66,0.08)"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="0.3"
    />
    <text
      x="475"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="#f5ad42"
    >
      Jan
    </text>
    <rect
      x="495"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="510"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      Feb
    </text>
    <rect
      x="530"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="545"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      Mar
    </text>
    <rect
      x="565"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="580"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      Apr
    </text>
    <rect
      x="600"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="615"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      May
    </text>
    <rect
      x="635"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="650"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      Jun
    </text>

    <line
      x1="460"
      y1="165"
      x2="740"
      y2="165"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="1"
    />

    <line
      x1="520"
      y1="130"
      x2="520"
      y2="430"
      stroke="rgba(245,173,66,0.08)"
      stroke-width="1.5"
      stroke-dasharray="6,4"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.8s"
        fill="freeze"
        begin="1.5s"
      />
    </line>
    <circle cx="520" cy="130" r="4" fill="#f5ad42" filter="url(#glow3)">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.0s"
      />
    </circle>

    <rect
      x="460"
      y="175"
      width="280"
      height="44"
      rx="8"
      fill="rgba(245,173,66,0.04)"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.6s"
      />
    </rect>
    <rect x="460" y="175" width="3" height="44" rx="1.5" fill="#f5ad42" />
    <text
      x="472"
      y="192"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.7)"
    >
      Internal Assessment 1
    </text>
    <text
      x="472"
      y="206"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Feb 15 · Web Tech, Data Structures
    </text>
    <rect
      x="680"
      y="185"
      width="50"
      height="18"
      rx="5"
      fill="rgba(245,173,66,0.12)"
    />
    <text
      x="705"
      y="198"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="7"
      fill="#f5ad42"
    >
      Prep
    </text>

    <rect
      x="460"
      y="228"
      width="280"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.8s"
      />
    </rect>
    <rect
      x="460"
      y="228"
      width="3"
      height="44"
      rx="1.5"
      fill="rgba(245,173,66,0.5)"
    />
    <text
      x="472"
      y="245"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.6)"
    >
      Mid Semester Exam
    </text>
    <text
      x="472"
      y="259"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.25)"
    >
      Mar 10 · All Subjects
    </text>
    <rect
      x="680"
      y="238"
      width="50"
      height="18"
      rx="5"
      fill="rgba(255,255,255,0.04)"
    />
    <text
      x="705"
      y="251"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Soon
    </text>

    <rect
      x="460"
      y="281"
      width="280"
      height="44"
      rx="8"
      fill="rgba(245,173,66,0.06)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.0s"
      />
    </rect>
    <rect x="460" y="281" width="3" height="44" rx="1.5" fill="#f5ad42" />
    <text
      x="472"
      y="298"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="#f5ad42"
    >
      Internal Assessment 2
    </text>
    <text
      x="472"
      y="312"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      Apr 20 · Focus: Modules 3 & 4
    </text>
    <rect
      x="680"
      y="291"
      width="50"
      height="18"
      rx="5"
      fill="rgba(245,173,66,0.2)"
      filter="url(#glow3)"
    >
      <animate
        attributeName="opacity"
        values="0.7;1;0.7"
        dur="2s"
        repeatCount="indefinite"
      />
    </rect>
    <text
      x="705"
      y="304"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="7"
      fill="#f5ad42"
    >
      Active
    </text>

    <rect
      x="460"
      y="334"
      width="280"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.2s"
      />
    </rect>
    <rect
      x="460"
      y="334"
      width="3"
      height="44"
      rx="1.5"
      fill="rgba(245,173,66,0.3)"
    />
    <text
      x="472"
      y="351"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      Practical Exams
    </text>
    <text
      x="472"
      y="365"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.2)"
    >
      May 5 · Lab + Viva
    </text>
    <rect
      x="680"
      y="344"
      width="50"
      height="18"
      rx="5"
      fill="rgba(255,255,255,0.04)"
    />
    <text
      x="705"
      y="357"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Upcoming
    </text>

    <rect
      x="460"
      y="387"
      width="280"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.4s"
      />
    </rect>
    <rect
      x="460"
      y="387"
      width="3"
      height="44"
      rx="1.5"
      fill="rgba(245,173,66,0.2)"
    />
    <text
      x="472"
      y="404"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.4)"
    >
      End Semester Exam
    </text>
    <text
      x="472"
      y="418"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.15)"
    >
      Jun 15 · Full Syllabus
    </text>
    <rect
      x="680"
      y="397"
      width="50"
      height="18"
      rx="5"
      fill="rgba(255,255,255,0.04)"
    />
    <text
      x="705"
      y="410"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="7"
      fill="rgba(255,255,255,0.25)"
    >
      Later
    </text>

    <rect
      x="460"
      y="445"
      width="280"
      height="30"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.8s"
      />
    </rect>
    <text
      x="475"
      y="464"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.3)"
    >
      📄 6 Question Papers Available
    </text>
    <text
      x="675"
      y="464"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
    >
      View All →
    </text>

    <rect
      x="710"
      y="15"
      width="70"
      height="22"
      rx="11"
      fill="rgba(245,173,66,0.08)"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="0.3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.6s"
      />
    </rect>
    <text
      x="745"
      y="30"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="7"
      fill="#f5ad42"
      opacity="0"
    >
      🎯 On Track
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.6s"
      />
    </text>
  </svg>
);
const SvgHierarchy = () => (
  <svg
    className="ek-svg"
    viewBox="0 0 850 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
    
    borderRadius: "10px",
  }}
  >
    <defs>
      {/* Background Grid Pattern */}
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
        />
      </pattern>

      {/* Glow Filter */}
      <filter id="amber-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Data Paths for Animation */}
      <path id="path-u1" d="M 120 250 C 180 250, 180 180, 240 180" />
      <path id="path-c2" d="M 280 180 C 340 180, 340 250, 400 250" />
      <path id="path-s1" d="M 480 250 C 530 250, 530 200, 580 200" />

      <path id="path-sub1" d="M 640 200 C 690 200, 690 140, 740 140" />
      <path id="path-sub2" d="M 640 200 C 690 200, 690 190, 740 190" />
      <path id="path-sub3" d="M 640 200 C 690 200, 690 240, 740 240" />
      <path id="path-sub4" d="M 640 200 C 690 200, 690 290, 740 290" />
    </defs>
    <rect width="850" height="500" fill="#000" />
    {/* Background Grid */}
    <rect width="850" height="500" fill="url(#grid)" />

    {/* ── COLUMNS HEADERS ── */}
    <g
      fontFamily="monospace"
      fontSize="10"
      fill="rgba(255,255,255,0.2)"
      letterSpacing="0.2em"
    >
      <text x="80" y="40" textAnchor="middle">
        PLATFORM
      </text>
      <text x="260" y="40" textAnchor="middle">
        UNIVERSITY
      </text>
      <text x="440" y="40" textAnchor="middle">
        COURSE
      </text>
      <text x="610" y="40" textAnchor="middle">
        SEMESTER
      </text>
      <text x="780" y="40" textAnchor="middle">
        SUBJECTS
      </text>
    </g>

    {/* ── CONNECTING LINES (INACTIVE) ── */}
    <g
      stroke="rgba(255,255,255,0.06)"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      fill="none"
    >
      <path d="M 120 250 C 180 250, 180 320, 240 320" /> {/* Hub to BU */}
      <path d="M 280 180 C 340 180, 340 110, 400 110" /> {/* VTU to B.Tech */}
      <path d="M 480 250 C 530 250, 530 300, 580 300" /> {/* MCA to Sem 2 */}
    </g>

    {/* ── CONNECTING LINES (ACTIVE / AMBER) ── */}
    <g
      stroke="rgba(245,173,66,0.4)"
      strokeWidth="1.5"
      strokeDasharray="6 6"
      fill="none"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="12"
        to="0"
        dur="0.8s"
        repeatCount="indefinite"
      />
      <use href="#path-u1" />
      <use href="#path-c2" />
      <use href="#path-s1" />
      <use href="#path-sub1" />
      <use href="#path-sub2" />
      <use href="#path-sub3" />
      <use href="#path-sub4" />
    </g>

    {/* ── ANIMATED DATA PACKETS ── */}
    <g fill="#f5ad42" filter="url(#amber-glow)">
      {/* Platform -> University */}
      <circle r="2.5">
        <animateMotion dur="1.5s" repeatCount="indefinite">
          <mpath href="#path-u1" />
        </animateMotion>
      </circle>
      {/* University -> Course */}
      <circle r="2.5">
        <animateMotion dur="1.5s" begin="0.5s" repeatCount="indefinite">
          <mpath href="#path-c2" />
        </animateMotion>
      </circle>
      {/* Course -> Semester */}
      <circle r="2.5">
        <animateMotion dur="1.2s" begin="1s" repeatCount="indefinite">
          <mpath href="#path-s1" />
        </animateMotion>
      </circle>
      {/* Semester -> Subjects */}
      <circle r="2">
        <animateMotion dur="1s" begin="1.5s" repeatCount="indefinite">
          <mpath href="#path-sub1" />
        </animateMotion>
      </circle>
      <circle r="2">
        <animateMotion dur="1s" begin="1.7s" repeatCount="indefinite">
          <mpath href="#path-sub2" />
        </animateMotion>
      </circle>
      <circle r="2">
        <animateMotion dur="1s" begin="1.6s" repeatCount="indefinite">
          <mpath href="#path-sub3" />
        </animateMotion>
      </circle>
      <circle r="2">
        <animateMotion dur="1s" begin="1.8s" repeatCount="indefinite">
          <mpath href="#path-sub4" />
        </animateMotion>
      </circle>
    </g>

    {/* =========================================
        LEVEL 1: EKALAVYA PLATFORM (HUB)
    ========================================= */}
    <g transform="translate(80, 250)">
      <circle
        r="45"
        fill="none"
        stroke="rgba(245,173,66,0.15)"
        strokeWidth="1"
        strokeDasharray="4 6"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur="20s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        r="36"
        fill="rgba(245,173,66,0.1)"
        stroke="#f5ad42"
        strokeWidth="1.5"
      />
      <circle
        r="36"
        fill="none"
        stroke="rgba(245,173,66,0.4)"
        strokeWidth="1.5"
      >
        <animate
          attributeName="r"
          values="36;52;36"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        y="-4"
        textAnchor="middle"
        fontFamily="'DM Serif Display',serif"
        fontSize="13"
        fill="#f5ad42"
      >
        Ekalavya
      </text>
      <text
        y="10"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="8"
        fill="rgba(245,173,66,0.6)"
      >
        HUB
      </text>
    </g>

    {/* =========================================
        LEVEL 2: UNIVERSITIES
    ========================================= */}
    {/* Active Node: VTU */}
    <g transform="translate(260, 180)">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="260,180; 260,176; 260,180"
        dur="3s"
        repeatCount="indefinite"
      />
      <circle
        r="22"
        fill="#161616"
        stroke="#f5ad42"
        strokeWidth="1.5"
        filter="url(#amber-glow)"
      />
      <text
        y="4"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill="#fff"
        fontWeight="bold"
      >
        VTU
      </text>
    </g>

    {/* Inactive Node: BU */}
    <g transform="translate(260, 320)">
      <circle
        r="22"
        fill="#101010"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
      />
      <text
        y="4"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill="rgba(255,255,255,0.3)"
      >
        BU
      </text>
    </g>

    {/* =========================================
        LEVEL 3: COURSES
    ========================================= */}
    {/* Inactive Node: B.Tech */}
    <g transform="translate(440, 110)">
      <rect
        x="-40"
        y="-18"
        width="80"
        height="36"
        rx="6"
        fill="#101010"
        stroke="rgba(255,255,255,0.1)"
      />
      <text
        y="4"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill="rgba(255,255,255,0.3)"
      >
        B.Tech
      </text>
    </g>

    {/* Active Node: MCA */}
    <g transform="translate(440, 250)">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="440,250; 440,246; 440,250"
        dur="3.2s"
        repeatCount="indefinite"
      />
      <rect
        x="-40"
        y="-18"
        width="80"
        height="36"
        rx="6"
        fill="#1a140a"
        stroke="#f5ad42"
        strokeWidth="1.5"
      />
      <rect
        x="-40"
        y="-18"
        width="80"
        height="36"
        rx="6"
        fill="none"
        stroke="#f5ad42"
        strokeWidth="2"
        filter="url(#amber-glow)"
        opacity="0.4"
      />
      <text
        y="4"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="12"
        fill="#f5ad42"
        fontWeight="bold"
      >
        MCA
      </text>
    </g>

    {/* =========================================
        LEVEL 4: SEMESTERS
    ========================================= */}
    {/* Active Node: Sem 1 */}
    <g transform="translate(610, 200)">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="610,200; 610,197; 610,200"
        dur="2.8s"
        repeatCount="indefinite"
      />
      <rect
        x="-35"
        y="-14"
        width="70"
        height="28"
        rx="14"
        fill="#1a140a"
        stroke="#f5ad42"
        strokeWidth="1"
      />
      <text
        y="3"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="9"
        fill="#fff"
      >
        Sem 1
      </text>
    </g>

    {/* Inactive Node: Sem 2 */}
    <g transform="translate(610, 300)">
      <rect
        x="-35"
        y="-14"
        width="70"
        height="28"
        rx="14"
        fill="#101010"
        stroke="rgba(255,255,255,0.1)"
      />
      <text
        y="3"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="9"
        fill="rgba(255,255,255,0.3)"
      >
        Sem 2
      </text>
    </g>

    {/* =========================================
        LEVEL 5: SUBJECTS
    ========================================= */}
    {[
      { y: 140, title: "Web Technologies", code: "24MCA11", delay: "0s" },
      { y: 190, title: "Data Structures", code: "24MCA12", delay: "0.2s" },
      { y: 240, title: "Operating Systems", code: "24MCA13", delay: "0.4s" },
      { y: 290, title: "Discrete Math", code: "24MCA14", delay: "0.6s" },
    ].map((sub, i) => (
      <g key={i} transform={`translate(740, ${sub.y})`}>
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`740,${sub.y}; 740,${sub.y - 2}; 740,${sub.y}`}
          dur="3s"
          begin={sub.delay}
          repeatCount="indefinite"
        />

        {/* Subject Card Base */}
        <rect
          x="0"
          y="-16"
          width="100"
          height="32"
          rx="4"
          fill="#161616"
          stroke="rgba(245,173,66,0.3)"
          strokeWidth="0.5"
        />
        <rect x="0" y="-16" width="3" height="32" rx="1" fill="#f5ad42" />

        {/* Text */}
        <text x="12" y="-1" fontFamily="monospace" fontSize="8" fill="#fff">
          {sub.title}
        </text>
        <text
          x="12"
          y="10"
          fontFamily="monospace"
          fontSize="7"
          fill="rgba(245,173,66,0.7)"
        >
          {sub.code}
        </text>

        {/* Pulsing indicator dot */}
        <circle cx="88" cy="0" r="2.5" fill="#f5ad42">
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="1.5s"
            begin={sub.delay}
            repeatCount="indefinite"
          />
        </circle>
      </g>
    ))}
  </svg>
);
const SvgUniversities = () => (
  <svg
    className="ek-svg"
    viewBox="0 0 340 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Central Hub */}
    <g>
      {/* Outer rotating dashed ring */}
      <circle
        cx="170"
        cy="150"
        r="48"
        fill="none"
        stroke="rgba(245,173,66,0.15)"
        strokeWidth="1"
        strokeDasharray="4 6"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 170 150"
          to="360 170 150"
          dur="20s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Inner rotating dotted ring (rotates opposite direction) */}
      <circle
        cx="170"
        cy="150"
        r="42"
        fill="none"
        stroke="rgba(245,173,66,0.2)"
        strokeWidth="0.5"
        strokeDasharray="2 4"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 170 150"
          to="0 170 150"
          dur="15s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Solid base */}
      <circle
        cx="170"
        cy="150"
        r="34"
        fill="rgba(245,173,66,0.1)"
        stroke="#f5ad42"
        strokeWidth="1.5"
      />

      {/* Pulsing radar effect */}
      <circle
        cx="170"
        cy="150"
        r="34"
        fill="none"
        stroke="rgba(245,173,66,0.4)"
        strokeWidth="1.5"
      >
        <animate
          attributeName="r"
          values="34;56;34"
          dur="3.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0;0.8"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Hub Text */}
      <text
        x="170"
        y="146"
        textAnchor="middle"
        fontFamily="'DM Serif Display',serif"
        fontSize="11"
        fill="#f5ad42"
      >
        Ekalavya
      </text>
      <text
        x="170"
        y="160"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="7.5"
        fill="rgba(245,173,66,0.5)"
      >
        Platform
      </text>
    </g>

    {/* Satellite Nodes & Connections */}
    {[
      {
        cx: 60,
        cy: 58,
        label: "VTU",
        sub: "1200+",
        delay: "0s",
        floatDur: "3s",
      },
      {
        cx: 280,
        cy: 58,
        label: "BU",
        sub: "800+",
        delay: "0.4s",
        floatDur: "3.5s",
      },
      {
        cx: 42,
        cy: 242,
        label: "KSOU",
        sub: "600+",
        delay: "0.8s",
        floatDur: "4s",
      },
      {
        cx: 298,
        cy: 242,
        label: "MSRIT",
        sub: "500+",
        delay: "1.2s",
        floatDur: "3.2s",
      },
      {
        cx: 170,
        cy: 22,
        label: "REVA",
        sub: "400+",
        delay: "1.6s",
        floatDur: "3.8s",
      },
    ].map(({ cx, cy, label, sub, delay, floatDur }) => {
      // Calculate connection points to hub dynamically
      const x2 = cx < 170 ? (cy < 150 ? 142 : 144) : cy < 150 ? 198 : 196;
      const y2 = cy < 100 ? 120 : cy > 200 ? 180 : 150;

      return (
        <g key={label}>
          {/* Flowing Data Line */}
          <line
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke="rgba(245,173,66,0.3)"
            strokeWidth="1"
            strokeDasharray="4 4"
          >
            {/* Opacity fade based on delay */}
            <animate
              attributeName="stroke-opacity"
              values="0.1;0.6;0.1"
              dur="2.5s"
              begin={delay}
              repeatCount="indefinite"
            />
            {/* Marching ants effect for continuous data flow */}
            <animate
              attributeName="stroke-dashoffset"
              from="8"
              to="0"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>

          {/* Floating Satellite Node Group */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-4; 0,0"
              dur={floatDur}
              begin={delay}
              repeatCount="indefinite"
            />
            <circle
              cx={cx}
              cy={cy}
              r="22"
              fill="#161616"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />

            {/* Inner glowing core for satellites */}
            <circle
              cx={cx}
              cy={cy}
              r="22"
              fill="none"
              stroke="rgba(245,173,66,0.1)"
              strokeWidth="3"
            >
              <animate
                attributeName="stroke-opacity"
                values="0;0.5;0"
                dur={floatDur}
                begin={delay}
                repeatCount="indefinite"
              />
            </circle>

            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="8"
              fill="rgba(255,255,255,0.85)"
            >
              {label}
            </text>
            <text
              x={cx}
              y={cy + 8}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="7"
              fill="rgba(255,255,255,0.35)"
            >
              {sub}
            </text>
          </g>
        </g>
      );
    })}
  </svg>
);

const SvgEditor = () => (
  <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="sidebarGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0d0d0d" />
        <stop offset="100%" stop-color="#111111" />
      </linearGradient>
      <linearGradient id="editorBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#121212" />
        <stop offset="100%" stop-color="#0f0f0f" />
      </linearGradient>
      <linearGradient id="orangeGlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(245,173,66,0.15)" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.02)" />
      </linearGradient>
      <linearGradient id="activeTab" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1a1a" />
        <stop offset="100%" stop-color="#141414" />
      </linearGradient>
      <linearGradient id="tooltipGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1c1c1c" />
        <stop offset="100%" stop-color="#161616" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="softShadow">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="4"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="cardShadow">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="8"
          flood-color="#000"
          flood-opacity="0.6"
        />
      </filter>
      <clipPath id="editorClip">
        <rect x="225" y="95" width="558" height="390" rx="8" />
      </clipPath>
    </defs>

    <rect width="800" height="500" rx="16" fill="url(#bgGrad)" />

    <rect
      x="0"
      y="0"
      width="210"
      height="500"
      rx="16"
      fill="url(#sidebarGrad)"
      stroke="rgba(255,255,255,0.05)"
      stroke-width="1"
    />
    <rect
      x="0"
      y="0"
      width="210"
      height="500"
      rx="16"
      fill="url(#orangeGlow)"
      opacity="0.3"
    />

    <rect x="0" y="0" width="210" height="48" fill="none" />

    <text
      x="20"
      y="30"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="14"
      fill="rgba(255,255,255,0.9)"
    >
      Ekalavya
    </text>
    <text
      x="20"
      y="44"
      font-family="system-ui, sans-serif"
      font-weight="400"
      font-size="9"
      fill="rgba(245,173,66,0.6)"
    >
      FACULTY WORKSPACE
    </text>
    <line
      x1="20"
      y1="56"
      x2="190"
      y2="56"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="1"
    />

    <rect
      x="8"
      y="64"
      width="194"
      height="32"
      rx="6"
      fill="rgba(245,173,66,0.08)"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="0.5"
    />
    <circle cx="28" cy="80" r="4" fill="rgba(245,173,66,0.5)" />
    <text
      x="40"
      y="84"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="11"
      fill="rgba(245,173,66,0.9)"
    >
      My Notes
    </text>
    <rect
      x="165"
      y="72"
      width="28"
      height="14"
      rx="7"
      fill="rgba(245,173,66,0.15)"
    />
    <text
      x="179"
      y="82"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="#f5ad42"
    >
      12
    </text>

    <text
      x="40"
      y="120"
      font-family="system-ui, sans-serif"
      font-weight="400"
      font-size="11"
      fill="rgba(255,255,255,0.45)"
    >
      Assignments
    </text>
    <text
      x="40"
      y="152"
      font-family="system-ui, sans-serif"
      font-weight="400"
      font-size="11"
      fill="rgba(255,255,255,0.45)"
    >
      Question Papers
    </text>
    <text
      x="40"
      y="184"
      font-family="system-ui, sans-serif"
      font-weight="400"
      font-size="11"
      fill="rgba(255,255,255,0.45)"
    >
      Students
    </text>

    <line
      x1="20"
      y1="208"
      x2="190"
      y2="208"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="1"
    />

    <text
      x="20"
      y="230"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
      letter-spacing="1"
    >
      RECENT
    </text>

    <rect
      x="8"
      y="240"
      width="194"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.02)"
    />
    <rect
      x="16"
      y="249"
      width="3"
      height="10"
      rx="1.5"
      fill="rgba(245,173,66,0.4)"
    />
    <text
      x="26"
      y="258"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Web Tech - Chapter 4
    </text>

    <rect
      x="8"
      y="272"
      width="194"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.02)"
    />
    <rect
      x="16"
      y="281"
      width="3"
      height="10"
      rx="1.5"
      fill="rgba(245,173,66,0.4)"
    />
    <text
      x="26"
      y="290"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Data Structures - Stacks
    </text>

    <rect
      x="8"
      y="304"
      width="194"
      height="28"
      rx="5"
      fill="rgba(245,173,66,0.03)"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="0.5"
    />
    <rect x="16" y="313" width="3" height="10" rx="1.5" fill="#f5ad42" />
    <text
      x="26"
      y="322"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="10"
      fill="rgba(245,173,66,0.8)"
    >
      OS - Process Sync
    </text>

    <rect
      x="8"
      y="460"
      width="194"
      height="28"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <circle cx="28" cy="474" r="10" fill="rgba(245,173,66,0.2)" />
    <text
      x="28"
      y="478"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="#f5ad42"
    >
      FK
    </text>
    <text
      x="44"
      y="474"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.6)"
    >
      Dr. Kiran
    </text>
    <text
      x="44"
      y="485"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.25)"
    >
      Professor, CSE
    </text>

    <rect
      x="225"
      y="15"
      width="558"
      height="470"
      rx="12"
      fill="url(#editorBg)"
      stroke="rgba(255,255,255,0.05)"
      stroke-width="1"
      filter="url(#cardShadow)"
    />

    <rect x="225" y="15" width="558" height="36" rx="12" fill="#141414" />
    <rect x="225" y="25" width="558" height="26" fill="#141414" />

    <rect
      x="240"
      y="22"
      width="140"
      height="24"
      rx="6"
      fill="url(#activeTab)"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="0.5"
    />
    <circle cx="254" cy="34" r="3" fill="rgba(245,173,66,0.5)" />
    <text
      x="263"
      y="38"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9.5"
      fill="rgba(255,255,255,0.8)"
    >
      Chapter 4: CSS Grid
    </text>
    <text
      x="372"
      y="38"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.3)"
    >
      ×
    </text>

    <rect
      x="385"
      y="22"
      width="130"
      height="24"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <circle cx="400" cy="34" r="3" fill="rgba(255,255,255,0.2)" />
    <text
      x="408"
      y="38"
      font-family="system-ui, sans-serif"
      font-size="9.5"
      fill="rgba(255,255,255,0.4)"
    >
      Chapter 3: Flexbox
    </text>
    <text
      x="507"
      y="38"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.2)"
    >
      ×
    </text>

    <rect
      x="519"
      y="22"
      width="24"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.08)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0.6;1;0.6"
        dur="2s"
        repeatCount="indefinite"
      />
    </rect>
    <text
      x="531"
      y="38"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="13"
      fill="#f5ad42"
    >
      +
    </text>

    <rect
      x="235"
      y="55"
      width="538"
      height="34"
      rx="6"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
    />

    <rect
      x="248"
      y="62"
      width="28"
      height="20"
      rx="4"
      fill="rgba(255,255,255,0.03)"
    />
    <text
      x="262"
      y="76"
      text-anchor="middle"
      font-family="serif"
      font-weight="700"
      font-size="12"
      fill="rgba(255,255,255,0.5)"
    >
      B
    </text>
    <text
      x="284"
      y="76"
      font-family="serif"
      font-style="italic"
      font-weight="500"
      font-size="12"
      fill="rgba(255,255,255,0.35)"
    >
      I
    </text>
    <text
      x="306"
      y="76"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="11"
      fill="rgba(255,255,255,0.3)"
      text-decoration="underline"
    >
      U
    </text>

    <line
      x1="322"
      y1="64"
      x2="322"
      y2="80"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="1"
    />

    <text
      x="336"
      y="76"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.35)"
    >
      H1
    </text>
    <text
      x="360"
      y="76"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.35)"
    >
      H2
    </text>
    <text
      x="384"
      y="76"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.35)"
    >
      ¶
    </text>

    <line
      x1="405"
      y1="64"
      x2="405"
      y2="80"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="1"
    />

    <rect
      x="415"
      y="62"
      width="24"
      height="20"
      rx="4"
      fill="rgba(245,173,66,0.12)"
      stroke="rgba(245,173,66,0.25)"
      stroke-width="0.5"
    />
    <text
      x="427"
      y="76"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="#f5ad42"
    >
      📷
    </text>

    <text
      x="450"
      y="76"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.3)"
    >
      📎
    </text>
    <text
      x="474"
      y="76"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.3)"
    >
      📊
    </text>
    <text
      x="498"
      y="76"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(245,173,66,0.5)"
    >
      ∑
    </text>
    <text
      x="522"
      y="76"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.3)"
    >
      &lt;/&gt;
    </text>

    <line
      x1="550"
      y1="64"
      x2="550"
      y2="80"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="1"
    />

    <rect
      x="660"
      y="63"
      width="8"
      height="8"
      rx="4"
      fill="#f5ad42"
      opacity="0.8"
    >
      <animate
        attributeName="opacity"
        values="0.8;0.3;0.8"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </rect>
    <text
      x="674"
      y="71"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.35)"
    >
      Saving...
    </text>

    <rect x="235" y="98" width="538" height="375" fill="none" />

    <rect
      x="255"
      y="110"
      width="180"
      height="18"
      rx="3"
      fill="rgba(255,255,255,0.06)"
    >
      <animate
        attributeName="width"
        values="0;180"
        dur="0.8s"
        fill="freeze"
        begin="0.5s"
      />
    </rect>
    <text
      x="255"
      y="124"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="16"
      fill="rgba(255,255,255,0.85)"
      opacity="0"
    >
      Introduction to CSS Grid
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.8s"
      />
    </text>

    <rect
      x="255"
      y="140"
      width="480"
      height="10"
      rx="2"
      fill="rgba(255,255,255,0.12)"
    >
      <animate
        attributeName="width"
        values="0;480"
        dur="0.6s"
        fill="freeze"
        begin="1.0s"
      />
    </rect>
    <rect
      x="255"
      y="156"
      width="440"
      height="10"
      rx="2"
      fill="rgba(255,255,255,0.08)"
    >
      <animate
        attributeName="width"
        values="0;440"
        dur="0.5s"
        fill="freeze"
        begin="1.2s"
      />
    </rect>
    <rect
      x="255"
      y="172"
      width="400"
      height="10"
      rx="2"
      fill="rgba(255,255,255,0.06)"
    >
      <animate
        attributeName="width"
        values="0;400"
        dur="0.5s"
        fill="freeze"
        begin="1.4s"
      />
    </rect>

    <rect
      x="255"
      y="198"
      width="480"
      height="90"
      rx="6"
      fill="#0a0a0a"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.8s"
      />
    </rect>
    <rect
      x="255"
      y="198"
      width="4"
      height="90"
      rx="2"
      fill="#f5ad42"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.8s"
      />
    </rect>

    <text
      x="272"
      y="216"
      font-family="monospace"
      font-size="9"
      fill="#f5ad42"
      opacity="0"
    >
      .container
    </text>
    <text
      x="340"
      y="216"
      font-family="monospace"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
      opacity="0"
    ></text>
    <animate
      attributeName="opacity"
      values="0;1"
      dur="0.3s"
      fill="freeze"
      begin="2.0s"
    />

    <text
      x="285"
      y="232"
      font-family="monospace"
      font-size="9"
      fill="#88ccff"
      opacity="0"
    >
      display:
    </text>
    <text
      x="330"
      y="232"
      font-family="monospace"
      font-size="9"
      fill="#e8b86d"
      opacity="0"
    >
      grid
    </text>
    <text
      x="355"
      y="232"
      font-family="monospace"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
      opacity="0"
    >
      ;
    </text>
    <animate
      attributeName="opacity"
      values="0;1"
      dur="0.3s"
      fill="freeze"
      begin="2.2s"
    />

    <text
      x="285"
      y="248"
      font-family="monospace"
      font-size="9"
      fill="#88ccff"
      opacity="0"
    >
      grid-template-columns:
    </text>
    <text
      x="410"
      y="248"
      font-family="monospace"
      font-size="9"
      fill="#e8b86d"
      opacity="0"
    >
      1fr 1fr
    </text>
    <text
      x="445"
      y="248"
      font-family="monospace"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
      opacity="0"
    >
      ;
    </text>
    <animate
      attributeName="opacity"
      values="0;1"
      dur="0.3s"
      fill="freeze"
      begin="2.4s"
    />

    <text
      x="285"
      y="264"
      font-family="monospace"
      font-size="9"
      fill="#88ccff"
      opacity="0"
    >
      gap:
    </text>
    <text
      x="315"
      y="264"
      font-family="monospace"
      font-size="9"
      fill="#e8b86d"
      opacity="0"
    >
      1.5rem
    </text>
    <text
      x="355"
      y="264"
      font-family="monospace"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
      opacity="0"
    >
      ;
    </text>
    <animate
      attributeName="opacity"
      values="0;1"
      dur="0.3s"
      fill="freeze"
      begin="2.6s"
    />

    <text
      x="272"
      y="280"
      font-family="monospace"
      font-size="9"
      fill="rgba(255,255,255,0.4)"
      opacity="0"
    ></text>
    <animate
      attributeName="opacity"
      values="0;1"
      dur="0.3s"
      fill="freeze"
      begin="2.8s"
    />

    <rect
      x="255"
      y="310"
      width="200"
      height="110"
      rx="8"
      fill="#0d0d0d"
      stroke="rgba(245,173,66,0.12)"
      stroke-width="1"
      stroke-dasharray="4,3"
      opacity="0"
      filter="url(#softShadow)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.2s"
      />
    </rect>
    <rect
      x="320"
      y="345"
      width="24"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.15)"
      stroke="rgba(245,173,66,0.3)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="3.4s"
      />
    </rect>
    <text
      x="332"
      y="362"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="11"
      fill="#f5ad42"
      opacity="0"
    >
      +
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="3.4s"
      />
    </text>
    <text
      x="355"
      y="420"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
      opacity="0"
    >
      Add image or video
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="3.5s"
      />
    </text>

    <rect
      x="470"
      y="310"
      width="260"
      height="12"
      rx="2"
      fill="rgba(255,255,255,0.1)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.6s"
      />
      <animate
        attributeName="width"
        values="0;260"
        dur="0.5s"
        fill="freeze"
        begin="3.6s"
      />
    </rect>
    <rect
      x="470"
      y="330"
      width="230"
      height="12"
      rx="2"
      fill="rgba(255,255,255,0.07)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.8s"
      />
      <animate
        attributeName="width"
        values="0;230"
        dur="0.5s"
        fill="freeze"
        begin="3.8s"
      />
    </rect>

    <rect
      x="690"
      y="310"
      width="75"
      height="110"
      rx="8"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="4.0s"
      />
    </rect>
    <text
      x="727"
      y="328"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      CSS
    </text>
    <text
      x="727"
      y="340"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Image
    </text>
    <text
      x="727"
      y="352"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      Alt
    </text>
    <text
      x="727"
      y="364"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      SEO
    </text>
    <text
      x="727"
      y="376"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Link
    </text>

    <rect
      x="470"
      y="355"
      width="240"
      height="30"
      rx="4"
      fill="rgba(245,173,66,0.03)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="4.2s"
      />
    </rect>
    <rect
      x="470"
      y="355"
      width="3"
      height="30"
      rx="1.5"
      fill="rgba(245,173,66,0.5)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="4.2s"
      />
    </rect>
    <text
      x="482"
      y="372"
      font-family="system-ui, sans-serif"
      font-style="italic"
      font-size="9"
      fill="rgba(255,255,255,0.35)"
      opacity="0"
    >
      "Best way to learn CSS Grid..."
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="4.3s"
      />
    </text>

    <circle
      cx="740"
      cy="440"
      r="22"
      fill="rgba(245,173,66,0.15)"
      stroke="rgba(245,173,66,0.4)"
      stroke-width="1"
      filter="url(#glow)"
    >
      <animate
        attributeName="r"
        values="22;24;22"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <text
      x="740"
      y="446"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="16"
      fill="#f5ad42"
    >
      +
    </text>

    <rect
      x="262"
      y="123"
      width="2"
      height="14"
      rx="1"
      fill="#f5ad42"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="1;0;1"
        dur="1.1s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="x"
        values="262;430;262"
        dur="6s"
        repeatCount="indefinite"
      />
    </rect>

    <rect
      x="235"
      y="440"
      width="538"
      height="38"
      rx="8"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="4.5s"
      />
    </rect>
    <text
      x="250"
      y="463"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(245,173,66,0.6)"
    >
      CHAPTER STRUCTURE
    </text>
    <rect
      x="370"
      y="448"
      width="60"
      height="20"
      rx="4"
      fill="rgba(245,173,66,0.12)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
    />
    <text
      x="400"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="#f5ad42"
    >
      4.1 Grid
    </text>
    <rect
      x="436"
      y="448"
      width="60"
      height="20"
      rx="4"
      fill="rgba(255,255,255,0.03)"
    />
    <text
      x="466"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      4.2 Flex
    </text>
    <rect
      x="502"
      y="448"
      width="60"
      height="20"
      rx="4"
      fill="rgba(255,255,255,0.03)"
    />
    <text
      x="532"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      4.3 Anim
    </text>
    <circle
      cx="586"
      cy="458"
      r="8"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.25)"
      stroke-width="0.5"
    />
    <text
      x="586"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="#f5ad42"
    >
      +
    </text>

    <rect
      x="300"
      y="4"
      width="200"
      height="12"
      rx="6"
      fill="rgba(245,173,66,0.06)"
    />
    <text
      x="400"
      y="12"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      VTU · B.Tech · 4th Sem · Web Technologies
    </text>

    <circle cx="760" cy="28" r="5" fill="#f5ad42">
      <animate
        attributeName="r"
        values="5;7;5"
        dur="1.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.7;1;0.7"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle
      cx="760"
      cy="28"
      r="9"
      fill="none"
      stroke="#f5ad42"
      stroke-width="0.5"
      opacity="0.3"
    >
      <animate
        attributeName="r"
        values="9;14;9"
        dur="1.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.3;0;0.3"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </circle>

    <circle cx="660" cy="110" r="1" fill="rgba(255,255,255,0.05)" />
    <circle cx="670" cy="110" r="1" fill="rgba(255,255,255,0.05)" />
    <circle cx="680" cy="110" r="1" fill="rgba(255,255,255,0.03)" />
    <circle cx="660" cy="120" r="1" fill="rgba(255,255,255,0.03)" />
    <circle cx="670" cy="120" r="1" fill="rgba(255,255,255,0.03)" />
  </svg>
);

const SvgStudent = () => (
  <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="phoneBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1a1a" />
        <stop offset="100%" stop-color="#0e0e0e" />
      </linearGradient>
      <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0f0f0f" />
        <stop offset="100%" stop-color="#080808" />
      </linearGradient>
      <linearGradient id="tabletBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#181818" />
        <stop offset="100%" stop-color="#0e0e0e" />
      </linearGradient>
      <linearGradient id="laptopBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#161616" />
        <stop offset="100%" stop-color="#0c0c0c" />
      </linearGradient>
      <linearGradient id="orangeGlow2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(245,173,66,0.12)" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.02)" />
      </linearGradient>
      <linearGradient id="downloadBtn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f5ad42" />
        <stop offset="100%" stop-color="#e09c2e" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.04)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <filter id="glow2">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="phoneShadow">
        <feDropShadow
          dx="0"
          dy="8"
          stdDeviation="16"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="tabletShadow">
        <feDropShadow
          dx="0"
          dy="6"
          stdDeviation="12"
          flood-color="#000"
          flood-opacity="0.4"
        />
      </filter>
      <filter id="laptopShadow">
        <feDropShadow
          dx="0"
          dy="10"
          stdDeviation="20"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <clipPath id="phoneScreen">
        <rect x="498" y="118" width="180" height="300" rx="20" />
      </clipPath>
      <clipPath id="tabletScreen">
        <rect x="104" y="152" width="260" height="200" rx="12" />
      </clipPath>
      <clipPath id="laptopScreen">
        <rect x="24" y="55" width="312" height="210" rx="8" />
      </clipPath>
    </defs>

    <rect width="800" height="500" rx="16" fill="url(#bgGrad2)" />

    <rect
      x="20"
      y="20"
      width="220"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.06)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.3s"
      />
    </rect>
    <text
      x="40"
      y="36"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="11"
      fill="rgba(245,173,66,0.7)"
      opacity="0"
    >
      MULTI-DEVICE ACCESS
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.3s"
      />
    </text>

    <circle cx="230" cy="32" r="3" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </circle>
    <rect
      x="240"
      y="26"
      width="80"
      height="12"
      rx="6"
      fill="rgba(255,255,255,0.03)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </rect>
    <text
      x="280"
      y="35"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.35)"
      opacity="0"
    >
      Connected
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </text>

    <g filter="url(#laptopShadow)">
      <rect
        x="4"
        y="42"
        width="352"
        height="230"
        rx="16"
        fill="url(#laptopBody)"
        stroke="rgba(255,255,255,0.06)"
        stroke-width="1"
      />
      <rect
        x="16"
        y="48"
        width="328"
        height="218"
        rx="10"
        fill="#0a0a0a"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="0.5"
      />
      <rect
        x="24"
        y="55"
        width="312"
        height="210"
        rx="8"
        fill="url(#screenGrad)"
      />

      <g clip-path="url(#laptopScreen)">
        <rect x="24" y="55" width="312" height="32" fill="#111111" />
        <circle cx="38" cy="71" r="4" fill="#333" />
        <circle cx="50" cy="71" r="4" fill="#333" />
        <circle cx="62" cy="71" r="4" fill="rgba(245,173,66,0.5)" />

        <rect
          x="36"
          y="98"
          width="160"
          height="14"
          rx="3"
          fill="rgba(255,255,255,0.08)"
        />
        <rect
          x="36"
          y="118"
          width="220"
          height="10"
          rx="2"
          fill="rgba(255,255,255,0.05)"
        />
        <rect
          x="36"
          y="134"
          width="190"
          height="10"
          rx="2"
          fill="rgba(255,255,255,0.04)"
        />

        <rect
          x="36"
          y="158"
          width="288"
          height="60"
          rx="6"
          fill="rgba(245,173,66,0.04)"
          stroke="rgba(245,173,66,0.12)"
          stroke-width="0.5"
        />
        <rect
          x="48"
          y="170"
          width="18"
          height="18"
          rx="4"
          fill="rgba(245,173,66,0.15)"
        />
        <text
          x="57"
          y="183"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-size="10"
          fill="#f5ad42"
        >
          PDF
        </text>
        <text
          x="76"
          y="178"
          font-family="system-ui, sans-serif"
          font-size="9"
          fill="rgba(255,255,255,0.6)"
        >
          Web_Technologies_Module4.pdf
        </text>
        <text
          x="76"
          y="192"
          font-family="system-ui, sans-serif"
          font-size="7"
          fill="rgba(255,255,255,0.25)"
        >
          2.4 MB · Downloaded 1.2k times
        </text>
        <rect
          x="260"
          y="170"
          width="52"
          height="22"
          rx="6"
          fill="url(#downloadBtn)"
          filter="url(#softGlow)"
        >
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        <text
          x="286"
          y="185"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-weight="600"
          font-size="8"
          fill="#0a0a0a"
        >
          Download
        </text>

        <rect
          x="36"
          y="230"
          width="288"
          height="24"
          rx="5"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.03)"
          stroke-width="0.5"
        />
        <text
          x="48"
          y="246"
          font-family="system-ui, sans-serif"
          font-size="7"
          fill="rgba(255,255,255,0.3)"
        >
          📄 Module 3 Notes.pdf
        </text>

        <rect
          x="36"
          y="256"
          width="288"
          height="1"
          fill="rgba(255,255,255,0.03)"
        />
      </g>

      <rect
        x="4"
        y="272"
        width="352"
        height="12"
        rx="6"
        fill="#161616"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="0.5"
      />
      <rect x="130" y="274" width="92" height="6" rx="3" fill="#1a1a1a" />
    </g>

    <g filter="url(#tabletShadow)">
      <rect
        x="87"
        y="332"
        width="294"
        height="155"
        rx="16"
        fill="url(#tabletBody)"
        stroke="rgba(255,255,255,0.06)"
        stroke-width="1"
      />
      <rect
        x="99"
        y="144"
        width="270"
        height="212"
        rx="14"
        fill="#0c0c0c"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="0.5"
      />
      <rect
        x="104"
        y="152"
        width="260"
        height="200"
        rx="12"
        fill="url(#screenGrad)"
      />

      <g clip-path="url(#tabletScreen)">
        <rect x="104" y="152" width="260" height="28" fill="#0e0e0e" />
        <circle cx="116" cy="166" r="3.5" fill="#333" />
        <circle cx="126" cy="166" r="3.5" fill="#333" />
        <circle cx="136" cy="166" r="3.5" fill="rgba(245,173,66,0.5)" />

        <rect
          x="116"
          y="192"
          width="120"
          height="12"
          rx="3"
          fill="rgba(255,255,255,0.08)"
        />
        <rect
          x="116"
          y="210"
          width="180"
          height="8"
          rx="2"
          fill="rgba(255,255,255,0.05)"
        />
        <rect
          x="116"
          y="224"
          width="150"
          height="8"
          rx="2"
          fill="rgba(255,255,255,0.04)"
        />

        <rect
          x="116"
          y="246"
          width="236"
          height="42"
          rx="6"
          fill="rgba(245,173,66,0.05)"
          stroke="rgba(245,173,66,0.1)"
          stroke-width="0.5"
        />
        <rect
          x="128"
          y="256"
          width="18"
          height="14"
          rx="3"
          fill="rgba(245,173,66,0.2)"
        />
        <text
          x="137"
          y="267"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-size="7"
          fill="#f5ad42"
        >
          ?
        </text>
        <text
          x="154"
          y="262"
          font-family="system-ui, sans-serif"
          font-size="8"
          fill="rgba(255,255,255,0.5)"
        >
          2024-VTU-QP-WebTech.pdf
        </text>
        <text
          x="154"
          y="274"
          font-family="system-ui, sans-serif"
          font-size="6.5"
          fill="rgba(255,255,255,0.2)"
        >
          Question Paper · 15 Pages
        </text>

        <rect
          x="116"
          y="296"
          width="236"
          height="42"
          rx="6"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.03)"
          stroke-width="0.5"
        />
        <rect
          x="128"
          y="306"
          width="18"
          height="14"
          rx="3"
          fill="rgba(255,255,255,0.08)"
        />
        <text
          x="137"
          y="317"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-size="7"
          fill="rgba(255,255,255,0.4)"
        >
          📋
        </text>
        <text
          x="154"
          y="312"
          font-family="system-ui, sans-serif"
          font-size="8"
          fill="rgba(255,255,255,0.4)"
        >
          Internal_Assessment_2.pdf
        </text>
        <text
          x="154"
          y="324"
          font-family="system-ui, sans-serif"
          font-size="6.5"
          fill="rgba(255,255,255,0.15)"
        >
          Assignment · 8 Pages
        </text>
      </g>

      <rect
        x="87"
        y="487"
        width="294"
        height="8"
        rx="4"
        fill="#161616"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="0.3"
      />
    </g>

    <g filter="url(#phoneShadow)">
      <rect
        x="488"
        y="95"
        width="200"
        height="340"
        rx="24"
        fill="url(#phoneBody)"
        stroke="rgba(255,255,255,0.07)"
        stroke-width="1.5"
      />
      <rect
        x="495"
        y="108"
        width="186"
        height="310"
        rx="20"
        fill="#0c0c0c"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="0.5"
      />
      <rect
        x="498"
        y="118"
        width="180"
        height="300"
        rx="20"
        fill="url(#screenGrad)"
      />

      <rect
        x="550"
        y="102"
        width="76"
        height="14"
        rx="7"
        fill="#0e0e0e"
        stroke="rgba(255,255,255,0.03)"
        stroke-width="0.3"
      />

      <g clip-path="url(#phoneScreen)">
        <rect x="498" y="118" width="180" height="40" fill="#0e0e0e" />
        <text
          x="588"
          y="142"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-weight="600"
          font-size="9"
          fill="rgba(255,255,255,0.7)"
        >
          Ekalavya
        </text>

        <rect
          x="510"
          y="170"
          width="156"
          height="28"
          rx="8"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.04)"
          stroke-width="0.3"
        />
        <text
          x="520"
          y="188"
          font-family="system-ui, sans-serif"
          font-size="8"
          fill="rgba(255,255,255,0.3)"
        >
          🔍 Search notes...
        </text>

        <rect
          x="510"
          y="210"
          width="156"
          height="56"
          rx="8"
          fill="rgba(245,173,66,0.06)"
          stroke="rgba(245,173,66,0.2)"
          stroke-width="0.5"
          filter="url(#softGlow)"
        >
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="520" y="220" width="3" height="14" rx="1.5" fill="#f5ad42" />
        <text
          x="530"
          y="230"
          font-family="system-ui, sans-serif"
          font-weight="600"
          font-size="8"
          fill="#f5ad42"
        >
          Chapter 4: CSS Grid
        </text>
        <text
          x="530"
          y="244"
          font-family="system-ui, sans-serif"
          font-size="7"
          fill="rgba(255,255,255,0.3)"
        >
          Bookmarked ★
        </text>
        <rect
          x="600"
          y="225"
          width="52"
          height="20"
          rx="5"
          fill="rgba(245,173,66,0.15)"
        />
        <text
          x="626"
          y="239"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-weight="600"
          font-size="7"
          fill="#f5ad42"
        >
          Read
        </text>

        <rect
          x="510"
          y="274"
          width="156"
          height="40"
          rx="6"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.03)"
          stroke-width="0.3"
        />
        <text
          x="520"
          y="291"
          font-family="system-ui, sans-serif"
          font-size="7.5"
          fill="rgba(255,255,255,0.5)"
        >
          Chapter 3: Flexbox
        </text>
        <text
          x="520"
          y="303"
          font-family="system-ui, sans-serif"
          font-size="6.5"
          fill="rgba(255,255,255,0.2)"
        >
          10 min read · 2.1 MB
        </text>

        <rect
          x="510"
          y="320"
          width="156"
          height="40"
          rx="6"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.03)"
          stroke-width="0.3"
        />
        <text
          x="520"
          y="337"
          font-family="system-ui, sans-serif"
          font-size="7.5"
          fill="rgba(255,255,255,0.5)"
        >
          Chapter 2: HTML Basics
        </text>
        <text
          x="520"
          y="349"
          font-family="system-ui, sans-serif"
          font-size="6.5"
          fill="rgba(255,255,255,0.2)"
        >
          15 min read · 3.4 MB
        </text>

        <rect
          x="510"
          y="368"
          width="156"
          height="32"
          rx="6"
          fill="url(#downloadBtn)"
        >
          <animate
            attributeName="opacity"
            values="0.8;1;0.8"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </rect>
        <text
          x="588"
          y="389"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-weight="700"
          font-size="9"
          fill="#0a0a0a"
        >
          📥 Download All PDFs
        </text>
      </g>

      <rect
        x="568"
        y="420"
        width="40"
        height="3"
        rx="1.5"
        fill="rgba(255,255,255,0.1)"
      />
    </g>

    <rect
      x="600"
      y="70"
      width="100"
      height="24"
      rx="12"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.0s"
      />
    </rect>
    <text
      x="650"
      y="86"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      📱 Mobile
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.0s"
      />
    </text>

    <rect
      x="370"
      y="390"
      width="100"
      height="24"
      rx="12"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.2s"
      />
    </rect>
    <text
      x="420"
      y="406"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      📋 Tablet
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.2s"
      />
    </text>

    <rect
      x="120"
      y="280"
      width="100"
      height="24"
      rx="12"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.4s"
      />
    </rect>
    <text
      x="170"
      y="296"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      💻 Desktop
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.4s"
      />
    </text>

    <line
      x1="170"
      y1="304"
      x2="300"
      y2="340"
      stroke="rgba(245,173,66,0.08)"
      stroke-width="1"
      stroke-dasharray="4,4"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.5"
        dur="0.8s"
        fill="freeze"
        begin="1.6s"
      />
    </line>
    <line
      x1="420"
      y1="414"
      x2="500"
      y2="340"
      stroke="rgba(245,173,66,0.08)"
      stroke-width="1"
      stroke-dasharray="4,4"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.5"
        dur="0.8s"
        fill="freeze"
        begin="1.8s"
      />
    </line>
    <line
      x1="650"
      y1="94"
      x2="610"
      y2="210"
      stroke="rgba(245,173,66,0.08)"
      stroke-width="1"
      stroke-dasharray="4,4"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.5"
        dur="0.8s"
        fill="freeze"
        begin="2.0s"
      />
    </line>

    <circle cx="200" cy="320" r="2" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0"
        dur="2s"
        repeatCount="indefinite"
        begin="2.5s"
      />
    </circle>
    <circle cx="420" cy="430" r="2" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0"
        dur="2s"
        repeatCount="indefinite"
        begin="3.0s"
      />
    </circle>
    <circle cx="600" cy="200" r="2" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0"
        dur="2s"
        repeatCount="indefinite"
        begin="3.5s"
      />
    </circle>

    <rect
      x="540"
      y="440"
      width="120"
      height="28"
      rx="14"
      fill="rgba(245,173,66,0.08)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="4.0s"
      />
    </rect>
    <text
      x="600"
      y="458"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      🔖 Bookmark All
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="4.0s"
      />
    </text>

    <rect
      x="20"
      y="450"
      width="80"
      height="20"
      rx="10"
      fill="rgba(255,255,255,0.02)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.5s"
      />
    </rect>
    <text
      x="60"
      y="464"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
      opacity="0"
    >
      14 Files Synced
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.5s"
      />
    </text>

    <rect
      x="698"
      y="450"
      width="80"
      height="20"
      rx="10"
      fill="rgba(245,173,66,0.05)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.8s"
      />
    </rect>
    <text
      x="738"
      y="464"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.4)"
      opacity="0"
    >
      Auto-Sync On
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.8s"
      />
    </text>
  </svg>
);

const SvgStack = () => (
  <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="sidebarGrad4" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0d0d0d" />
        <stop offset="100%" stop-color="#111111" />
      </linearGradient>
      <linearGradient id="cardGrad4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.04)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <linearGradient id="statGrad1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(245,173,66,0.1)" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.02)" />
      </linearGradient>
      <linearGradient id="statGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(100,180,255,0.08)" />
        <stop offset="100%" stop-color="rgba(100,180,255,0.01)" />
      </linearGradient>
      <linearGradient id="statGrad3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(140,220,140,0.08)" />
        <stop offset="100%" stop-color="rgba(140,220,140,0.01)" />
      </linearGradient>
      <linearGradient id="statGrad4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(220,160,220,0.08)" />
        <stop offset="100%" stop-color="rgba(220,160,220,0.01)" />
      </linearGradient>
      <filter id="glow4">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="cardShadow4">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="12"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="softShadow4">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="6"
          flood-color="#000"
          flood-opacity="0.3"
        />
      </filter>
    </defs>

    <rect width="800" height="500" rx="16" fill="url(#bgGrad4)" />

    <rect
      x="0"
      y="0"
      width="200"
      height="500"
      rx="16"
      fill="url(#sidebarGrad4)"
      stroke="rgba(255,255,255,0.05)"
      stroke-width="1"
    />
    <rect
      x="0"
      y="0"
      width="200"
      height="500"
      rx="16"
      fill="url(#statGrad1)"
      opacity="0.15"
    />

    <text
      x="20"
      y="30"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="14"
      fill="rgba(255,255,255,0.9)"
    >
      Ekalavya
    </text>
    <text
      x="20"
      y="44"
      font-family="system-ui, sans-serif"
      font-weight="400"
      font-size="8"
      fill="rgba(245,173,66,0.5)"
    >
      ADMIN DASHBOARD
    </text>
    <line
      x1="20"
      y1="56"
      x2="180"
      y2="56"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="1"
    />

    <rect
      x="10"
      y="68"
      width="180"
      height="32"
      rx="6"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
    />
    <circle cx="30" cy="84" r="4" fill="rgba(245,173,66,0.5)" />
    <text
      x="42"
      y="88"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(245,173,66,0.9)"
    >
      Dashboard
    </text>

    <rect
      x="10"
      y="106"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <circle cx="30" cy="120" r="3" fill="rgba(255,255,255,0.15)" />
    <text
      x="42"
      y="124"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.45)"
    >
      Universities
    </text>

    <rect
      x="10"
      y="140"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <circle cx="30" cy="154" r="3" fill="rgba(255,255,255,0.15)" />
    <text
      x="42"
      y="158"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.45)"
    >
      Courses
    </text>

    <rect
      x="10"
      y="174"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <circle cx="30" cy="188" r="3" fill="rgba(255,255,255,0.15)" />
    <text
      x="42"
      y="192"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.45)"
    >
      Faculty
    </text>

    <rect
      x="10"
      y="208"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <circle cx="30" cy="222" r="3" fill="rgba(255,255,255,0.15)" />
    <text
      x="42"
      y="226"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.45)"
    >
      Students
    </text>

    <line
      x1="20"
      y1="250"
      x2="180"
      y2="250"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="1"
    />

    <text
      x="20"
      y="270"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="rgba(255,255,255,0.25)"
      letter-spacing="1"
    >
      SYSTEM
    </text>

    <rect
      x="10"
      y="280"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <text
      x="30"
      y="298"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.4)"
    >
      Permissions
    </text>

    <rect
      x="10"
      y="314"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <text
      x="30"
      y="332"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.4)"
    >
      Audit Logs
    </text>

    <rect
      x="10"
      y="348"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <text
      x="30"
      y="366"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.4)"
    >
      Settings
    </text>

    <rect
      x="10"
      y="460"
      width="180"
      height="28"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <circle cx="30" cy="474" r="10" fill="rgba(245,173,66,0.2)" />
    <text
      x="30"
      y="478"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="#f5ad42"
    >
      AD
    </text>
    <text
      x="48"
      y="474"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Admin User
    </text>
    <text
      x="48"
      y="485"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.2)"
    >
      Super Admin
    </text>

    <rect
      x="220"
      y="14"
      width="240"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.06)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.3s"
      />
    </rect>
    <text
      x="240"
      y="30"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="11"
      fill="rgba(245,173,66,0.7)"
      opacity="0"
    >
      ADMINISTRATOR DASHBOARD
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.3s"
      />
    </text>

    <rect
      x="680"
      y="14"
      width="100"
      height="24"
      rx="12"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </rect>
    <text
      x="730"
      y="30"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      🔒 Secure Access
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </text>

    <rect
      x="220"
      y="50"
      width="170"
      height="90"
      rx="12"
      fill="url(#statGrad1)"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="0.5"
      filter="url(#softShadow4)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.6s"
      />
    </rect>
    <text
      x="240"
      y="72"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.45)"
    >
      🏛 Universities
    </text>
    <text
      x="240"
      y="108"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="26"
      fill="#f5ad42"
      opacity="0"
    >
      8
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.8s"
      />
    </text>
    <text
      x="240"
      y="126"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(245,173,66,0.4)"
    >
      3 Active · 5 Total
    </text>

    <rect
      x="400"
      y="50"
      width="170"
      height="90"
      rx="12"
      fill="url(#statGrad2)"
      stroke="rgba(100,180,255,0.12)"
      stroke-width="0.5"
      filter="url(#softShadow4)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.8s"
      />
    </rect>
    <text
      x="420"
      y="72"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.45)"
    >
      📚 Courses
    </text>
    <text
      x="420"
      y="108"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="26"
      fill="#88bbff"
      opacity="0"
    >
      24
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.0s"
      />
    </text>
    <text
      x="420"
      y="126"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(100,180,255,0.35)"
    >
      Across all universities
    </text>

    <rect
      x="580"
      y="50"
      width="200"
      height="90"
      rx="12"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#softShadow4)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.0s"
      />
    </rect>
    <text
      x="600"
      y="72"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.4)"
    >
      Last Backup
    </text>
    <text
      x="600"
      y="108"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="14"
      fill="rgba(255,255,255,0.5)"
    >
      2 hours ago
    </text>
    <rect
      x="600"
      y="118"
      width="160"
      height="6"
      rx="3"
      fill="rgba(255,255,255,0.03)"
    />
    <rect
      x="600"
      y="118"
      width="155"
      height="6"
      rx="3"
      fill="rgba(140,220,140,0.3)"
    />
    <text
      x="600"
      y="134"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.4)"
    >
      System Healthy ✓
    </text>

    <rect
      x="220"
      y="154"
      width="560"
      height="330"
      rx="14"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#cardShadow4)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="1.2s"
      />
    </rect>

    <text
      x="240"
      y="178"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="11"
      fill="rgba(255,255,255,0.6)"
    >
      University Management
    </text>

    <rect
      x="240"
      y="190"
      width="520"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
    />
    <rect
      x="255"
      y="202"
      width="30"
      height="20"
      rx="4"
      fill="rgba(245,173,66,0.15)"
    />
    <text
      x="270"
      y="216"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
    >
      VTU
    </text>
    <text
      x="300"
      y="215"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Visvesvaraya Technological University
    </text>
    <rect
      x="560"
      y="200"
      width="50"
      height="16"
      rx="5"
      fill="rgba(140,220,140,0.1)"
    />
    <text
      x="585"
      y="212"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.6)"
    >
      Active
    </text>
    <text
      x="640"
      y="215"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      12 Courses
    </text>
    <text
      x="710"
      y="215"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.2)"
    >
      3400 Students
    </text>

    <rect
      x="240"
      y="240"
      width="520"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.01)"
      stroke="rgba(255,255,255,0.02)"
      stroke-width="0.3"
    />
    <rect
      x="255"
      y="252"
      width="30"
      height="20"
      rx="4"
      fill="rgba(245,173,66,0.12)"
    />
    <text
      x="270"
      y="266"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
    >
      BU
    </text>
    <text
      x="300"
      y="265"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Bengaluru University
    </text>
    <rect
      x="560"
      y="250"
      width="50"
      height="16"
      rx="5"
      fill="rgba(140,220,140,0.1)"
    />
    <text
      x="585"
      y="262"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.6)"
    >
      Active
    </text>
    <text
      x="640"
      y="265"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      6 Courses
    </text>
    <text
      x="710"
      y="265"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.2)"
    >
      2100 Students
    </text>

    <rect
      x="240"
      y="290"
      width="520"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.01)"
      stroke="rgba(255,255,255,0.02)"
      stroke-width="0.3"
    />
    <rect
      x="255"
      y="302"
      width="30"
      height="20"
      rx="4"
      fill="rgba(245,173,66,0.1)"
    />
    <text
      x="270"
      y="316"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
    >
      RCU
    </text>
    <text
      x="300"
      y="315"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.5)"
    >
      Rani Channamma University
    </text>
    <rect
      x="560"
      y="300"
      width="50"
      height="16"
      rx="5"
      fill="rgba(140,220,140,0.1)"
    />
    <text
      x="585"
      y="312"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.6)"
    >
      Active
    </text>
    <text
      x="640"
      y="315"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      4 Courses
    </text>
    <text
      x="710"
      y="315"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.2)"
    >
      1200 Students
    </text>

    <rect
      x="240"
      y="340"
      width="520"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.01)"
      stroke="rgba(255,255,255,0.02)"
      stroke-width="0.3"
    />
    <rect
      x="255"
      y="352"
      width="30"
      height="20"
      rx="4"
      fill="rgba(255,255,255,0.04)"
    />
    <text
      x="270"
      y="366"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="rgba(255,255,255,0.3)"
    >
      KSOU
    </text>
    <text
      x="300"
      y="365"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.45)"
    >
      Karnataka State Open University
    </text>
    <rect
      x="560"
      y="350"
      width="50"
      height="16"
      rx="5"
      fill="rgba(255,255,255,0.03)"
    />
    <text
      x="585"
      y="362"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.25)"
    >
      Pending
    </text>
    <text
      x="640"
      y="365"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.25)"
    >
      2 Courses
    </text>
    <text
      x="710"
      y="365"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.15)"
    >
      800 Students
    </text>

    <rect
      x="240"
      y="396"
      width="520"
      height="1"
      fill="rgba(255,255,255,0.03)"
    />

    <rect
      x="240"
      y="408"
      width="250"
      height="60"
      rx="10"
      fill="url(#statGrad3)"
      stroke="rgba(140,220,140,0.1)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.5s"
      />
    </rect>
    <text
      x="260"
      y="428"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      👨‍🏫 Faculty Members
    </text>
    <text
      x="260"
      y="452"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="20"
      fill="rgba(140,220,140,0.8)"
    >
      86
    </text>
    <text
      x="390"
      y="448"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(140,220,140,0.4)"
    >
      Active: 78
    </text>
    <text
      x="390"
      y="459"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(140,220,140,0.3)"
    >
      Pending: 8
    </text>

    <rect
      x="500"
      y="408"
      width="260"
      height="60"
      rx="10"
      fill="url(#statGrad4)"
      stroke="rgba(220,160,220,0.1)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.7s"
      />
    </rect>
    <text
      x="520"
      y="428"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      🎓 Student Registrations
    </text>
    <text
      x="520"
      y="452"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="20"
      fill="rgba(220,160,220,0.8)"
    >
      7,500
    </text>
    <text
      x="650"
      y="448"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(220,160,220,0.4)"
    >
      This Semester: 2,100
    </text>
    <text
      x="650"
      y="459"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(220,160,220,0.3)"
    >
      Growth: +18%
    </text>

    <rect
      x="700"
      y="380"
      width="70"
      height="26"
      rx="8"
      fill="rgba(245,173,66,0.12)"
      stroke="rgba(245,173,66,0.25)"
      stroke-width="0.5"
      filter="url(#glow4)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.0s"
      />
      <animate
        attributeName="opacity"
        values="0.6;1;0.6"
        dur="2s"
        repeatCount="indefinite"
        begin="2.0s"
      />
    </rect>
    <text
      x="735"
      y="397"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
    >
      + Add New
    </text>

    <circle cx="560" cy="320" r="3" fill="#f5ad42" opacity="0.6">
      <animate
        attributeName="opacity"
        values="0.6;0.2;0.6"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="630" cy="320" r="3" fill="rgba(255,255,255,0.1)" opacity="0.4">
      <animate
        attributeName="opacity"
        values="0.4;0.1;0.4"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="700" cy="320" r="3" fill="rgba(255,255,255,0.1)" opacity="0.4">
      <animate
        attributeName="opacity"
        values="0.4;0.1;0.4"
        dur="2.2s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const efficient = () => (
  <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad5" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(245,173,66,0.08)" />
        <stop offset="50%" stop-color="rgba(245,173,66,0.02)" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.04)" />
      </linearGradient>
      <linearGradient id="serverGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1a1a" />
        <stop offset="100%" stop-color="#111111" />
      </linearGradient>
      <linearGradient id="dbGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#151515" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(140,220,140,0.1)" />
        <stop offset="100%" stop-color="rgba(140,220,140,0.02)" />
      </linearGradient>
      <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(245,173,66,0.1)" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.02)" />
      </linearGradient>
      <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(100,180,255,0.08)" />
        <stop offset="100%" stop-color="rgba(100,180,255,0.01)" />
      </linearGradient>
      <filter id="glow5">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glowStrong">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="cardShadow5">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="12"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="softShadow5">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="6"
          flood-color="#000"
          flood-opacity="0.3"
        />
      </filter>
      <filter id="serverGlow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <rect width="800" height="500" rx="16" fill="url(#bgGrad5)" />

    <rect
      x="20"
      y="18"
      width="300"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.06)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.3s"
      />
    </rect>
    <text
      x="40"
      y="34"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="11"
      fill="rgba(245,173,66,0.7)"
      opacity="0"
    >
      TECHNOLOGY STACK & ARCHITECTURE
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.3s"
      />
    </text>

    <rect
      x="620"
      y="14"
      width="160"
      height="28"
      rx="14"
      fill="rgba(140,220,140,0.08)"
      stroke="rgba(140,220,140,0.15)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </rect>
    <rect x="628" y="20" width="8" height="8" rx="4" fill="#8cdc8c">
      <animate
        attributeName="opacity"
        values="1;0.3;1"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </rect>
    <text
      x="644"
      y="28"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="rgba(140,220,140,0.7)"
      opacity="0"
    >
      All Systems Operational
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </text>

    <rect
      x="230"
      y="55"
      width="340"
      height="430"
      rx="16"
      fill="url(#heroGrad)"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="1"
      filter="url(#cardShadow5)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.6s"
      />
    </rect>

    <rect
      x="260"
      y="74"
      width="280"
      height="28"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
    />
    <text
      x="400"
      y="92"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Application Architecture
    </text>

    <rect
      x="260"
      y="115"
      width="60"
      height="32"
      rx="8"
      fill="rgba(97,218,251,0.12)"
      stroke="rgba(97,218,251,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.9s"
      />
    </rect>
    <text
      x="290"
      y="135"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#61dafb"
      opacity="0"
    >
      React
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.9s"
      />
    </text>
    <text
      x="290"
      y="145"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(97,218,251,0.5)"
      opacity="0"
    >
      Frontend
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.9s"
      />
    </text>

    <line
      x1="325"
      y1="131"
      x2="370"
      y2="131"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="1"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.1s"
      />
    </line>
    <circle cx="347" cy="131" r="2" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0"
        dur="2s"
        repeatCount="indefinite"
        begin="1.2s"
      />
    </circle>

    <rect
      x="370"
      y="115"
      width="70"
      height="32"
      rx="8"
      fill="rgba(140,200,75,0.12)"
      stroke="rgba(140,200,75,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.1s"
      />
    </rect>
    <text
      x="405"
      y="135"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#8cc84b"
      opacity="0"
    >
      Node.js
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.1s"
      />
    </text>
    <text
      x="405"
      y="145"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(140,200,75,0.5)"
      opacity="0"
    >
      Runtime
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.1s"
      />
    </text>

    <line
      x1="445"
      y1="131"
      x2="490"
      y2="131"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="1"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.3s"
      />
    </line>
    <circle cx="467" cy="131" r="2" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0"
        dur="2s"
        repeatCount="indefinite"
        begin="1.4s"
      />
    </circle>

    <rect
      x="490"
      y="115"
      width="70"
      height="32"
      rx="8"
      fill="rgba(255,255,255,0.06)"
      stroke="rgba(255,255,255,0.1)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.3s"
      />
    </rect>
    <text
      x="525"
      y="135"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="rgba(255,255,255,0.7)"
      opacity="0"
    >
      Express
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.3s"
      />
    </text>
    <text
      x="525"
      y="145"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(255,255,255,0.35)"
      opacity="0"
    >
      API
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.3s"
      />
    </text>

    <rect
      x="260"
      y="162"
      width="300"
      height="28"
      rx="6"
      fill="rgba(245,173,66,0.04)"
      stroke="rgba(245,173,66,0.12)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.5s"
      />
    </rect>
    <text
      x="280"
      y="180"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="rgba(255,255,255,0.5)"
    >
      REST API Layer
    </text>
    <text
      x="440"
      y="180"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.4)"
    >
      JWT Auth Middleware
    </text>

    <line
      x1="410"
      y1="195"
      x2="410"
      y2="220"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="1"
      stroke-dasharray="3,3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.7s"
      />
    </line>
    <line
      x1="330"
      y1="195"
      x2="330"
      y2="220"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="1"
      stroke-dasharray="3,3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.7s"
      />
    </line>
    <line
      x1="490"
      y1="195"
      x2="490"
      y2="220"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="1"
      stroke-dasharray="3,3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.7s"
      />
    </line>

    <rect
      x="280"
      y="222"
      width="80"
      height="36"
      rx="8"
      fill="rgba(77,171,77,0.12)"
      stroke="rgba(77,171,77,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.8s"
      />
    </rect>
    <text
      x="320"
      y="244"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="9"
      fill="#4dab4d"
      opacity="0"
    >
      MongoDB
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.8s"
      />
    </text>
    <text
      x="320"
      y="254"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(77,171,77,0.5)"
      opacity="0"
    >
      Atlas
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.8s"
      />
    </text>

    <rect
      x="375"
      y="222"
      width="70"
      height="36"
      rx="8"
      fill="rgba(100,180,255,0.1)"
      stroke="rgba(100,180,255,0.18)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.0s"
      />
    </rect>
    <text
      x="410"
      y="244"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="9"
      fill="#88bbff"
      opacity="0"
    >
      Cloudinary
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.0s"
      />
    </text>
    <text
      x="410"
      y="254"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(100,180,255,0.4)"
      opacity="0"
    >
      Media
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.0s"
      />
    </text>

    <rect
      x="460"
      y="222"
      width="80"
      height="36"
      rx="8"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.2s"
      />
    </rect>
    <text
      x="500"
      y="244"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="9"
      fill="#f5ad42"
      opacity="0"
    >
      JWT
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.2s"
      />
    </text>
    <text
      x="500"
      y="254"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(245,173,66,0.5)"
      opacity="0"
    >
      Auth
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.2s"
      />
    </text>

    <rect
      x="260"
      y="275"
      width="280"
      height="50"
      rx="10"
      fill="url(#shieldGrad)"
      stroke="rgba(140,220,140,0.12)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.4s"
      />
    </rect>
    <circle
      cx="285"
      cy="300"
      r="14"
      fill="none"
      stroke="rgba(140,220,140,0.3)"
      stroke-width="2"
    >
      <animate
        attributeName="r"
        values="14;16;14"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <text
      x="285"
      y="304"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="12"
      fill="rgba(140,220,140,0.6)"
    >
      🔒
    </text>
    <text
      x="308"
      y="295"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(140,220,140,0.7)"
    >
      Secure HTTPS + JWT Tokens
    </text>
    <text
      x="308"
      y="310"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.4)"
    >
      Role-based access · Encrypted data · Secure sessions
    </text>

    <rect
      x="260"
      y="338"
      width="132"
      height="80"
      rx="10"
      fill="url(#speedGrad)"
      stroke="rgba(245,173,66,0.12)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.6s"
      />
    </rect>
    <text
      x="280"
      y="360"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(245,173,66,0.7)"
    >
      ⚡ Response Time
    </text>
    <text
      x="280"
      y="390"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="22"
      fill="#f5ad42"
    >
      180ms
    </text>
    <text
      x="360"
      y="388"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(245,173,66,0.4)"
    >
      avg
    </text>
    <text
      x="280"
      y="405"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.3)"
    >
      P99: 320ms
    </text>

    <rect
      x="406"
      y="338"
      width="134"
      height="80"
      rx="10"
      fill="url(#cloudGrad)"
      stroke="rgba(100,180,255,0.12)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.8s"
      />
    </rect>
    <text
      x="426"
      y="360"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(100,180,255,0.7)"
    >
      ☁️ Uptime
    </text>
    <text
      x="426"
      y="390"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="22"
      fill="#88bbff"
    >
      99.9%
    </text>
    <text
      x="426"
      y="405"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(100,180,255,0.3)"
    >
      Last 30 days
    </text>

    <rect
      x="260"
      y="432"
      width="280"
      height="34"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="3.0s"
      />
    </rect>
    <text
      x="280"
      y="453"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.35)"
    >
      🔧 Optimized CDN Delivery
    </text>
    <text
      x="450"
      y="453"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.5)"
    >
      Cache Hit: 94%
    </text>

    <rect
      x="590"
      y="55"
      width="190"
      height="200"
      rx="14"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#cardShadow5)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.8s"
      />
    </rect>

    <text
      x="610"
      y="78"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="10"
      fill="rgba(255,255,255,0.5)"
    >
      Server Health
    </text>

    <rect
      x="610"
      y="90"
      width="150"
      height="18"
      rx="4"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="620"
      y="103"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      CPU Usage
    </text>
    <rect
      x="620"
      y="108"
      width="120"
      height="4"
      rx="2"
      fill="rgba(255,255,255,0.03)"
    />
    <rect x="620" y="108" width="42" height="4" rx="2" fill="#8cdc8c">
      <animate
        attributeName="width"
        values="0;42"
        dur="1.2s"
        fill="freeze"
        begin="1.5s"
      />
    </rect>
    <text
      x="748"
      y="112"
      text-anchor="end"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(140,220,140,0.5)"
    >
      23%
    </text>

    <rect
      x="610"
      y="120"
      width="150"
      height="18"
      rx="4"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="620"
      y="133"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      Memory
    </text>
    <rect
      x="620"
      y="138"
      width="120"
      height="4"
      rx="2"
      fill="rgba(255,255,255,0.03)"
    />
    <rect x="620" y="138" width="68" height="4" rx="2" fill="#f5ad42">
      <animate
        attributeName="width"
        values="0;68"
        dur="1.0s"
        fill="freeze"
        begin="1.7s"
      />
    </rect>
    <text
      x="748"
      y="142"
      text-anchor="end"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(245,173,66,0.5)"
    >
      45%
    </text>

    <rect
      x="610"
      y="150"
      width="150"
      height="18"
      rx="4"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="620"
      y="163"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      Disk I/O
    </text>
    <rect
      x="620"
      y="168"
      width="120"
      height="4"
      rx="2"
      fill="rgba(255,255,255,0.03)"
    />
    <rect x="620" y="168" width="30" height="4" rx="2" fill="#88bbff">
      <animate
        attributeName="width"
        values="0;30"
        dur="0.9s"
        fill="freeze"
        begin="1.9s"
      />
    </rect>
    <text
      x="748"
      y="172"
      text-anchor="end"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(100,180,255,0.5)"
    >
      12%
    </text>

    <rect
      x="610"
      y="180"
      width="150"
      height="18"
      rx="4"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="620"
      y="193"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      Network
    </text>
    <rect
      x="620"
      y="198"
      width="120"
      height="4"
      rx="2"
      fill="rgba(255,255,255,0.03)"
    />
    <rect x="620" y="198" width="52" height="4" rx="2" fill="#8cdc8c">
      <animate
        attributeName="width"
        values="0;52"
        dur="1.1s"
        fill="freeze"
        begin="2.1s"
      />
    </rect>
    <text
      x="748"
      y="202"
      text-anchor="end"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(140,220,140,0.5)"
    >
      31%
    </text>

    <rect
      x="610"
      y="212"
      width="150"
      height="1"
      fill="rgba(255,255,255,0.04)"
    />

    <rect
      x="610"
      y="220"
      width="70"
      height="22"
      rx="6"
      fill="rgba(140,220,140,0.08)"
      stroke="rgba(140,220,140,0.12)"
      stroke-width="0.3"
    />
    <text
      x="645"
      y="235"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.6)"
    >
      Active Nodes: 3
    </text>

    <rect
      x="590"
      y="265"
      width="190"
      height="220"
      rx="14"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#cardShadow5)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="1.0s"
      />
    </rect>

    <text
      x="610"
      y="288"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="10"
      fill="rgba(255,255,255,0.5)"
    >
      Request Log
    </text>

    <rect
      x="610"
      y="300"
      width="150"
      height="22"
      rx="4"
      fill="rgba(140,220,140,0.04)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.0s"
      />
    </rect>
    <text
      x="620"
      y="314"
      font-family="monospace"
      font-size="7"
      fill="rgba(140,220,140,0.5)"
    >
      GET /api/notes
    </text>
    <text
      x="740"
      y="314"
      font-family="monospace"
      font-size="6"
      fill="rgba(140,220,140,0.4)"
    >
      200
    </text>

    <rect
      x="610"
      y="326"
      width="150"
      height="22"
      rx="4"
      fill="rgba(255,255,255,0.01)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.3s"
      />
    </rect>
    <text
      x="620"
      y="340"
      font-family="monospace"
      font-size="7"
      fill="rgba(100,180,255,0.5)"
    >
      POST /api/auth
    </text>
    <text
      x="740"
      y="340"
      font-family="monospace"
      font-size="6"
      fill="rgba(100,180,255,0.4)"
    >
      201
    </text>

    <rect
      x="610"
      y="350"
      width="150"
      height="22"
      rx="4"
      fill="rgba(255,255,255,0.01)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.6s"
      />
    </rect>
    <text
      x="620"
      y="364"
      font-family="monospace"
      font-size="7"
      fill="rgba(255,255,255,0.4)"
    >
      GET /api/pdf
    </text>
    <text
      x="740"
      y="364"
      font-family="monospace"
      font-size="6"
      fill="rgba(140,220,140,0.4)"
    >
      200
    </text>

    <rect
      x="610"
      y="374"
      width="150"
      height="22"
      rx="4"
      fill="rgba(255,255,255,0.01)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.9s"
      />
    </rect>
    <text
      x="620"
      y="388"
      font-family="monospace"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      PUT /api/notes
    </text>
    <text
      x="740"
      y="388"
      font-family="monospace"
      font-size="6"
      fill="rgba(245,173,66,0.4)"
    >
      200
    </text>

    <rect
      x="610"
      y="400"
      width="150"
      height="1"
      fill="rgba(255,255,255,0.03)"
    />

    <rect
      x="610"
      y="410"
      width="150"
      height="28"
      rx="6"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.02)"
      stroke-width="0.3"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="3.2s"
      />
    </rect>
    <text
      x="625"
      y="428"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Total Requests Today
    </text>
    <text
      x="735"
      y="428"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="9"
      fill="#f5ad42"
    >
      12,847
    </text>

    <rect
      x="20"
      y="440"
      width="190"
      height="42"
      rx="10"
      fill="rgba(245,173,66,0.04)"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.0s"
      />
    </rect>
    <text
      x="115"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="9"
      fill="#f5ad42"
    >
      View Full Documentation →
    </text>

    <circle cx="320" cy="110" r="1.5" fill="#61dafb" opacity="0.6">
      <animate
        attributeName="opacity"
        values="0.6;0;0.6"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="400" cy="110" r="1.5" fill="#8cc84b" opacity="0.6">
      <animate
        attributeName="opacity"
        values="0;0.6;0"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle
      cx="520"
      cy="110"
      r="1.5"
      fill="rgba(255,255,255,0.4)"
      opacity="0.5"
    >
      <animate
        attributeName="opacity"
        values="0.5;0;0.5"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
/* ─────────────────────────────────────────────
   PANEL DATA
───────────────────────────────────────────── */
const PANELS = [
  {
    eyebrow: "University Ecosystem",
    lines: ["One hub.", "Every campus.", "Connected."],
    italic: [false, true, false],
    tags: [
      "Multi University",
      "Course Management",
      "Semester Wise",
      "Academic Structure",
    ],
    Visual: SvgHierarchy,
  },

  {
    eyebrow: "Faculty Workspace",
    lines: ["Create.", "Teach better.", "Publish."],
    italic: [false, true, false],
    tags: [
      "Rich Text",
      "Chapter Wise",
      "Media Upload",
      "Cloudinary",
      "Code Blocks",
    ],
    Visual: SvgEditor,
  },

  {
    eyebrow: "Student Learning",
    lines: ["Learn anywhere.", "Any device.", "Anytime."],
    italic: [false, true, false],
    tags: [
      "Mobile Friendly",
      "Offline PDF",
      "Bookmarks",
      "Question Papers",
      "Assignments",
    ],
    Visual: SvgStudent,
  },

  {
    eyebrow: "Academic Intelligence",
    lines: ["Track progress.", "Stay prepared.", "Excel."],
    italic: [false, true, false],
    tags: [
      "Progress Tracking",
      "Exam Preparation",
      "Notifications",
      "Academic Calendar",
    ],
    Visual: SvgNotes,
  },

  {
    eyebrow: "Administration",
    lines: ["Manage.", "Empower.", "Support."],
    italic: [false, true, false],
    tags: [
      "Admin Dashboard",
      "Role Based Access",
      "Faculty Management",
      "Student Management",
    ],
    Visual: SvgStack,
  },

  {
    eyebrow: "Modern Technology",
    lines: ["Fast.", "Secure.", "Scalable."],
    italic: [false, true, false],
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "JWT",
      "Cloudinary",
      "REST API",
    ],
    Visual: efficient,
  },
];

const MARQUEE_ITEMS = [
  "Chapter Wise Notes",
  "University Based Learning",
  "Faculty Dashboard",
  "Student Portal",
  "Assignments",
  "Question Papers",
  "Rich Text Notes",
  "Cloud Storage",
  "Mobile Learning",
  "Attendance",
  "Exam Preparation",
  "Progress Tracking",
  "Role Based Access",
  "Secure Authentication",
  "Learning Without Limits",
];

/* ─────────────────────────────────────────────
   LERP UTILITY
───────────────────────────────────────────── */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function EkalavyaHScroll() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const fillRef = useRef(null);
  const panelRefs = useRef([]);
  const lenisRef = useRef({ current: 0, target: 0, raf: null });
  const activeRef = useRef(-1);
  const [counterText, setCounterText] = useState("01 / 05");

  /* inject CSS once */
  useEffect(() => {
    const id = "ek-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = CSS;
      document.head.appendChild(el);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  /* Lenis-style smooth scroll → horizontal map */
  const onScroll = useCallback((scrollY) => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const prog = progressRef.current;
    const fill = fillRef.current;
    if (!wrapper || !track) return;

    const rect = wrapper.getBoundingClientRect();
    const wrapperTop = scrollY + rect.top;
    const wrapperH = wrapper.offsetHeight;
    const viewH = window.innerHeight;
    const scrolledIn = scrollY - wrapperTop;
    const totalScroll = wrapperH - viewH;
    const t = Math.max(0, Math.min(1, scrolledIn / totalScroll));

    /* horizontal shift */
    const numPanels = PANELS.length;
    const maxShift = (numPanels - 1) * window.innerWidth;
    track.style.transform = `translateX(-${t * maxShift}px)`;

    /* progress bar */
    if (prog) prog.style.width = `${t * 100}%`;

    /* counter fill */
    if (fill) fill.style.width = `${t * 100}%`;

    /* active panel */
    const idx = Math.min(numPanels - 1, Math.round(t * (numPanels - 1)));
    if (idx !== activeRef.current) {
      if (activeRef.current >= 0 && panelRefs.current[activeRef.current]) {
        panelRefs.current[activeRef.current].classList.remove("is-active");
      }
      if (panelRefs.current[idx]) {
        panelRefs.current[idx].classList.add("is-active");
      }
      activeRef.current = idx;
      setCounterText(`0${idx + 1} / 0${numPanels}`);
    }
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;

    function tick() {
      lenis.target = window.scrollY;
      lenis.current = lerp(lenis.current, lenis.target, 0.09);
      if (Math.abs(lenis.current - lenis.target) < 0.05)
        lenis.current = lenis.target;
      onScroll(lenis.current);
      lenis.raf = requestAnimationFrame(tick);
    }

    lenis.current = window.scrollY;
    lenis.target = window.scrollY;
    lenis.raf = requestAnimationFrame(tick);

    /* activate first panel */
    setTimeout(() => {
      if (panelRefs.current[0]) panelRefs.current[0].classList.add("is-active");
      activeRef.current = 0;
    }, 200);

    /* keyboard nav */
    const handleKey = (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = Math.max(
        0,
        Math.min(PANELS.length - 1, activeRef.current + dir),
      );
      const wTop = window.scrollY + wrapper.getBoundingClientRect().top;
      const totalScroll = wrapper.offsetHeight - window.innerHeight;
      const target = wTop + (next / (PANELS.length - 1)) * totalScroll;
      window.scrollTo({ top: target, behavior: "smooth" });
    };
    window.addEventListener("keydown", handleKey);

    /* reveal-on-scroll for non-panel sections */
    const reveals = document.querySelectorAll(".ek-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 },
    );
    reveals.forEach((el) => io.observe(el));

    return () => {
      cancelAnimationFrame(lenis.raf);
      window.removeEventListener("keydown", handleKey);
      io.disconnect();
    };
  }, [onScroll]);

  /* scroll space: 5 panels = 500vh total, sticky is 100vh, so wrapper = 500vh */
  const WRAPPER_HEIGHT = `${PANELS.length * 100}vh`;

  return (
    <div style={{ background: "#0a0a0a", color: "#fff" }}>
      {/* ── INTRO ── */}
      <section className="ek-intro">
        <div
          className="ek-intro-arrow ek-reveal"
          style={{ transitionDelay: "0.4s", marginTop: "300px" }}
        >
          <svg width="18" height="30" viewBox="0 0 18 30" fill="none">
            <line
              x1="9"
              y1="0"
              x2="9"
              y2="26"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
            />
            <polyline
              points="3,20 9,28 15,20"
              stroke="#f5ad42"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <span>Scroll to explore features</span>
        </div>
      </section>

      {/* ── HORIZONTAL SCROLLER ── */}
      <div
        className="ek-hscroll-wrapper"
        ref={wrapperRef}
        style={{ height: WRAPPER_HEIGHT }}
      >
        <div className="ek-hscroll-sticky">
          {/* progress */}
          <div className="ek-progress" ref={progressRef} />

          {/* panel counter */}
          <div className="ek-panel-counter">
            <span>{counterText}</span>
            <div className="ek-panel-counter-bar">
              <div className="ek-panel-counter-fill" ref={fillRef} />
            </div>
          </div>

          {/* track */}
          <div className="ek-track" ref={trackRef}>
            {PANELS.map((panel, i) => {
              const { eyebrow, lines, italic, desc, tags, Visual } = panel;
              return (
                <div
                  key={i}
                  className="ek-panel"
                  ref={(el) => (panelRefs.current[i] = el)}
                >
                  <div className="ek-panel-inner">
                    {/* text */}
                    <div className="ek-panel-text">
                      <div className="ek-eyebrow">{eyebrow}</div>
                      <h3 className="ek-panel-h2">
                        {lines.map((line, j) => (
                          <span className="ek-h2-line" key={j}>
                            {italic[j] ? <em>{line}</em> : line}
                          </span>
                        ))}
                      </h3>
                      <p className="ek-panel-desc">{desc}</p>
                      <div className="ek-panel-tags">
                        {tags.map((t) => (
                          <span className="ek-tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* visual */}
                    <div className="ek-panel-visual">
                      <Visual />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div className="ek-marquee" aria-hidden="true">
        <div className="ek-marquee-inner">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div className="ek-marquee-item" key={i}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── OUTRO ── */}
      <section className="ek-outro">
        <div className="ek-outro-glow" />
        <h2 className="ek-outro-h2 ek-reveal">
          The notes you need.
          <br />
          <span>Already here.</span>
        </h2>
        <p
          className="ek-outro-sub ek-reveal"
          style={{ transitionDelay: "0.15s" }}
        >
          Join thousands of students and faculty across Karnataka who are
          building a better learning experience together.
        </p>
      </section>
    </div>
  );
}