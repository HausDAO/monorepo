import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiStarHalfSFill } from 'react-icons/ri/index.js';

import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar';
import { ProfileButton } from './ProfileButton';

export default {
  title: 'Molecules/ProfileButton',
  component: ProfileButton,
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
} as ComponentMeta<typeof ProfileButton>;

// Setting displayName manually since Storybook displays it as [Object, object]
ProfileButton.displayName = 'DropdownButton';

const Template: ComponentStory<typeof ProfileButton> = (args) => (
  <ProfileButton {...args} />
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

export const ProfileButtonWithIcon = Template.bind({});

ProfileButtonWithIcon.args = {
  children: 'Button',
  color: 'primary',
  variant: 'solid',
  size: 'md',
  disabled: false,
  fullWidth: false,
  IconRight: RiStarHalfSFill,
  profile: {
    image:
      'https://bafybeiabmsm2gy3eb7d3b3zx7mqmg7tg54swosqjb2swcwpatgrctu5ry4.ipfs.dweb.link/',
    address: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
  },
};
