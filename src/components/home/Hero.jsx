import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodeTokens from "./CodeTokens.jsx";
import useMagneticButton from "../../hooks/useMagneticButton.js";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const gridRef = useRef(null);
  const pillRef = useRef(null);
  const w1Ref = useRef(null);
  const w2Ref = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const freeRef = useRef(null);
  const scrollLineRef = useRef(null);
  const primaryBtnRef = useMagneticButton();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.call(() => pillRef.current.classList.add("visible"), null, 0.2)
      .call(() => w1Ref.current.classList.add("revealed"), null, 0.6)
      .call(() => w2Ref.current.classList.add("revealed"), null, 0.9)
      .call(() => w2Ref.current.classList.add("glint"), null, 1.9)
      .call(() => subRef.current.classList.add("visible"), null, 1.3)
      .call(() => btnsRef.current.classList.add("visible"), null, 1.6)
      .call(() => freeRef.current.classList.add("visible"), null, 1.9)
      .call(() => scrollLineRef.current.classList.add("visible"), null, 2.1);

    const parallaxTween = gsap.to(gridRef.current, {
      y: () => window.innerHeight * 2 * 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
      parallaxTween.scrollTrigger && parallaxTween.scrollTrigger.kill();
      parallaxTween.kill();
    };
  }, []);

  return (
    <section id="hero">
      <div ref={gridRef} className="hero-grid parallax-slow" />
      <div className="hero-glow" />

      <CodeTokens />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <div ref={pillRef} className="hero-pill">
          <span className="pill-dot" />
          // free forever · no account needed
        </div>

        <h1 className="hero-h1">
          <span className="line">
            <span ref={w1Ref} className="word-wrap">
              Save code.
            </span>
          </span>
          <span className="line">
            <em
              ref={w2Ref}
              className="word-wrap py-[4px]"
              data-text="Recall it instantly.">
              Recall it instantly.
            </em>
          </span>
        </h1>

        <p ref={subRef} className="hero-sub">
          CodeVault is your personal code memory: a focused place to keep
          snippets, commands, patterns, and fixes you reuse every week.
        </p>

        <div ref={btnsRef} className="hero-btns">
          <a href="/app">
            <button ref={primaryBtnRef} className="btn-primary mag-btn">
              Open App <span style={{ fontSize: 16 }}>→</span>
            </button>
          </a>
          <button className="btn-ghost">View on GitHub</button>
        </div>

        <p ref={freeRef} className="hero-free">
          Free forever · No account · No limits
        </p>
      </div>

      <div ref={scrollLineRef} className="scroll-line">
        <div className="line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
