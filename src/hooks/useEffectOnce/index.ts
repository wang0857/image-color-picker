import { useEffect, useRef, useState } from "react";

/**
 * Limit the `useEffect` to happen once.
 * The `useEffectOnce` will happen at the very beginning.
 */
export function useEffectOnce(effectFunction: () => void | (() => void)) {
  const destroyFunction = useRef<void | (() => void)>(null);
  const effectCalled = useRef(false);
  const isRendered = useRef(false);
  const [_, setRefreshTimes] = useState<number>(0);

  if (effectCalled.current) {
    isRendered.current = true;
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunction.current = effectFunction();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setRefreshTimes((previousTimes) => previousTimes + 1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!isRendered.current) return;
      if (destroyFunction.current) destroyFunction.current();
    };
  }, []);
}
