import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   ANIMATED SVG COMPONENTS
───────────────────────────────────────────── */

// Base animated shapes that morph based on scroll progress
const AnimatedHexagon = ({ progress = 0, color = "#f5ad42" }) => {
  // Calculate morphing between hexagon and circle based on progress
  const morphValue = Math.sin(progress * Math.PI);
  
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`hexGrad-${Math.random()}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8">
            <animate attributeName="stop-opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor={color} stopOpacity="0.2">
            <animate attributeName="stop-opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      
      {/* Outer rotating hexagon */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 100 100`}
          to={`360 100 100`}
          dur="20s"
          repeatCount="indefinite"
        />
        <polygon
          points="100,20 160,55 160,125 100,160 40,125 40,55"
          fill="none"
          stroke={`url(#hexGrad-${Math.random()})`}
          strokeWidth="2"
        >
          <animate
            attributeName="points"
            values="100,20 160,55 160,125 100,160 40,125 40,55;100,50 140,50 140,150 100,150 60,150 60,50;100,20 160,55 160,125 100,160 40,125 40,55"
            dur="3s"
            repeatCount="indefinite"
          />
        </polygon>
      </g>
      
      {/* Pulsing circles inside */}
      <circle cx="100" cy="100" r="30" fill="none" stroke={color} strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="20;40;20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
      </circle>
      
      {/* Floating particles */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <circle
          key={i}
          cx={100 + 50 * Math.cos((angle + progress * 360) * Math.PI / 180)}
          cy={100 + 50 * Math.sin((angle + progress * 360) * Math.PI / 180)}
          r="3"
          fill={color}
          opacity="0.6"
        >
          <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
        </circle>
      ))}
    </svg>
  );
};

const AnimatedNetwork = ({ progress = 0, color = "#f5ad42" }) => {
  const nodes = [
    { x: 100, y: 40 },
    { x: 160, y: 80 },
    { x: 160, y: 150 },
    { x: 100, y: 180 },
    { x: 40, y: 150 },
    { x: 40, y: 80 },
  ];

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Connection lines with animation */}
      {nodes.map((node, i) => (
        <line
          key={`line-${i}`}
          x1={node.x}
          y1={node.y}
          x2={nodes[(i + 1) % 6].x}
          y2={nodes[(i + 1) % 6].y}
          stroke={color}
          strokeWidth="1"
          opacity="0.2"
        >
          <animate
            attributeName="opacity"
            values="0.1;0.3;0.1"
            dur="2s"
            repeatCount="indefinite"
            begin={`${i * 0.3}s`}
          />
        </line>
      ))}
      
      {/* Center hub */}
      <circle cx="100" cy="100" r="15" fill={color} opacity="0.3">
        <animate attributeName="r" values="10;20;10" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="100" r="8" fill={color} opacity="0.6" />
      
      {/* Outer nodes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`}>
          <circle cx={node.x} cy={node.y} r="6" fill="none" stroke={color} strokeWidth="1.5">
            <animate
              attributeName="r"
              values={`${6 - Math.sin(i * 0.5 + progress * Math.PI * 2) * 2};${6 + Math.sin(i * 0.5 + progress * Math.PI * 2) * 2};${6 - Math.sin(i * 0.5 + progress * Math.PI * 2) * 2}`}
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={node.x} cy={node.y} r="3" fill={color}>
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
          </circle>
          
          {/* Data flow particles */}
          <circle r="2" fill={color}>
            <animateMotion
              path={`M${100},${100} L${node.x},${node.y}`}
              dur="2s"
              repeatCount="indefinite"
              begin={`${i * 0.3}s`}
            />
          </circle>
        </g>
      ))}
    </svg>
  );
};

