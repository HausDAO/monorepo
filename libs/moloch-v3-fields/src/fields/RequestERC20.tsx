import { useEffect, useMemo } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import {
  formatValueTo,
  handleBaseUnits,
  ignoreEmptyVal,
  toWholeUnits,
  ValidateField,
} from '@daohaus/utils';
import { isValidNetwork } from '@daohaus/keychain-utils';
import { Buildable, Button, WrappedInputSelect } from '@daohaus/ui';
import { useDaoData, useCurrentDao } from '@daohaus/moloch-v3-hooks';

import { getErc20s } from '../utils/fieldHelpers';

export enum InputStates {
  Loading,
  InvalidNetwork = 'Invalid Network',
  CorruptTokenData = 'Corrupt Token Data',
}

export const RequestERC20 = (
  props: Buildable<{
    amtId?: string;
    addressId?: string;
    safeAddressId?: string;
  }>
) => {
  const { daoChain } = useCurrentDao();
  const {
    amtId = 'paymentTokenAmt',
    addressId = 'paymentTokenAddress',
    safeAddressId = 'safeAddress',
  } = props;
  const { dao } = useDaoData();
  const { watch, setValue } = useFormContext();

  const paymentTokenAddr = watch(addressId);
  const safeAddress = watch(safeAddressId);

  useEffect(() => {
    if (paymentTokenAddr) {
      setValue(amtId, '0');
    }
  }, [paymentTokenAddr, setValue, amtId]);

  const erc20s = useMemo(() => {
    if (dao && isValidNetwork(daoChain)) {
      const selectedSafe = dao.vaults.find((v) => {
        if (!safeAddress) return v.safeAddress === dao.safeAddress;
        return v.safeAddress === safeAddress;
      });

      return selectedSafe && getErc20s(selectedSafe);
    }
    return null;
  }, [dao, daoChain, safeAddress]);

  const selectOptions = useMemo(() => {
    if (!erc20s) return;

    const options = erc20s.map((token) => ({
      name: token.symbol,
      value: token.address,
    }));

    return options;
  }, [erc20s]);

  const selectedToken = useMemo(() => {
    if (!erc20s || !paymentTokenAddr) return;

    return erc20s.find(({ address }) => address === paymentTokenAddr);
  }, [paymentTokenAddr, erc20s]);

  const tokenBalance = selectedToken?.daoBalance
    ? formatValueTo({
        value: toWholeUnits(selectedToken?.daoBalance, selectedToken?.decimals),
        decimals: 6,
        format: 'number',
      })
    : '0';

  const setMax = () => {
    if (!selectedToken) return;
    setValue(amtId, tokenBalance.trim());
  };

  const newRules: RegisterOptions = {
    setValueAs: (value) => handleBaseUnits(value, selectedToken?.decimals),
    validate: {
      number: (value) => ignoreEmptyVal(value, ValidateField.number),
      daoHasBalance: (val) => {
        return (
          selectedToken &&
          ignoreEmptyVal(val, (val) =>
            Number(val) > Number(selectedToken?.daoBalance || 0)
              ? 'Amount exceeds DAO Balance'
              : true
          )
        );
      },
    },
    ...props.rules,
  };

  return (
    <WrappedInputSelect
      {...props}
      id={amtId}
      defaultValue="0"
      selectId={addressId}
      selectPlaceholder="--"
      options={selectOptions || []}
      rightAddon={
        <Button color="secondary" size="sm" onClick={setMax}>
          Max: {tokenBalance}
        </Button>
      }
      rules={newRules}
    />
  );
};
