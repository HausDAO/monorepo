import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Column, Row } from 'react-table';
import {
  formatDateFromSeconds,
  formatValueTo,
  fromWei,
  sharesDelegatedToMember,
  votingPowerPercentage,
} from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';

import {
  useMembers,
  useDao,
  TMembers,
  useConnectedMembership,
} from '@daohaus/moloch-v3-context';
import { Member_OrderBy } from '@daohaus/moloch-v3-data';
import {
  SingleColumnLayout,
  Card,
  widthQuery,
  AddressDisplay,
  Spinner,
  useBreakpoint,
  Tooltip,
} from '@daohaus/ui';

import { ButtonLink } from '../components/ButtonLink';
import { DaoTable } from '../components/DaohausTable';
import { MembersOverview } from '../components/MembersOverview';
import { MemberProfileAvatar } from '../components/MemberProfileAvatar';
import { MemberProfileMenu } from '../components/MemberProfileMenu';

const Actions = styled.div`
  display: flex;
  width: 100%;
  button:first-child {
    margin-right: 1rem;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    button:first-child {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`;

const MemberContainer = styled(Card)`
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
  min-height: 20rem;
  width: 100%;
  overflow-x: auto;
  th {
    min-width: 10rem;
  }
  .hide-sm {
    button {
      padding-left: 0.5rem;
    }
  }
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
  @media ${widthQuery.md} {
    .hide-sm {
      display: none;
    }
  }
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export type MembersTableType = TMembers[number];

export const Members = () => {
  const { dao } = useDao();
  const { members, membersNextPaging, loadMoreMembers, sortMembers } =
    useMembers();
  const { connectedMembership } = useConnectedMembership();
  const isMd = useBreakpoint(widthQuery.md);
  const { daoid, daochain } = useParams();

  const tableData = useMemo(() => {
    return members;
  }, [members]);

  const columns = useMemo<Column<MembersTableType>[]>(
    () => [
      {
        Header: 'Member',
        accessor: 'memberAddress',
        Cell: ({ value }: { value: string }) => {
          return (
            <MemberProfileAvatar
              daochain={daochain as keyof Keychain}
              memberAddress={value}
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
              {delegatedShares > 0 && (
                <Tooltip
                  content={`${formatValueTo({
                    value: fromWei(delegatedShares.toFixed()),
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
        Header: () => {
          return <div className="hide-sm">Delegated To</div>;
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
        accessor: 'id',
        Cell: ({ row }: { row: Row<MembersTableType> }) => {
          return (
            <ActionContainer>
              <MemberProfileMenu memberAddress={row.original.memberAddress} />
            </ActionContainer>
          );
        },
      },
    ],
    [dao, daochain]
  );

  const handleColumnSort = (
    orderBy: string,
    orderDirection: 'asc' | 'desc'
  ) => {
    sortMembers(orderBy as Member_OrderBy, orderDirection);
  };

  return (
    <SingleColumnLayout
      title="Members"
      actions={
        <Actions>
          <ButtonLink
            href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=ISSUE`}
            color="secondary"
            fullWidth={isMd}
            // centerAlign={isMd}
          >
            Add Member
          </ButtonLink>
          {connectedMembership && (
            <ButtonLink
              href={`/molochv3/${daochain}/${daoid}/members/${connectedMembership.memberAddress}`}
              fullWidth={isMd}
              // centerAlign={isMd}
            >
              My Profile
            </ButtonLink>
          )}
        </Actions>
      }
    >
      <MemberContainer>
        {dao && <MembersOverview dao={dao} />}
        {dao && members && tableData && columns ? (
          <DaoTable<MembersTableType>
            tableData={tableData}
            columns={columns}
            hasNextPaging={membersNextPaging !== undefined}
            handleLoadMore={loadMoreMembers}
            handleColumnSort={handleColumnSort}
            sortableColumns={
              isMd
                ? ['loot', 'shares']
                : ['createdAt', 'shares', 'loot', 'delegateShares']
            }
          />
        ) : (
          <Spinner size={isMd ? '8rem' : '16rem'} padding="6rem" />
        )}
      </MemberContainer>
    </SingleColumnLayout>
  );
};

export default Members;
