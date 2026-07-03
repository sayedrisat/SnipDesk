import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const lineRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        lineRef.current.classList.add("drawn");
        gsap.delayedCall(0.6, () => innerRef.current.classList.add("visible"));
      },
    });

    return () => st.kill();
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="footer-line" ref={lineRef} />
      <div className="footer-inner" ref={innerRef}>
        <div className="footer-logo">SnipDesk</div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="/app">Open App</a>
          <a href="#">GitHub</a>
        </div>
        <div className="footer-copy">
          © 2026 SnipDesk · Made by Sayed Risat · MIT License
        </div>
      </div>
    </footer>
  );
}
