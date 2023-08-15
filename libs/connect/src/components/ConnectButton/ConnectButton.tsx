import { Button, Loading } from '@daohaus/ui';
import { RiUserAddLine } from 'react-icons/ri/index.js';

import { useDHConnect } from '../../HausConnectContext';
import { ButtonContainer } from './ConnectButtonStyles';
import { UserConnectedDropdown } from './UserConnetedDropdown';

export const ConnectButton = ({ isSm }: { isSm: boolean }) => {
  const { isConnected, isProfileLoading } = useDHConnect();

  if (!isConnected) {
    return <ConnectWalletButton isSm={isSm} />;
  }
  if (isProfileLoading) {
    return <LoadingButton isSm={isSm} />;
  }
  return <UserConnectedDropdown isSm={isSm} />;
};

const ConnectWalletButton = ({ isSm }: { isSm: boolean }) => {
  const { connectWallet } = useDHConnect();

  return (
    <ButtonContainer>
      <Button
        fullWidth={!isSm}
        IconLeft={RiUserAddLine}
        onClick={connectWallet}
        size={isSm ? 'sm' : 'md'}
        className="should-connect"
      >
        {!isSm && 'Connect Wallet'}
      </Button>
    </ButtonContainer>
  );
};

const LoadingButton = ({ isSm }: { isSm: boolean }) => {
  return (
    <ButtonContainer>
      <Button fullWidth={!isSm} size={isSm ? 'sm' : 'md'}>
        <Loading size={isSm ? 20 : 28} />
      </Button>
    </ButtonContainer>
  );
};
