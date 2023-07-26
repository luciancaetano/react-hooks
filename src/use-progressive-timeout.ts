import { useState, useRef } from 'react';
import useCallbackRef from './use-callback-ref';

/**
 * A hook that returns a function that can be used to start a timeout that
 */
export interface IUseProgressiveTimeoutConfig {
  /**
   * A callback that is called on each step of the timeout.
   */
  onStep?: (percent: number) => void;
  /**
   * The number of milliseconds between each step of the timeout.
   */
  perStep?: number;
}

/**
 * A hook that returns a function that can be used to start a timeout that
 * progresses over time.
 * @param config The configuration for the timeout.
 * @returns A tuple containing a function to start the timeout, a function to
 * stop the timeout, and a boolean indicating whether or not the timeout is
 * currently in progress.
 */
export default function useProgressiveTimeout({
  onStep,
  perStep = 100,
}: IUseProgressiveTimeoutConfig): [(ms: number) => void, () => void, boolean] {
  const [inProgress, setInProgress] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);

  const startTimeout = useCallbackRef((ms: number) => {
    if (inProgress) return; // Only allow starting one timeout at a time
    setInProgress(true);
    progressRef.current = 0;

    const step = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - (startTimeRef.current || currentTime);
      const remainingTime = Math.max(0, ms - elapsedTime);

      const currentProgress = 100 - (remainingTime / ms) * 100;
      progressRef.current = currentProgress;

      if (onStep) {
        onStep(currentProgress);
      }

      if (remainingTime <= 0) {
        setInProgress(false);
        onStep?.(100);
      } else {
        timeoutRef.current = window.setTimeout(step, perStep);
      }
    };

    startTimeRef.current = Date.now();
    step();
  });

  const stopTimeout = useCallbackRef(() => {
    if (inProgress && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setInProgress(false);
      progressRef.current = 0;
    }
  });

  return [startTimeout, stopTimeout, inProgress];
}
