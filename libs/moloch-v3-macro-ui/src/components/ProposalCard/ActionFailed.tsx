import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import styled from 'styled-components';
import { ExplorerLink } from '@daohaus/connect';
import { Italic, ParSm } from '@daohaus/ui';
import { VotingBar } from './VotingBar';
import { ActionTemplate } from './ActionPrimitives';
import { ValidNetwork } from '@daohaus/keychain-utils';

const Link = styled(ExplorerLink)`
  font-size: inherit;
`;

export const ActionFailed = ({
  proposal,
  daoChain,
}: {
  proposal: MolochV3Proposal;
  daoChain: string;
}) => {
  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay="External Action Failed"
      main={<VotingBar proposal={proposal} />}
      helperDisplay={
        <ParSm>
          <Italic>
            The external contract interaction failed. See{' '}
            <Link
              address={proposal.processTxHash}
              type="tx"
              chainId={daoChain as ValidNetwork}
            >
              transaction details
            </Link>{' '}
            for more information.
          </Italic>
        </ParSm>
      }
    />
  );
};
