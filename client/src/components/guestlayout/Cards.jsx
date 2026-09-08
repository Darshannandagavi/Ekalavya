import { useEffect, useRef } from "react";

const cards = [
  {
    title: "QUALITY EDUCATION",
    kicker: "Learn with clarity",
    icon: "book",
    accent: "#d8a63f",
    accentRgb: "216 166 63",
    description:
      "Access structured chapter-wise notes, videos, quizzes and study materials prepared by experienced faculty.",
    tags: ["Chapter-wise", "Faculty prepared", "Exam ready"],
  },
  {
    title: "RURAL STUDENT FIRST",
    kicker: "Opportunity for everyone",
    icon: "sprout",
    accent: "#43ad68",
    accentRgb: "67 173 104",
    description:
      "Designed especially for Kannada medium and rural students who deserve equal access to quality education.",
    tags: ["Kannada friendly", "Rural focused", "Easy access"],
  },
  {
    title: "LEARN ANYTIME",
    kicker: "Your classroom, everywhere",
    icon: "device",
    accent: "#478fd7",
    accentRgb: "71 143 215",
    description:
      "Study from your phone, tablet or laptop whenever you have time without depending on physical classrooms.",
    tags: ["Mobile ready", "Self-paced", "Always available"],
  },
  {
    title: "TRACK YOUR PROGRESS",
    kicker: "Grow with every lesson",
    icon: "chart",
    accent: "#9666db",
    accentRgb: "150 102 219",
    description:
      "Monitor completed chapters, quizzes, attendance and learning progress throughout your academic journey.",
    tags: ["Live insights", "Quiz reports", "Clear milestones"],
  },
  {
    title: "NO STUDENT LEFT BEHIND",
    kicker: "One connected community",
    icon: "graduate",
    accent: "#e36f50",
    accentRgb: "227 111 80",
    description:
      "Ekalavya connects students, teachers and colleges on one platform to make education accessible for everyone.",
    tags: ["Connected campus", "Inclusive learning", "Equal opportunity"],
  },
];

const rotations = ["-0.2deg", "0.35deg", "-0.3deg", "0.28deg", "-0.18deg"];

function AnimatedIcon({ name }) {
  const iconProps = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "ekp-icon-svg",
    "aria-hidden": true,
  };

  if (name === "book") {
    return (
      <svg {...iconProps}>
        <path d="M8 12.5c9-3.4 17.2-1.6 24 4.6v37c-6.8-6.2-15-8-24-4.6v-37Z" />
        <path d="M56 12.5c-9-3.4-17.2-1.6-24 4.6v37c6.8-6.2 15-8 24-4.6v-37Z" />
        <path d="M14 21c4.6-.8 8.6.2 12 2.6" />
        <path d="M14 29c4.6-.8 8.6.2 12 2.6" />
        <path d="M50 21c-4.6-.8-8.6.2-12 2.6" />
        <path d="M50 29c-4.6-.8-8.6.2-12 2.6" />
      </svg>
    );
  }

  if (name === "sprout") {
    return (
      <svg {...iconProps}>
        <path d="M32 55V27" />
        <path d="M32 35C20 35 13 28 13 16c11.8-.2 19 6.8 19 19Z" />
        <path d="M32 42c0-11.5 7.2-18.5 19-18.5C51 35 44 42 32 42Z" />
        <path d="M19 53c7-4 19-4 26 0" />
        <path d="M20 23c4 1 8 4 12 9" />
        <path d="M44 30c-4 1.8-8 5-12 10" />
      </svg>
    );
  }

  if (name === "device") {
    return (
      <svg {...iconProps}>
        <rect x="7" y="11" width="50" height="36" rx="5" />
        <path d="M27 53h10" />
        <path d="M22 57h20" />
        <path d="M32 47v10" />
        <path d="m24 28 5 5 11-12" />
        <path d="M12 17h40" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...iconProps}>
        <path d="M9 10v44h47" />
        <path d="m15 45 10-11 9 5 14-18" />
        <circle cx="15" cy="45" r="2.5" />
        <circle cx="25" cy="34" r="2.5" />
        <circle cx="34" cy="39" r="2.5" />
        <circle cx="48" cy="21" r="2.5" />
        <path d="M42 21h6v6" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path d="m5 24 27-13 27 13-27 14L5 24Z" />
      <path d="M16 31v12c8.5 7 23.5 7 32 0V31" />
      <path d="M58 25v18" />
      <circle cx="58" cy="47" r="2.5" />
      <path d="M24 52c5.5 1.8 10.5 1.8 16 0" />
    </svg>
  );
}

