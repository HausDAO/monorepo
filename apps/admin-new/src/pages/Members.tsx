import styled from 'styled-components';
import { useDHConnect } from '@daohaus/connect';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { useConnectedMember, useCurrentDao } from '@daohaus/moloch-v3-hooks';
import { MemberList } from '@daohaus/moloch-v3-macro-ui';
import {
  SingleColumnLayout,
  Spinner,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';

import { ButtonRouterLink } from '../components/ButtonRouterLink';

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

const MemberProfileButton = ({
  daoChain,
  daoId,
}: {
  daoChain: ValidNetwork;
  daoId: string;
}) => {
  const { address } = useDHConnect();
  const { connectedMember } = useConnectedMember({
    daoChain,
    daoId,
    memberAddress: address as string,
  });
  const isMd = useBreakpoint(widthQuery.md);

  if (connectedMember)
    return (
      <ButtonRouterLink
        to={`/molochV3/${daoChain}/${daoId}/member/${connectedMember.memberAddress}`}
        fullWidth={isMd}
        linkType="no-icon-external"
      >
        My Profile
      </ButtonRouterLink>
    );
  return null;
};

export const Members = () => {
  const { daoChain, daoId } = useCurrentDao();
  const isMd = useBreakpoint(widthQuery.md);

  return (
    <SingleColumnLayout
      title="Members"
      actions={
        <Actions>
          <ButtonRouterLink
            to={`/molochV3/${daoChain}/${daoId}/new-proposal?formLego=ISSUE`}
            color="secondary"
            fullWidth={isMd}
            linkType="no-icon-external"
          >
            Add Member
          </ButtonRouterLink>
          {daoChain && daoId && (
            <MemberProfileButton daoChain={daoChain} daoId={daoId} />
          )}
        </Actions>
      }
    >
      {!daoChain || !daoId ? (
        <Spinner size={isMd ? '8rem' : '16rem'} padding="6rem" />
      ) : (
        <MemberList daoChain={daoChain} daoId={daoId} />
      )}
    </SingleColumnLayout>
  );
};
