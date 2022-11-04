import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar } from './Avatar';

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const SmallAvatar = Template.bind({});
SmallAvatar.args = {
  src: 'https://bafybeiabmsm2gy3eb7d3b3zx7mqmg7tg54swosqjb2swcwpatgrctu5ry4.ipfs.dweb.link/',
  alt: 'Jord',
  size: 'sm',
};
export const MediumAvatar = Template.bind({});
MediumAvatar.args = {
  src: 'https://bafybeiabmsm2gy3eb7d3b3zx7mqmg7tg54swosqjb2swcwpatgrctu5ry4.ipfs.dweb.link/',
  alt: 'Jord',
  size: 'md',
};
export const LargeAvatar = Template.bind({});
LargeAvatar.args = {
  src: 'https://bafybeiabmsm2gy3eb7d3b3zx7mqmg7tg54swosqjb2swcwpatgrctu5ry4.ipfs.dweb.link/',
  alt: 'Jord',
  size: 'lg',
};
export const FallbackAvatar = Template.bind({});
FallbackAvatar.args = {
  src: undefined,
  alt: "don't know",
  size: undefined,
  fallback: 'FB',
};
export const CustomSizeAvatar = Template.bind({});

CustomSizeAvatar.args = {
  src: 'https://bafybeiabmsm2gy3eb7d3b3zx7mqmg7tg54swosqjb2swcwpatgrctu5ry4.ipfs.dweb.link/',
  alt: 'Jord',
  size: '16rem',
  fallback: 'FB',
};
