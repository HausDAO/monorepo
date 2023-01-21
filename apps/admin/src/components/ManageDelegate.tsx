import { useMemo } from 'react';
import { FormBuilder } from '@daohaus/form-builder';
import { useConnectedMember, useDao } from '@daohaus/moloch-v3-context';

import { CustomFields } from '../legos/config';
import { COMMON_FORMS } from '../legos/form';
import { useParams } from 'react-router-dom';

type ManageDelegateProps = {
  defaultMember?: string;
};

export const ManageDelegate = ({ defaultMember }: ManageDelegateProps) => {
  const { connectedMember } = useConnectedMember();
  const { refreshAll } = useDao();
  const { daochain } = useParams();

  const defaultValues = useMemo(() => {
    if (defaultMember) {
      return { delegatingTo: defaultMember };
    }
    if (
      connectedMember &&
      connectedMember.delegatingTo !== connectedMember.memberAddress
    ) {
      return connectedMember;
    }
  }, [connectedMember, defaultMember]);

  const onFormComplete = () => {
    refreshAll?.();
  };

  return (
    <FormBuilder
      defaultValues={defaultValues}
      form={COMMON_FORMS.MANAGE_DELEGATE}
      customFields={CustomFields}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
      targetNetwork={daochain}
    />
  );
};

export default ManageDelegate;
