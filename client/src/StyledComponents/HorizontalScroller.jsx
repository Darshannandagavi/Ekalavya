import { useEffect, useRef, useState, useCallback } from "react";

const CARDS = [
  {
    num: "01",
    badge: "Small Batches",
    title: "Slow simmered,\nnot conveyor belted",
    body: "Small runs. No conveyor belts — just slow simmering, constant taste checks, and Doug hovering like it owes him money.",
    shapes: ["circle", "star", "triangle"]
  },
  {
    num: "02",
    badge: "Real Ingredients",
    title: "Fruit chopped.\nPeppers sliced.",
    body: "Real fruit. Fresh peppers. No powders. No syrups. No shortcuts. Every spice gets blended by hand.",
    shapes: ["hexagon", "diamond", "circle"]
  },
  {
    num: "03",
    badge: "Oh, This?",
    title: "2nd place.\nFirst event.",
    body: 'Philly Hot Sauce Fest 2026 — "Best Sauce on a Philly Cheesesteak." Not bad for our first event.',
    shapes: ["star", "circle", "hexagon"]
  },
  {
    num: "04",
    badge: "No Corn Syrup",
    title: "Sweet is fine.\nLab-sweet is not.",
    body: "We left the high fructose corn syrup on the bottom shelf where it belongs. Sugar, the real kind.",
    shapes: ["triangle", "hexagon", "star"]
  },
  {
    num: "05",
    badge: "Gluten Free",
    title: "No gluten.\nNo drama.",
    body: "Just sauce that plays nice with your diet and acts up on the grill. No thickening tricks needed.",
    shapes: ["diamond", "triangle", "circle"]
  },
];

const TICKER_TEXT =
  "Small Batch · Real Ingredients · No HFCS · Gluten Free · No Seed Oils · Award Winning · ";

const CARD_W = 300;
const CARD_H = 380;
const TOTAL_SCROLL = 1400;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// SVG shape paths
const SHAPES = {
  circle: {
    path: "M50,85 C77.6,85 100,62.6 100,35 C100,7.4 77.6,-15 50,-15 C22.4,-15 0,7.4 0,35 C0,62.6 22.4,85 50,85 Z",
    viewBox: "0 0 100 100"
  },
  star: {
    path: "M50,5 L61,38 L97,38 L68,59 L79,92 L50,71 L21,92 L32,59 L3,38 L39,38 Z",
    viewBox: "0 0 100 100"
  },
  triangle: {
    path: "M50,5 L95,90 L5,90 Z",
    viewBox: "0 0 100 100"
  },
  hexagon: {
    path: "M50,5 L87,25 L87,65 L50,85 L13,65 L13,25 Z",
    viewBox: "0 0 100 100"
  },
  diamond: {
    path: "M50,5 L90,50 L50,95 L10,50 Z",
    viewBox: "0 0 100 100"
  },
  blob: {
    path: "M50,10 C72,5 95,20 95,45 C95,70 78,90 50,90 C22,90 5,75 5,50 C5,25 22,10 50,10 Z",
    viewBox: "0 0 100 100"
  }
};

function getPosOnCurve(progress, i, containerW, containerH, n) {
  const cardProgress = progress * (n - 1);
  const angle = (i - cardProgress) * 0.52;
  const radius = 600;
  const cx = containerW / 2;
  const cy = containerH / 2 - 10;
  const x = cx + Math.sin(angle) * radius - CARD_W / 2;
  const y =
    cy -
    Math.cos(angle) * radius * 0.14 +
    Math.abs(angle) * Math.abs(angle) * 22 -
    CARD_H / 2;
  const rotate = angle * 17;
  const scale = Math.max(0.75, 1 - Math.abs(angle) * 0.075);
  const opacity = Math.max(0, 1 - Math.abs(angle) * 0.65);
  const zIndex = Math.round(10 - Math.abs(i - cardProgress));
  return { x, y, rotate, scale, opacity, zIndex, angle };
}

