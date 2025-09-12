import { useEffect, useState } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { FaQrcode } from 'react-icons/fa';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { FieldSpacer } from '@daohaus/form-builder';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import {
  Buildable,
  Button,
  Field,
  FieldWrapper,
  HighlightInputText,
  Icon,
  ParSm,
  ParMd,
  Loading,
  WrappedInput,
} from '@daohaus/ui';
import { IClientMeta } from '@walletconnect/legacy-types';
import { CoreTypes } from '@walletconnect/types';

import useWalletConnectV2 from '../utils/walletConnectV2';
import { getWalletConnectVersion, WalletConnectVersion } from '../utils/walletConnect';

import WalletConnectLogo from '../assets/wallet_connect.svg';

type MetadataType = CoreTypes.Metadata | IClientMeta | undefined;

enum Status {
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
}

const WalletConectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: ${({ theme }) => theme.card.radius};
  border: 1px ${({ theme }) => theme.secondary.step5} solid;
  background-color: ${({ theme }) => theme.secondary.step3};
  padding: 2.2rem;
  img {
    margin-bottom: 2.7rem;
    width: 20%;
  }
`;

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
    margin-bottom: 2.7rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 2.2rem;
  width: 70%;
`;

const SuccessIcon = styled(BsCheckCircle)`
  color: green;
  width: 30px;
  height: 30px;
  margin-bottom: 1rem;
`;

export const WalletConnectLink = ({
  icon,
  id,
  rules,
  ...props
}: Buildable<Field>) => {
  const { dao } = useDaoData();
  const { register, setValue, watch } = useFormContext();
  const { daoChain } = useCurrentDao();
  const {
    txPayload: txPayload,
    wcClientData: wcClientData,
    wcConnect: wcConnectV2,
    wcDisconnect: wcDisconnectV2,
    error: txError,
  } = useWalletConnectV2();

  const inputId = 'wcLink';

  const [connectionStatus, setConnectionStatus] = useState(Status.DISCONNECTED);

  const wcLink = watch(inputId);
  const [legacyError, setLegacyError] = useState<string | null>(null);

  useEffect(() => {
    register('txTo');
    register('txData');
    register('txValue');
    register('txOperation');
  }, [register]);

  useEffect(() => {
    if (dao && daoChain && wcLink?.startsWith('wc:') && connectionStatus === Status.DISCONNECTED) {
      const version = getWalletConnectVersion(wcLink);
      if (version === WalletConnectVersion.V1) {
        setLegacyError('WalletConnect v1 links are no longer supported. Please request a v2 connection URI from the dApp.');
        return;
      }
      setLegacyError(null);
      setConnectionStatus(Status.CONNECTING);
      wcConnectV2({
        chainId: daoChain as ValidNetwork,
        safeAddress: dao.safeAddress,
        uri: wcLink,
      });
    }
  }, [connectionStatus, dao, daoChain, wcConnectV2, wcLink]);

  const clean = () => {
    [inputId, 'txTo', 'txData', 'txValue', 'txOperation'].forEach((formInput) =>
      setValue(formInput, '')
    );
    setConnectionStatus(Status.DISCONNECTED);
  };

  const onDisconnect = () => {
  wcDisconnectV2();
    clean();
  };

  useEffect(() => {
    if (txPayload?.params?.length) {
      setValue('txTo', txPayload.params[0].to);
      setValue('txData', txPayload.params[0].data);
      setValue('txValue', txPayload.params[0].value || '0');
      setValue('txOperation', txPayload.params[0].operation || '0');
    }
  }, [setValue, txPayload]);

  return (
    <FieldWrapper id={'walletConnectWrapper'} full label="WalletConnect Link">
      <HighlightInputText
        id="walletConnectDesc"
        description="Connect your DAO Safe to a dApp via WalletConnect and trigger transactions."
      />
      <FieldSpacer />
      <WrappedInput
        {...props}
        icon={FaQrcode}
        id={inputId}
        disabled={connectionStatus === Status.CONNECTED}
        rules={rules}
        error={(txError || legacyError) ? { type: 'error', message: (txError || legacyError) as string } : undefined}
      />
      <WalletConectContainer>
        <img
          alt="WalletConnect App Logo"
          src={
            wcClientData?.icons?.length
              ? wcClientData.icons[0]
              : WalletConnectLogo
          }
        />
        {connectionStatus === Status.DISCONNECTED && (
          <ParMd>Add WalletConnect link to preview the transaction</ParMd>
        )}
        {connectionStatus === Status.CONNECTING && (
          <div>
            {!wcClientData ? (
              <BaseContainer>
                <Loading margin="2.2rem" />
                <Button onClick={onDisconnect}>Cancel</Button>
              </BaseContainer>
            ) : (
              <BaseContainer>
                <ParSm>{`Trying to connect to ${wcClientData?.name}`}</ParSm>
                <ButtonsContainer>
                  <Button onClick={() => setConnectionStatus(Status.CONNECTED)}>
                    Continue
                  </Button>
                  <Button onClick={onDisconnect}>Cancel</Button>
                </ButtonsContainer>
              </BaseContainer>
            )}
          </div>
        )}
        {connectionStatus === Status.CONNECTED && (
          <BaseContainer>
            <ParSm>{wcClientData?.name}</ParSm>
            <ParSm>CONNECTED</ParSm>
            <ParSm>
              You need to keep this open for transactions to pop up and be sent
              as a proposal.
            </ParSm>
            {!txPayload ? (
              <BaseContainer>
                <Loading margin="1rem" />
                <ParSm>Waiting for a Tx to be triggered...</ParSm>
              </BaseContainer>
            ) : (
              <BaseContainer>
                <Icon children={<SuccessIcon />} />
                <ParSm>Tx Ready to Submit!</ParSm>
              </BaseContainer>
            )}
            <Button onClick={onDisconnect}>Disconnect</Button>
          </BaseContainer>
        )}
      </WalletConectContainer>
    </FieldWrapper>
  );
};
