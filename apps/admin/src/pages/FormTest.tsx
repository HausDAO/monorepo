import { FormBuilder } from '@daohaus/form-builder';
import { useParams } from 'react-router-dom';
import { CustomFields } from '../legos/config';
import { TABULA_FORMS } from '../legos/form';

export function FormTest() {
  const { daochain } = useParams();
  return (
    <FormBuilder
      form={TABULA_FORMS.CREATE_ARTICLE}
      customFields={CustomFields}
      targetNetwork={daochain}
    />
  );
}

export default FormTest;
