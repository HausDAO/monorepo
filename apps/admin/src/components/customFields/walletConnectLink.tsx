import { useEffect, useState } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { FaQrcode } from 'react-icons/fa';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ValidNetwork } from '@daohaus/common-utilities';
import { useDao } from '@daohaus/dao-context';
import {
  border,
  Buildable,
  Button,
  Field,
  FieldWrapper,
  HighlightInputText,
  Icon,
  ParSm,
  ParMd,
  Spinner,
  Theme,
  WrappedInput,
} from '@daohaus/ui';
import { FieldSpacer } from '@daohaus/haus-form-builder';

import { useWalletConnect } from '../../hook/walletConnect';

import WalletConnectLogo from '../../assets/wallet_connect.svg';

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
  border-radius: ${border.radius};
  border: 1px ${({ theme }: { theme: Theme }) => theme.secondary.step5} solid;
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  padding: 2.2rem;
  img {
    margin-bottom: 2.7rem;
    width: 20%;
  }
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
  const { dao } = useDao();
  const { register, setValue, watch } = useFormContext();
  const { daochain } = useParams();
  const {
    wcConnector,
    txPayload,
    wcClientData,
    wcConnect,
    wcDisconnect,
    txError,
  } = useWalletConnect();

  const inputId = 'wcLink';

  const [connectionStatus, setConnectionStatus] = useState(Status.DISCONNECTED);

  const wcLink = watch(inputId);

  useEffect(() => {
    register('txTo');
    register('txData');
    register('txValue');
    register('txOperation');
  }, [register]);

  useEffect(() => {
    if (
      dao &&
      daochain &&
      wcLink?.startsWith('wc:') &&
      connectionStatus === Status.DISCONNECTED
    ) {
      setConnectionStatus(Status.CONNECTING);
      wcConnect({
        chainId: daochain as ValidNetwork,
        safeAddress: dao.safeAddress,
        uri: wcLink,
      });
    }
  }, [connectionStatus, dao, daochain, wcConnect, wcLink]);

  const clean = () => {
    [inputId, 'txTo', 'txData', 'txValue', 'txOperation'].forEach((formInput) =>
      setValue(formInput, '')
    );
    setConnectionStatus(Status.DISCONNECTED);
  };

  const disconnect = () => {
    if (wcConnector) {
      wcDisconnect(wcConnector);
      clean();
    }
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
        error={txError ? { type: 'error', message: txError } : undefined}
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
                <Spinner margin="2.2rem" />
                <Button onClick={disconnect}>Cancel</Button>
              </BaseContainer>
            ) : (
              <BaseContainer>
                <ParSm>{`Trying to connect to ${wcClientData?.name}`}</ParSm>
                <ButtonsContainer>
                  <Button onClick={() => setConnectionStatus(Status.CONNECTED)}>
                    Continue
                  </Button>
                  <Button onClick={disconnect}>Cancel</Button>
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
                <Spinner margin="1rem" />
                <ParSm>Waiting for a Tx to be triggered...</ParSm>
              </BaseContainer>
            ) : (
              <BaseContainer>
                <Icon children={<SuccessIcon />} />
                <ParSm>Tx Ready to Submit!</ParSm>
              </BaseContainer>
            )}
            <Button onClick={disconnect}>Disconnect</Button>
          </BaseContainer>
        )}
      </WalletConectContainer>
    </FieldWrapper>
  );
};
