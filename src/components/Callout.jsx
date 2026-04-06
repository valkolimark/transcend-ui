import { useState, useEffect, useRef } from 'react';

/**
 * Callout component — only one renders at a time.
 * New text replaces previous with fadeOutUp (200ms) then fadeInUp.
 * TTS is handled by useAnimationSequence, not here.
 */
export default function Callout({ text, visible }) {
  const [displayText, setDisplayText] = useState('');
  const [animState, setAnimState] = useState('idle'); // 'idle' | 'fadeOut' | 'fadeIn'
  const pendingRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (visible && text) {
      if (displayText && displayText !== text) {
        // Fade out old, then fade in new
        pendingRef.current = text;
        setAnimState('fadeOut');
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setDisplayText(pendingRef.current);
          setAnimState('fadeIn');
          pendingRef.current = null;
        }, 200);
      } else if (!displayText) {
        // No old text — fade in directly
        setDisplayText(text);
        setAnimState('fadeIn');
      }
    } else if (!visible) {
      if (displayText) {
        setAnimState('fadeOut');
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setDisplayText('');
          setAnimState('idle');
        }, 200);
      }
    }
  }, [text, visible]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!displayText && animState === 'idle') return null;

  const animation = animState === 'fadeIn'
    ? 'fadeInUp 340ms cubic-bezier(0.34,1.2,0.64,1) forwards'
    : animState === 'fadeOut'
    ? 'fadeOutUp 200ms ease-in forwards'
    : 'none';

  return (
    <div style={{
      position: 'absolute',
      top: -52,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      pointerEvents: 'none',
      animation,
    }}>
      <div style={{
        background: 'rgba(10, 12, 20, 0.92)',
        border: '1px solid rgba(65, 105, 225, 0.40)',
        borderRadius: 22,
        padding: '8px 20px',
        minWidth: 180,
        maxWidth: 420,
        boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          fontSize: 13,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'center',
          fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
        }}>
          {displayText}
        </span>
      </div>
    </div>
  );
}
