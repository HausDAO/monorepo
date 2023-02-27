import { LOCAL_ABI } from '@daohaus/abis';
import {
  formatValueTo,
  handleErrorMessage,
  isEthAddress,
  ReactSetter,
  toBaseUnits,
  toWholeUnits,
} from '@daohaus/utils';
import { CONTRACT_KEYCHAINS, isValidNetwork } from '@daohaus/keychain-utils';
import { useDHConnect } from '@daohaus/connect';
import { FieldSpacer } from '@daohaus/form-builder';
import { createContract, useTxBuilder } from '@daohaus/tx-builder';
import {
  Buildable,
  Button,
  ErrorMessage,
  FieldAlert,
  SuccessMessage,
  useToast,
  WrappedInput,
} from '@daohaus/ui';

import { useEffect, useState } from 'react';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';
import { APPROVE_TX } from '../utils/approveToken';

type TokenData = {
  allowance: string;
  balance: string;
  decimals: number;
  tokenName: string;
  tokenSymbol: string;
};

enum TokenFetchStates {
  Idle = '',
  Loading = 'Loading Token Data...',
  NotEthAddress = 'Not a valid Ethereum address',
  NotValidNetwork = 'Not a valid network',
  NotConnected = 'Connection Error',
  Error = 'Error fetching token data',
  Success = 'Success',
}
const fetchUserERC20 = async ({
  tokenAddress,
  chainId,
  userAddress,
  shouldUpdate,
  setFetchState,
  setTokenData,
  setNeedsApproval,
}: {
  tokenAddress: string;
  chainId: string | null | undefined;
  shouldUpdate: boolean;
  userAddress: string | undefined | null;
  setFetchState: ReactSetter<TokenFetchStates>;
  setNeedsApproval: ReactSetter<boolean>;
  setTokenData: ReactSetter<null | TokenData>;
}) => {
  setFetchState(TokenFetchStates.Loading);

  if (!tokenAddress) {
    return setFetchState(TokenFetchStates.Idle);
  }
  if (!isEthAddress(tokenAddress))
    return setFetchState(TokenFetchStates.NotEthAddress);
  if (
    !isValidNetwork(chainId) ||
    !userAddress ||
    !CONTRACT_KEYCHAINS.TRIBUTE_MINION[chainId]
  )
    return setFetchState(TokenFetchStates.NotValidNetwork);

  const spenderAddress = CONTRACT_KEYCHAINS.TRIBUTE_MINION[chainId];
  const contract = createContract({
    address: tokenAddress,
    chainId,
    abi: LOCAL_ABI.ERC20,
  });

  try {
    const balance = await contract.balanceOf(userAddress);
    const decimals = await contract.decimals();
    const tokenName = await contract.name();
    const tokenSymbol = await contract.symbol();
    const allowance = await contract.allowance(userAddress, spenderAddress);
    const tokenData = {
      allowance: allowance.toString(),
      balance: balance.toString(),
      decimals,
      tokenName,
      tokenSymbol,
    } as TokenData;

    if (tokenData && shouldUpdate) {
      setTokenData(tokenData);
      setFetchState(TokenFetchStates.Success);

      allowance.toString() === '0'
        ? setNeedsApproval(true)
        : setNeedsApproval(false);
    }
  } catch (error) {
    console.error(error);
    setFetchState(TokenFetchStates.Error);
  }
};

