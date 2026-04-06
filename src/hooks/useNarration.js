import { useEffect, useRef, useCallback } from 'react';

// Manifest is fetched once and cached for the lifetime of the app
let manifestCache = null;
let manifestLoading = null;

function loadManifest() {
  if (manifestCache) return Promise.resolve(manifestCache);
  if (manifestLoading) return manifestLoading;
  manifestLoading = fetch(`${import.meta.env.BASE_URL}narration/manifest.json`)
    .then(res => res.json())
    .then(m => { manifestCache = m; return m; })
    .catch(() => { manifestCache = {}; return {}; });
  return manifestLoading;
}

/**
 * useNarration — plays pre-generated Edge TTS audio files.
 *
 * speak(text, onEnd) — plays the MP3 for the given callout text.
 *   onEnd is called when playback finishes (or if no audio is found).
 * cancel() — stops any in-progress audio immediately.
 */
export function useNarration() {
  const audioRef    = useRef(null);
  const manifestRef = useRef(null);

  useEffect(() => {
    loadManifest().then(m => { manifestRef.current = m; });
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const speak = useCallback((text, onEnd) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    if (!text || !manifestRef.current) {
      if (onEnd) onEnd();
      return;
    }

    const path = manifestRef.current[text];
    if (!path) {
      console.warn(`[useNarration] No audio found for: "${text}"`);
      if (onEnd) onEnd();
      return;
    }

    const base  = import.meta.env.BASE_URL.replace(/\/$/, '');
    const audio = new Audio(`${base}${path}`);
    audioRef.current = audio;

    if (onEnd) {
      audio.onended = () => {
        audioRef.current = null;
        onEnd();
      };
      audio.onerror = () => {
        audioRef.current = null;
        onEnd();
      };
    } else {
      audio.onended = () => { audioRef.current = null; };
    }

    audio.play().catch(() => {
      // Autoplay blocked — fire onEnd so animation doesn't hang
      audioRef.current = null;
      if (onEnd) onEnd();
    });
  }, []);

  const cancel = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  return { speak, cancel };
}
