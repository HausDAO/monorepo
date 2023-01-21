import { useMemo } from 'react';

import { FormBuilder } from '@daohaus/form-builder';
import { useConnectedMember, useDao } from '@daohaus/moloch-v3-context';
import { CustomFields } from '../legos/config';
import { COMMON_FORMS } from '../legos/form';
import { NETWORK_TOKEN_ETH_ADDRESS, TokenBalance } from '@daohaus/utils';
import { sortTokensForRageQuit } from '../utils/general';
import { useParams } from 'react-router-dom';

export function RageQuit() {
  const { dao, refreshAll } = useDao();
  const { connectedMember } = useConnectedMember();
  const { daochain } = useParams();

  const defaultFields = useMemo(() => {
    if (connectedMember && dao) {
      const treasury = dao.vaults.find(
        (v) => dao.safeAddress === v.safeAddress
      );

      return {
        to: connectedMember.memberAddress,
        tokens:
          treasury &&
          sortTokensForRageQuit(
            treasury.tokenBalances
              .filter((token: TokenBalance) => Number(token.balance) > 0)
              .map(
                (token: TokenBalance) =>
                  token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS
              )
          ),
      };
    }
  }, [connectedMember, dao]);

  const onFormComplete = () => {
    refreshAll?.();
  };

  if (!dao || !connectedMember) {
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={{ ...COMMON_FORMS.RAGEQUIT, log: true, devtool: true }}
      customFields={CustomFields}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
      targetNetwork={daochain}
    />
  );
}

export default RageQuit;
