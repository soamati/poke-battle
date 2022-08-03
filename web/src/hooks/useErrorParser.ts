import React from "react";

type State = {
  [property: string]: string[];
};

export default function useErrorParser(fields: string[]) {
  const [errors, setErrors] = React.useState<State>({});

  const parser = React.useCallback(
    (error: any) => {
      setErrors({});

      if (!error.response || !error.response.errors) return;

      const { errors } = error.response;
      if (!(errors instanceof Array)) return;

      errors.forEach((e) => {
        const validationErrors = e.extensions?.exception?.validationErrors;
        if (!(validationErrors instanceof Array)) return;

        validationErrors.forEach((v) => {
          const { property, constraints } = v;
          if (!fields.includes(property)) return;

          setErrors((prev) => ({
            ...prev,
            [property]: Object.values(constraints),
          }));
        });
      });
    },
    [fields]
  );

  return { errors, parser };
}
