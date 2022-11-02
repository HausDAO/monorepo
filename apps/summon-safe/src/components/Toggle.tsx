import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Switch, Text } from '@gnosis.pm/safe-react-components';

interface ToggleProps {
  id: string
  label: string
  required?: boolean
  disabled?: boolean
  shouldUnregister: boolean
  control: Control
};

const Toggle: React.FC<ToggleProps> = (props: ToggleProps) => {
  const { id, label, required, control, shouldUnregister } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={false}
      shouldUnregister={shouldUnregister}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <>
          <Text size='md'>{`${label}${required ? ' (*)':''}`}</Text>
          <Switch key={id} checked={field.value} onChange={field.onChange} />
        </>
      )}
    />
  );
};

export default Toggle;
