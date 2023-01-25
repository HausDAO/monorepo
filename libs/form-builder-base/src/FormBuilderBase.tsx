import { ArbitraryState, FormLegoBase, LookupType } from '@daohaus/utils';
import React from 'react';

//temporary
type FormLego = FormLegoBase<LookupType>;

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
  factory: LookupType;
  defaultValues?: ArbitraryState;
};

export const FormBuilderBase = ({
  form,
  factory,
  defaultValues,
}: FormBaseProps) => {
  return <form>FormBuilder</form>;
};
