import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { toWholeUnits, handleBaseUnits } from '@daohaus/utils';
import { Buildable, Button, WrappedInput } from '@daohaus/ui';
import { isValidNetwork } from '@daohaus/keychain-utils';

import { useDao } from '@daohaus/moloch-v3-context';
import { getNetworkToken } from '../utils/fieldHelpers';

// enum InputStates {
//   Loading,
//   InvalidNetwork = 'Invalid Network',
//   CorruptTokenData = 'Corrupt Token Data',
// }

export const RequestNativeToken = (
  props: Buildable<{
    amtId?: string;
    addressId?: string;
    safeAddressId?: string;
  }>
) => {
  const { id = 'valueRequested', safeAddressId = 'safeAddress' } = props;
  const { daochain } = useParams();
  const { watch, setValue } = useFormContext();
  const { dao } = useDao();

  const safeAddress = watch(safeAddressId);

  // const [inputState, setInputState] = useState(InputStates.Loading);

  const networkTokenData = useMemo(() => {
    if (!dao || !isValidNetwork(daochain)) return null;
    return getNetworkToken(dao, daochain, safeAddress);
  }, [dao, daochain, safeAddress]);

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
