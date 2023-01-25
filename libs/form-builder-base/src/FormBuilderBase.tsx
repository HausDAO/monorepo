import {
  ArbitraryState,
  FieldLegoBase,
  FormLegoBase,
  LookupType,
} from '@daohaus/utils';
import { DevTool } from '@hookform/devtools';
import React, { JSXElementConstructor, ReactNode } from 'react';
import {
  useForm,
  ValidationMode,
  FormProvider as RHFProvider,
} from 'react-hook-form';
import { Logger } from './components/Logger';

type FieldBase = Record<
  string,
  JSXElementConstructor<{ id: string; [property: string]: any }>
>;

type FieldLego = FieldLegoBase<FieldBase>;
type FormLego = FormLegoBase<FieldBase>;

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
  onSubmit:
    | ((formValues: ArbitraryState) => Promise<void>)
    | ((formValues: ArbitraryState) => void);
  // LayoutComponent: JSXElementConstructor<{
  //   children?: ReactNode;
  //   [index: string]: any;
  // }>;
  footer: ReactNode;
};

export const FormBuilderBase = ({
  form,
  formDisabled,
  fieldObj,
  defaultValues,
  formValidationMode = 'onChange',
  // LayoutComponent,
  submitDisabled,
  onSubmit,
  footer,
}: FormBaseProps) => {
  const methods = useForm({ mode: formValidationMode, defaultValues });
  const {
    formState: { isValid },
    control,
  } = methods;

  const {
    title,
    subtitle,
    description,
    fields,
    log,
    devtool,

    submitButtonText,
    requiredFields = {},
  } = form;

  const handleTopLevelSubmit = async (formValues: ArbitraryState) => {
    await onSubmit(formValues);
  };

  return (
    <RHFProvider {...methods}>
      {/* <LayoutComponent
        title={title}
        subtitle={subtitle}
        description={description}
      > */}
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
            <FormBuilderFactory key={field.id} {...field} />
          ))}
          {footer}
        </form>
        ;
      </FormBaseContext.Provider>
      {/* </LayoutComponent> */}
    </RHFProvider>
  );
};

const FormBuilderFactory = (field: FieldLego) => {
  return null;
};
