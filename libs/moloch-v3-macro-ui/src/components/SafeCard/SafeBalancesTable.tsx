import { useMemo } from 'react';
import { Column, Row } from 'react-table';

import { DaoTable } from '../DaohausTable';
import { Avatar } from '@daohaus/ui';
import { SafeToken } from './SafeCard.styles';

type TokenBalanceType = {
  tokenLogo?: string | null;
  tokenName: string;
  tokenSymbol: string;
  balance: number;
};

type SafeBalancesTableProps = {
  balances: Array<TokenBalanceType>;
};

export const SafeBalancesTable = ({ balances }: SafeBalancesTableProps) => {
  const columns = useMemo<Column<TokenBalanceType>[]>(
    () => [
      {
        Header: 'Asset',
        accessor: 'tokenName',
        Cell: ({
          value,
          row,
        }: {
          value: string;
          row: Row<TokenBalanceType>;
        }) => {
          return (
            <SafeToken>
              <div style={{ fontSize: '1rem' }}>
                <Avatar
                  alt={value}
                  size="md"
                  src={row.original.tokenLogo || ''}
                  fallback={row.original.tokenSymbol}
                />
              </div>
              <span>{value}</span>
            </SafeToken>
          );
        },
      },
      {
        Header: 'Balance',
        accessor: 'balance',
        Cell: ({
          value,
          row,
        }: {
          value: number;
          row: Row<TokenBalanceType>;
        }) => {
          return <div>{`${value} ${row.original.tokenSymbol}`}</div>;
        },
      },
    ],
    [balances]
  );

  return (
    <DaoTable<TokenBalanceType>
      tableData={balances}
      columns={columns}
      sortableColumns={[]}
    />
  );
};
