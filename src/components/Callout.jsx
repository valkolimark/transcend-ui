import { useState, useEffect, useRef } from 'react';

/**
 * Callout bubble — floating pill with pointer arrow.
 * Only one callout renders at a time.
 * New text triggers fadeOut then fadeIn via key remount.
 */
export default function Callout({ text, visible }) {
  const [displayText, setDisplayText] = useState('');
  const [animState, setAnimState] = useState('idle');
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
        pendingRef.current = text;
        setAnimState('fadeOut');
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setDisplayText(pendingRef.current);
          setAnimState('fadeIn');
          pendingRef.current = null;
        }, 200);
      } else if (!displayText) {
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
    ? 'calloutIn 0.3s ease both'
    : animState === 'fadeOut'
    ? 'calloutOut 0.2s ease-in both'
    : 'none';

  return (
    <div
      className="callout-bubble"
      style={{ animation }}
      key={displayText}
    >
      {displayText}
    </div>
  );
}
