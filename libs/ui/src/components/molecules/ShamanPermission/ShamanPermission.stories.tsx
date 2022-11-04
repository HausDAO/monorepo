import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ShamanPermission } from './ShamanPermission';
import { useFormContext } from 'react-hook-form';
import { H3 } from '../../atoms/Typography';

export default {
  title: 'Molecules/Form/ShamanPermission',
  component: ShamanPermission,
} as ComponentMeta<typeof ShamanPermission>;

const Template: ComponentStory<typeof ShamanPermission> = (args) => {
  const { watch } = useFormContext();
  const value = watch();

  return (
    <div style={{ margin: '4rem' }}>
      <ShamanPermission {...args} />
      <H3>{value[args.id] || 'Input text will appear here'}</H3>
    </div>
  );
};

export const FullShamanPermission = Template.bind({});
FullShamanPermission.args = {
  id: 'example',
  label: 'Shaman Input',
  placeholder: 'Shaman permissions',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  address: false,
  long: false,
  full: false,
  warning: undefined,
  error: undefined,
  success: undefined,
};
