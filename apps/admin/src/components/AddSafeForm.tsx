import { FormBuilder } from '@daohaus/form-builder';
import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { COMMON_FORMS } from '@daohaus/moloch-v3-legos';

export const AddSafeForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { daoChain } = useCurrentDao();
  const { refetch } = useDaoData();

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
      targetNetwork={daoChain}
    />
  );
};

export default AddSafeForm;
