import React from "react";

/**
 * @important use only in dynamic-imported components with { ssr: false }
 */
function useObserver<T extends HTMLElement>(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = { root: null },
  deps: any[] = []
) {
  const ref = React.useRef<T | null>(null);

  const observer = React.useMemo(() => {
    return new IntersectionObserver(callback, options);
  }, [callback, options]);

  React.useEffect(() => {
    const target = ref.current;
    if (!target) return;

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, [...deps]);

  return { ref };
}

export default useObserver;
