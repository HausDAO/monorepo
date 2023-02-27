import { useMemo } from 'react';

import { RegisterOptions, useFormContext } from 'react-hook-form';
import { toWholeUnits, handleBaseUnits } from '@daohaus/utils';
import { Buildable, Button, WrappedInput } from '@daohaus/ui';
import { isValidNetwork } from '@daohaus/keychain-utils';

import { useDaoData, useCurrentDao } from '@daohaus/moloch-v3-hooks';
import { getNetworkToken } from '../utils/fieldHelpers';

export const RequestNativeToken = (
  props: Buildable<{
    amtId?: string;
    addressId?: string;
    safeAddressId?: string;
  }>
) => {
  const { id = 'valueRequested', safeAddressId = 'safeAddress' } = props;
  const { daoChain } = useCurrentDao();
  const { watch, setValue } = useFormContext();
  const { dao } = useDaoData();

  const safeAddress = watch(safeAddressId);

  // const [inputState, setInputState] = useState(InputStates.Loading);

  const networkTokenData = useMemo(() => {
    if (!dao || !isValidNetwork(daoChain)) return null;
    return getNetworkToken(dao, daoChain, safeAddress);
  }, [dao, daoChain, safeAddress]);

  const label = networkTokenData?.name
    ? `Request ${networkTokenData.name}`
    : `Request Network Token`;

  const setMax = () => {
    setValue(
      id,
      toWholeUnits(
        networkTokenData?.daoBalance || '0',
        networkTokenData?.decimals
      )
    );
  };

  const newRules: RegisterOptions = {
    setValueAs: (value) => handleBaseUnits(value, 18),
    ...props.rules,
  };

  return (
    <WrappedInput
      {...props}
      id={id}
      label={label}
      defaultValue="0"
      rightAddon={
        <Button color="secondary" size="sm" onClick={setMax}>
          Max:{' '}
          {toWholeUnits(
            networkTokenData?.daoBalance || '0',
            networkTokenData?.decimals
          )}
        </Button>
      }
      rules={newRules}
    />
  );
};
