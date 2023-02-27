import styled from 'styled-components';
import { useConnectedMember } from '@daohaus/moloch-v3-context';
import { useCurrentDao } from '@daohaus/moloch-v3-hooks';
import {
  SingleColumnLayout,
  Spinner,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';

import { ButtonRouterLink } from '../components/ButtonRouterLink';
import { MemberList } from '@daohaus/moloch-v3-macro-ui';

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

export const Members = () => {
  const { daoChain, daoId } = useCurrentDao();
  const { connectedMember } = useConnectedMember();
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
          {connectedMember && (
            <ButtonRouterLink
              to={`/molochV3/${daoChain}/${daoId}/member/${connectedMember.memberAddress}`}
              fullWidth={isMd}
              linkType="no-icon-external"
            >
              My Profile
            </ButtonRouterLink>
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
