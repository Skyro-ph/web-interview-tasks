import { useMemo, useRef } from 'react';

import { debounce } from '~shared/lib/debounce';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useMemo(
    () =>
      debounce(
        (...args: Parameters<T>) => callbackRef.current(...args),
        delay
      ) as T,
    [delay]
  );
}
