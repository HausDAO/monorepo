import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Progress } from './Progress';

export default {
  title: 'Atoms/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => {
  return <Progress {...args} />;
};

export const ProgressComponent = Template.bind({});

ProgressComponent.args = {
  progressSection: [
    {
      percentage: '50%',
      color: 'green',
    },
  ],
};

export const MultipleSections = Template.bind({});

MultipleSections.args = {
  progressSection: [
    {
      percentage: '13%',
      color: 'green',
    },
    {
      percentage: '23%',
      color: 'red',
    },
  ],
};
