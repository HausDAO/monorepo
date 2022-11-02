import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { BsShareFill, BsArrowLeft } from 'react-icons/bs';
import { Column } from 'react-table';
import styled from 'styled-components';
import {
  AddressDisplay,
  Button,
  Card,
  DataIndicator,
  DataMd,
  ParMd,
  SingleColumnLayout,
  Spinner,
  useBreakpoint,
  useToast,
  widthQuery,
} from '@daohaus/ui';
import {
  formatValueTo,
  Keychain,
  NETWORK_DATA,
  memberTokenBalanceShare,
  memberUsdValueShare,
  charLimit,
  NETWORK_TOKEN_ETH_ADDRESS,
  AccountProfile,
} from '@daohaus/common-utilities';
import { FindMemberQuery, Haus } from '@daohaus/dao-data';

import { useDao } from '@daohaus/dao-context';
import { Profile } from '../components/Profile';
import { DaoTable } from '../components/DaohausTable';
import { loadMember } from '../utils/dataFetchHelpers';
import { ButtonLink } from '../components/ButtonLink';

const ProfileCard = styled(Card)`
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const StyledArrowLeft = styled(BsArrowLeft)`
  height: 1.6rem;
  width: 1.6rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 64rem;
  margin-bottom: 3rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    button:first-child {
      margin-bottom: 1rem;
    }
  }
`;

export const DataIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DataIndicatorLabelMd = styled(ParMd)`
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

export const ValueRow = styled.div`
  width: 64rem;
  padding: 3rem 0;
  text-align: left;
`;

export function Member() {
  const { daochain, daoid, memberAddress } = useParams();
  const { dao } = useDao();
  const [currentMember, setCurrentMember] = useState<
    FindMemberQuery['member'] | undefined
  >();
  const [currentMemberLoading, setCurrentMemberLoading] =
    useState<boolean>(false);
  const [currentProfile, setCurrentProfile] = useState<
    AccountProfile | undefined
  >();
  const { successToast } = useToast();

  const isMobile = useBreakpoint(widthQuery.sm);

  useEffect(() => {
    let shouldUpdate = true;
    if (daochain && daoid && memberAddress) {
      loadMember({
        daoid,
        daochain: daochain as keyof Keychain,
        address: memberAddress,
        setMember: setCurrentMember,
        setMemberLoading: setCurrentMemberLoading,
        shouldUpdate,
      });
    }
    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid, memberAddress]);

  // TODO: This will change when we come to a conclusion on how we'll cache member profiles
  useEffect(() => {
    const getProfile = async (shouldUpdate: boolean, address: string) => {
      if (shouldUpdate) {
        const haus = Haus.create();
        const profile = await haus.profile.get({
          address,
        });

        setCurrentProfile(profile);
      }
    };
    let shouldUpdate = true;
    if (daochain && currentMember) {
      getProfile(shouldUpdate, currentMember.memberAddress);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [currentMember, daochain]);

  type TokenTableType = {
    token: {
      address: string;
      name: string | undefined;
    };
    balance: string;
    fiatBalance: string;
  };

  const tableData: TokenTableType[] | null = useMemo(() => {
    if (dao && currentMember) {
      return dao.tokenBalances
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
                currentMember.shares || 0,
                currentMember.loot || 0
              ),
              decimals: 2,
              format: 'currency',
            }),
            balance: formatValueTo({
              value: memberTokenBalanceShare(
                bal.balance,
                dao.totalShares || 0,
                dao.totalLoot || 0,
                currentMember.shares || 0,
                currentMember.loot || 0,
                bal.token?.decimals || 18
              ),
              format: 'number',
            }),
          };
        });
    } else {
      return null;
    }
  }, [dao, currentMember]);

  const columns = useMemo<Column<TokenTableType>[]>(
    () => [
      {
        Header: 'Token',
        accessor: 'token',
        Cell: ({ value }: { value: TokenTableType['token'] }) => {
          return value.address === NETWORK_TOKEN_ETH_ADDRESS ? (
            <DataMd>{NETWORK_DATA[daochain as keyof Keychain]?.symbol}</DataMd>
          ) : (
            <AddressDisplay
              address={value.address}
              textOverride={value.name}
              truncate
              copy
              explorerNetworkId={daochain as keyof Keychain}
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
    [daochain]
  );

  const handleOnClick = () => {
    navigator.clipboard.writeText(`${window.location.href}`);
    successToast({
      title: 'URL copied to clipboard',
    });
  };

  return (
    <SingleColumnLayout title="Member Profile">
      {currentMemberLoading && <Spinner />}
      {currentMember && (
        <>
          <ButtonsContainer>
            <ButtonLink
              href={`/molochv3/${daochain}/${daoid}/members`}
              IconLeft={StyledArrowLeft}
              color="secondary"
              variant="outline"
              fullWidth={isMobile}
              // was centerAlign={isMobile}
              // Default has always been center.
              // Not sure what is supposed to happen here?
              // justify={isMobile ? 'center' : 'flex-start'}
            >
              MEMBERS
            </ButtonLink>
            <Button
              IconLeft={BsShareFill}
              onClick={handleOnClick}
              fullWidth={isMobile}
              // Same as above
              // centerAlign={isMobile}
            >
              SHARE PROFILE
            </Button>
          </ButtonsContainer>
          <ProfileCard>
            {currentProfile && (
              <>
                <Profile profile={currentProfile} membership={currentMember} />
                <ValueRow>
                  <DataIndicator
                    label="Total Exit Amount"
                    data={formatValueTo({
                      value: memberUsdValueShare(
                        dao?.fiatTotal || 0,
                        dao?.totalShares || 0,
                        dao?.totalLoot || 0,
                        currentMember.shares || 0,
                        currentMember.loot || 0
                      ),
                      decimals: 2,
                      format: 'currency',
                    })}
                  />
                </ValueRow>
              </>
            )}

            {dao?.tokenBalances && tableData && columns && (
              <DaoTable<TokenTableType>
                tableData={tableData}
                columns={columns}
                sortableColumns={[]}
              />
            )}
          </ProfileCard>
        </>
      )}
    </SingleColumnLayout>
  );
}

export default Member;
