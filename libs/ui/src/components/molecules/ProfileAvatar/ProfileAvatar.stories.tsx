import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileAvatar } from './ProfileAvatar';

export default {
  title: 'Molecules/ProfileAvatar',
  component: ProfileAvatar,
} as ComponentMeta<typeof ProfileAvatar>;

const Template: ComponentStory<typeof ProfileAvatar> = (args) => (
  <ProfileAvatar {...args} />
);
export const ProfilePicCase = Template.bind({});

ProfilePicCase.args = {
  image:
    'https://bafybeiabmsm2gy3eb7d3b3zx7mqmg7tg54swosqjb2swcwpatgrctu5ry4.ipfs.dweb.link/',
  address: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
};

export const NoProfilePicCase = Template.bind({});

NoProfilePicCase.args = {
  image: undefined,
  address: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
};
export const NoDataCase = Template.bind({});
NoDataCase.args = {
  image: undefined,
  address: undefined,
};
