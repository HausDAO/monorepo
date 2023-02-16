import { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { RiFileCopyLine } from 'react-icons/ri/index.js';

import { generateExplorerLink } from '@daohaus/keychain-utils';
import { truncateAddress } from '@daohaus/utils';

import { Theme } from '../../../types/theming';
import { useCopyToClipboard } from '../../../hooks';
import { Icon, Link } from '../../atoms';
import { AddressDisplayProps } from './AddressDisplay.types';
import {
  AddressContainer,
  AddressCopyIcon,
  AddressDataSm,
} from './AddressDisplay.styles';

// ! Where the rest of the props go?
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
      {explorerLink && <Link href={explorerLink}></Link>}
    </AddressContainer>
  );
};
