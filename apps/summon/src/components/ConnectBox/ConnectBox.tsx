import styled from 'styled-components';

import { useDHConnect } from '@daohaus/connect';
import { border, Button, ParSm, Theme } from '@daohaus/ui';

const ConnectBoxContainer = styled.div`
  border-radius: ${border.radius};
  border: 1px ${({ theme }: { theme: Theme }) => theme.danger.step9} solid;
  padding: 1.5rem;
  margin-bottom: 2rem;
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin-right: auto;
    }
  }
`;

export const ConnectBox = () => {
  const { connectWallet } = useDHConnect();
  return (
    <ConnectBoxContainer>
      <div className="inner">
        <ParSm>Connect wallet to summon a DAO</ParSm>
        <Button onClick={connectWallet} size="sm">
          Connect
        </Button>
      </div>
    </ConnectBoxContainer>
  );
};
