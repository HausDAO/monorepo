import { FormBuilder } from '@daohaus/form-builder';
import { useDao } from '@daohaus/moloch-v3-context';

import { COMMON_FORMS } from '../legos/form';

export const AddSafeForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { refreshAll } = useDao();

  const onFormComplete = () => {
    refreshAll?.();
    onSuccess();
  };

  return (
    <FormBuilder form={COMMON_FORMS.ADD_SAFE} onSuccess={onFormComplete} />
  );
};

export default AddSafeForm;
