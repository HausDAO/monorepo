import { RiAsterisk } from 'react-icons/ri';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from './Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const BaseIcon = Template.bind({});
BaseIcon.args = {
  label: 'Test Icon',
  children: <RiAsterisk />,
};

export const StyledIconComponent = Template.bind({});
StyledIconComponent.args = {
  label: 'Styled Icon',
  children: (
    <RiAsterisk style={{ color: 'red', height: '2rem', width: '2rem' }} />
  ),
};

export const StyledSVGIcon = Template.bind({});
StyledSVGIcon.args = {
  label: 'Styled Icon',
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: 'red', height: '2rem', width: '2rem' }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
};
