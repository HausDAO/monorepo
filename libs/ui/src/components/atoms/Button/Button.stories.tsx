import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiAlertLine, RiArrowDropDownLine } from 'react-icons/ri';
import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
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
    justify: {
      description:
        'Allow for positioning content inside the button based on justify content and flexbox container',
      defaultValue: 'center',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      control: { type: 'radio' },
    },
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof Button>;

// Setting displayName manually since Storybook displays it as [Object, object]
Button.displayName = 'Button';

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const BaseButton = Template.bind({});

BaseButton.args = {
  children: 'Button',
  color: 'primary',
  variant: 'solid',
  size: 'md',
  disabled: false,
  fullWidth: false,
  justify: 'flex-start',
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: 'Button',
};

export const PrimaryButtonOutline = Template.bind({});
PrimaryButtonOutline.args = {
  children: 'Button',
  variant: 'outline',
};

export const PrimaryButtonAsLink = Template.bind({});
PrimaryButtonAsLink.args = {
  children: 'Button',
  variant: 'link',
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  children: 'Button',
  color: 'secondary',
};

export const SecondaryButtonOutline = Template.bind({});
SecondaryButtonOutline.args = {
  children: 'Button',
  color: 'secondary',
  variant: 'outline',
};

export const SecondaryButtonAsLink = Template.bind({});
SecondaryButtonAsLink.args = {
  children: 'Button',
  color: 'secondary',
  variant: 'link',
};

export const ButtonLeftIcon = Template.bind({});
ButtonLeftIcon.args = {
  children: 'Button',
  IconLeft: RiAlertLine,
};

export const ButtonRightIcon = Template.bind({});
ButtonRightIcon.args = {
  children: 'Button',
  IconRight: RiArrowDropDownLine,
};

export const ButtonWithLeftAndRightIcons = Template.bind({});
ButtonWithLeftAndRightIcons.args = {
  children: 'Button',
  IconLeft: RiAlertLine,
  IconRight: RiArrowDropDownLine,
};
