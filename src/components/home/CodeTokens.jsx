const TOKENS = [
  { text: 'const', left: '8%', top: '20%', op: 0.07, duration: '9s', delay: '0s' },
  { text: 'async', left: '85%', top: '30%', op: 0.06, duration: '11s', delay: '2s' },
  { text: '=>', left: '15%', top: '65%', op: 0.05, duration: '13s', delay: '4s' },
  { text: 'import', left: '78%', top: '70%', op: 0.07, duration: '10s', delay: '1s' },
  { text: 'return', left: '50%', top: '80%', op: 0.05, duration: '12s', delay: '3s' },
  { text: '{}', left: '30%', top: '15%', op: 0.06, duration: '8s', delay: '5s' },
  { text: 'null', left: '65%', top: '12%', op: 0.05, duration: '14s', delay: '2.5s' },
  { text: 'export', left: '90%', top: '55%', op: 0.04, duration: '10s', delay: '6s' },
];

export default function CodeTokens() {
  return (
    <>
      {TOKENS.map((t, i) => (
        <div
          key={i}
          className="token"
          style={{
            left: t.left,
            top: t.top,
            '--tok-op': t.op,
            animationDuration: t.duration,
            animationDelay: t.delay,
          }}
        >
          {t.text}
        </div>
      ))}
    </>
  );
}
