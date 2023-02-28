import { useMemo } from 'react';
import { Column, Row } from 'react-table';
import {
  Member_OrderBy,
  MolochV3Dao,
  MolochV3Member,
  MolochV3Members,
} from '@daohaus/moloch-v3-data';
import {
  AddressDisplay,
  ParMd,
  Spinner,
  Tooltip,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';

import { DaoTable } from '../DaohausTable';
import {
  ActionContainer,
  LoadingContainer,
  MemberContainer,
} from './MemberList.styles';
import { ValidNetwork } from '@daohaus/keychain-utils';
import {
  formatDateFromSeconds,
  formatValueTo,
  fromWei,
  sharesDelegatedToMember,
  votingPowerPercentage,
} from '@daohaus/utils';
import { MembersOverview } from './MembersOverview';
import { MemberProfileAvatar, MemberProfileMenu } from '../MemberProfileCard';
import { useDaoData, useDaoMembers } from '@daohaus/moloch-v3-hooks';

type MembersTableType = MolochV3Members[number];

type MemberListProps = {
  daoChain: ValidNetwork;
  daoId: string;
};

export const MemberList = ({ daoChain, daoId }: MemberListProps) => {
  const { dao, isLoading: isLoadingDao } = useDaoData();

  const {
    members,
    isFetching: isLoadingMembers,
    fetchNextPage,
    filterMembers,
    hasNextPage,
    orderMembers,
  } = useDaoMembers();
  const isMd = useBreakpoint(widthQuery.md);

  const tableData = useMemo<MolochV3Members>(() => {
    if (members) {
      const filteredMembers = members.filter((member) => member !== undefined);
      return filteredMembers?.length
        ? (filteredMembers as MolochV3Members)
        : [];
    }
    return [];
  }, [members]);

  const columns = useMemo<Column<MembersTableType>[]>(
    () => [
      {
        Header: 'Member',
        accessor: 'memberAddress',
        Cell: ({ value }: { value: string }) => {
          return (
            <MemberProfileAvatar
              daoChain={daoChain}
              daoId={daoId}
              memberAddress={value}
              includeLinks
            />
          );
        },
      },
      {
        Header: () => {
          return <div className="hide-sm">Join Date</div>;
        },
        accessor: 'createdAt',
        Cell: ({ value }: { value: string }) => {
          return <div className="hide-sm">{formatDateFromSeconds(value)}</div>;
        },
      },
      {
        Header: () => {
          return <div className="hide-sm">Power</div>;
        },
        accessor: 'delegateShares',
        Cell: ({
          value,
          row,
        }: {
          value: string;
          row: Row<MembersTableType>;
        }) => {
          const delegatedShares = sharesDelegatedToMember(
            row.original.delegateShares,
            row.original.shares
          );
          return (
            <div className="hide-sm">
              {votingPowerPercentage(dao?.totalShares || '0', value)}
              {' %'}
              {Number(delegatedShares) > 0 && (
                <Tooltip
                  content={`${formatValueTo({
                    value: fromWei(delegatedShares),
                    decimals: 2,
                    format: 'number',
                  })} voting tokens are delegated to this member`}
                  side="bottom"
                />
              )}
            </div>
          );
        },
      },
      {
        Header: () => {
          return <div className="hide-sm">Delegating To</div>;
        },
        accessor: 'delegatingTo',
        Cell: ({
          value,
          row,
        }: {
          value: string;
          row: Row<MembersTableType>;
        }) => {
          return (
            <div className="hide-sm">
              {value === row.original.memberAddress ? (
                '--'
              ) : (
                <AddressDisplay address={value} truncate />
              )}
            </div>
          );
        },
      },
      {
        Header: () => {
          return <>Voting</>;
        },
        accessor: 'shares',
        Cell: ({ value }: { value: string }) => {
          return (
            <div>
              {formatValueTo({
                value: fromWei(value),
                decimals: 2,
                format: 'number',
              })}
            </div>
          );
        },
      },
      {
        Header: () => {
          return <div>Non-Voting</div>;
        },
        accessor: 'loot',
        Cell: ({ value }: { value: string }) => {
          return (
            <div>
              {formatValueTo({
                value: fromWei(value),
                decimals: 2,
                format: 'number',
              })}
            </div>
          );
        },
      },

      {
        accessor: 'id',
        Cell: ({ row }: { row: Row<MembersTableType> }) => {
          return (
            <ActionContainer>
              <MemberProfileMenu
                daoChain={daoChain}
                daoId={daoId}
                memberAddress={row.original.memberAddress}
                includeLinks
              />
            </ActionContainer>
          );
        },
      },
    ],
    [daoChain, dao]
  );

  const handleColumnSort = (
    orderBy: string,
    orderDirection: 'asc' | 'desc'
  ) => {
    orderMembers({ orderBy: orderBy as Member_OrderBy, orderDirection });
  };

  return (
    <MemberContainer>
      {!dao && isLoadingDao && (
        <LoadingContainer>
          <Spinner size="12rem" />
        </LoadingContainer>
      )}
      {dao && <MembersOverview dao={dao} />}
      {dao && members && tableData && columns && (
        <DaoTable<MembersTableType>
          tableData={tableData}
          columns={columns}
          hasNextPaging={hasNextPage}
          handleLoadMore={() => fetchNextPage()}
          handleColumnSort={handleColumnSort}
          sortableColumns={
            isMd
              ? ['loot', 'shares']
              : ['createdAt', 'shares', 'loot', 'delegateShares']
          }
        />
      )}
      {dao && isLoadingMembers && (
        <LoadingContainer>
          <Spinner size="12rem" />
        </LoadingContainer>
      )}
    </MemberContainer>
  );
};
