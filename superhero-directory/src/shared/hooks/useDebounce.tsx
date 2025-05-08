import { useCallback, useEffect, useRef } from 'react';

type UseDebounce = (cb: (props?: any) => void, delay: number) => Function;

export const useDebounce: UseDebounce = (cb, delay = 300) => {
  const timeout = useRef<number | null>(null);
  const callback = useRef<Function | null>(null);

  useEffect(() => {
    callback.current = cb;
  }, []);

  return useCallback((...args: typeof cb.arguments) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      if (callback.current) {
        callback.current(...args);
      }
    }, delay);
  }, [delay]);
};
