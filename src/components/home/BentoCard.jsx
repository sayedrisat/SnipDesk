import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BentoCard({ icon, title, desc, wide, tall, delay = 0, children }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const st = ScrollTrigger.create({
      trigger: card,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.delayedCall(delay / 1000, () => card.classList.add('visible'));
      },
    });

    const handleMouseMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
      const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1);
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    };
    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      st.kill();
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [delay]);

  const classes = ['bento-card', wide && 'wide', tall && 'tall'].filter(Boolean).join(' ');

  return (
    <div ref={cardRef} className={classes}>
      <div className="bento-icon">{icon}</div>
      <div className="bento-title">{title}</div>
      <div className="bento-desc">{desc}</div>
      {children}
    </div>
  );
}
