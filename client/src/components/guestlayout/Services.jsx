import { useEffect, useRef } from "react";
import gsap from "gsap";

const services = [
  {
    id: 1,
    title: "University-Wise Learning",
    subtitle: "Notes tailored for your university",
    image:
      "./college1.png",
    color: "#4F46E5",
    marqueeA: "UNIVERSITY SPECIFIC · SMART LEARNING ·",
    marqueeB: "All Universities · One Platform ·",
  },
  {
    id: 2,
    title: "Chapter Wise Notes",
    subtitle: "Understand one concept at a time",
    image:
      "./college2.png",
    color: "#06B6D4",
    marqueeA: "CHAPTER NOTES · EASY LEARNING ·",
    marqueeB: "Learn Better · Study Faster ·",
  },
  {
    id: 3,
    title: "Semester & Subject Materials",
    subtitle: "Complete syllabus in one place",
    image:
      "./college3.png",
    color: "#22C55E",
    marqueeA: "EVERY SUBJECT · EVERY SEMESTER ·",
    marqueeB: "Complete Coverage · Better Results ·",
  },
  {
    id: 4,
    title: "Faculty Verified Content",
    subtitle: "Prepared and reviewed by educators",
    image:
      "./college5.png",
    color: "#F97316",
    marqueeA: "TRUSTED NOTES · FACULTY VERIFIED ·",
    marqueeB: "Quality Learning · Expert Guidance ·",
  },
  {
    id: 5,
    title: "Previous Year Question Papers",
    subtitle: "Practice with real exam papers",
    image:
      "./college5.png",
    color: "#EC4899",
    marqueeA: "EXAM READY · PRACTICE MORE ·",
    marqueeB: "Previous Papers · Higher Scores ·",
  },
  {
    id: 6,
    title: "Education for Every Student",
    subtitle: "Bridging the gap between rural talent and quality education",
    image:
      "./school2.jpg",
    color: "#EAB308",
    marqueeA: "NO STUDENT LEFT BEHIND · DIGITAL EDUCATION ·",
    marqueeB: "Rural Students · Equal Opportunities ·",
  },
];

const REPS = 3;
const SET = services.length;
const allItems = Array.from({ length: REPS }, () => services).flat();

