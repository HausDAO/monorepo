import { amberDark } from '@radix-ui/colors';
import { Button, Spinner } from '@daohaus/ui';
import { RiUserAddLine } from 'react-icons/ri';

import { useHausConnect } from '../../HausConnectContext';
import { ButtonContainer } from './ConnectButtonStyles';
import { UserConnectedDropdown } from './UserConnetedDropdown';

export const ConnectButton = ({ isSm }: { isSm: boolean }) => {
  const { isConnected, isProfileLoading } = useHausConnect();

  if (!isConnected) {
    return <ConnectWalletButton isSm={isSm} />;
  }
  if (isProfileLoading) {
    return <LoadingButton isSm={isSm} />;
  }
  return <UserConnectedDropdown isSm={isSm} />;
};

const ConnectWalletButton = ({ isSm }: { isSm: boolean }) => {
  const { connectWallet } = useHausConnect();

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
        <Spinner
          topColor={amberDark.amber8}
          bottomColor={amberDark.amber11}
          size={isSm ? '2rem' : '2.8rem'}
          strokeWidth=".3rem"
        />
      </Button>
    </ButtonContainer>
  );
};
