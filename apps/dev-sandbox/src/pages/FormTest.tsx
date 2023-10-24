import { useCurrentDao } from '@daohaus/moloch-v3-hooks';
import { MolochFields } from '@daohaus/moloch-v3-fields';
import { WIZARD_FORMS } from '../legos/forms';
import { WizardFormBuilder } from '@daohaus/wizard-form-builder';

export const FormTest = () => {
  const { daoChain } = useCurrentDao();
  return (
    <WizardFormBuilder
      form={WIZARD_FORMS.TEXT_WIZARD}
      targetNetwork={daoChain}
      customFields={MolochFields}
    />
  );
};
