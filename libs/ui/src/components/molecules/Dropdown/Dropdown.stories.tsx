import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  Dropdown,
  DropdownContent,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownCheckbox,
  DropdownRadioGroup,
  DropdownRadio,
} from './Dropdown';
import React from 'react';

export default {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  subcomponents: {
    DropdownLabel,
    DropdownItem,
    DropdownSeparator,
    DropdownCheckbox,
    DropdownRadioGroup,
    DropdownRadio,
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => {
  const [color, setColor] = React.useState('blue');
  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
      {/* <Dropdown {...args} /> */}
      <DropdownMenu>
        <DropdownTrigger>Button</DropdownTrigger>
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
            <DropdownRadio value="blue">Radio</DropdownRadio>
            <DropdownRadio value="green">Radio</DropdownRadio>
          </DropdownRadioGroup>
        </DropdownContent>
      </DropdownMenu>
    </div>
  );
};

export const BaseDropdown = Template.bind({});

BaseDropdown.args = {
  children: 'Button',
  color: 'primary',
};
