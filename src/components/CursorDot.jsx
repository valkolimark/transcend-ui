import { useState, useEffect, useRef } from 'react';

/**
 * CursorDot — positions relative to the TranscendUI container.
 *
 * x/y are in the 480x320 coordinate space from CHAPTERS.md.
 * uiRef is a ref to the TranscendUI wrapper div; we use its bounding rect
 * to convert chapter coordinates to viewport coordinates.
 */
export default function CursorDot({ x, y, tapping, visible, uiRef }) {
  const [ripples, setRipples] = useState([]);
  const [viewportPos, setViewportPos] = useState({ vx: 0, vy: 0 });
  const prevTapping = useRef(false);
  const rafRef = useRef(null);

  // Convert chapter coords (480x320) to viewport coords using uiRef bounding rect
  useEffect(() => {
    const update = () => {
      if (uiRef?.current) {
        const rect = uiRef.current.getBoundingClientRect();
        const vx = rect.left + (x / 480) * rect.width;
        const vy = rect.top + (y / 320) * rect.height;
        setViewportPos({ vx, vy });
      }
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y, uiRef]);

  // Ripple on tap
  useEffect(() => {
    if (tapping && !prevTapping.current) {
      const id = Date.now();
      setRipples(r => [...r, { id }]);
      setTimeout(() => {
        setRipples(r => r.filter(rip => rip.id !== id));
      }, 620);
    }
    prevTapping.current = tapping;
  }, [tapping]);

  return (
    <>
      {ripples.map(rip => (
        <div key={rip.id} style={{
          position: 'fixed',
          left: viewportPos.vx - 10,
          top: viewportPos.vy - 10,
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
        position: 'fixed',
        left: viewportPos.vx - 8,
        top: viewportPos.vy - 2,
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
