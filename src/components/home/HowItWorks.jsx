import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Capture the code",
    desc: "Paste a snippet, name it clearly, and add the reason you saved it.",
  },
  {
    num: "02",
    title: "Add the context",
    desc: "Attach language, tags, or collections so your vault mirrors the way you work.",
  },
  {
    num: "03",
    title: "Reuse with confidence",
    desc: "Search, open, copy, and get back to building in seconds.",
  },
];

export default function HowItWorks() {
  const labelRef = useRef(null);
  const stepsRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const labelST = ScrollTrigger.create({
      trigger: labelRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => labelRef.current.classList.add("visible"),
    });

    const stepsST = ScrollTrigger.create({
      trigger: stepsRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        stepsRef.current.classList.add("visible");
        stepRefs.current.forEach((el, i) => {
          gsap.delayedCall(
            (i * 180) / 1000,
            () => el && el.classList.add("visible"),
          );
        });
      },
    });

    return () => {
      labelST.kill();
      stepsST.kill();
    };
  }, []);

  return (
    <section id="how">
      <div className="how-inner">
        <p className="how-label" ref={labelRef}>
          // from idea to reuse
        </p>
        <div className="how-steps" ref={stepsRef}>
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className="how-step"
              ref={(el) => (stepRefs.current[i] = el)}>
              <span className="step-num">{s.num}</span>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
