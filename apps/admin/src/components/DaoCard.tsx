import styled from 'styled-components';

import { charLimit, readableNumbers } from '@daohaus/utils';
import { getNetworkName } from '@daohaus/keychain-utils';

import { MolochV3Membership } from '@daohaus/utils';
import {
  Badge,
  Bold,
  border,
  ParLg,
  ParMd,
  ProfileAvatar,
  Tag,
  Tooltip,
} from '@daohaus/ui';

import { ButtonLink } from './ButtonLink';

const StyledDaoCard = styled.div`
  background-color: ${(props) => props.theme.secondary.step2};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 34rem;
  min-width: 26rem;
  border: 1px solid ${(props) => props.theme.secondary.step5};
  padding: 2.4rem;
  border-radius: ${border.radius};
  .top-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.3rem;
  }

  .badge {
    transform: translateX(-0.8rem);
  }
  .stats-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.4rem;
    p {
      margin-bottom: 0.6rem;
    }
  }
  .tag-box {
    font-size: 1.4rem;
    margin-bottom: 2.4rem;
    div {
      margin-right: 1.5rem;
    }
  }
`;

export const DaoCard = ({
  isDelegate,
  dao,
  daoAvatarImg,
  activeMemberCount,
  fiatTotal,
  activeProposalCount,
  totalProposalCount,
  votingPower,
  name,
  networkId,
  contractType,
}: MolochV3Membership) => {
  return (
    <StyledDaoCard className="dao-card">
      <div className="top-box">
        <div className="alert-box">
          <ProfileAvatar size="xl" address={dao} image={daoAvatarImg} />
          {activeProposalCount > 0 && (
            <Tooltip
              content={`${activeProposalCount} Active Proposals (in voting or grace period)`}
              triggerEl={
                <Badge
                  badgeSize="sm"
                  badgeLabel={activeProposalCount}
                  className="badge"
                  badgeColor="blue"
                />
              }
            />
          )}
        </div>
        {isDelegate && <Tag tagColor="yellow">Delegate</Tag>}
      </div>
      <ParLg className="dao-title">
        {name ? charLimit(name, 21) : charLimit(dao, 21)}{' '}
      </ParLg>
      <div className="stats-box">
        {activeMemberCount && (
          <ParMd>
            <Bold>
              {readableNumbers.toNumber({ value: activeMemberCount })}
            </Bold>{' '}
            {parseInt(
              readableNumbers.toNumber({ value: activeMemberCount })
            ) === 1
              ? 'Member'
              : 'Members'}
          </ParMd>
        )}
        {totalProposalCount && (
          <ParMd>
            <Bold>
              {readableNumbers.toNumber({ value: totalProposalCount })}
            </Bold>{' '}
            {parseInt(
              readableNumbers.toNumber({ value: totalProposalCount })
            ) === 1
              ? 'Proposal'
              : 'Proposals'}
          </ParMd>
        )}
        {votingPower > 0 ? (
          <ParMd>
            <Bold>
              {readableNumbers.toPercentDecimals({
                value: votingPower,
                separator: '',
              })}
            </Bold>{' '}
            Voting Power
          </ParMd>
        ) : (
          <ParMd>No Voting Power</ParMd>
        )}
      </div>
      <div className="tag-box">
        <Tag tagColor="red">{getNetworkName(networkId)}</Tag>
        <Tag tagColor="blue">{contractType}</Tag>
      </div>
      <ButtonLink
        color="secondary"
        fullWidth
        // centerAlign
        href={`/molochv3/${networkId}/${dao}`}
        target="_blank"
        rel="noreferrer"
      >
        Go
      </ButtonLink>
    </StyledDaoCard>
  );
};
