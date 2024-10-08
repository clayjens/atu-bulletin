import { useEffect, useRef } from "react";

/**
 * Debounces a function.
 * @param callback The function to debounce.
 * @param delay The delay in milliseconds.
 * @returns A debounced function.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function useDebounce(callback: Function, delay: number) {
  const timeoutRef = useRef<number | null>(null);

  const debouncedFunction = (...args: unknown[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}
