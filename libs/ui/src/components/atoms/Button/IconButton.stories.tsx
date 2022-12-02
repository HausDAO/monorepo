import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiBugLine } from 'react-icons/ri';
import { IconButton } from './IconButton';

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    Icon: { description: 'An Icon from React Icons or an SVG' },
    color: {
      description: 'Set the base theme color for the button',
      defaultValue: 'primary',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      control: { type: 'radio' },
    },
    variant: {
      description: 'Set the variant of the button',
      defaultValue: 'solid',
      options: ['solid', 'outline', 'ghost', 'link'],
      control: { type: 'radio' },
    },
    size: {
      description: 'Set the size of the button',
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof IconButton>;

// Setting displayName manually since Storybook displays it as [Object, object]
IconButton.displayName = 'IconButton';

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const BaseIconButton = Template.bind({});

BaseIconButton.args = {
  Icon: RiBugLine,
  color: 'primary',
  variant: 'solid',
  size: 'md',
  disabled: false,
};