export const TributeInput = (
  props: Buildable<{ addressId?: string; amtId?: string }>
) => {
  const { addressId = 'tokenAddress', amtId = 'tokenAmount' } = props;

  const { control, setValue } = useFormContext();
  const { address, chainId } = useDHConnect();
  const tokenAddress = useWatch({
    name: addressId,
    control,
  });
  const [fetchState, setFetchState] = useState(TokenFetchStates.Idle);
  const [needsApproval, setNeedsApproval] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<null | TokenData>(null);

  useEffect(() => {
    let shouldUpdate = true;
    fetchUserERC20({
      tokenAddress,
      chainId,
      userAddress: address,
      setFetchState,
      setTokenData,
      setNeedsApproval,
      shouldUpdate,
    });
    return () => {
      shouldUpdate = false;
    };
  }, [tokenAddress, address, chainId]);

  const tokenName =
    tokenData?.tokenName && fetchState === TokenFetchStates.Success
      ? ({
          type: 'success',
          message: `Token: ${tokenData.tokenName}`,
        } as SuccessMessage)
      : undefined;

  const tokenError =
    fetchState === TokenFetchStates.Error
      ? ({
          type: 'error',
          message: TokenFetchStates.Error,
        } as ErrorMessage)
      : undefined;

  const tokenAmtRules: RegisterOptions = {
    required: true,
    setValueAs: (val) => {
      if (val === '') return '';

      return toBaseUnits(val, tokenData?.decimals);
    },
    ...props.rules,
  };

  const tokenAddressRules: RegisterOptions = {
    required: true,
    ...props.rules,
  };

  const handleMax = () => {
    if (tokenData) {
      setValue(amtId, toWholeUnits(tokenData.balance, tokenData?.decimals));
    }
  };

  const maxButton = tokenData?.balance && tokenData?.decimals && (
    <Button color="secondary" size="sm" onClick={handleMax} type="button">
      Max:{' '}
      {formatValueTo({
        value: toWholeUnits(tokenData?.balance, tokenData?.decimals),
        decimals: 6,
      })}
    </Button>
  );

  return (
    <>
      <FieldSpacer>
        <WrappedInput
          full
          label="Token Address"
          id={addressId}
          helperText={fetchState}
          success={tokenName}
          error={tokenError}
          rules={tokenAddressRules}
          placeholder="0x..."
        />
        {needsApproval && tokenData && (
          <TemporaryWarning
            setNeedsApproval={setNeedsApproval}
            tokenName={tokenData?.tokenName}
            tokenAddress={tokenAddress}
          />
        )}
      </FieldSpacer>
      <FieldSpacer>
        <WrappedInput
          full
          label="Token Amount"
          id={amtId}
          disabled={needsApproval}
          rules={tokenAmtRules}
          rightAddon={maxButton}
          defaultValue="0"
        />
      </FieldSpacer>
    </>
  );
};

enum TxStates {
  Idle = 'Idle',
  Loading = 'Loading',
  Error = 'Error',
  Success = 'Token Approved!',
}

const TemporaryWarning = ({
  tokenName,
  tokenAddress,
  setNeedsApproval,
}: {
  tokenName?: string;
  tokenAddress?: string;
  setNeedsApproval: ReactSetter<boolean>;
}) => {
  const { fireTransaction } = useTxBuilder();
  const [txState, setTxState] = useState(TxStates.Idle);
  const { errorToast, successToast } = useToast();

  const handleApprove = async () => {
    setTxState(TxStates.Loading);

    await fireTransaction({
      tx: APPROVE_TX,
      callerState: {
        tokenAddress,
      },
      lifeCycleFns: {
        onTxError(error) {
          const errMsg = handleErrorMessage({ error });
          setTxState(TxStates.Error);
          errorToast({ title: TxStates.Error, description: errMsg });
        },
        onTxSuccess() {
          setNeedsApproval(false);
          setTxState(TxStates.Success);
          successToast({
            title: TxStates.Success,
            description: `DAOhaus is approved to spend ${tokenName} on your behalf.`,
          });
        },
      },
    });
  };

  return (
    <FieldAlert
      className="warning"
      message={`You must approve ${tokenName || 'Token'} to submit`}
    >
      <Button size="sm" onClick={handleApprove}>
        {txState === TxStates.Loading ? 'Loading...' : 'Approve'}
      </Button>
    </FieldAlert>
  );
};
