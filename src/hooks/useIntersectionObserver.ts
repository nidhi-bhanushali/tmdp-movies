import { useEffect, useRef, useCallback } from "react";

interface IntersectionObserverOptions extends IntersectionObserverInit {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverOptions
): [(node: Element | null) => void] => {
  const observer = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<Element | null>(null);

  const setObserver = useCallback(
    (node: Element | null) => {
      elementRef.current = node;
      if (observer.current) {
        observer.current.disconnect();
      }
      if (node) {
        observer.current = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback(entry);
            }
          });
        }, options);
        observer.current.observe(node);
      }
    },
    [callback, options]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return [setObserver];
};

export default useIntersectionObserver;
