import { FormBuilder } from '@daohaus/form-builder';
import { useDao } from '@daohaus/moloch-v3-context';
import { useParams } from 'react-router-dom';

import { COMMON_FORMS } from '../legos/form';

export const AddSafeForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { refreshAll } = useDao();
  const { daochain } = useParams();

  const onFormComplete = () => {
    refreshAll?.();
    onSuccess();
  };

  return (
    <FormBuilder
      form={COMMON_FORMS.ADD_SAFE}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
      targetNetwork={daochain}
    />
  );
};

export default AddSafeForm;