const AnimatedDiamond = ({ progress = 0, color = "#f5ad42" }) => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Rotating diamond shapes */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 100 100"
          to="360 100 100"
          dur="15s"
          repeatCount="indefinite"
        />
        
        {/* Outer diamond */}
        <polygon
          points="100,20 180,100 100,180 20,100"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.3"
        >
          <animate
            attributeName="points"
            values="100,20 180,100 100,180 20,100;100,40 160,100 100,160 40,100;100,20 180,100 100,180 20,100"
            dur="4s"
            repeatCount="indefinite"
          />
        </polygon>
        
        {/* Inner diamond */}
        <polygon
          points="100,50 150,100 100,150 50,100"
          fill={color}
          fillOpacity="0.1"
          stroke={color}
          strokeWidth="1"
        />
      </g>
      
      {/* Corner dots */}
      {[[100,20], [180,100], [100,180], [20,100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={color}>
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur="2s"
            repeatCount="indefinite"
            begin={`${i * 0.5}s`}
          />
        </circle>
      ))}
    </svg>
  );
};

const AnimatedWaves = ({ progress = 0, color = "#f5ad42" }) => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Animated wave lines */}
      {[0, 15, 30, 45].map((offset, i) => (
        <path
          key={i}
          d={`M 20,${100 + offset} Q 60,${80 + offset} 100,${100 + offset} T 180,${100 + offset}`}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={0.2 + i * 0.05}
        >
          <animate
            attributeName="d"
            values={`
              M 20,${100 + offset} Q 60,${80 + offset} 100,${100 + offset} T 180,${100 + offset};
              M 20,${100 + offset} Q 60,${120 + offset} 100,${100 + offset} T 180,${100 + offset};
              M 20,${100 + offset} Q 60,${80 + offset} 100,${100 + offset} T 180,${100 + offset}
            `}
            dur={`${3 + i * 0.5}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
      
      {/* Floating geometric shape */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-10; 0,0"
          dur="4s"
          repeatCount="indefinite"
        />
        <rect
          x="85"
          y="70"
          width="30"
          height="30"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          transform="rotate(45 100 85)"
        >
          <animate attributeName="width" values="20;30;20" dur="3s" repeatCount="indefinite" />
          <animate attributeName="height" values="20;30;20" dur="3s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  );
};

const AnimatedCircles = ({ progress = 0, color = "#f5ad42" }) => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Concentric circles with animations */}
      {[20, 30, 40, 50, 60].map((radius, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={0.1 + i * 0.05}
        >
          <animate
            attributeName="r"
            values={`${radius - 5};${radius + 5};${radius - 5}`}
            dur={`${2 + i * 0.5}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values={`${0.1 + i * 0.05};${0.2 + i * 0.05};${0.1 + i * 0.05}`}
            dur={`${3 + i * 0.3}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      
      {/* Central pulsing circle */}
      <circle cx="100" cy="100" r="15" fill={color} opacity="0.3">
        <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Orbiting particles */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 100 100"
          to="360 100 100"
          dur="10s"
          repeatCount="indefinite"
        />
        <circle cx="100" cy="40" r="4" fill={color} opacity="0.6" />
        <circle cx="100" cy="160" r="3" fill={color} opacity="0.4" />
      </g>
    </svg>
  );
};

const AnimatedGrid = ({ progress = 0, color = "#f5ad42" }) => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Animated grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          {/* Horizontal lines */}
          <line
            x1="10"
            y1={30 + i * 35}
            x2="190"
            y2={30 + i * 35}
            stroke={color}
            strokeWidth="0.5"
            opacity="0.15"
          >
            <animate
              attributeName="y1"
              values={`${30 + i * 35};${35 + i * 35};${30 + i * 35}`}
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </line>
          
          {/* Vertical lines */}
          <line
            x1={30 + i * 35}
            y1="10"
            x2={30 + i * 35}
            y2="190"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.15"
          >
            <animate
              attributeName="x1"
              values={`${30 + i * 35};${35 + i * 35};${30 + i * 35}`}
              dur={`${2.5 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </line>
        </g>
      ))}
      
      {/* Highlighted intersections */}
      {[0, 1, 2, 3, 4].map((i) =>
        [0, 1, 2, 3, 4].map((j) => (
          <circle
            key={`${i}-${j}`}
            cx={30 + i * 35}
            cy={30 + j * 35}
            r="2"
            fill={color}
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.5;0.1"
              dur={`${1.5 + Math.random() * 2}s`}
              repeatCount="indefinite"
              begin={`${i * 0.2 + j * 0.3}s`}
            />
          </circle>
        ))
      )}
    </svg>
  );
};

/* ─────────────────────────────────────────────
   MAIN HORIZONTAL SCROLL COMPONENT
───────────────────────────────────────────── */

const PANELS = [
  {
    title: "University Ecosystem",
    subtitle: "One Hub. Every Campus.",
    description: "Connect multiple universities with a single platform. Seamless integration across institutions.",
    tags: ["Multi-University", "Scalable", "Unified"],
    Visual: AnimatedHexagon,
  },
  {
    title: "Faculty Workspace",
    subtitle: "Create. Teach. Inspire.",
    description: "Rich content editor with real-time preview. Upload notes, create assignments effortlessly.",
    tags: ["Editor", "Upload", "Organize"],
    Visual: AnimatedNetwork,
  },
  {
    title: "Student Learning",
    subtitle: "Anywhere. Anytime.",
    description: "Access notes on any device. Download PDFs, bookmark chapters, and learn on the go.",
    tags: ["Mobile", "Offline", "Bookmarks"],
    Visual: AnimatedDiamond,
  },
  {
    title: "Progress Tracking",
    subtitle: "Track. Improve. Excel.",
    description: "Monitor chapter completion, test scores, and learning progress with smart analytics.",
    tags: ["Analytics", "Progress", "Goals"],
    Visual: AnimatedWaves,
  },
  {
    title: "Administration",
    subtitle: "Manage. Control. Grow.",
    description: "Complete admin dashboard with role-based access and comprehensive management tools.",
    tags: ["Dashboard", "Roles", "Reports"],
    Visual: AnimatedCircles,
  },
  {
    title: "Technology Stack",
    subtitle: "Fast. Secure. Modern.",
    description: "Built with React, Node.js, and MongoDB. Cloud-native architecture for performance.",
    tags: ["React", "Node.js", "MongoDB"],
    Visual: AnimatedGrid,
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --amber: #f5ad42;
  --bg: #0a0a0a;
  --text: #ffffff;
  --text-muted: #888888;
  --border: rgba(255,255,255,0.08);
}

body { 
  background: var(--bg); 
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
}

.ahs-wrapper {
  position: relative;
  background: var(--bg);
}

.ahs-sticky {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--bg);
}

.ahs-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--amber);
  z-index: 100;
  transition: width 0.1s linear;
}

