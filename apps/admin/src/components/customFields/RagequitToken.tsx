import { useMemo } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { toWholeUnits, handleBaseUnits } from '@daohaus/utils';
import { Buildable, Button, WrappedInput, Field } from '@daohaus/ui';

import { useConnectedMembership, useDao } from '@daohaus/moloch-v3-context';

export const RagequitToken = (props: Buildable<Field>) => {
  const { id } = props;
  const { setValue } = useFormContext();
  const { dao } = useDao();
  const { connectedMembership } = useConnectedMembership();

  const daoTokenData = useMemo(() => {
    if (!dao || !connectedMembership) return null;
    return {
      label:
        id === 'sharesToBurn'
          ? `Voting Tokens (${dao.shareTokenSymbol})`
          : `Non-Voting Tokens (${dao.lootTokenSymbol})`,
      maxAmount:
        id === 'sharesToBurn'
          ? connectedMembership.shares
          : connectedMembership.loot,
    };
  }, [connectedMembership, dao, id]);

  const setMax = () => {
    setValue(id, toWholeUnits(daoTokenData?.maxAmount || '0'));
  };

  const newRules: RegisterOptions = {
    setValueAs: (value) => handleBaseUnits(value, 18),
    ...props.rules,
  };

  if (!daoTokenData) {
    return null;
  }

  return (
    <WrappedInput
      {...props}
      id={id}
      label={daoTokenData.label}
      defaultValue="0"
      rightAddon={
        <Button color="secondary" size="sm" onClick={setMax}>
          Max: {toWholeUnits(daoTokenData.maxAmount || '0')}
        </Button>
      }
      rules={newRules}
    />
  );
};
