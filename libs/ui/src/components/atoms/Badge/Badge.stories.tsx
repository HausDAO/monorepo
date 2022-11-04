import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Badge } from './Badge';

export default {
  title: 'Atoms/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => {
  return <Badge {...args} />;
};

export const AtomBadge = Template.bind({});
AtomBadge.args = {
  badgeLabel: 'content in a badge',
};

export const LargeBadge = Template.bind({});
LargeBadge.args = {
  badgeLabel: 'content in a badge',
  badgeSize: 'lg',
};

export const VioletAtomBadge = Template.bind({});
VioletAtomBadge.args = {
  badgeLabel: 'content in a badge',
  badgeColor: 'violet',
};

export const GreenAtomBadge = Template.bind({});
GreenAtomBadge.args = {
  badgeLabel: 'content in a badge',
  badgeColor: 'green',
};

export const PinkAtomBadge = Template.bind({});
PinkAtomBadge.args = {
  badgeLabel: 'content in a badge',
  badgeColor: 'pink',
};
