import { useEffect, useRef } from 'react';
import { createHash } from '../utils/audioHash';

const basePath = import.meta.env.BASE_URL || '/';
let currentAudio = null;

function playVoice(text, voice) {
  if (!text || voice === 'off') return;

  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  const key = createHash(text);
  const url = `${basePath}audio/${voice}/${key}.mp3`;

  const audio = new Audio(url);
  audio.volume = 0.9;
  currentAudio = audio;
  audio.play().catch(() => {
    // Audio file not found — fall back to Web Speech API
    fallbackSpeak(text);
  });
  audio.onended = () => { currentAudio = null; };
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  window.speechSynthesis?.cancel();
}

function fallbackSpeak(text) {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.88;
  utter.pitch = 1.05;
  utter.volume = 0.9;

  const pickVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const samantha = voices.find(v => /samantha/i.test(v.name));
    const enUS = voices.find(v => v.lang === 'en-US');
    const enAny = voices.find(v => v.lang.startsWith('en'));
    utter.voice = samantha || enUS || enAny || null;
    window.speechSynthesis.speak(utter);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    pickVoice();
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      pickVoice();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }
}

export default function Callout({ text, visible, voice = 'ava' }) {
  const lastSpoken = useRef('');

  useEffect(() => {
    if (visible && text && text !== lastSpoken.current) {
      lastSpoken.current = text;
      playVoice(text, voice);
    }
    if (!visible) {
      lastSpoken.current = '';
    }
  }, [text, visible, voice]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAudio();
  }, []);

  if (!text) return null;

  return (
    <div style={{
      position: 'absolute',
      top: -52,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      pointerEvents: 'none',
      animation: visible
        ? 'fadeInDown 340ms cubic-bezier(0.34,1.2,0.64,1) forwards'
        : 'fadeOutUp 180ms ease-in forwards',
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
          {text}
        </span>
      </div>
    </div>
  );
}
