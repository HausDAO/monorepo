import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ImageInput } from './ImageInput';

export default {
  title: 'Molecules/Form/ImageInput',
  component: ImageInput,
} as ComponentMeta<typeof ImageInput>;

const Template: ComponentStory<typeof ImageInput> = (args) => {
  return (
    <div style={{ margin: '4rem' }}>
      <ImageInput {...args} />
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
