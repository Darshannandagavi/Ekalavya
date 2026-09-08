import React from "react";
import Tilt from "react-parallax-tilt";
import Cards from "./Cards";
import {
  FaRocket,
  FaShieldAlt,
  FaPuzzlePiece,
  FaBookOpen,
  FaBolt,
  FaCloud,
} from "react-icons/fa";
function About() {
  return (
    <div style={{ color: "var(--text-main)" }}>
      {/* 
        Embedded CSS for the premium 3D glow effect.
      */}
      <style>
        {`
          .tilt-wrapper {
            height: 100%;
            display: flex;
            border-radius: 16px;
            /* CRITICAL: Allows children to exist in 3D space */
            transform-style: preserve-3d;
          }
          
          .premium-glow-card {
            position: relative;
            background-color: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 32px;
            display: flex;
            flex-direction: column;
            height: 100%;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 1;
            /* CRITICAL: Removed overflow:hidden and added preserve-3d so elements can pop out */
            transform-style: preserve-3d; 
          }

          /* Gradient Border Effect */
          .premium-glow-card::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 16px;
            padding: 2px;
            background: linear-gradient(135deg, var(--primary), transparent 70%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: -1;
            pointer-events: none;
          }

          /* Hover state overrides for the card */
          .tilt-wrapper:hover .premium-glow-card {
            border-color: transparent;
            box-shadow: 0 12px 40px -12px var(--primary);
            /* Added translateZ to maintain the whole card's 3D perspective */
            transform: translateY(-4px) translateZ(10px);
          }
          
          .tilt-wrapper:hover .premium-glow-card::before {
            opacity: 1;
          }

          /* --- 3D POP-OUT ELEMENTS --- */
          
          .icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
            border-radius: 14px;
           
            font-size: 28px;
            margin-bottom: 24px;
            /* Pushes icon off the card */
            transform: translateZ(50px);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 8px 16px rgba(0,0,0,0.05);
          }

          .tilt-wrapper:hover .icon-wrapper {
            /* Pushes it further out on hover and scales it */
            transform: translateZ(80px) scale(1.1) rotate(-5deg);
            
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          }

          .card-title-3d {
            /* Pushes text off the card */
            transform: translateZ(35px);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .tilt-wrapper:hover .card-title-3d {
            transform: translateZ(55px);
          }

          .card-desc-3d {
            /* Pushes description slightly off the card */
            transform: translateZ(20px);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .tilt-wrapper:hover .card-desc-3d {
            transform: translateZ(35px);
          }
        `}
      </style>

      {/* Hero Section */}
      <section
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "120px 24px 80px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "var(--primary)",
            border: "1px solid var(--primary)",
            borderRadius: "999px",
            padding: "8px 20px",
            marginBottom: "32px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          About Us
        </span>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: "900",
            lineHeight: 1.1,
            marginBottom: "28px",
            color: "var(--text-main)",
          }}
        >
          The team behind
          <br />
          <span
            style={{
              color: "var(--primary)",
              background: "linear-gradient(90deg, var(--primary), #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ekalavya
          </span>
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--text-muted)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          We are a passionate collective of creators, engineers, and problem
          solvers dedicated to forging exceptional, future-proof digital
          experiences.
        </p>
      </section>

      {/* Story Section */}
      <section
        style={{
          padding: "100px 24px",
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              color: "var(--text-main)",
              marginBottom: "32px",
            }}
          >
            Our Journey
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1.1rem",
              lineHeight: 1.9,
              marginBottom: "24px",
            }}
          >
            Ekalavya started as a focused team with a massive vision — to
            democratize high-end digital infrastructure and make exceptional
            products accessible to ambitious businesses of all scales.
          </p>
          <p
            style={{
              color: "var(--text-faint)",
              fontSize: "1.05rem",
              lineHeight: 1.9,
            }}
          >
            Today, we collaborate with disruptive startups, rapid scale-ups, and
            global enterprise companies. We view every line of code and every
            single pixel as an opportunity to do the best work of our lives.
          </p>
        </div>
      </section>

      {/* Stats Section */}

      {/* Core Values Section (Premium Animated Cards) */}
      <section
        style={{
          padding: "120px 24px",
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "var(--text-main)",
                marginBottom: "16px",
              }}
            >
              What we stand for
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              The core principles that drive our engineering and design.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px",
            }}
          >
            {[
              {
                icon: <FaRocket color="#FF6B35" size={30} />,
                title: "Speed First",
                desc: "Every architecture decision is heavily optimized for zero-latency, getting your users to results instantly.",
              },
              {
                icon: <FaShieldAlt color="#3B82F6" size={30} />,
                title: "Security Built In",
                desc: "Enterprise-grade best practices and secure-by-default logic are foundational, never treated as an afterthought.",
              },
              {
                icon: <FaPuzzlePiece color="#A855F7" size={30} />,
                title: "Modular by Design",
                desc: "Highly decoupled features. Easily scale up, add what you need, and gracefully skip what you don't.",
              },
              {
                icon: <FaBookOpen color="#10B981" size={30} />,
                title: "Open & Transparent",
                desc: "No black boxes or locked ecosystems. Clean, documented code that remains fully yours to modify.",
              },
              {
                icon: <FaBolt color="#FACC15" size={30} />,
                title: "Lightning Fast",
                desc: "Optimized rendering, efficient data flow, and seamless interactions deliver a smooth experience on every device.",
              },
              {
                icon: <FaCloud color="#06B6D4" size={30} />,
                title: "Cloud Ready",
                desc: "Deploy effortlessly across modern cloud platforms with scalable infrastructure and continuous integration support.",
              },
            ].map((v) => (
              <Tilt
                key={v.title}
                className="tilt-wrapper"
                tiltMaxAngleX={14} // Increased for better 3D angles
                tiltMaxAngleY={14} // Increased for better 3D angles
                perspective={1000}
                scale={1.02}
                transitionSpeed={2000}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="var(--text-main)"
                glarePosition="all"
                glareBorderRadius="16px"
              >
                <div className="premium-glow-card">
                  <div className="icon-wrapper">{v.icon}</div>
                  <h3
                    className="card-title-3d"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "800",
                      color: "var(--text-main)",
                      marginBottom: "12px",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="card-desc-3d"
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Interactive Components */}
      <div style={{ paddingBottom: "80px" }}>
        <Cards />
      </div>
    </div>
  );
}

export default About;
