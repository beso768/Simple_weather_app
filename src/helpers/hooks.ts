import { useEffect, useCallback } from "react";

export function useDebounce(
  effect: () => void,
  dependencies: Array<string>,
  delay: number
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

export function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement> | null,
  handler: Function
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref?.current == null || ref.current.contains(e.target as Node)) {
        return;
      }

      handler(e);
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
