import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import styled, { useTheme } from 'styled-components';

import { getNetworkName, truncateAddress } from '@daohaus/utils';
import {
  Button,
  Dropdown,
  DropdownMenuItem,
  DropdownMenuLabel,
  ParMd,
  ParXs,
  ProfileAvatar,
  widthQuery,
} from '@daohaus/ui';

import { useHausConnect } from '../../HausConnectContext';
import { ExplorerLink } from '../ExplorerLink';

export const UserConnectedDropdown = ({ isSm }: { isSm: boolean }) => {
  const { disconnect, address, chainId, profile, validNetwork } =
    useHausConnect();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const networkName = getNetworkName(chainId as string);

  const chevron = open ? BiChevronUp : BiChevronDown;
  return (
    <Dropdown
      spacing="0.7rem"
      menuMinWidth={isSm ? 'fit-content' : '25rem'}
      align="end"
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          size={isSm ? 'sm' : 'md'}
          IconRight={isSm ? undefined : chevron}
          // width={!isSm ? '25rem' : ''}
        >
          <Container>
            <ProfileAvatar
              image={profile?.image}
              address={profile?.address}
              size="sm"
              className="user-avatar"
            />
            <div className="interior">
              {!isSm && (
                <ParMd color={theme.button.primary.solid.text}>
                  {profile?.displayName ||
                    (address && truncateAddress(address.toLowerCase()))}
                </ParMd>
              )}
              {!isSm && (
                <ParXs color={theme.button.primary.solid.text}>
                  {(networkName && `@${networkName}`) || 'Wrong Network'}
                </ParXs>
              )}
            </div>
          </Container>
        </Button>
      }
    >
      <DropdownMenuLabel>
        <div
          style={{
            padding: '.8rem',
          }}
        >
          <AddressContainer className="address-container">
            <ExplorerLink
              className="explorer-link"
              address={address || undefined}
            >
              <ParXs>{address && truncateAddress(address)}</ParXs>
            </ExplorerLink>
          </AddressContainer>
          <ParXs>
            {validNetwork && chainId
              ? `Connected To ${getNetworkName(chainId)}`
              : 'Unsupported Network'}
          </ParXs>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuItem>
        <Button
          color="secondary"
          variant="outline"
          size="sm"
          fullWidth
          // centerAlign
          onClick={disconnect}
        >
          Disconnect
        </Button>
      </DropdownMenuItem>
    </Dropdown>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  p {
    text-align: left;
  }
  .interior {
    display: flex;
    flex-direction: column;
  }
  .user-avatar {
    margin-right: 0.75rem;
  }
  @media ${widthQuery.sm} {
    width: auto;
    .user-avatar {
      margin-right: 0rem;
    }
  }
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;
