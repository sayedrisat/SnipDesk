import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMagneticButton from "../../hooks/useMagneticButton.js";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const boxRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const btnWrapRef = useRef(null);
  const btnRef = useMagneticButton();

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: boxRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        headingRef.current.classList.add("visible");
        subRef.current.classList.add("visible");
        btnWrapRef.current.classList.add("visible");
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="cta">
      <div className="cta-box" ref={boxRef}>
        <div className="cta-border" />
        <div className="cta-glow" />
        <h2 className="cta-h" ref={headingRef}>
          Keep your best code
          <br />
          within reach.
        </h2>
        <p className="cta-sub" ref={subRef}>
          Free forever · Made by Sayed Risat
        </p>
        <div className="cta-btn-wrap" ref={btnWrapRef}>
          <a href="/app">
            <button
              ref={btnRef}
              className="btn-primary mag-btn"
              style={{ margin: "0 auto", fontSize: 14, padding: "16px 36px" }}>
              Open App <span style={{ fontSize: 18 }}>→</span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
