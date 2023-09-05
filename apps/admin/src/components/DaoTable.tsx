import React from 'react';
import { useTable, Column, UseTableRowProps } from 'react-table';
import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';

import { MolochV3Membership } from '@daohaus/utils';
import { ProfileAvatar, Tag } from '@daohaus/ui';
import { charLimit, readableNumbers, truncateAddress } from '@daohaus/utils';
import { getNetworkName } from '@daohaus/keychain-utils';

// REVIEW NOTES
// Can this be refactored to use DaoHaus Table?

interface IDaoTableData {
  daoData: MolochV3Membership[];
}

const Table = styled.table`
  width: 100%;
  font-size: 1.6rem;
  line-height: 2.4rem;
  border-collapse: collapse;
`;

const Thead = styled.thead``;

const Th = styled.th`
  color: ${indigoDark.indigo11};
  border-bottom: 1px solid ${indigoDark.indigo5};
  padding: 0.5rem;
  text-align: left;
`;

const Tr = styled.tr``;

const Td = styled.td`
  text-align: center;
  padding: 1.5rem;
`;

const TBody = styled.tbody``;

const Highlight = styled.p`
  text-align: left;
  color: ${indigoDark.indigo9};
`;

const FirstHeader = styled.p`
  text-align: left;
  padding-left: 1.6rem;
`;

const FirstCell = styled.div`
  text-align: left;
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: unset;
`;

type HubTableType = Omit<MolochV3Membership, 'name'> & {
  name: { name?: string; address: string; networkId?: string };
};

export const DaoTable = ({ daoData }: IDaoTableData) => {
  const tableData = React.useMemo<HubTableType[]>(
    () =>
      daoData.map((dao: MolochV3Membership) => ({
        name: {
          name: charLimit(dao.name, 21),
          address: dao.dao,
          networkId: dao.networkId,
        },
        activeProposalCount: dao.activeProposalCount,
        fiatTotal: dao.fiatTotal,
        activeMemberCount: dao.activeMemberCount,
        votingPower: dao.votingPower,
        networkId: dao.networkId,
        delegatingTo: dao.delegatingTo,
        memberAddress: dao.memberAddress,
        safeAddress: dao.safeAddress,
        dao: dao.dao,
        isDelegate: dao.isDelegate,
        totalProposalCount: dao.totalProposalCount,
        contractType: dao.contractType,
      })),
    [daoData]
  );

  const exampleColumns = React.useMemo<Column<HubTableType>[]>(
    () => [
      {
        accessor: 'name', // accessor is the "key" in the data
        Cell: ({
          value,
          row,
        }: {
          value: { name?: string; address: string; networkId?: string };
          row: UseTableRowProps<HubTableType>;
        }) => {
          return (
            <FirstCell>
              <ProfileAvatar size="sm" address={value.address} />
              <StyledLink
                href={`https://admin.daohaus.club/#/molochv3/${value.networkId}/${value.address}`}
                target="_blank"
                rel="noreferrer"
              >
                {charLimit(value.name, 21) || truncateAddress(value.address)}
              </StyledLink>
              {row.original.isDelegate && (
                <Tag tagColor="yellow" key={row.id}>
                  Delegate
                </Tag>
              )}
            </FirstCell>
          );
        },
        Header: () => {
          return (
            <FirstHeader>
              {daoData?.length} {daoData?.length === 1 ? 'DAO' : 'DAOs'}
            </FirstHeader>
          );
        },
      },
      {
        Header: 'Active Proposals',
        accessor: 'activeProposalCount',
        Cell: ({ value }: { value: string | number }) => {
          return (
            <Highlight>
              {readableNumbers.toNumberShort({ value, decimals: 1 })}
            </Highlight>
          );
        },
      },
      {
        Header: 'Vaults',
        accessor: 'fiatTotal',
        Cell: ({ value }: { value?: number }) => {
          return (
            <Highlight>
              {value != null
                ? readableNumbers.toDollars({ value, separator: ' ' })
                : '--'}
            </Highlight>
          );
        },
      },
      {
        Header: 'Members',
        accessor: 'activeMemberCount',
        Cell: ({ value }: { value: string | number }) => {
          return (
            <Highlight>
              {readableNumbers.toNumberShort({ value, decimals: 1 })}
            </Highlight>
          );
        },
      },
      {
        Header: 'Power',
        accessor: 'votingPower',
        Cell: ({ value }: { value: string | number }) => {
          return (
            <Highlight>
              {readableNumbers.toPercentDecimals({
                value,
                separator: '',
              })}
            </Highlight>
          );
        },
      },
      {
        Header: 'Network',
        accessor: 'networkId',
        Cell: ({ value }: { value: string | undefined }) => {
          return <Highlight>{getNetworkName(value)}</Highlight>;
        },
      },
      {
        Header: 'Delegate',
        accessor: 'delegatingTo',
        Cell: ({ value }: { value: string | undefined }) => {
          return (
            <Highlight>
              {value === undefined ? '--' : truncateAddress(value)}
            </Highlight>
          );
        },
      },
    ],
    [daoData?.length]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: exampleColumns,
      data: tableData,
    });

  return (
    <Table {...getTableProps}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <TBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
              })}
            </Tr>
          );
        })}
      </TBody>
    </Table>
  );
};
