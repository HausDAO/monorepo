import { FormBuilder } from '@daohaus/form-builder';
import { useParams } from 'react-router-dom';
import { CustomFields } from '../legos/config';
import { PROPOSAL_FORMS } from '../legos/form';

export function FormTest() {
  const { daochain } = useParams();
  return (
    <FormBuilder
      form={PROPOSAL_FORMS.ISSUE}
      customFields={CustomFields}
      targetNetwork={daochain}
    />
  );
}

export default FormTest;
