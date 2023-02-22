import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Tabs } from './Tabs';

export default {
  title: 'Molecules/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <div style={{ width: '100%' }}>
    <Tabs {...args} />
  </div>
);

export const TabsTemplate = Template.bind({});

TabsTemplate.args = {
  tabList: [
    { label: 'Tab 1', Component: () => <div>Tab 1 Panel</div> },
    { label: 'Tab 2', Component: () => <div>Tab 2 Panel</div> },
    { label: 'Tab 3', Component: () => <div>Tab 3 Panel</div> },
  ],
};
