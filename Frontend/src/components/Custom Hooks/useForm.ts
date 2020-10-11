/** @format */

import { useRef } from "react";

export const useForm = (initialValues: any) => {
  const values = useRef(initialValues);
  return {
    values: values,
    handleChange: (name: string, value: string) => {
      const currentState = {
        ...values.current,
        [name]: value,
      };
      values.current = currentState;
      return values;
    },
  };
};
