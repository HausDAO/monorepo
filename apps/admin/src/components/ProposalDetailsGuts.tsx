import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ParMd, Link, Theme, border, DataIndicator } from '@daohaus/ui';
import {
  dynamicDecimals,
  formatShortDateTimeFromSeconds,
  formatValueTo,
  fromWei,
} from '@daohaus/utils';

import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';

import { TProposals } from '@daohaus/moloch-v3-context';
import { MemberProfileAvatar } from './MemberProfileAvatar';
import { ProposalWarning } from './ProposalWarning';
import { useDHConnect } from '@daohaus/connect';

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  padding: 2.8rem 3.6rem;

  border-radius: ${border.radius};
  border: 1px ${({ theme }: { theme: Theme }) => theme.secondary.step5} solid;
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};

  .proposal-link {
    margin-top: 1.2rem;
  }
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

const Spacer = styled.div`
  margin-bottom: 2rem;
`;

type ProposalDetailsGutsProps = {
  proposal: TProposals[number];
  decodeError: boolean;
};

export const ProposalDetailsGuts = ({
  decodeError,
  proposal,
}: ProposalDetailsGutsProps) => {
  const { daochain } = useParams();
  const { networks } = useDHConnect();
  return (
    <OverviewContainer>
      <ParMd>{proposal.description}</ParMd>
      {proposal.contentURI && (
        <Link
          href={proposal.contentURI}
          linkType="external"
          className="proposal-link"
        >
          Link
        </Link>
      )}
      <DataContainer>
        <div>
          <ParMd>Submitted by</ParMd>
          <MemberProfileAvatar
            daochain={daochain as keyof Keychain}
            memberAddress={proposal.createdBy}
          />
        </div>
        <DataIndicator
          label="Expiration Date"
          data={
            Number(proposal.expiration)
              ? formatShortDateTimeFromSeconds(proposal.expiration)
              : '--'
          }
          size="sm"
        />
      </DataContainer>

      {Number(proposal.proposalOffering) > 0 && (
        <DataIndicator
          label="Proposal Offering"
          data={formatValueTo({
            value: fromWei(proposal.proposalOffering),
            format: 'number',
            unit: networks?.[daochain as ValidNetwork]?.symbol,
            decimals: dynamicDecimals({
              baseUnits: Number(proposal.proposalOffering),
            }),
          })}
          size="sm"
        />
      )}
      <Spacer />
      <ProposalWarning
        proposalType={proposal.proposalType}
        decodeError={decodeError}
        txHash={proposal.txHash}
      />
    </OverviewContainer>
  );
};
