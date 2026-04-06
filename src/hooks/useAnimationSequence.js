import { useState, useEffect, useRef, useCallback } from 'react';
import { useNarration } from './useNarration';

/**
 * TTS-gated animation sequencer using pre-generated Edge TTS audio.
 *
 * Steps with callout text wait for audio playback to finish before advancing.
 * Steps with NO callout text use their duration (ms) as a setTimeout.
 *
 * @param {Array<{id: string, duration: number}>} steps
 * @param {Object} options
 * @param {boolean} options.started - animation does not begin until true
 * @param {Function} options.getCalloutText - (stepId) => string|null
 */
export function useAnimationSequence(steps, { started = false, getCalloutText } = {}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loopProgress, setLoopProgress] = useState(0);
  const advancingRef = useRef(false);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const mountedRef = useRef(true);
  const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);

  const { speak, cancel: cancelAudio } = useNarration();

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    cancelAudio();
    advancingRef.current = false;
  }, [cancelAudio]);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimers();
    };
  }, [clearTimers]);

  // Advance to the next step
  const advanceStep = useCallback((currentIdx) => {
    if (!mountedRef.current) return;
    advancingRef.current = false;

    const nextIdx = currentIdx + 1;
    if (nextIdx >= steps.length) {
      setFinished(true);
      setPlaying(false);
      setLoopProgress(1);
      return;
    }
    setStepIndex(nextIdx);
  }, [steps.length]);

  // Run the current step: show UI, speak if needed, then advance
  const runStep = useCallback((idx) => {
    if (!mountedRef.current || advancingRef.current) return;
    advancingRef.current = true;

    const step = steps[idx];
    if (!step) return;

    const calloutText = getCalloutText ? getCalloutText(step.id) : null;

    if (calloutText && calloutText.trim() !== '') {
      // Audio-gated: wait for narration to finish
      speak(calloutText, () => {
        if (mountedRef.current) advanceStep(idx);
      });
    } else {
      // No callout: use step duration as timeout
      timerRef.current = setTimeout(() => {
        if (mountedRef.current) advanceStep(idx);
      }, step.duration);
    }
  }, [steps, getCalloutText, speak, advanceStep]);

  // When stepIndex changes and we're playing, run the step
  useEffect(() => {
    if (!playing || finished) return;
    runStep(stepIndex);
  }, [stepIndex, playing, finished, runStep]);

  // Start when `started` flips to true
  useEffect(() => {
    if (started) {
      clearTimers();
      setStepIndex(0);
      setFinished(false);
      setPlaying(true);
      setLoopProgress(0);
      startTimeRef.current = Date.now();

      // Progress ticker
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Date.now() - startTimeRef.current;
          setLoopProgress(Math.min(elapsed / totalDuration, 1));
        }
      }, 50);
    } else {
      clearTimers();
      setStepIndex(0);
      setPlaying(false);
      setFinished(false);
      setLoopProgress(0);
    }

    return () => clearTimers();
  }, [started]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    currentStep: steps[stepIndex]?.id ?? steps[0].id,
    stepIndex,
    loopProgress,
    playing,
    finished,
    totalSteps: steps.length,
  };
}
