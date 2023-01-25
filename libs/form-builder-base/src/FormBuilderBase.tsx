import { ArbitraryState, LookupType } from '@daohaus/utils';
import { DevTool } from '@hookform/devtools';
import React, { ReactNode } from 'react';
import {
  useForm,
  ValidationMode,
  FormProvider as RHFProvider,
  FieldValues,
} from 'react-hook-form';
import { FormBuilderFactory } from './components/FormBuilderFactory';
import { Logger } from './components/Logger';
import { FormLego } from './utils/types';

type BaseContext = {
  form: FormLego;
  requiredFields: Record<string, boolean>;
  formDisabled: boolean;
  submitDisabled: boolean;
  isLoading: boolean;
  fieldObj: LookupType;
};

const FAKE_FORM: FormLego = {
  id: 'FAKE_FORM',
  title: 'Form Title',
  description: 'Form Description',
  subtitle: 'Form Subtitle',
  fields: [],
};

export const FormBaseContext = React.createContext<BaseContext>({
  form: FAKE_FORM,
  requiredFields: {},
  formDisabled: false,
  submitDisabled: false,
  isLoading: false,
  fieldObj: {},
});

type FormBaseProps = {
  form: FormLego;
  fieldObj: LookupType;
  defaultValues?: ArbitraryState;
  applyToEach?: ArbitraryState;
  formValidationMode?: keyof ValidationMode;
  formStatus?: string;
  isLoading?: boolean;
  formDisabled?: boolean;
  submitDisabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (formValues: FieldValues) => any | Promise<any>;
  footer?: ReactNode;
  fieldSpacing?: string;
};

export const FormBuilderBase = ({
  form,
  formDisabled = false,
  fieldObj,
  defaultValues,
  formValidationMode = 'onChange',
  submitDisabled = false,
  onSubmit,
  footer,
  fieldSpacing = '0',
  isLoading = false,
  applyToEach = {},
}: FormBaseProps) => {
  const methods = useForm({ mode: formValidationMode, defaultValues });
  const {
    formState: { isValid },
    control,
  } = methods;

  const { fields, log, devtool, requiredFields = {} } = form;

  const handleTopLevelSubmit = async (formValues: ArbitraryState) => {
    await onSubmit?.(formValues);
  };
  const isSubmitDisabled = !isValid || submitDisabled;
  return (
    <RHFProvider {...methods}>
      {log && <Logger />}
      {devtool && <DevTool control={control} />}
      <FormBaseContext.Provider
        value={{
          form,
          requiredFields,
          formDisabled,
          submitDisabled: isSubmitDisabled,
          fieldObj,
          isLoading,
        }}
      >
        <form
          onSubmit={methods.handleSubmit(handleTopLevelSubmit)}
          className="builder-inner-form"
          noValidate
        >
          {fields?.map((field) => (
            <FormBuilderFactory
              key={field.id}
              field={field}
              fieldSpacing={fieldSpacing}
              applyToEach={applyToEach}
            />
          ))}
          {footer}
        </form>
      </FormBaseContext.Provider>
    </RHFProvider>
  );
};
