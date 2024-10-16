import { useCallback, useEffect, useMemo, useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import { LOCAL_ABI } from '@daohaus/abis';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import {
  useConnectedMember,
  useCurrentDao,
  useDaoData,
} from '@daohaus/moloch-v3-hooks';
import {
  Buildable,
  Button,
  Field,
  WrappedInput,
  WrappedInputSelect,
} from '@daohaus/ui';
import {
  createViemClient,
  handleBaseUnits,
  ignoreEmptyVal,
  toWholeUnits,
  ValidateField,
  ZERO_ADDRESS,
} from '@daohaus/utils';

type Token = {
  name: string;
  value: string;
  paused: boolean;
  decimals: number;
};

export const TransferTokens = (props: Buildable<Field>) => {
  const { connectedMember } = useConnectedMember();
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();
  const { register, setValue, watch } = useFormContext();
  const [selectOptions, setSelectOptions] = useState<Array<Token>>([]);

  const selectedTokenId = 'paymentTokenAddress';
  const selectedTokenAddr = watch(selectedTokenId);
  const tokenErrorMsg = 'Token is non-transferrable';

  const recipientId = 'recipientAddress';

  register(recipientId);
  register(selectedTokenId);

  useEffect(() => {
    const getDAOTokens = async (_dao: MolochV3Dao, chainId: ValidNetwork) => {
      const client = createViemClient({
        chainId,
      });
      const sharesDecimals = await client.readContract({
        abi: LOCAL_ABI.ERC20,
        address: _dao.sharesAddress as `0x${string}`,
        functionName: 'decimals',
      });
      const lootDecimals = await client.readContract({
        abi: LOCAL_ABI.ERC20,
        address: _dao.lootAddress as `0x${string}`,
        functionName: 'decimals',
      });
      setSelectOptions([
        {
          name: `${_dao.shareTokenName} (Voting Tokens)`,
          value: _dao.sharesAddress,
          paused: _dao.sharesPaused,
          decimals: Number(sharesDecimals),
        },
        {
          name: `${_dao.lootTokenName} (Non-Voting Tokens)`,
          value: _dao.lootAddress,
          paused: _dao.lootPaused,
          decimals: Number(lootDecimals),
        },
      ]);
    };
    if (!dao || !daoChain) return;
    getDAOTokens(dao, daoChain);
  }, [dao, daoChain]);

  const selectedToken = useMemo(() => {
    if (!selectOptions || !selectedTokenAddr) return;
    return selectOptions.find((opt) => opt.value === selectedTokenAddr);
  }, [selectOptions, selectedTokenAddr]);

  const tokenBalance = useMemo(() => {
    if (!connectedMember || !dao || !selectedToken) return '0';
    if (selectedToken.value === dao.sharesAddress)
      return toWholeUnits(connectedMember.shares, selectedToken.decimals);
    return toWholeUnits(connectedMember.loot, selectedToken.decimals);
  }, [connectedMember, dao, selectedToken]);

  const setMax = useCallback(() => {
    console.log('selectedToken', selectedToken);
    if (!selectedToken) return;
    setValue(props.id, tokenBalance.trim());
  }, [selectedToken]);

  const newRules: RegisterOptions = useMemo(() => {
    return {
      setValueAs: (value) => handleBaseUnits(value, selectedToken?.decimals),
      validate: {
        number: (value) => ignoreEmptyVal(value, ValidateField.number),
        isTransferrable: () => (selectedToken?.paused ? tokenErrorMsg : true),
        tokenSelected: () => !!selectedToken,
        maxValue: (value) =>
          Number(value) <= Number(handleBaseUnits(tokenBalance, 18)) ||
          'Cannot exceed current token balance',
        nonZero: (value) =>
          Number(value) > 0 || 'Value must be greater than zero',
      },
      ...props.rules,
    };
  }, [selectedToken, tokenBalance]);

  return (
    <>
      <WrappedInputSelect
        {...props}
        placeholder="0"
        error={
          selectedToken?.paused
            ? { type: 'error', message: tokenErrorMsg }
            : undefined
        }
        selectId={selectedTokenId}
        selectPlaceholder="--"
        options={selectOptions || []}
        rightAddon={
          <Button color="secondary" size="sm" onClick={setMax}>
            Max: {tokenBalance}
          </Button>
        }
        rules={newRules}
      />
      <WrappedInput
        address
        disabled={selectedToken?.paused}
        full
        id={recipientId}
        label="Recipient"
        placeholder="0x..."
        rules={{
          required: true,
          validate: {
            ethAddress: (value) =>
              ignoreEmptyVal(value, ValidateField.ethAddress),
            nonZeroAddress: (value) =>
              value !== ZERO_ADDRESS || 'Cannot send to the Zero Address',
          },
        }}
      />
    </>
  );
};
