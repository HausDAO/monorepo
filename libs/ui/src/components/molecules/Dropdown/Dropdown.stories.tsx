import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  DropdownContent,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownCheckbox,
  DropdownRadioGroup,
  DropdownRadio,
  DropdownButtonTrigger,
} from './Dropdown';
import React from 'react';

export default {
  title: 'Molecules/Dropdown',
  component: DropdownMenu,
  subcomponents: {
    DropdownLabel,
    DropdownItem,
    DropdownSeparator,
    DropdownCheckbox,
    DropdownRadioGroup,
    DropdownRadio,
  },
} as ComponentMeta<typeof DropdownMenu>;

const Template: ComponentStory<typeof DropdownMenu> = (args) => {
  const [color, setColor] = React.useState('blue');
  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
      <DropdownMenu>
        <DropdownButtonTrigger fullWidth={true}>Button</DropdownButtonTrigger>
        <DropdownContent align="end">
          <DropdownLabel>Switch to available network</DropdownLabel>
          <DropdownItem>Click Me</DropdownItem>
          <DropdownItem disabled>I'm Disabled</DropdownItem>
          <DropdownItem>Click Me 2</DropdownItem>
          <DropdownSeparator />
          <DropdownItem>Grape</DropdownItem>
          <DropdownItem>Click Me</DropdownItem>
          <DropdownSeparator />
          <DropdownCheckbox checked>Checked</DropdownCheckbox>
          <DropdownCheckbox>Unchecked</DropdownCheckbox>
          <DropdownSeparator />
          <DropdownRadioGroup value={color} onValueChange={setColor}>
            <DropdownRadio value="blue">Blue</DropdownRadio>
            <DropdownRadio value="green">Green</DropdownRadio>
          </DropdownRadioGroup>
        </DropdownContent>
      </DropdownMenu>
    </div>
  );
};

export const BaseDropdown = Template.bind({});

BaseDropdown.args = {
  children: 'Button',
};
