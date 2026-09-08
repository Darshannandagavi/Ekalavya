import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Contact from "./Contact";
import EkalavyaHScroll from "./EkalavyaHScroll";
import About from "./About";


const LEFT_THUMBS = [
  {
    id: 1,
    src: "https://media.istockphoto.com/id/2004420404/video/watching-online-video-conference-meeting.mp4?s=mp4-640x640-is&k=20&c=F9ZJ3CLdXER1I0NIUcexikm0VCe6ABvcC6ieFMibmjY=",
    style: {
      top: "5%",
      left: "22%",
      width: "13%",
      aspectRatio: "3/4",
    },
  },
  {
    id: 2,
    src: "https://media.istockphoto.com/id/2205643620/video/young-woman-learns-mathematics-online-at-home.mp4?s=mp4-640x640-is&k=20&c=O1fnh4PCk_dT7PGPVTEFdPTWlOuY-mnwMoN38xrA58U=",
    style: {
      top: "38%",
      left: "10%",
      width: "14%",
      aspectRatio: "4/3",
    },
  },
  {
    id: 3,
    src: "https://media.istockphoto.com/id/2170364413/video/futuristic-laboratory-patient-wearing-headset-research-shows-brain-activity-during-scanning.mp4?s=mp4-640x640-is&k=20&c=P2WKiYo3mATRNndlGQetvOdQRRrGT4RiFzKkc01O8zc=",
    style: {
      bottom: "8%",
      left: "15%",
      width: "11%",
      aspectRatio: "4/3",
    },
  },
];

const RIGHT_THUMBS = [
  {
    id: 4,
    src: "https://media.istockphoto.com/id/1293858390/video/girl-control-robot-arm-on-digital-tablet-getting-a-lesson-in-robotics-in-high-school.mp4?s=mp4-640x640-is&k=20&c=rQgt81jQQ872WeDoCKmGVmQSWnBIaF2bdFXIfG15UQ0=",
    style: {
      top: "10%",
      right: "12%",
      width: "20%",
      aspectRatio: "16/9",
    },
  },
  {
    id: 5,
    src: "https://media.istockphoto.com/id/2161467517/video/satisfaction-document-checklist-database-contract-checkbox-insurance-manager-technology.mp4?s=mp4-640x640-is&k=20&c=gnNqY6yOp39PT9CxuoqDlMkQtzxfHHHMi4703LZ7ZQc=",
    style: {
      top: "38%",
      right: "8%",
      width: "18%",
      aspectRatio: "4/3",
    },
  },
];

const BOTTOM_CENTER_THUMBS = [
  {
    id: 6,
    src: "https://res.cloudinary.com/dhcb4ivxo/video/upload/v1782371427/15360535_1920_1080_100fps_qasggr.mp4",
    style: {
      bottom: "0%",
      left: "50%",
      width: "25%",
      height: "38%",
      transform: "translateX(-50%)",
      transformOrigin: "bottom center",
      borderRadius: "5px",
      zIndex: 1,
    },
  },
];

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function Home() {
  const sectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const overlayRef = useRef(null);

  const leftThumbRefs = useRef([]);
  const rightThumbRefs = useRef([]);
  const centerThumbRefs = useRef([]);

  // Keep a ref to lenis scroll value so the animation callback can read it
  const lenisScrollY = useRef(0);

  useEffect(() => {
    // ── 1. Init Lenis ──────────────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // ── 2. Keep lenisScrollY in sync ───────────────────────────────────────────
    lenis.on("scroll", ({ scroll }) => {
      lenisScrollY.current = scroll;
    });

    // ── 3. Animation updater (reads Lenis scroll, not window.scrollY) ──────────
    const updateAnimation = () => {
      const progress = Math.min(
        Math.max(lenisScrollY.current / (window.innerHeight * 0.8), 0),
        1
      );
      const e = easeInOut(progress);

      // TEXT FADE
      if (heroTextRef.current) {
        heroTextRef.current.style.opacity = Math.max(0, 1 - progress * 4);
        heroTextRef.current.style.transform = `translateY(${e * 40}px)`;
      }

      // OVERLAY
      if (overlayRef.current) {
        overlayRef.current.style.background = `rgba(0,0,0,${e * 0.35})`;
      }

      // LEFT THUMBS
      leftThumbRefs.current.forEach((el, i) => {
        if (!el) return;
        const delay = i * 0.05;
        const p = Math.min(1, Math.max(0, (progress - delay) / 0.45));
        const ep = easeInOut(p);
        el.style.transform = `translateX(${-150 * ep}%) scale(${1 - ep * 0.08})`;
        el.style.opacity = 1 - ep;
        el.style.filter = `blur(${25 * ep}px)`;
      });

      // RIGHT THUMBS
      rightThumbRefs.current.forEach((el, i) => {
        if (!el) return;
        const delay = i * 0.05;
        const p = Math.min(1, Math.max(0, (progress - delay) / 0.45));
        const ep = easeInOut(p);
        el.style.transform = `translateX(${150 * ep}%) scale(${1 - ep * 0.08})`;
        el.style.opacity = 1 - ep;
        el.style.filter = `blur(${25 * ep}px)`;
      });

      // BOTTOM CENTER THUMB
      centerThumbRefs.current.forEach((el) => {
        if (!el) return;
        const startW = 25;
        const startH = 38;
        const width = startW + (100 - startW) * e;
        const height = startH + (100 - startH) * e;
        el.style.width = `${width}%`;
        el.style.height = `${height}%`;
        el.style.borderRadius = "5px";
      });
    };

    // ── 4. RAF loop — drives both Lenis and our animation ─────────────────────
    let rafId;
    const raf = (time) => {
      lenis.raf(time);       // advance Lenis
      updateAnimation();     // sync scroll-driven animation
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // ── 5. Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "170vh",
        background: "var(--bg-main)",
        transition: "background 0.4s ease",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* DARK OVERLAY */}
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--bg-main)",
            transition: "background 0.4s ease",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {/* TEXT */}
        <div
          ref={heroTextRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 4,
            pointerEvents: "none",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(32px,5vw,85px)",
              fontWeight: 300,
              color: "var(--text-main)",
              transition: "background 0.4s ease",
              margin: 0,
              fontFamily: "Georgia, serif",
              mixBlendMode: "difference",
            }}
          >
            No Student Left Behind.
          </h1>

          <p
            style={{
              color: "var(--text-main)",
              marginTop: "18px",
              fontSize: "15px",
              letterSpacing: "1px",
            }}
          >
            Access every university note, every course, and every semester—all in one place.
          </p>
        </div>

        {/* LEFT THUMBNAILS */}
        {LEFT_THUMBS.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (leftThumbRefs.current[i] = el)}
            style={{
              position: "absolute",
              overflow: "hidden",
              borderRadius: "5px",
              zIndex: 1,
              ...item.style,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          </div>
        ))}

        {/* RIGHT THUMBNAILS */}
        {RIGHT_THUMBS.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (rightThumbRefs.current[i] = el)}
            style={{
              position: "absolute",
              overflow: "hidden",
              borderRadius: "5px",
              zIndex: 1,
              ...item.style,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          </div>
        ))}

        {/* BOTTOM CENTER THUMBNAIL */}
        {BOTTOM_CENTER_THUMBS.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (centerThumbRefs.current[i] = el)}
            style={{
              position: "absolute",
              overflow: "hidden",
              zIndex: 1,
              ...item.style,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
      {/* <Services/> */}
      <div style={{marginTop:"10vh"}}>
        <EkalavyaHScroll/>
      </div>
      <About/>
      <Contact/>
    </section>
    
  );
}