.ahs-track {
  display: flex;
  height: 100%;
  will-change: transform;
}

.ahs-panel {
  flex: 0 0 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 80px;
  position: relative;
}

.ahs-panel-inner {
  display: flex;
  align-items: center;
  gap: 80px;
  max-width: 1200px;
  width: 100%;
}

.ahs-text {
  flex: 1;
}

.ahs-visual {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ahs-visual svg {
  width: 100%;
  max-width: 400px;
  height: auto;
}

.ahs-eyebrow {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.ahs-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 16px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
}

.ahs-subtitle {
  font-size: 20px;
  color: var(--amber);
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
}

.ahs-description {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 30px;
  max-width: 400px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
}

.ahs-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
}

.ahs-tag {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 8px 16px;
  border: 1px solid rgba(245,173,66,0.2);
  border-radius: 4px;
  color: var(--amber);
  background: rgba(245,173,66,0.05);
}

.ahs-panel.is-active .ahs-eyebrow,
.ahs-panel.is-active .ahs-title,
.ahs-panel.is-active .ahs-subtitle,
.ahs-panel.is-active .ahs-description,
.ahs-panel.is-active .ahs-tags {
  opacity: 1;
  transform: translateY(0);
}

.ahs-counter {
  position: absolute;
  bottom: 40px;
  right: 40px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  color: rgba(255,255,255,0.3);
  z-index: 10;
}

.ahs-counter span {
  color: var(--amber);
  font-weight: 600;
}

.ahs-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: rgba(255,255,255,0.2);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  z-index: 10;
  transition: opacity 0.3s;
}

.ahs-hint-arrow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

