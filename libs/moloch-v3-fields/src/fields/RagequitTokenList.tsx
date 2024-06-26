import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  formatValueTo,
  memberTokenBalanceShare,
  NETWORK_TOKEN_ETH_ADDRESS,
} from '@daohaus/utils';
import { getNetwork } from '@daohaus/keychain-utils';

import {
  Buildable,
  Field,
  ParSm,
  WrappedCheckbox,
  Checkbox,
  DataSm,
} from '@daohaus/ui';

import {
  useConnectedMember,
  useCurrentDao,
  useDaoData,
} from '@daohaus/moloch-v3-hooks';
import { CheckboxProps, CheckedState } from '@radix-ui/react-checkbox';
import styled from 'styled-components';
import { TokenBalance } from '@daohaus/utils';

import { sortTokensForRageQuit } from '../utils/fieldHelpers';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';

const TokenListContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  width: 33%;
`;

const DataColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-top: 0.8rem;
`;

type TokenTable = {
  tokenCheckboxes: CheckboxProps[];
  amounts: React.ReactNode[];
};

export const RagequitTokenList = (props: Buildable<Field>) => {
  const { id } = props;
  const { dao } = useDaoData();
  const { connectedMember } = useConnectedMember();
  const { daoChain } = useCurrentDao();
  const { setValue, watch } = useFormContext();

  const [sharesToBurn, lootToBurn, tokens] = watch([
    'sharesToBurn',
    'lootToBurn',
    'tokens',
  ]);

  const networkData = useMemo(() => {
    if (!daoChain) return null;
    return getNetwork(daoChain);
  }, [daoChain]);

  const treasury: MolochV3Dao['vaults'][number] | undefined = useMemo(() => {
    if (dao) {
      return (
        dao.vaults.find((v) => v.safeAddress === dao.safeAddress) || undefined
      );
    }
    return undefined;
  }, [dao]);

  const tokenTable = useMemo((): TokenTable | null => {
    if (!dao || !networkData || !connectedMember || !treasury) return null;
    return treasury.tokenBalances
      .filter((token) => Number(token.balance) > 0)
      .reduce(
        (acc: TokenTable, token: TokenBalance) => {
          acc.tokenCheckboxes = [
            ...acc.tokenCheckboxes,
            {
              id: token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS,
              title: token.token?.name || networkData.symbol,
              name: token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS,
              defaultChecked: true,
              disabled: false,
              required: false,
              onCheckedChange: (checked: CheckedState) => {
                if (checked) {
                  setValue(
                    id,
                    sortTokensForRageQuit([
                      ...tokens,
                      token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS,
                    ])
                  );
                }

                if (!checked) {
                  const targetAddress =
                    token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS;
                  setValue(
                    id,
                    sortTokensForRageQuit(
                      tokens.filter((t: string) => t !== targetAddress)
                    )
                  );
                }

                setValue(
                  token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS,
                  checked
                );
              },
            },
          ];
          acc.amounts = [
            ...acc.amounts,
            <DataSm key={token.tokenAddress}>
              {formatValueTo({
                value: memberTokenBalanceShare(
                  token.balance,
                  dao.totalShares || 0,
                  dao.totalLoot || 0,
                  sharesToBurn || 0,
                  lootToBurn || 0,
                  token.token?.decimals || 18
                ),
                format: 'number',
              })}
            </DataSm>,
          ];

          return acc;
        },
        {
          tokenCheckboxes: [],
          amounts: [],
        }
      );
  }, [
    dao,
    networkData,
    connectedMember,
    sharesToBurn,
    lootToBurn,
    id,
    tokens,
    treasury,
    setValue,
  ]);

  const handleSelectAll = (checked: CheckedState) => {
    if (checked) {
      setValue(
        id,
        sortTokensForRageQuit(
          treasury?.tokenBalances
            .filter((token) => Number(token.balance) > 0)
            .map((token) => token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS) ||
            []
        )
      );
    } else {
      setValue(id, []);
    }

    treasury?.tokenBalances.forEach((token) => {
      if (Number(token.balance) > 0) {
        setValue(token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS, checked);
      }
    });
  };

  if (!tokenTable) return null;

  return (
    <>
      <TokenListContainer>
        <Column>
          <Checkbox
            title="Token"
            defaultChecked={true}
            onCheckedChange={handleSelectAll}
          />
        </Column>

        <Column>
          <ParSm>Amount</ParSm>
        </Column>
      </TokenListContainer>
      <TokenListContainer>
        <Column>
          <WrappedCheckbox
            {...props}
            id={id}
            checkboxes={tokenTable.tokenCheckboxes}
          />
        </Column>
        <DataColumn>{tokenTable.amounts}</DataColumn>
      </TokenListContainer>
    </>
  );
};
