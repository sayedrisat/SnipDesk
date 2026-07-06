import { useCallback, useRef, useState } from 'react';

export default function useToast(duration = 1800) {
  const [message, setMessage] = useState(null);
  const timerRef = useRef(null);

  const show = useCallback((text) => {
    setMessage(text);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMessage(null), duration);
  }, [duration]);

  return { message, show };
}