@media (max-width: 768px) {
  .ahs-panel { padding: 0 24px; }
  .ahs-panel-inner { flex-direction: column; gap: 40px; }
  .ahs-visual { flex: 0; }
  .ahs-visual svg { max-width: 250px; }
  .ahs-title { font-size: 36px; }
}
`;

export default function AnimatedHScroll() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const panelRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const scrollProgress = useRef(0);

  // Inject CSS
  useEffect(() => {
    const styleId = 'ahs-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  // Smooth scroll handler
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let ticking = false;

    const updateScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperTop = window.scrollY + rect.top;
      const viewH = window.innerHeight;
      const wrapperH = wrapper.offsetHeight;
      const scrolledIn = window.scrollY - wrapperTop;
      const totalScroll = wrapperH - viewH;
      const progress = Math.max(0, Math.min(1, scrolledIn / totalScroll));
      
      scrollProgress.current = progress;

      // Update track position
      if (trackRef.current) {
        const maxShift = (PANELS.length - 1) * window.innerWidth;
        trackRef.current.style.transform = `translateX(-${progress * maxShift}px)`;
      }

      // Update progress bar
      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
      }

      // Update active panel
      const newIndex = Math.min(PANELS.length - 1, Math.round(progress * (PANELS.length - 1)));
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        setShowHint(progress < 0.05);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial update
    setTimeout(updateScroll, 100);

    return () => window.removeEventListener('scroll', onScroll);
  }, [activeIndex]);

  // Update panel active states
  useEffect(() => {
    panelRefs.current.forEach((panel, i) => {
      if (panel) {
        if (i === activeIndex) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      }
    });
  }, [activeIndex]);

  const wrapperHeight = `${PANELS.length * 100}vh`;

  return (
    <div style={{ background: '#0a0a0a', color: '#ffffff' }}>
      {/* Intro section */}
      <div style={{ 
        height: '60vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 40px'
      }}>
        <h1 style={{ 
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 600,
          lineHeight: 1.1,
          marginBottom: '20px'
        }}>
          Learning Platform
          <br />
          <span style={{ color: '#f5ad42' }}>Reimagined</span>
        </h1>
        <p style={{ 
          color: '#888', 
          fontSize: '18px', 
          maxWidth: '600px',
          lineHeight: 1.6
        }}>
          Scroll to explore how we're transforming education with modern technology and intuitive design.
        </p>
      </div>

      {/* Horizontal scroller */}
      <div ref={wrapperRef} className="ahs-wrapper" style={{ height: wrapperHeight }}>
        <div className="ahs-sticky">
          <div ref={progressRef} className="ahs-progress" />
          
          <div className="ahs-track" ref={trackRef}>
            {PANELS.map((panel, i) => {
              const { title, subtitle, description, tags, Visual } = panel;
              return (
                <div
                  key={i}
                  className="ahs-panel"
                  ref={el => panelRefs.current[i] = el}
                >
                  <div className="ahs-panel-inner">
                    <div className="ahs-text">
                      <div className="ahs-eyebrow">Feature {String(i + 1).padStart(2, '0')}</div>
                      <h2 className="ahs-title">{title}</h2>
                      <div className="ahs-subtitle">{subtitle}</div>
                      <p className="ahs-description">{description}</p>
                      <div className="ahs-tags">
                        {tags.map(tag => (
                          <span key={tag} className="ahs-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="ahs-visual">
                      <Visual progress={scrollProgress.current} color="#f5ad42" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Counter */}
          <div className="ahs-counter">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span> / {String(PANELS.length).padStart(2, '0')}
          </div>

          {/* Scroll hint */}
          <div className="ahs-hint" style={{ opacity: showHint ? 1 : 0 }}>
            <span>Scroll</span>
            <svg className="ahs-hint-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Outro section */}
      <div style={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 40px'
      }}>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 600,
          lineHeight: 1.1,
          marginBottom: '20px',
          maxWidth: '700px'
        }}>
          Ready to transform
          <br />
          <span style={{ color: '#f5ad42' }}>your learning experience?</span>
        </h2>
        <p style={{
          color: '#888',
          fontSize: '16px',
          maxWidth: '500px',
          lineHeight: 1.6
        }}>
          Join thousands of students and educators who are already using our platform.
        </p>
      </div>
    </div>
  );
}