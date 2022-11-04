import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Label } from './Label';

export default {
  title: 'Atoms/Label',
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const BaseLabel = Template.bind({});

BaseLabel.args = {
  children: 'Label',
};
