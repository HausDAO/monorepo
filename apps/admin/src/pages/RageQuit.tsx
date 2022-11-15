import { useMemo } from 'react';

import { FormBuilder } from '@daohaus/form-builder';
import { useConnectedMembership, useDao } from '@daohaus/moloch-v3-context';
import { CustomFields } from '../legos/config';
import { COMMON_FORMS } from '../legos/form';
import { NETWORK_TOKEN_ETH_ADDRESS, TokenBalance } from '@daohaus/utils';
import { sortTokensForRageQuit } from '../utils/general';

export function RageQuit() {
  const { dao, refreshAll } = useDao();
  const { connectedMembership } = useConnectedMembership();

  const defaultFields = useMemo(() => {
    if (connectedMembership && dao) {
      const treasury = dao.vaults.find(
        (v) => dao.safeAddress === v.safeAddress
      );

      return {
        to: connectedMembership.memberAddress,
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
  }, [connectedMembership, dao]);

  const onFormComplete = () => {
    refreshAll?.();
  };

  if (!dao || !connectedMembership) {
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={{ ...COMMON_FORMS.RAGEQUIT, log: true, devtool: true }}
      customFields={CustomFields}
      onSuccess={onFormComplete}
    />
  );
}

export default RageQuit;
