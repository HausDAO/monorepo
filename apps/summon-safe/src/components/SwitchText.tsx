import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch, Text } from '@gnosis.pm/safe-react-components';

interface SwitchTextProps {
  label: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SwitchText: React.FC<SwitchTextProps> = (props: SwitchTextProps) => {
  const { label, onChange } = props;
  const [isChecked, toggleSwitch] = useState(false);

  return (
    <Container>
      <Text size="lg">{`${label}`}</Text>
      <Switch
        checked={isChecked}
        onChange={() => {
          onChange(!isChecked);
          toggleSwitch(!isChecked);
        }}
      />
    </Container>
  );
};

export default SwitchText;
