import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar';
import { DropdownButton } from './DropdownButton';

export default {
  title: 'Atoms/DropdownButton',
  component: DropdownButton,
  subcomponents: { ProfileAvatar },
  argTypes: {
    color: {
      description: 'Set the base theme color for the button',
      defaultValue: 'primary',
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    variant: {
      description: 'Set the variant of the button',
      defaultValue: 'solid',
      options: ['solid', 'outline'],
      control: { type: 'radio' },
    },
    size: {
      description: 'Set the size of the button',
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof DropdownButton>;

// Setting displayName manually since Storybook displays it as [Object, object]
DropdownButton.displayName = 'DropdownButton';

const Template: ComponentStory<typeof DropdownButton> = (args) => (
  <DropdownButton {...args} />
);

export const BaseDropdownButton = Template.bind({});

BaseDropdownButton.args = {
  children: 'Button',
  color: 'primary',
  variant: 'solid',
  size: 'md',
  disabled: false,
  fullWidth: false,
};

export const ProfileDropdownButton = Template.bind({});

ProfileDropdownButton.args = {
  children: 'Button',
  color: 'primary',
  variant: 'solid',
  size: 'md',
  disabled: false,
  fullWidth: false,
  profile: {
    image:
      'https://bafybeiabmsm2gy3eb7d3b3zx7mqmg7tg54swosqjb2swcwpatgrctu5ry4.ipfs.dweb.link/',
    address: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
  },
};
