import { useState, useEffect, useRef } from 'react';

export default function CursorDot({ x, y, tapping, visible }) {
  const [ripples, setRipples] = useState([]);
  const prevTapping = useRef(false);

  useEffect(() => {
    if (tapping && !prevTapping.current) {
      const id = Date.now();
      setRipples(r => [...r, { id, x, y }]);
      setTimeout(() => {
        setRipples(r => r.filter(rip => rip.id !== id));
      }, 600);
    }
    prevTapping.current = tapping;
  }, [tapping, x, y]);

  return (
    <>
      {ripples.map(rip => (
        <div key={rip.id} style={{
          position: 'absolute',
          left: rip.x - 12,
          top: rip.y - 12,
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.50)',
          background: 'rgba(255,255,255,0.12)',
          animation: 'ripple 600ms ease-out forwards',
          pointerEvents: 'none',
          zIndex: 200,
        }} />
      ))}
      <div style={{
        position: 'absolute',
        left: x - 12,
        top: y - 12,
        width: 24,
        height: 24,
        borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.80)',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? (tapping ? 1.0 : 0.55) : 0,
        transform: tapping ? 'scale(0.7)' : 'scale(1.0)',
        boxShadow: tapping
          ? '0 0 14px rgba(255,255,255,0.70)'
          : '0 0 6px rgba(255,255,255,0.30)',
        transition: `
          left 500ms cubic-bezier(0.25,0.46,0.45,0.94),
          top 500ms cubic-bezier(0.25,0.46,0.45,0.94),
          transform 150ms ease,
          opacity 200ms ease
        `,
        pointerEvents: 'none',
        zIndex: 199,
      }}>
        <div style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.70)',
          opacity: tapping ? 1.0 : 0.55,
          transform: tapping ? 'scale(0.7)' : 'scale(1.0)',
          transition: 'transform 150ms ease, opacity 200ms ease',
        }} />
      </div>
    </>
  );
}
