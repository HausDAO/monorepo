import { FormBuilder } from '@daohaus/form-builder';
import { useCurrentDao } from '@daohaus/moloch-v3-hooks';
import { PROPOSAL_FORMS } from '@daohaus/moloch-v3-legos';
import { MolochFields } from '@daohaus/moloch-v3-fields';

export const FormTest = () => {
  const { daoChain } = useCurrentDao();
  return (
    <FormBuilder
      form={PROPOSAL_FORMS.SIGNAL}
      targetNetwork={daoChain}
      customFields={MolochFields}
    />
  );
};
