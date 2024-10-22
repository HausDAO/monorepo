import React from 'react';
import styled from 'styled-components';
import { Control, Controller } from 'react-hook-form';
import { Switch, Text } from '@gnosis.pm/safe-react-components';

interface ToggleProps {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  shouldUnregister: boolean;
  switchLabel?: string;
  control: Control;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Toggle: React.FC<ToggleProps> = (props: ToggleProps) => {
  const { id, label, required, control, shouldUnregister, switchLabel } = props;

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
          <Text size="md">{`${label}${required ? ' (*)' : ''}`}</Text>
          <Container>
            <Switch key={id} checked={field.value} onChange={field.onChange} />
            {switchLabel && (
              <Text size="md">{`${
                field.value === false ? 'Not ' : ''
              }${switchLabel}`}</Text>
            )}
          </Container>
        </>
      )}
    />
  );
};

export default Toggle;
