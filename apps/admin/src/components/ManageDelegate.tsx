import { useMemo } from 'react';
import { FormBuilder } from '@daohaus/haus-form-builder';
import { useConnectedMembership, useDao } from '@daohaus/dao-context';

import { CustomFields } from '../legos/config';
import { COMMON_FORMS } from '../legos/form';

type ManageDelegateProps = {
  defaultMember?: string;
};

export const ManageDelegate = ({ defaultMember }: ManageDelegateProps) => {
  const { connectedMembership } = useConnectedMembership();
  const { refreshAll } = useDao();

  const defaultValues = useMemo(() => {
    if (defaultMember) {
      return { delegatingTo: defaultMember };
    }
    if (
      connectedMembership &&
      connectedMembership.delegatingTo !== connectedMembership.memberAddress
    ) {
      return connectedMembership;
    }
  }, [connectedMembership, defaultMember]);

  const onFormComplete = () => {
    refreshAll?.();
  };

  if (!connectedMembership) return null;

  return (
    <FormBuilder
      defaultValues={defaultValues}
      form={COMMON_FORMS.MANAGE_DELEGATE}
      customFields={CustomFields}
      onSuccess={onFormComplete}
    />
  );
};

export default ManageDelegate;
