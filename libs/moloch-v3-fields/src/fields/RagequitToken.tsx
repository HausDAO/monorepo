import { useMemo } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import { toWholeUnits, handleBaseUnits } from '@daohaus/utils';
import { Buildable, Button, WrappedInput, Field } from '@daohaus/ui';
import { useConnectedMember, useDaoData } from '@daohaus/moloch-v3-hooks';

export const RagequitToken = (props: Buildable<Field>) => {
  const { id } = props;
  const { setValue } = useFormContext();
  const { dao } = useDaoData();
  const { connectedMember } = useConnectedMember();

  const daoTokenData = useMemo(() => {
    if (!dao || !connectedMember) return null;
    return {
      label:
        id === 'sharesToBurn'
          ? `Voting Tokens (${dao.shareTokenSymbol})`
          : `Non-Voting Tokens (${dao.lootTokenSymbol})`,
      maxAmount:
        id === 'sharesToBurn' ? connectedMember.shares : connectedMember.loot,
    };
  }, [connectedMember, dao, id]);

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
