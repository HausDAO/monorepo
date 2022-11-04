import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FileInput } from './FileInput';

export default {
  title: 'Molecules/Form/FileInput',
  component: FileInput,
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args) => {
  return (
    <div style={{ margin: '4rem' }}>
      <FileInput {...args} />
    </div>
  );
};

export const FullWrappedInput = Template.bind({});
FullWrappedInput.args = {
  id: 'icon',
  label: 'Icon',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  buttonText: 'Upload Icon',
  accept: 'image/gif, image/jpeg, image/png, image/jpg',
  displayAvatarImage: true,
};