export default function Services() {
  const containerRef = useRef(null);
  const imgRefs = useRef([]);
  const mqScaleRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const vh = window.innerHeight;
    const singleSetHeight = SET * 2 * vh;

    container.scrollTop = singleSetHeight;

    const onScroll = () => {
      const scrollTop = container.scrollTop;

      if (scrollTop >= singleSetHeight * 2) {
        container.scrollTop = singleSetHeight;
        return;
      }
      if (scrollTop <= 0) {
        container.scrollTop = singleSetHeight;
        return;
      }

      imgRefs.current.forEach((img, i) => {
        if (!img) return;

        const panelTop = i * 2 * vh;
        const rel = scrollTop - panelTop;

        const progress = (rel + vh) / (vh * 2);
        const centered = Math.max(0, 1 - Math.abs(progress - 0.5) * 2);

        const scale = 1 + centered * 0.18;          // 1 -> 1.18
        const saturation = 0.1 + centered * 1;    // 0.7 (70%) -> 1.3 (130%)

        gsap.set(img, {
          y: rel * 0.35,
          scale,
          filter: `saturate(${saturation})`,
        });
      });

      mqScaleRefs.current.forEach((el, i) => {
        if (!el) return;
        const panelTop = (i * 2 + 1) * vh;
        const rel = scrollTop - panelTop;
        const progress = (rel + vh) / (vh * 2);
        const centered = Math.max(0, 1 - Math.abs(progress - 0.5) * 2);
        const scale = 0.5 + centered * 0.55;
        const opacity = 0.15 + centered * 0.85;
        gsap.set(el, { scale, opacity });
      });
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{CSS}</style>


      <div className="svc-container" ref={containerRef}>
        {allItems.map((service, i) => {
          const localIdx = i % SET;
          return [
            <div key={"img" + i} className="svc-panel svc-panel--image">
              <div className="svc-bg-wrap">
                <div
                  className="svc-bg"
                  ref={(el) => (imgRefs.current[i] = el)}
                  style={{ backgroundImage: `url(${service.image})` }}
                />
              </div>
              <div
                className="svc-overlay"
                style={{
                  background: `linear-gradient(
                    155deg,
                    ${service.color}55 0%,
                    rgba(4,4,10,0.40) 45%,
                    rgba(4,4,10,0.92) 100%
                  )`,
                }}
              />
              <div className="svc-img-text">
                <span className="svc-img-index">
                  {String(localIdx + 1).padStart(2, "0")} /{" "}
                  {String(SET).padStart(2, "0")}
                </span>
                <h2 className="svc-img-title">{service.title}</h2>
                <p className="svc-img-sub">{service.subtitle}</p>
              </div>
            </div>,

            <div key={"mq" + i} className="svc-panel svc-panel--marquee">
              <div
                className="svc-mq-line svc-mq-line--top"
                style={{ background: service.color }}
              />
              <div
                className="svc-mq-line svc-mq-line--bot"
                style={{ background: service.color }}
              />

              <div
                className="svc-mq-scale"
                ref={(el) => (mqScaleRefs.current[i] = el)}
              >
                <div className="svc-mq-row">
                  <div className="svc-mq-track svc-mq-track--ltr">
                    {[0, 1].map((r) => (
                      <span key={r} className="svc-mq-text svc-mq-text--sans">
                        {Array(18)
                          .fill(service.marqueeA)
                          .join("  ")}
                        &ensp;
                      </span>
                    ))}
                  </div>
                </div>

                <div className="svc-mq-row">
                  <div className="svc-mq-track svc-mq-track--rtl">
                    {[0, 1].map((r) => (
                      <span
                        key={r}
                        className="svc-mq-text svc-mq-text--script"
                      >
                        {Array(18)
                          .fill(service.marqueeB)
                          .join("  ")}
                        &ensp;
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
          ];
        })}
      </div>
    </>
  );
}

/* ─────────────────────────── CSS ─────────────────────────── */
const CSS = `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Syne:wght@800&family=Dancing+Script:wght@700&display=swap');
:root {
  --primary:       #f5ad42;
  --primary-hover: #db9c3e;
  --primary-light: #ecfdf5;
  --primary-text:  #f5ad42;

  --bg-main:      #FFF8E1;
  --bg-secondary: #f9fafb;
  --bg-card:      #ffffff;
  --bg-input:     #f9fafb;
  --bg-nav:       rgba(255,255,255,0.92);
  --text-main:    #111827;
  --text-muted:   #6b7280;
  --text-faint:   #9ca3af;
  --border:       #e5e7eb;
  --border-hover: #d1d5db;
  --shadow:       0 8px 32px rgba(0,0,0,0.08);
}

[data-theme="dark"] {
  --bg-main:      #0f0f0f;
  --bg-secondary: #111111;
  --bg-card:      #1a1a1a;
  --bg-input:     #111111;
  --bg-nav:       rgba(15,15,15,0.92);
  --text-main:    #ffffff;
  --text-muted:   #9ca3af;
  --text-faint:   #6b7280;
  --border:       rgba(255,255,255,0.1);
  --border-hover: rgba(255,255,255,0.2);
  --shadow:       0 8px 32px rgba(0,0,0,0.4);
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Syne:wght@800&family=Dancing+Script:wght@700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── corner label ── */
.svc-label {
  position: fixed;
  top: 28px;
  left: 36px;
  z-index: 200;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 3px;
  pointer-events: none;
}
.svc-label-brand {
  font-size: 0.65rem;
  letter-spacing: 4px;
  font-weight: 700;
  color: var(--text-main);
  text-transform: uppercase;
}
.svc-label-sub {
  font-size: 0.6rem;
  letter-spacing: 3px;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* ── scroll container ── */
.svc-container {
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  scroll-behavior: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.svc-container::-webkit-scrollbar { display: none; }

/* ── every panel = full viewport ── */
.svc-panel {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* ════════════════ IMAGE PANEL ════════════════ */
.svc-panel--image { background: var(--bg-main); }

.svc-bg-wrap {
  position: absolute;
  inset: 0;
}
/* 140% tall so parallax movement never reveals edges */
.svc-bg {
  position: absolute;
  top: -20%;
  left: 0;
  width: 100%;
  height: 140%;
  background-size: cover;
  background-position: center;

  will-change: transform, filter;
  transform-origin: center center;

  filter: saturate(70%);
  transform: scale(1);
}
.svc-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.svc-img-text {
  position: absolute;
  z-index: 2;
  bottom: 60px;
  left: 7vw;
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
}
.svc-img-index {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 3px;
  color: white;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.svc-img-title {
  font-family: Georgia;
  font-size: clamp(2.6rem, 5.5vw, 5.8rem);
  font-weight: 800;
  line-height: 0.96;
  letter-spacing: -0.035em;
  margin-bottom: 16px;
}
.svc-img-sub {
  font-size: 1.05rem;
  color: rgb(233, 233, 233);
  letter-spacing: 0.03em;
  font-weight: 400;
}

/* ════════════════ MARQUEE PANEL ════════════════ */
.svc-panel--marquee {
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Thin accent lines top & bottom */
.svc-mq-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.5px;
  opacity: 0.22;
  z-index: 1;
}
.svc-mq-line--top { top: 0; }
.svc-mq-line--bot { bottom: 0; }

/* GSAP targets this: scale + opacity */
.svc-mq-scale {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  will-change: transform, opacity;
  transform-origin: center center;
  /* start small, GSAP will animate to full size */
  transform: scale(0.5);
  opacity: 0.15;
}

/* Row container */
.svc-mq-row {
  width: 100%;

  line-height: 1;
}

/* Scrolling track — now much longer to avoid gaps when scaled */
.svc-mq-track {
  display: flex;
  width: max-content;
  white-space: nowrap;
}
.svc-mq-track--ltr {
  animation: mq-ltr 110s linear infinite;
}
.svc-mq-track--rtl {
  animation: mq-rtl 90s linear infinite;
}
@keyframes mq-ltr {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes mq-rtl {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

/* Text */
.svc-mq-text {
  display: inline-block;
  flex-shrink: 0;
}
.svc-mq-text--sans {
  font-family: Georgia, sans-serif;
  font-size: clamp(4.5rem, 11vw, 11.5rem);
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.04em;
  text-transform: uppercase;
  line-height: 1;
  padding-right: 0.1em;
}
.svc-mq-text--script {
  font-family: 'Dancing Script';
  font-size: clamp(4rem, 9.5vw, 10rem);
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: 0;
  line-height: 1.1;
  padding-right: 0.1em;
}

/* ── mobile ── */
@media (max-width: 600px) {
  .svc-img-text { bottom: 36px; left: 22px; }
  .svc-label { top: 18px; left: 18px; }
  .svc-mq-text--sans { font-size: clamp(3rem, 13vw, 5rem); }
  .svc-mq-text--script { font-size: clamp(2.6rem, 11vw, 4.5rem); }
}
`;