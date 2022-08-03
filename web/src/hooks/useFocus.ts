import React from "react";

export default function useFocus<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);

  const focus = React.useCallback(() => {
    const element = ref.current;
    if (!element) return;

    element.focus();
  }, []);

  React.useEffect(() => {
    focus();
  }, [focus]);

  return { ref, focus };
}
