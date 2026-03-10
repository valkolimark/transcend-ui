import { useState, useEffect, useRef, useCallback } from 'react';

export function useAnimationSequence(steps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [finished, setFinished] = useState(false);
  const [loopProgress, setLoopProgress] = useState(0);
  const timeoutsRef = useRef([]);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const elapsedBeforePauseRef = useRef(0);
  const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);

  // Compute cumulative start times for each step
  const stepStarts = useRef([]);
  if (stepStarts.current.length !== steps.length) {
    let cum = 0;
    stepStarts.current = steps.map(s => {
      const start = cum;
      cum += s.duration;
      return start;
    });
  }

  const clearAllTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Schedule remaining steps from a given elapsed time
  const scheduleFrom = useCallback((elapsedMs) => {
    clearAllTimers();
    startTimeRef.current = Date.now() - elapsedMs;

    // Find current step at this elapsed time
    let currentIdx = 0;
    for (let i = steps.length - 1; i >= 0; i--) {
      if (elapsedMs >= stepStarts.current[i]) {
        currentIdx = i;
        break;
      }
    }
    setStepIndex(currentIdx);

    // Schedule future steps
    steps.forEach((step, i) => {
      const delay = stepStarts.current[i] - elapsedMs;
      if (delay > 0) {
        const t = setTimeout(() => setStepIndex(i), delay);
        timeoutsRef.current.push(t);
      }
    });

    // Schedule finish
    const finishDelay = totalDuration - elapsedMs;
    if (finishDelay > 0) {
      const t = setTimeout(() => {
        setFinished(true);
        setPlaying(false);
      }, finishDelay);
      timeoutsRef.current.push(t);
    }

    // Progress ticker
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setLoopProgress(Math.min(elapsed / totalDuration, 1));
    }, 50);
  }, [steps, totalDuration, clearAllTimers]);

  // Initial start
  useEffect(() => {
    elapsedBeforePauseRef.current = 0;
    setStepIndex(0);
    setPlaying(true);
    setFinished(false);
    setLoopProgress(0);
    scheduleFrom(0);

    return clearAllTimers;
  }, [steps]);

  // Play / Pause
  const play = useCallback(() => {
    if (finished) {
      // Restart from beginning
      elapsedBeforePauseRef.current = 0;
      setFinished(false);
      setPlaying(true);
      setLoopProgress(0);
      scheduleFrom(0);
    } else {
      setPlaying(true);
      scheduleFrom(elapsedBeforePauseRef.current);
    }
  }, [finished, scheduleFrom]);

  const pause = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    elapsedBeforePauseRef.current = Math.min(elapsed, totalDuration);
    setPlaying(false);
    clearAllTimers();
  }, [totalDuration, clearAllTimers]);

  const skipTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, steps.length - 1));
    const elapsed = stepStarts.current[clamped];
    elapsedBeforePauseRef.current = elapsed;
    setFinished(false);

    if (playing) {
      scheduleFrom(elapsed);
    } else {
      // Just jump to the step visually
      setStepIndex(clamped);
      setLoopProgress(elapsed / totalDuration);
    }
  }, [steps, totalDuration, playing, scheduleFrom]);

  const skipForward = useCallback(() => {
    const next = Math.min(stepIndex + 1, steps.length - 1);
    skipTo(next);
  }, [stepIndex, steps.length, skipTo]);

  const skipBack = useCallback(() => {
    const prev = Math.max(stepIndex - 1, 0);
    skipTo(prev);
  }, [stepIndex, skipTo]);

  const restart = useCallback(() => {
    elapsedBeforePauseRef.current = 0;
    setFinished(false);
    setPlaying(true);
    setLoopProgress(0);
    scheduleFrom(0);
  }, [scheduleFrom]);

  return {
    currentStep: steps[stepIndex]?.id ?? steps[0].id,
    stepIndex,
    loopProgress,
    playing,
    finished,
    play,
    pause,
    skipForward,
    skipBack,
    restart,
    totalSteps: steps.length,
  };
}
