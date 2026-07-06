import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Replicates the original magnetic button behaviour:
 * on mousemove the button translates 25% of the distance between the
 * cursor and the button's center; on mouseleave it springs back to 0,0.
 */
export default function useMagneticButton() {
  const ref = useRef(null);

  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.25;
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power3.out' });
    };
    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
}
