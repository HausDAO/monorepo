import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Loading } from './Loading';

export default {
  title: 'Atoms/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const BaseLoading = Template.bind({});

BaseLoading.args = {
  size: 50,
};
