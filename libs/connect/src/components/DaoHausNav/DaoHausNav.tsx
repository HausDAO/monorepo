import styled from 'styled-components';
import { useBreakpoint, widthQuery } from '@daohaus/ui';
import { ConnectButton } from '../ConnectButton';
import { NetworkButton } from '../NetworkButton';

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  .connect-box {
    margin-left: 1.2rem;
  }
`;

export const DaoHausNav = () => {
  const isSm = useBreakpoint(widthQuery.sm);
  return (
    <StyledNav className="connect">
      <div>
        <NetworkButton isSm={isSm} />
      </div>
      <div className="connect-box">
        <ConnectButton isSm={isSm} />
      </div>
    </StyledNav>
  );
};