function Cards() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const cardElements = [...section.querySelectorAll(".ekp-card")];
    const wrappers = [...section.querySelectorAll(".ekp-sticky-wrapper")];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    cardElements.forEach((card) => observer.observe(card));

    let animationFrame = 0;

    const updateCardDepth = () => {
      animationFrame = 0;

      wrappers.forEach((wrapper, index) => {
        const surface = wrapper.querySelector(".ekp-card-surface");
        const nextWrapper = wrappers[index + 1];

        if (!surface) return;

        if (!nextWrapper) {
          surface.style.setProperty("--stack-scale", "1");
          surface.style.setProperty("--stack-brightness", "1");
          surface.style.setProperty("--stack-shift", "0px");
          return;
        }

        const nextTop = nextWrapper.getBoundingClientRect().top;
        const startPosition = window.innerHeight * 0.88;
        const endPosition = 170 + index * 18;
        const denominator = Math.max(startPosition - endPosition, 1);
        const progress = Math.min(
          1,
          Math.max(0, (startPosition - nextTop) / denominator),
        );

        surface.style.setProperty(
          "--stack-scale",
          String(1 - progress * 0.035),
        );
        surface.style.setProperty(
          "--stack-brightness",
          String(1 - progress * 0.13),
        );
        surface.style.setProperty("--stack-shift", `${progress * 8}px`);
      });
    };

    const requestDepthUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateCardDepth);
      }
    };

    updateCardDepth();

    window.addEventListener("scroll", requestDepthUpdate, { passive: true });
    window.addEventListener("resize", requestDepthUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestDepthUpdate);
      window.removeEventListener("resize", requestDepthUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (0.5 - y) * 5;
    const rotateY = (x - 0.5) * 7;

    card.style.setProperty("--tilt-x", `${rotateX}deg`);
    card.style.setProperty("--tilt-y", `${rotateY}deg`);
    card.style.setProperty("--mouse-x", `${x * 100}%`);
    card.style.setProperty("--mouse-y", `${y * 100}%`);
    card.classList.add("is-tilting");
  };

  const resetPointerEffect = (event) => {
    const card = event.currentTarget;

    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "50%");
    card.classList.remove("is-tilting");
  };

  return (
    <section className="ekp-section" ref={sectionRef}>
      <div className="ekp-ambient" aria-hidden="true">
        <span className="ekp-orb ekp-orb-one" />
        <span className="ekp-orb ekp-orb-two" />
        <span className="ekp-grid" />
        <span className="ekp-noise" />
      </div>

      <div className="ekp-container">
        <header className="ekp-introduction">
          <div className="ekp-eyebrow">
            <span className="ekp-live-dot" />
            Why Ekalavya
            <span className="ekp-eyebrow-line" />
          </div>

          <h1>
            Education designed to
            <span> move with you.</span>
          </h1>

          <p>
            A connected digital learning experience built to make quality
            education accessible to every student.
          </p>
        </header>

        <div className="ekp-card-stack" role="list">
          {cards.map((card, index) => (
            <div
              className="ekp-sticky-wrapper"
              role="listitem"
              key={card.title}
              style={{
                "--index": index,
                "--accent": card.accent,
                "--accent-rgb": card.accentRgb,
                "--base-rotation": rotations[index],
              }}
            >
              <article
                className="ekp-card"
                aria-labelledby={`ekp-card-title-${index}`}
                onPointerMove={handlePointerMove}
                onPointerLeave={resetPointerEffect}
              >
                <div className="ekp-card-surface">
                  <div className="ekp-card-topbar">
                    <span className="ekp-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="ekp-heading-group">
                      <span className="ekp-kicker">{card.kicker}</span>
                      <h2 id={`ekp-card-title-${index}`}>{card.title}</h2>
                    </div>

                    <div className="ekp-feature-status">
                      <span />
                      Feature
                    </div>
                  </div>

                  <div className="ekp-card-body">
                    <span className="ekp-background-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="ekp-icon-column">
                      <div className="ekp-icon-stage">
                        <span className="ekp-icon-ring" />

                        {[0, 1, 2, 3].map((sparkIndex) => (
                          <span
                            className="ekp-icon-spark"
                            key={sparkIndex}
                            style={{ "--spark-index": sparkIndex }}
                          />
                        ))}

                        <div className="ekp-icon-core">
                          <AnimatedIcon name={card.icon} />
                        </div>
                      </div>

                      <span className="ekp-icon-caption">
                        Ekalavya Learning
                      </span>
                    </div>

                    <div className="ekp-content-column">
                      <span className="ekp-content-line" />

                      <p>{card.description}</p>

                      <div className="ekp-tags">
                        {card.tags.map((tag) => (
                          <span key={tag}>
                            <i />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="ekp-card-footer">
                        <div className="ekp-progress-track">
                          <span
                            style={{
                              width: `${((index + 1) / cards.length) * 100}%`,
                            }}
                          />
                        </div>

                        <span className="ekp-progress-label">
                          {index + 1} / {cards.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="ekp-ending">
          <span />
          <p>Learning without limits.</p>
          <span />
        </div>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap");

        .ekp-section,
        .ekp-section * {
          box-sizing: border-box;
        }

        .ekp-section {
          --ekp-bg: var(--bg-main, #f4f6f2);
          --ekp-surface: var(--bg-card, #ffffff);
          --ekp-surface-soft: var(--bg-input, #f7f8f5);
          --ekp-text: var(--text-main, #151915);
          --ekp-muted: var(--text-muted, #667069);
          --ekp-faint: var(--text-faint, #89938b);
          --ekp-border: var(--border, #dde2dc);
          --ekp-primary: var(--primary, #338a4a);
          --ekp-primary-soft: var(
            --primary-light,
            color-mix(in srgb, var(--ekp-primary) 12%, transparent)
          );

          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100vh;
          padding: 130px 24px 300px;
          color: var(--ekp-text);
          background:
            radial-gradient(
              circle at 50% 0%,
              color-mix(in srgb, var(--ekp-primary) 11%, transparent) 0%,
              transparent 36%
            ),
            var(--ekp-bg);
          font-family: "Manrope", sans-serif;
          transition: color 0.35s ease, background-color 0.35s ease;
        }

        .ekp-ambient {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .ekp-grid {
          position: absolute;
          inset: 0;
          opacity: 0.28;
          background-image:
            linear-gradient(
              color-mix(in srgb, var(--ekp-border) 48%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              color-mix(in srgb, var(--ekp-border) 48%, transparent) 1px,
              transparent 1px
            );
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, #000, transparent 78%);
          animation: ekp-grid-move 20s linear infinite;
        }

        .ekp-noise {
          position: absolute;
          inset: 0;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E");
        }

        .ekp-orb {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          filter: blur(110px);
          background: var(--ekp-primary);
          opacity: 0.1;
        }

        .ekp-orb-one {
          top: 5%;
          left: 3%;
          animation: ekp-orb-one 16s ease-in-out infinite alternate;
        }

        .ekp-orb-two {
          top: 42%;
          right: 2%;
          opacity: 0.065;
          animation: ekp-orb-two 19s ease-in-out infinite alternate;
        }

        .ekp-container {
          width: min(1120px, 100%);
          margin: 0 auto;
        }

        .ekp-introduction {
          width: min(800px, 100%);
          margin: 0 auto 130px;
          text-align: center;
          animation: ekp-intro-reveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .ekp-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
          color: var(--ekp-muted);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .ekp-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--ekp-primary);
          box-shadow: 0 0 0 0 color-mix(
            in srgb,
            var(--ekp-primary) 48%,
            transparent
          );
          animation: ekp-dot-pulse 2s infinite;
        }

        .ekp-eyebrow-line {
          width: 45px;
          height: 1px;
          background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--ekp-text) 28%, transparent),
            transparent
          );
        }

        .ekp-introduction h1 {
          margin: 0;
          color: var(--ekp-text);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: clamp(48px, 7vw, 88px);
          font-weight: 400;
          line-height: 0.96;
          letter-spacing: -0.045em;
        }

        .ekp-introduction h1 span {
          display: block;
          color: var(--ekp-primary);
          font-style: italic;
        }

        .ekp-introduction p {
          max-width: 620px;
          margin: 30px auto 0;
          color: var(--ekp-muted);
          font-size: clamp(15px, 2vw, 18px);
          line-height: 1.8;
        }

        .ekp-card-stack {
          position: relative;
          width: 100%;
        }

        .ekp-sticky-wrapper {
          position: sticky;
          top: calc(88px + var(--index) * 18px);
          z-index: calc(10 + var(--index));
          display: flex;
          align-items: flex-start;
          justify-content: center;
          height: clamp(570px, 76vh, 720px);
        }

        .ekp-card {
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          --mouse-x: 50%;
          --mouse-y: 50%;

          width: min(920px, 100%);
          opacity: 0;
          transform:
            perspective(1300px)
            translate3d(0, 70px, 0)
            rotateX(var(--tilt-x))
            rotateY(var(--tilt-y))
            rotateZ(var(--base-rotation))
            scale(0.94);
          transform-style: preserve-3d;
          transition:
            opacity 0.8s ease,
            transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .ekp-card.is-visible {
          opacity: 1;
          transform:
            perspective(1300px)
            translate3d(0, 0, 0)
            rotateX(var(--tilt-x))
            rotateY(var(--tilt-y))
            rotateZ(var(--base-rotation))
            scale(1);
        }

        .ekp-card.is-tilting {
          transition: opacity 0.8s ease, transform 0.14s ease-out;
        }

        .ekp-card-surface {
          --stack-scale: 1;
          --stack-brightness: 1;
          --stack-shift: 0px;

          position: relative;
          overflow: hidden;
          border: 1px solid color-mix(
            in srgb,
            var(--accent) 13%,
            var(--ekp-border)
          );
          border-radius: 30px;
          background: var(--ekp-surface);
          box-shadow:
            0 45px 100px rgba(0, 0, 0, 0.16),
            0 12px 30px rgba(0, 0, 0, 0.08),
            0 1px 0 color-mix(in srgb, var(--ekp-text) 7%, transparent)
              inset;
          filter: brightness(var(--stack-brightness));
          transform:
            translateY(var(--stack-shift))
            scale(var(--stack-scale));
          transform-origin: top center;
          transition:
            transform 0.12s linear,
            filter 0.12s linear,
            background-color 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .ekp-card.is-tilting .ekp-card-surface {
          box-shadow:
            0 54px 120px rgba(0, 0, 0, 0.2),
            0 18px 40px rgba(var(--accent-rgb) / 0.13),
            0 0 0 1px rgba(var(--accent-rgb) / 0.1) inset;
        }

        .ekp-card-surface::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0;
          pointer-events: none;
          background: radial-gradient(
            440px circle at var(--mouse-x) var(--mouse-y),
            rgba(var(--accent-rgb) / 0.16),
            transparent 48%
          );
          transition: opacity 0.35s ease;
        }

        .ekp-card.is-tilting .ekp-card-surface::before {
          opacity: 1;
        }

        .ekp-card-surface::after {
          content: "";
          position: absolute;
          top: -150%;
          left: -45%;
          z-index: 3;
          width: 35%;
          height: 350%;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent,
            color-mix(in srgb, var(--ekp-text) 8%, transparent),
            transparent
          );
          transform: rotate(24deg);
          transition: left 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ekp-card:hover .ekp-card-surface::after {
          left: 125%;
        }

        .ekp-card-topbar,
        .ekp-card-body {
          position: relative;
          z-index: 2;
        }

        .ekp-card-topbar {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 24px;
          min-height: 118px;
          padding: 24px 32px;
          color: var(--ekp-text);
          background: linear-gradient(
            115deg,
            color-mix(in srgb, var(--ekp-surface) 94%, var(--accent) 6%),
            color-mix(in srgb, var(--ekp-surface) 76%, var(--accent) 24%)
          );
          border-bottom: 1px solid color-mix(
            in srgb,
            var(--accent) 16%,
            var(--ekp-border)
          );
          transition: color 0.35s ease, background 0.35s ease;
        }

        .ekp-card-topbar::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--accent),
            transparent
          );
        }

        .ekp-card-number {
          display: grid;
          width: 52px;
          height: 52px;
          place-items: center;
          border-radius: 16px;
          color: var(--ekp-surface);
          background: var(--ekp-text);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.12em;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          transition: color 0.35s ease, background-color 0.35s ease;
        }

        .ekp-heading-group {
          min-width: 0;
        }

        .ekp-kicker {
          display: block;
          margin-bottom: 6px;
          color: var(--ekp-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.19em;
          text-transform: uppercase;
        }

        .ekp-heading-group h2 {
          margin: 0;
          color: var(--ekp-text);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: clamp(25px, 4vw, 38px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.025em;
        }

        .ekp-feature-status {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--ekp-muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .ekp-feature-status span {
          width: 9px;
          height: 9px;
          border: 2px solid var(--ekp-text);
          border-radius: 50%;
          background: var(--accent);
          animation: ekp-status-pulse 2.5s infinite;
        }

        .ekp-card-body {
          display: grid;
          grid-template-columns: 280px minmax(0, 1fr);
          gap: 58px;
          min-height: 390px;
          padding: 52px 58px 42px;
          background:
            linear-gradient(
              135deg,
              rgba(var(--accent-rgb) / 0.08),
              transparent 42%
            ),
            linear-gradient(
              145deg,
              color-mix(in srgb, var(--ekp-surface) 97%, var(--accent) 3%),
              var(--ekp-surface)
            );
          transition: background 0.35s ease;
        }

        .ekp-card-body::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.16;
          pointer-events: none;
          background-image: radial-gradient(
            circle at center,
            color-mix(in srgb, var(--ekp-text) 25%, transparent) 1px,
            transparent 1px
          );
          background-size: 24px 24px;
          mask-image: linear-gradient(90deg, #000, transparent 70%);
        }

        .ekp-background-number {
          position: absolute;
          right: 25px;
          bottom: -40px;
          color: color-mix(in srgb, var(--ekp-text) 4%, transparent);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: 220px;
          line-height: 1;
          pointer-events: none;
        }

        .ekp-icon-column,
        .ekp-content-column {
          position: relative;
          z-index: 2;
        }

        .ekp-icon-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .ekp-icon-stage {
          position: relative;
          display: grid;
          width: 205px;
          height: 205px;
          place-items: center;
          border-radius: 50%;
        }

        .ekp-icon-stage::before {
          content: "";
          position: absolute;
          inset: 24px;
          border-radius: inherit;
          background: rgba(var(--accent-rgb) / 0.075);
          box-shadow:
            0 0 55px rgba(var(--accent-rgb) / 0.13),
            0 0 0 1px rgba(var(--accent-rgb) / 0.18) inset;
          animation: ekp-core-breathe 3.5s ease-in-out infinite;
        }

        .ekp-icon-ring {
          position: absolute;
          inset: 4px;
          border: 1px solid rgba(var(--accent-rgb) / 0.3);
          border-right-color: transparent;
          border-bottom-color: rgba(var(--accent-rgb) / 0.06);
          border-radius: 50%;
          animation: ekp-ring-spin 12s linear infinite;
        }

        .ekp-icon-ring::before {
          content: "";
          position: absolute;
          inset: 13px;
          border: 1px dashed color-mix(
            in srgb,
            var(--ekp-text) 13%,
            transparent
          );
          border-radius: inherit;
          animation: ekp-ring-spin-reverse 17s linear infinite;
        }

        .ekp-icon-spark {
          --start-angle: calc(var(--spark-index) * 90deg);

          position: absolute;
          top: calc(50% - 3px);
          left: calc(50% - 3px);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 12px var(--accent);
          animation: ekp-spark-orbit 8s linear infinite;
          animation-delay: calc(var(--spark-index) * -1.4s);
        }

        .ekp-icon-core {
          position: relative;
          z-index: 3;
          display: grid;
          width: 126px;
          height: 126px;
          place-items: center;
          border: 1px solid rgba(var(--accent-rgb) / 0.27);
          border-radius: 36px;
          color: var(--accent);
          background: linear-gradient(
            145deg,
            rgba(var(--accent-rgb) / 0.13),
            color-mix(in srgb, var(--ekp-surface) 94%, transparent)
          );
          box-shadow:
            0 25px 50px rgba(0, 0, 0, 0.13),
            0 0 35px rgba(var(--accent-rgb) / 0.09) inset;
          transform: rotate(-4deg);
          animation: ekp-icon-float 4.5s ease-in-out infinite;
          transition: background 0.35s ease;
        }

        .ekp-icon-svg {
          width: 72px;
          height: 72px;
          filter: drop-shadow(0 0 14px rgba(var(--accent-rgb) / 0.25));
        }

        .ekp-icon-svg path,
        .ekp-icon-svg rect,
        .ekp-icon-svg circle {
          stroke-dasharray: 170;
          stroke-dashoffset: 170;
        }

        .ekp-card.is-visible .ekp-icon-svg path,
        .ekp-card.is-visible .ekp-icon-svg rect,
        .ekp-card.is-visible .ekp-icon-svg circle {
          animation: ekp-line-draw 1.8s ease forwards;
          animation-delay: calc(0.25s + var(--index) * 0.08s);
        }

        .ekp-icon-caption {
          margin-top: 24px;
          color: var(--ekp-faint);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .ekp-content-column {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ekp-content-line {
          width: 54px;
          height: 3px;
          margin-bottom: 26px;
          border-radius: 20px;
          background: var(--accent);
          box-shadow: 0 0 20px rgba(var(--accent-rgb) / 0.35);
          transform: scaleX(0);
          transform-origin: left;
        }

        .ekp-card.is-visible .ekp-content-line {
          animation: ekp-line-grow 0.8s 0.35s ease forwards;
        }

        .ekp-content-column > p {
          max-width: 520px;
          margin: 0;
          color: var(--ekp-text);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: clamp(21px, 2.5vw, 28px);
          line-height: 1.5;
          letter-spacing: -0.012em;
        }

        .ekp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 30px;
        }

        .ekp-tags span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 13px;
          border: 1px solid var(--ekp-border);
          border-radius: 100px;
          color: var(--ekp-muted);
          background: color-mix(
            in srgb,
            var(--ekp-surface-soft) 90%,
            transparent
          );
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          transition:
            color 0.25s ease,
            border-color 0.25s ease,
            background-color 0.25s ease,
            transform 0.25s ease;
        }

        .ekp-tags span:hover {
          color: var(--ekp-text);
          border-color: rgba(var(--accent-rgb) / 0.4);
          background: rgba(var(--accent-rgb) / 0.1);
          transform: translateY(-3px);
        }

        .ekp-tags i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
        }

        .ekp-card-footer {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 36px;
        }

        .ekp-progress-track {
          position: relative;
          flex: 1;
          height: 2px;
          overflow: hidden;
          border-radius: 20px;
          background: color-mix(
            in srgb,
            var(--ekp-text) 10%,
            transparent
          );
        }

        .ekp-progress-track span {
          position: absolute;
          inset: 0 auto 0 0;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            var(--accent),
            rgba(var(--accent-rgb) / 0.28)
          );
          box-shadow: 0 0 13px rgba(var(--accent-rgb) / 0.4);
          transform: scaleX(0);
          transform-origin: left;
        }

        .ekp-card.is-visible .ekp-progress-track span {
          animation: ekp-line-grow 1s 0.55s ease forwards;
        }

        .ekp-progress-label {
          color: var(--ekp-faint);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .ekp-ending {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 22px;
          margin-top: 60px;
          color: var(--ekp-faint);
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .ekp-ending p {
          margin: 0;
          font-size: 10px;
          font-weight: 800;
        }

        .ekp-ending span {
          width: 50px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--ekp-border)
          );
        }

        .ekp-ending span:last-child {
          transform: rotate(180deg);
        }

        @keyframes ekp-intro-reveal {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ekp-line-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes ekp-line-grow {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes ekp-icon-float {
          0%,
          100% {
            transform: translateY(0) rotate(-4deg);
          }
          50% {
            transform: translateY(-9px) rotate(2deg);
          }
        }

        @keyframes ekp-core-breathe {
          0%,
          100% {
            opacity: 0.65;
            transform: scale(0.96);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes ekp-ring-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ekp-ring-spin-reverse {
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes ekp-spark-orbit {
          from {
            transform: rotate(var(--start-angle)) translateX(99px);
          }
          to {
            transform: rotate(calc(var(--start-angle) + 360deg))
              translateX(99px);
          }
        }

        @keyframes ekp-dot-pulse {
          70% {
            box-shadow: 0 0 0 9px transparent;
          }
          100% {
            box-shadow: 0 0 0 0 transparent;
          }
        }

        @keyframes ekp-status-pulse {
          50% {
            box-shadow: 0 0 0 5px rgba(var(--accent-rgb) / 0.12);
          }
        }

        @keyframes ekp-grid-move {
          to {
            background-position: 72px 72px;
          }
        }

        @keyframes ekp-orb-one {
          to {
            transform: translate(140px, 180px) scale(1.2);
          }
        }

        @keyframes ekp-orb-two {
          to {
            transform: translate(-150px, 100px) scale(0.8);
          }
        }

        @media (max-width: 760px) {
          .ekp-section {
            padding: 100px 15px 220px;
          }

          .ekp-introduction {
            margin-bottom: 90px;
          }

          .ekp-introduction h1 {
            font-size: clamp(43px, 14vw, 66px);
          }

          .ekp-sticky-wrapper {
            top: calc(62px + var(--index) * 11px);
            height: 690px;
          }

          .ekp-card {
            --base-rotation: 0deg !important;
          }

          .ekp-card-topbar {
            grid-template-columns: auto minmax(0, 1fr) auto;
            gap: 14px;
            min-height: 96px;
            padding: 19px;
          }

          .ekp-card-number {
            width: 43px;
            height: 43px;
            border-radius: 13px;
            font-size: 11px;
          }

          .ekp-heading-group h2 {
            font-size: clamp(20px, 5.8vw, 27px);
          }

          .ekp-kicker {
            font-size: 8px;
          }

          .ekp-feature-status {
            font-size: 0;
          }

          .ekp-card-body {
            grid-template-columns: 1fr;
            gap: 23px;
            min-height: 505px;
            padding: 29px 24px 27px;
          }

          .ekp-icon-stage {
            width: 145px;
            height: 145px;
          }

          .ekp-icon-core {
            width: 92px;
            height: 92px;
            border-radius: 28px;
          }

          .ekp-icon-svg {
            width: 54px;
            height: 54px;
          }

          .ekp-icon-spark {
            animation-name: ekp-spark-orbit-mobile;
          }

          .ekp-icon-caption {
            margin-top: 14px;
          }

          .ekp-content-column {
            justify-content: flex-start;
          }

          .ekp-content-line {
            margin-bottom: 18px;
          }

          .ekp-content-column > p {
            font-size: 20px;
            line-height: 1.45;
            text-align: center;
          }

          .ekp-tags {
            justify-content: center;
            margin-top: 21px;
          }

          .ekp-card-footer {
            margin-top: 25px;
          }

          .ekp-background-number {
            right: 5px;
            bottom: -15px;
            font-size: 140px;
          }

          @keyframes ekp-spark-orbit-mobile {
            from {
              transform: rotate(var(--start-angle)) translateX(69px);
            }
            to {
              transform: rotate(calc(var(--start-angle) + 360deg))
                translateX(69px);
            }
          }
        }

        @media (max-width: 420px) {
          .ekp-section {
            padding-right: 10px;
            padding-left: 10px;
          }

          .ekp-sticky-wrapper {
            height: 720px;
          }

          .ekp-card-surface {
            border-radius: 22px;
          }

          .ekp-card-topbar {
            padding: 16px 14px;
          }

          .ekp-heading-group h2 {
            font-size: 19px;
          }

          .ekp-content-column > p {
            font-size: 18px;
          }

          .ekp-tags span {
            padding: 8px 10px;
            font-size: 9px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ekp-section *,
          .ekp-section *::before,
          .ekp-section *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .ekp-card {
            opacity: 1;
            transform: none;
          }

          .ekp-card-surface {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Cards;
