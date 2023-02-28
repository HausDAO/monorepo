import { useMemo } from 'react';
import { Column } from 'react-table';

import { useDHConnect } from '@daohaus/connect';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { DaoSafe, MolochV3Dao, MolochV3Member } from '@daohaus/moloch-v3-data';
import { AddressDisplay, DataMd } from '@daohaus/ui';
import {
  charLimit,
  formatValueTo,
  memberTokenBalanceShare,
  memberUsdValueShare,
  NETWORK_TOKEN_ETH_ADDRESS,
} from '@daohaus/utils';

import { DaoTable } from '../DaohausTable';

type TokenTableType = {
  token: {
    address: string;
    name: string | undefined;
  };
  balance: string;
  fiatBalance: string;
};

type MemberTokensProps = {
  daoChain: ValidNetwork;
  dao: MolochV3Dao;
  member: MolochV3Member;
};

export const MemberTokens = ({ daoChain, dao, member }: MemberTokensProps) => {
  const { networks } = useDHConnect();

  const treasury: MolochV3Dao['vaults'][number] | undefined = useMemo(() => {
    if (dao) {
      return (
        dao.vaults.find((v: DaoSafe) => v.safeAddress === dao.safeAddress) ||
        undefined
      );
    }
    return undefined;
  }, [dao]);

  const tableData: TokenTableType[] | null = useMemo(() => {
    if (dao && member && treasury) {
      return treasury.tokenBalances
        .filter((bal) => Number(bal.balance))
        .map((bal) => {
          return {
            token: {
              address: bal.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS,
              name: charLimit(bal.token?.name, 21),
            },
            fiatBalance: formatValueTo({
              value: memberUsdValueShare(
                bal.fiatBalance,
                dao.totalShares || 0,
                dao.totalLoot || 0,
                member.shares || 0,
                member.loot || 0
              ),
              decimals: 2,
              format: 'currency',
            }),
            balance: formatValueTo({
              value: memberTokenBalanceShare(
                bal.balance,
                dao.totalShares || 0,
                dao.totalLoot || 0,
                member.shares || 0,
                member.loot || 0,
                bal.token?.decimals || 18
              ),
              format: 'number',
            }),
          };
        });
    } else {
      return null;
    }
  }, [dao, member, treasury]);

  const columns = useMemo<Column<TokenTableType>[]>(
    () => [
      {
        Header: 'Token',
        accessor: 'token',
        Cell: ({ value }: { value: TokenTableType['token'] }) => {
          return value.address === NETWORK_TOKEN_ETH_ADDRESS ? (
            <DataMd>{networks?.[daoChain]?.symbol}</DataMd>
          ) : (
            <AddressDisplay
              address={value.address}
              textOverride={value.name}
              truncate
              copy
              explorerNetworkId={daoChain}
            />
          );
        },
      },
      {
        Header: 'Amount',
        accessor: 'balance',
        Cell: ({ value }: { value: string }) => {
          return <div>{value}</div>;
        },
      },
      {
        Header: () => {
          return <div>USD Value</div>;
        },
        accessor: 'fiatBalance',
        Cell: ({ value }: { value: string }) => {
          return <div>{value}</div>;
        },
      },
    ],
    [daoChain, networks]
  );

  if (treasury && tableData && columns)
    return (
      <DaoTable<TokenTableType>
        tableData={tableData}
        columns={columns}
        sortableColumns={[]}
      />
    );

  return null;
};
