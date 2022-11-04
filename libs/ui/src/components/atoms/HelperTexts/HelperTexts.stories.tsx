import { ComponentMeta, ComponentStory } from '@storybook/react';

import { HelperText, SuccessText, ErrorText, WarningText } from './HelperTexts';

export default {
  title: 'Atoms/HelperTexts',
  component: HelperText,
} as ComponentMeta<typeof HelperText>;

const Template: ComponentStory<typeof HelperText> = (args) => (
  <HelperText {...args} />
);

export const BaseHelperText = Template.bind({});
BaseHelperText.args = {
  children: 'Base Helper Text',
};
export const SuccessHelperText: ComponentStory<typeof SuccessText> = (args) => (
  <SuccessText {...args} />
);
SuccessHelperText.args = {
  children: 'This is a Success!',
};
export const WarningHelperText: ComponentStory<typeof WarningText> = (args) => (
  <WarningText {...args} />
);
WarningHelperText.args = {
  children: 'This is a Warning!',
};
export const ErrorHelperText: ComponentStory<typeof ErrorText> = (args) => (
  <ErrorText {...args} />
);
ErrorHelperText.args = {
  children: 'This is an Error!',
};
