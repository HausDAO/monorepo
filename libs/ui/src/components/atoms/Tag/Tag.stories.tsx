import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri/index.js';

import { Tag } from './Tag';

export default {
  title: 'Atoms/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => {
  return <Tag {...args}>{args.children}</Tag>;
};

export const AtomTag = Template.bind({});

AtomTag.args = {
  children: <p>Content in a Tag</p>,
};

export const BlueAtomTag = Template.bind({});
BlueAtomTag.args = {
  tagColor: 'blue',
  children: <p>Content in a Tag</p>,
};

export const VioletAtomTag = Template.bind({});
VioletAtomTag.args = {
  tagColor: 'violet',
  children: <p>Content in a Tag</p>,
};

export const IconLeftAtomTag = Template.bind({});
IconLeftAtomTag.args = {
  tagColor: 'violet',
  children: <p>Content in a Tag</p>,
  IconLeft: RiCloseLine,
};

export const IconRightAtomTag = Template.bind({});
IconRightAtomTag.args = {
  tagColor: 'violet',
  children: <p>Content in a Tag</p>,
  IconRight: RiCheckLine,
};

export const IconBothAtomTag = Template.bind({});
IconBothAtomTag.args = {
  tagColor: 'violet',
  children: <p>Content in a Tag</p>,
  IconLeft: RiCloseLine,
  IconRight: RiCheckLine,
};
