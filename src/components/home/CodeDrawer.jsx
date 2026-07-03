import { forwardRef, useEffect, useRef, useState } from 'react';

const TYPED_TEXT = ' // ✓ saved';

const CodeDrawer = forwardRef(function CodeDrawer({ active }, ref) {
  const [typedChars, setTypedChars] = useState('');
  const typedRef = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (active && !typedRef.current) {
      typedRef.current = true;
      let i = 0;
      intervalRef.current = setInterval(() => {
        if (i < TYPED_TEXT.length) {
          i += 1;
          setTypedChars(TYPED_TEXT.slice(0, i));
        } else {
          clearInterval(intervalRef.current);
        }
      }, 55);
    } else if (!active) {
      typedRef.current = false;
      setTypedChars('');
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [active]);

  return (
    <div ref={ref} className={`app-drawer${active ? ' in' : ''}`}>
      <div className="drawer-header">
        <div className="drawer-title">useDebounce.ts</div>
        <div className="drawer-copy">⎘ Copy</div>
      </div>
      <div className="code-area">
        <div className="code-line"><span className="code-ln">1</span><span className="cm">// Debounce hook — no external deps</span></div>
        <div className="code-line"><span className="code-ln">2</span><span className="kw">import</span> {'{ useState, useEffect }'} <span className="kw">from</span> <span className="str">'react'</span></div>
        <div className="code-line"><span className="code-ln">3</span></div>
        <div className="code-line"><span className="code-ln">4</span><span className="kw">export function</span> <span className="fn">useDebounce</span>&lt;T&gt;(</div>
        <div className="code-line"><span className="code-ln">5</span>&nbsp;&nbsp;value: T, delay: <span className="kw">number</span></div>
        <div className="code-line"><span className="code-ln">6</span>): T {'{'}</div>
        <div className="code-line"><span className="code-ln">7</span>&nbsp;&nbsp;<span className="kw">const</span> [debounced, setDebounced] =</div>
        <div className="code-line"><span className="code-ln">8</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="fn">useState</span>&lt;T&gt;(value)</div>
        <div className="code-line"><span className="code-ln">9</span></div>
        <div className="code-line"><span className="code-ln">10</span>&nbsp;&nbsp;<span className="fn">useEffect</span>(() =&gt; {'{'}</div>
        <div className="code-line"><span className="code-ln">11</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">const</span> t = <span className="fn">setTimeout</span>(() =&gt; {'{'}</div>
        <div className="code-line"><span className="code-ln">12</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="fn">setDebounced</span>(value)</div>
        <div className="code-line"><span className="code-ln">13</span>&nbsp;&nbsp;&nbsp;&nbsp;{'}'}, delay)</div>
        <div className="code-line"><span className="code-ln">14</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">return</span> () =&gt; <span className="fn">clearTimeout</span>(t)</div>
        <div className="code-line"><span className="code-ln">15</span>&nbsp;&nbsp;{'}'}, [value, delay])</div>
        <div className="code-line"><span className="code-ln">16</span></div>
        <div className="code-line">
          <span className="code-ln">17</span>&nbsp;&nbsp;<span className="kw">return</span> debounced{' '}
          <span id="type-target">
            <span className="type-text">{typedChars}</span>
            {typedRef.current && <span className="cursor-blink" />}
          </span>
        </div>
      </div>
    </div>
  );
});

export default CodeDrawer;
