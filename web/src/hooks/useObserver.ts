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
  const observerRef = React.useRef(new IntersectionObserver(callback, options));

  React.useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = observerRef.current;
    observer.observe(target);

    return function cleanup() {
      if (observer) {
        console.log("Disconnecting observer...");
        observer.disconnect();
      }
    };
    // eslint-disable-next-line
  }, [...deps]);

  return { ref };
}

export default useObserver;
