import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const Logger = () => {
  const { watch } = useFormContext();
  const formValues = watch();

  useEffect(() => {
    if (formValues) {
      console.log('formValues', formValues);
    }
  }, [formValues]);

  return null;
};