// Animated Shape SVG Component
function AnimatedShape({ shape1, shape2, morphProgress, index, delay = 0 }) {
  const path1 = SHAPES[shape1]?.path || SHAPES.circle.path;
  const path2 = SHAPES[shape2]?.path || SHAPES.circle.path;
  
  const animations = [
    // Different animation patterns for each shape
    { rotate: 360, scale: [1, 1.2, 1], duration: 3 },
    { rotate: -180, scale: [1, 0.8, 1], duration: 4 },
    { rotate: 720, scale: [1, 1.1, 0.9, 1], duration: 3.5 },
  ];

  const anim = animations[index % animations.length];
  
  return (
    <svg
      className="scs-shape"
      viewBox={SHAPES[shape1]?.viewBox || "0 0 100 100"}
      style={{
        animation: `scs-shape-float-${index} ${anim.duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <path
        d={morphProgress < 0.5 ? path1 : path2}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
        style={{
          transition: `d ${0.6 + delay * 0.2}s cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />
      <style>{`
        @keyframes scs-shape-float-${index} {
          0%, 100% { 
            transform: rotate(0deg) scale(1); 
          }
          33% { 
            transform: rotate(${anim.rotate * 0.33}deg) scale(${anim.scale[1]}); 
          }
          66% { 
            transform: rotate(${anim.rotate * 0.66}deg) scale(${anim.scale[2] || 1}); 
          }
        }
      `}</style>
    </svg>
  );
}

// Main decorative shapes component
function DecorativeShapes({ cardIndex, progress, isHovered }) {
  const shapes = CARDS[cardIndex]?.shapes || ["circle", "star", "triangle"];
  const morphProgress = (progress * CARDS.length) % 1;
  
  return (
    <div className="scs-shapes-container">
      {shapes.map((shape, i) => (
        <AnimatedShape
          key={i}
          shape1={shapes[i]}
          shape2={shapes[(i + 1) % shapes.length]}
          morphProgress={morphProgress}
          index={i}
          delay={i * 0.3}
        />
      ))}
      <style>{`
        .scs-shapes-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        
        .scs-shape {
          position: absolute;
          width: 60px;
          height: 60px;
          color: #f5edcf;
          opacity: 0.15;
          transition: opacity 0.3s, transform 0.3s;
        }
        
        .scs-shape:nth-child(1) {
          top: -10px;
          right: -10px;
          width: 80px;
          height: 80px;
        }
        
        .scs-shape:nth-child(2) {
          bottom: 20px;
          left: -15px;
          width: 50px;
          height: 50px;
          opacity: 0.1;
        }
        
        .scs-shape:nth-child(3) {
          top: 40%;
          right: -20px;
          width: 40px;
          height: 40px;
          opacity: 0.12;
        }
        
        .scs-card:hover .scs-shape {
          opacity: 0.25;
          color: #f5edcf;
        }
        
        .scs-card:hover .scs-shape:nth-child(1) {
          transform: translate(-5px, -5px) scale(1.1);
        }
        
        .scs-card:hover .scs-shape:nth-child(2) {
          transform: translate(5px, -5px) scale(1.1);
        }
        
        .scs-card:hover .scs-shape:nth-child(3) {
          transform: translate(-5px, 5px) scale(1.15);
        }
      `}</style>
    </div>
  );
}

export default function HorizontalScroller() {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const scrollYRef = useRef(0);
  const targetYRef = useRef(0);
  const cardRefs = useRef([]);
  const tickerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [size, setSize] = useState({ w: 800, h: 580 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const lastActiveIdx = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Direct DOM manipulation for smooth animation
  const updateDOM = useCallback(
    (progress) => {
      // Update cards via refs (no React re-render)
      CARDS.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const style = getPosOnCurve(progress, i, size.w, size.h, CARDS.length);
        card.style.transform = `translate(${style.x}px, ${style.y}px) rotate(${style.rotate}deg) scale(${style.scale})`;
        card.style.opacity = style.opacity;
        card.style.zIndex = style.zIndex;
      });

      // Update ticker
      if (tickerRef.current) {
        tickerRef.current.style.transform = `translateX(${-scrollYRef.current * 0.12}px)`;
      }

      // Only update React state when activeIdx actually changes (throttled)
      const newActiveIdx = Math.round(progress * (CARDS.length - 1));
      if (newActiveIdx !== lastActiveIdx.current) {
        lastActiveIdx.current = newActiveIdx;
        setActiveIdx(newActiveIdx);
      }

      // Update hint visibility
      const shouldShowHint = progress < 0.04;
      if (shouldShowHint !== showHint) {
        setShowHint(shouldShowHint);
      }
    },
    [size, showHint]
  );

  const smoothScroll = useCallback(() => {
    scrollYRef.current = lerp(scrollYRef.current, targetYRef.current, 0.1);
    
    const progress = Math.min(1, Math.max(0, scrollYRef.current / TOTAL_SCROLL));
    updateDOM(progress);

    if (Math.abs(scrollYRef.current - targetYRef.current) > 0.3) {
      rafRef.current = requestAnimationFrame(smoothScroll);
    } else {
      scrollYRef.current = targetYRef.current;
      updateDOM(Math.min(1, Math.max(0, scrollYRef.current / TOTAL_SCROLL)));
      rafRef.current = null;
    }
  }, [updateDOM]);

  const startRaf = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(smoothScroll);
    }
  }, [smoothScroll]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      const atStart = targetYRef.current <= 0;
      const atEnd = targetYRef.current >= TOTAL_SCROLL;

      // At boundary in the same direction → let page scroll naturally
      if ((scrollingDown && atEnd) || (scrollingUp && atStart)) {
        return; // don't preventDefault — page scroll takes over
      }

      e.preventDefault();
      
      // Normalize delta for different input devices
      const delta = Math.abs(e.deltaY) > 50 
        ? Math.sign(e.deltaY) * 40 // Mouse wheel - cap the jump
        : e.deltaY; // Trackpad - use as-is
      
      targetYRef.current = Math.min(
        TOTAL_SCROLL,
        Math.max(0, targetYRef.current + delta * 0.85)
      );
      startRaf();
    };

    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const onTouchMove = (e) => {
      const dy = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const scrollingDown = dy > 0;
      const scrollingUp = dy < 0;
      const atStart = targetYRef.current <= 0;
      const atEnd = targetYRef.current >= TOTAL_SCROLL;

      if ((scrollingDown && atEnd) || (scrollingUp && atStart)) {
        return;
      }

      e.preventDefault();
      
      // Normalize touch delta
      const normalizedDelta = Math.abs(dy) > 50 
        ? Math.sign(dy) * 40 
        : dy;
      
      targetYRef.current = Math.min(
        TOTAL_SCROLL,
        Math.max(0, targetYRef.current + normalizedDelta * 1.6)
      );
      startRaf();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startRaf]);

  // Initial render on mount and size change
  useEffect(() => {
    updateDOM(Math.min(1, Math.max(0, scrollYRef.current / TOTAL_SCROLL)));
  }, [updateDOM, size]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

        .scs-root {
          width: 100%;
          height: 580px;
          background: #0e0e0e;
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          font-family: 'DM Sans', sans-serif;
          cursor: ns-resize;
        }

        .scs-label {
          position: absolute;
          top: 26px; left: 32px;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #ffffff28;
          text-transform: uppercase;
          font-weight: 700;
          z-index: 10;
          pointer-events: none;
        }

        .scs-counter {
          position: absolute;
          top: 26px; right: 32px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 0.18em;
          color: #ffffff22;
          z-index: 10;
          pointer-events: none;
        }

        .scs-hint {
          position: absolute;
          bottom: 52px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: #ffffff35;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          pointer-events: none;
          z-index: 10;
          transition: opacity 0.4s;
        }

        .scs-hint-arrow {
          animation: scs-bounce 1.5s ease-in-out infinite;
        }

        @keyframes scs-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        .scs-card {
          position: absolute;
          width: ${CARD_W}px;
          min-height: ${CARD_H}px;
          background: #191919;
          border: 1px solid #ffffff12;
          border-radius: 20px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          will-change: transform, opacity;
          overflow: hidden;
          pointer-events: auto;
          top: 0; left: 0;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .scs-card:hover {
          border-color: #f5edcf33;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px #f5edcf1a;
        }

        .scs-card-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 140px;
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 1.5px #ffffff1a;
          position: absolute;
          bottom: -16px; right: -10px;
          pointer-events: none;
          letter-spacing: -4px;
          user-select: none;
          transition: -webkit-text-stroke-color 0.3s;
        }
        
        .scs-card:hover .scs-card-num {
          -webkit-text-stroke-color: #f5edcf1a;
        }

        .scs-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f5edcf;
          color: #1a1208;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 999px;
          width: fit-content;
          position: relative;
          z-index: 1;
        }

        .scs-badge-dot {
          color: #8a6e22;
          font-size: 8px;
        }

        .scs-card-title {
          font-size: 22px;
          font-weight: 700;
          color: #f0e8d0;
          line-height: 1.25;
          position: relative;
          z-index: 1;
          white-space: pre-line;
        }

        .scs-card-body {
          font-size: 14px;
          line-height: 1.7;
          color: #8a7f6e;
          position: relative;
          z-index: 1;
          flex: 1;
          transition: color 0.3s;
        }
        
        .scs-card:hover .scs-card-body {
          color: #a8987e;
        }

        .scs-ticker-wrap {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 38px;
          border-top: 1px solid #ffffff0a;
          overflow: hidden;
          display: flex;
          align-items: center;
          z-index: 10;
          pointer-events: none;
        }

        .scs-ticker-inner {
          display: flex;
          white-space: nowrap;
          will-change: transform;
        }

        .scs-ticker-text {
          font-size: 10px;
          letter-spacing: 0.28em;
          color: #ffffff12;
          text-transform: uppercase;
        }

        .scs-dots {
          position: absolute;
          bottom: 46px;
          right: 32px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 10;
          pointer-events: none;
        }

        .scs-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ffffff18;
          transition: background 0.3s, transform 0.3s;
        }

        .scs-dot.active {
          background: #f5edcf;
          transform: scale(1.4);
        }
      `}</style>

      <div className="scs-root" ref={containerRef}>
        <div className="scs-label">Why Bucks Sauce</div>
        <div className="scs-counter">
          {String(activeIdx + 1).padStart(2, "0")} /{" "}
          {String(CARDS.length).padStart(2, "0")}
        </div>

        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="scs-card"
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="scs-card-num">{card.num}</div>
            
            {/* Animated SVG shapes */}
            <DecorativeShapes 
              cardIndex={i} 
              progress={scrollYRef.current / TOTAL_SCROLL}
              isHovered={hoveredCard === i}
            />
            
            <div className="scs-badge">
              <span className="scs-badge-dot">•</span>
              {card.badge}
              <span className="scs-badge-dot">•</span>
            </div>
            <div className="scs-card-title">{card.title}</div>
            <div className="scs-card-body">{card.body}</div>
          </div>
        ))}

        <div
          className="scs-hint"
          style={{ opacity: showHint ? 1 : 0 }}
        >
          <span>Scroll</span>
          <svg
            className="scs-hint-arrow"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M7 2v10M3 8l4 4 4-4"
              stroke="#ffffff44"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="scs-dots">
          {CARDS.map((_, i) => (
            <div
              key={i}
              className={`scs-dot${i === activeIdx ? " active" : ""}`}
            />
          ))}
        </div>

        <div className="scs-ticker-wrap">
          <div className="scs-ticker-inner" ref={tickerRef}>
            {[...Array(6)].map((_, i) => (
              <span key={i} className="scs-ticker-text">
                {TICKER_TEXT}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}