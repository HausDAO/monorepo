import {
  generateExplorerLink,
  Keychain,
  truncateAddress,
} from '@daohaus/utils';
import { useTheme } from 'styled-components';
import { RiFileCopyLine } from 'react-icons/ri';

import { Theme } from '../../../types/theming';
import {
  AddressContainer,
  AddressCopyIcon,
  AddressDataSm,
} from './AddressDisplay.styles';
import { Icon, Link } from '../../atoms';
import { useCopyToClipboard } from '../../../hooks';
import { useMemo } from 'react';

type AddressDisplayProps = {
  address: string;
  explorerNetworkId?: keyof Keychain;
  copy?: boolean;
  truncate?: boolean;
  txHash?: boolean;
  textOverride?: string;
  className?: string;
};

export const AddressDisplay = ({
  address,
  explorerNetworkId,
  copy,
  truncate,
  txHash,
  textOverride,
  className,
  ...props
}: AddressDisplayProps) => {
  const theme = useTheme() as Theme;
  const copyToClipboard = useCopyToClipboard();

  const explorerLink = useMemo(() => {
    if (explorerNetworkId) {
      return generateExplorerLink({
        chainId: explorerNetworkId,
        address,
        type: txHash ? 'tx' : 'address',
      });
    }
    return undefined;
  }, [address, txHash, explorerNetworkId]);

  const handleCopy = () => {
    copyToClipboard(
      address,
      `Success ${txHash ? 'Transaction Hash:' : 'Address:'}`
    );
  };

  const displayAddress = truncate ? truncateAddress(address) : address;

  return (
    <AddressContainer className={className}>
      <AddressDataSm>
        {textOverride ? textOverride : displayAddress}
      </AddressDataSm>
      {copy && (
        <AddressCopyIcon>
          <Icon>
            <RiFileCopyLine
              size="1.5rem"
              color={theme.primary.step10}
              onClick={handleCopy}
            />
          </Icon>
        </AddressCopyIcon>
      )}
      {explorerLink && <Link href={explorerLink} linkType="external"></Link>}
    </AddressContainer>
  );
};
