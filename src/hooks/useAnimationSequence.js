import { useState, useEffect, useRef } from 'react';

export function useAnimationSequence(steps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [loopProgress, setLoopProgress] = useState(0);
  const startTimeRef = useRef(Date.now());
  const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    let cumulative = 0;
    const timeouts = [];

    steps.forEach((step, i) => {
      const t = setTimeout(() => setStepIndex(i), cumulative);
      timeouts.push(t);
      cumulative += step.duration;
    });

    // Loop restart
    const loopTimeout = setTimeout(() => {
      setStepIndex(0);
      startTimeRef.current = Date.now();
    }, totalDuration);
    timeouts.push(loopTimeout);

    // Progress ticker
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setLoopProgress(Math.min(elapsed / totalDuration, 1));
    }, 50);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return {
    currentStep: steps[stepIndex]?.id ?? steps[0].id,
    stepIndex,
    loopProgress,
  };
}
