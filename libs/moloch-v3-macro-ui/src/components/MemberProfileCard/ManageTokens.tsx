import { useDHConnect } from '@daohaus/connect';
import { FormBuilder } from '@daohaus/form-builder';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { MolochFields } from '@daohaus/moloch-v3-fields';
import {
  useConnectedMember,
  useDaoData,
  useDaoMembers,
} from '@daohaus/moloch-v3-hooks';
import { COMMON_FORMS } from '@daohaus/moloch-v3-legos';

type ManageTokensProps = {
  daoChain: ValidNetwork;
  daoId: string;
};

export const ManageTokens = ({ daoChain, daoId }: ManageTokensProps) => {
  const { refetch } = useDaoData();
  const { refetch: refetchMembers } = useDaoMembers();
  const { address } = useDHConnect();
  const { refetch: refetchMember } = useConnectedMember({
    daoChain,
    daoId,
    memberAddress: address as string,
  });

  const onFormComplete = () => {
    refetch?.();
    refetchMembers?.();
    refetchMember?.();
  };

  return (
    <FormBuilder
      form={COMMON_FORMS.MANAGE_TOKENS}
      customFields={MolochFields}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
      targetNetwork={daoChain}
    />
  );
};
