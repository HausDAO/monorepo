import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FileInput } from './FileInput';

export default {
  title: 'Atoms/FileInput',
  component: FileInput,
} as ComponentMeta<typeof FileInput>;

// Setting displayName manually since Storybook displays it as [Object, object]
FileInput.displayName = 'FileInput';

const Template: ComponentStory<typeof FileInput> = (args) => (
  <FileInput {...args} />
);

export const AtomInput = Template.bind({});

AtomInput.args = {
  placeholder: 'Placeholder',
};

export const InputWithIcon = Template.bind({});
InputWithIcon.args = {
  multiple: true,
  accept: 'image/png, image/jpeg',
};
