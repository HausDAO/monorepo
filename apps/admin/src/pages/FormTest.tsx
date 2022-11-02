import { FormBuilder } from '@daohaus/haus-form-builder';
import { CustomFields } from '../legos/config';
import { TABULA_FORMS } from '../legos/form';

export function FormTest() {
  return (
    <FormBuilder
      form={TABULA_FORMS.CREATE_ARTICLE}
      customFields={CustomFields}
    />
  );
}

export default FormTest;
