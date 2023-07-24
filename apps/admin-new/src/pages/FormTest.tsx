import { FormBuilder } from '@daohaus/form-builder';
import { useCurrentDao } from '@daohaus/moloch-v3-hooks';
import { COMMON_FORMS, PROPOSAL_FORMS } from '@daohaus/moloch-v3-legos';
import { MolochFields } from '@daohaus/moloch-v3-fields';

export const FormTest = () => {
  const { daoChain } = useCurrentDao();
  return (
    <FormBuilder
      form={COMMON_FORMS.MANAGE_DELEGATE}
      targetNetwork={daoChain}
      customFields={MolochFields}
    />
  );
};
