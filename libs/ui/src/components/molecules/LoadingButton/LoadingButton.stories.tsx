import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiUserAddLine } from 'react-icons/ri/index.js';

import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar';
import { LoadingButton } from './LoadingButton';

export default {
  title: 'Molecules/LoadingButton',
  component: LoadingButton,
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
} as ComponentMeta<typeof LoadingButton>;

// Setting displayName manually since Storybook displays it as [Object, object]
LoadingButton.displayName = 'LoadingButton';

const Template: ComponentStory<typeof LoadingButton> = (args) => (
  <LoadingButton {...args} />
);

export const BaseLoadingButton = Template.bind({});

BaseLoadingButton.args = {
  children: 'Button',
  color: 'primary',
  variant: 'solid',
  size: 'md',
  loading: true,
  disabled: false,
  fullWidth: false,
  IconLeft: RiUserAddLine,
};

export const LoadingButtonWithText = Template.bind({});

LoadingButtonWithText.args = {
  children: 'Button that is really really long',
  loadingText: 'Loading text goes here',
  color: 'primary',
  variant: 'solid',
  size: 'md',
  loading: true,
  disabled: false,
  fullWidth: false,
};
