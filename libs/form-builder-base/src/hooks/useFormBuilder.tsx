import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormBaseContext } from '../FormBuilderBase';

export const useFormBuilder = () => {
  const methods = useFormContext();
  const builderFeatures = useContext(FormBaseContext);

  return { ...methods, ...builderFeatures };
};
