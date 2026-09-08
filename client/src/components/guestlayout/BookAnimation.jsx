import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 300;

export default function BookAnimation() {
  const canvasRef = useRef(null);
  const images = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load images
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();

      img.src = `/BookFrames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

      images.current.push(img);
    }

    const drawImage = (index) => {
      const img = images.current[index];

      if (!img || !img.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      context.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
      );
    };

    images.current[0].onload = () => drawImage(0);

    const playhead = {
      frame: 0,
    };

    gsap.to(playhead, {
      frame: FRAME_COUNT - 1,
      ease: "none",

      snap: "frame",

      scrollTrigger: {
        trigger: ".book-section",
        start: "top top",
        end: "+=5000",
        scrub: true,
        pin: true,
      },

      onUpdate: () => {
        drawImage(playhead.frame);
      },
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      drawImage(playhead.frame);
    };

    window.addEventListener("resize", resize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="book-page">
    

      <section className="book-section">
        <canvas ref={canvasRef} />
      </section>

     
      <style>
        {`
        body {
  margin: 0;
  overflow-x: hidden;
  background: #000;
}

.before,
.after {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 4rem;
  background: #111;
}

.book-section {
  height: 100vh;
  position: relative;
  background: black;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}
        `}
      </style>
    </div>
  );
}