import { ArbitraryState, LookupType } from '@daohaus/utils';
import { DevTool } from '@hookform/devtools';
import React, { ReactNode, useContext, useMemo } from 'react';
import {
  useForm,
  ValidationMode,
  FormProvider as RHFProvider,
  useFormContext,
} from 'react-hook-form';
import styled from 'styled-components';
import { Logger } from './components/Logger';
import { generateRules } from './utils/rules';
import { FieldLego, FormLego } from './utils/types';

type BaseContext = {
  form: FormLego;
  requiredFields: Record<string, boolean>;
  formDisabled: boolean;
  submitDisabled: boolean;
  fieldObj: LookupType;
};

const FAKE_FORM: FormLego = {
  id: 'FAKE_FORM',
  title: 'Form Title',
  description: 'Form Description',
  subtitle: 'Form Subtitle',
  fields: [],
};

const FormBaseContext = React.createContext<BaseContext>({
  form: FAKE_FORM,
  requiredFields: {},
  formDisabled: false,
  submitDisabled: false,
  fieldObj: {},
});

type FormBaseProps = {
  form: FormLego;
  fieldObj: LookupType;
  defaultValues?: ArbitraryState;
  formValidationMode?: keyof ValidationMode;
  formStatus: string;
  isLoading: boolean;
  formDisabled: boolean;
  submitDisabled: boolean;
  onSubmit: (formValues: ArbitraryState) => Promise<void>;
  footer: ReactNode;
  fieldSpacing?: string;
};

export const FormBuilderBase = ({
  form,
  formDisabled,
  fieldObj,
  defaultValues,
  formValidationMode = 'onChange',
  submitDisabled,
  onSubmit,
  footer,
  fieldSpacing = '0',
}: FormBaseProps) => {
  const methods = useForm({ mode: formValidationMode, defaultValues });
  const {
    formState: { isValid },
    control,
  } = methods;

  const { fields, log, devtool, requiredFields = {} } = form;

  const handleTopLevelSubmit = async (formValues: ArbitraryState) => {
    await onSubmit(formValues);
  };

  return (
    <RHFProvider {...methods}>
      {log && <Logger />}
      {devtool && <DevTool control={control} />}
      <FormBaseContext.Provider
        value={{
          form,
          requiredFields,
          formDisabled,
          submitDisabled,
          fieldObj,
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
            />
          ))}
          {footer}
        </form>
      </FormBaseContext.Provider>
    </RHFProvider>
  );
};

const useFormBuilder = () => {
  const methods = useFormContext();
  const builderFeatures = useContext(FormBaseContext);

  return { ...methods, ...builderFeatures };
};

const FormBuilderFactory = ({
  field,
  fieldSpacing,
}: {
  field: FieldLego;
  fieldSpacing: string;
}) => {
  const { type } = field;
  const {
    formState: { errors },
  } = useFormContext();
  const formState = errors;
  const { formDisabled, requiredFields, fieldObj } = useFormBuilder();

  const GeneratedField = useMemo(
    () => {
      const Field = fieldObj[type];

      // somehow, generarte rules will need to be become extendable as well
      const newRules = generateRules({
        field: field,
        requiredFields: requiredFields || {},
      });
      return (
        <Field
          {...field}
          rules={newRules}
          disabled={formDisabled || field.disabled}
        />
      );
    },
    // Ignoring exhaustive deps here so that I can update this component
    // formState change

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type, formDisabled, field, requiredFields, fieldObj, formState]
  );

  return <Spacer fieldSpacing={fieldSpacing}>{GeneratedField}</Spacer>;
};

const Spacer = styled.div<{ fieldSpacing: string }>`
  margin-bottom: ${({ fieldSpacing }) => fieldSpacing};
`;
