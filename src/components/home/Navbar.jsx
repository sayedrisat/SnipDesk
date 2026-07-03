import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMagneticButton from "../../hooks/useMagneticButton.js";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const ctaRef = useMagneticButton();

  useEffect(() => {
    const nav = navRef.current;

    const tween = gsap.delayedCall(0.6, () => {
      nav.classList.add("visible");
    });

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: () => {
        nav.classList.toggle("scrolled", window.scrollY > 60);
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, []);

  return (
    <nav ref={navRef} id="navbar">
      <div className="nav-logo">CodeVault</div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#how">How it works</a>
        <a href="#showcase">Showcase</a>
      </div>
      <a href="/app">
        <button ref={ctaRef} className="nav-cta mag-btn">
          Open App
        </button>
      </a>
    </nav>
  );
}
