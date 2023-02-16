import { MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ExplorerLink } from '@daohaus/connect';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import {
  DataIndicator,
  Dialog,
  DialogTrigger,
  DialogContent,
  ParLg,
  ParMd,
  widthQuery,
  useBreakpoint,
  AddressDisplay,
} from '@daohaus/ui';
import { formatValueTo, fromWei } from '@daohaus/utils';
import {
  ProposalHistoryElement,
  ProposalHistoryElementData,
} from '../../utils';
import {
  ContentContainer,
  ElementContainer,
  LinkContainer,
  StyledTitle,
  StyledUpArrow,
  StyledDownArrow,
  VisibleContainer,
  VotesButton,
  ExpandedDataGrid,
} from './ProposalHistory.styles';
import { VoteList } from './VoteList';
import { MemberDisplay } from '../MemberDisplay';

// import { MemberProfileAvatar } from './MemberProfileAvatar';

const DataPoint = ({
  data,
  daoChain,
  daoId,
  includeLinks,
}: {
  data: ProposalHistoryElementData;
  daoChain?: string;
  daoId?: string;
  includeLinks: boolean;
}) => {
  if (data.dataType === 'member') {
    return (
      <div>
        <ParMd>{data.label}</ParMd>
        <MemberDisplay
          daoId={daoId}
          daoChain={daoChain as keyof Keychain}
          memberAddress={data.data}
          includeLinks={includeLinks}
        />
      </div>
    );
  }

  if (data.dataType === 'dataIndicator') {
    return <DataIndicator label={data.label} data={data.data} />;
  }

  return null;
};

type ProposalHistoryCardProps = {
  element: ProposalHistoryElement;
  proposal: MolochV3Proposal;
  daoChain: string;
  daoId: string;
  includeLinks?: boolean;
};

export const ProposalHistoryCard = ({
  element,
  proposal,
  daoChain,
  daoId,
  includeLinks = false,
}: ProposalHistoryCardProps) => {
  const isMobile = useBreakpoint(widthQuery.sm);
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = (event: MouseEvent<HTMLDivElement>) => {
    setOpen((prevState) => !prevState);
  };

  const hasProposalVotes =
    proposal && proposal.votes && proposal.votes.length > 0;

  const totalVotes = hasProposalVotes
    ? formatValueTo({
        value:
          Number(fromWei(proposal.yesBalance)) +
          Number(fromWei(proposal.noBalance)),
        decimals: 0,
        format: 'numberShort',
        separator: '',
      })
    : '0';

  return (
    <ElementContainer>
      <VisibleContainer>
        <ContentContainer>
          <ParLg>
            <StyledTitle active={element.active}>{element.title}</StyledTitle>
          </ParLg>
          {element.text && <ParMd>{element.text}</ParMd>}
        </ContentContainer>
        {element.canExpand && open && (
          <div onClick={handleToggle}>
            <StyledUpArrow />
          </div>
        )}
        {element.canExpand && !open && (
          <div onClick={handleToggle}>
            <StyledDownArrow />
          </div>
        )}
        {element.showVotesButton && hasProposalVotes && (
          <Dialog>
            <DialogTrigger asChild>
              <VotesButton color="secondary" size="sm">
                Show Votes
              </VotesButton>
            </DialogTrigger>
            <DialogContent
              alignButtons="end"
              rightButton={{
                closeDialog: true,
                fullWidth: isMobile,
              }}
              title={`Proposal Votes (${totalVotes})`}
            >
              <VoteList
                votes={proposal.votes}
                proposal={proposal}
                daoId={daoId}
                daoChain={daoChain}
                includeLinks={includeLinks}
              />
            </DialogContent>
          </Dialog>
        )}
      </VisibleContainer>
      {element.canExpand && open && (
        <>
          <ExpandedDataGrid>
            {element.dataElements &&
              element.dataElements.map((data) => (
                <DataPoint
                  data={data}
                  daoChain={daoChain}
                  daoId={daoId}
                  includeLinks={includeLinks}
                  key={data.label}
                />
              ))}
          </ExpandedDataGrid>

          {element.txHash && (
            <LinkContainer>
              <ExplorerLink
                address={element.txHash}
                chainId={daoChain as ValidNetwork}
                type="tx"
              >
                View Transaction
              </ExplorerLink>
            </LinkContainer>
          )}
        </>
      )}
    </ElementContainer>
  );
};
