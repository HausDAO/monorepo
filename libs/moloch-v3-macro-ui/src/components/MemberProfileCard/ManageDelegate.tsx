import { useMemo } from 'react';

import { FormBuilder } from '@daohaus/form-builder';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { useConnectedMember, useDao } from '@daohaus/moloch-v3-context';

// TODO: import Custom Field legos from new moloch package
// import { CustomFields } from '../legos/config';
// TODO: enable manage delegate form lego
// import { COMMON_FORMS } from '../legos/form';

type ManageDelegateProps = {
  daoChain: ValidNetwork;
  defaultMember?: string;
};

export const ManageDelegate = ({
  daoChain,
  defaultMember,
}: ManageDelegateProps) => {
  const { connectedMember } = useConnectedMember();
  const { refreshAll } = useDao();

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
      //   form={COMMON_FORMS.MANAGE_DELEGATE}
      //   customFields={CustomFields}
      form={{
        id: 'TODO',
        fields: [],
      }}
      // customFields={{}}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
      targetNetwork={daoChain}
    />
  );
};
