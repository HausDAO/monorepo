import { FormBuilder } from '@daohaus/form-builder';
import { useDaoData } from '@daohaus/moloch-v3-hooks';
import { COMMON_FORMS } from '@daohaus/moloch-v3-legos';
import { useParams } from 'react-router-dom';

export const AddSafeForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { refetch } = useDaoData();
  const { daochain } = useParams();

  const onFormComplete = () => {
    refetch?.();
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
