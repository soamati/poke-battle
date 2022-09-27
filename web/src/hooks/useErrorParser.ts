import { useToast } from "@chakra-ui/react";
import React from "react";

const VALIDATION_ERROR = "Argument Validation Error";

type State = {
  [property: string]: string[];
};

type Options = {
  withToast: boolean;
};

export default function useErrorParser(fields: string[], options?: Options) {
  const [errors, setErrors] = React.useState<State>({});
  const toast = useToast();

  const parser = React.useCallback(
    (error: any) => {
      setErrors({});

      if (!error.response || !error.response.errors) return;

      const { errors } = error.response;
      if (!(errors instanceof Array)) return;

      errors.forEach((e, i) => {
        if (i === 0 && options?.withToast) {
          const description =
            e.message !== VALIDATION_ERROR ? e.message : "Algo salió mal";

          toast({
            title: "Ups!",
            description,
            status: "warning",
          });
        }

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
    [fields, options, toast]
  );

  return { errors, parser };
}
