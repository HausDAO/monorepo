import { useMemo } from 'react';

import { useDHConnect } from '@daohaus/connect';
import { FormBuilder } from '@daohaus/form-builder';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { useDao } from '@daohaus/moloch-v3-context';
import { useConnectedMember } from '@daohaus/moloch-v3-hooks';

// TODO: import Custom Field legos from new moloch package
// import { CustomFields } from '../legos/config';
// TODO: enable manage delegate form lego
// import { COMMON_FORMS } from '../legos/form';

type ManageDelegateProps = {
  daoChain: ValidNetwork;
  daoId: string;
  defaultMember?: string;
};

export const ManageDelegate = ({
  daoChain,
  daoId,
  defaultMember,
}: ManageDelegateProps) => {
  const { refreshAll } = useDao();
  const { address } = useDHConnect();
  const { connectedMember } = useConnectedMember({
    daoChain,
    daoId,
    memberAddress: address as string,
  });

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
