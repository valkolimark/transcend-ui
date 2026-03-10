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
      }, 620);
    }
    prevTapping.current = tapping;
  }, [tapping, x, y]);

  return (
    <>
      {ripples.map(rip => (
        <div key={rip.id} style={{
          position: 'absolute',
          left: rip.x - 10,
          top: rip.y - 10,
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.55)',
          background: 'rgba(255,255,255,0.10)',
          animation: 'ripple 620ms ease-out forwards',
          pointerEvents: 'none',
          zIndex: 200,
        }} />
      ))}
      {/* Finger cursor icon */}
      <div style={{
        position: 'absolute',
        left: x - 8,
        top: y - 2,
        opacity: visible ? (tapping ? 1.0 : 0.75) : 0,
        transform: tapping ? 'scale(0.85)' : 'scale(1.0)',
        filter: tapping
          ? 'drop-shadow(0 0 8px rgba(255,255,255,0.70))'
          : 'drop-shadow(0 0 4px rgba(255,255,255,0.25))',
        transition: `
          left 480ms cubic-bezier(0.25,0.46,0.45,0.94),
          top 480ms cubic-bezier(0.25,0.46,0.45,0.94),
          transform 130ms ease-in,
          opacity 200ms ease
        `,
        pointerEvents: 'none',
        zIndex: 199,
      }}>
        <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
          {/* Index finger pointing down-left — a hand cursor */}
          <path d="M10 1C10 0.5 10.5 0 11 0h2c0.5 0 1 0.5 1 1v14h2c0.5 0 1 0.3 1 0.8V17c0 0 1-0.5 1.5-0.5S20 17 20 17v1.5c0 0 1-0.3 1.5-0.3S23 18.5 23 19v8c0 3-2 6-6 6h-4c-4 0-6-2-7-5l-2-5c-0.5-1.2 0-2.5 1.2-2.8 1.2-0.3 2.3 0.3 2.8 1.3l1 2V1z"
            fill="rgba(255,255,255,0.92)"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </>
  );
}
