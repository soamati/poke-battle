import React from "react";

export default function useInput(initialValue?: string) {
  const [value, setValue] = React.useState(initialValue ?? "");

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return [value, onChange] as const;
}
