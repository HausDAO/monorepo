import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiAlertLine } from 'react-icons/ri/index.js';

import { Link } from './Link';

export default {
  title: 'Atoms/Link',
  component: Link,
  decorators: [(ComponentStory) => <ComponentStory />],
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => {
  return <Link {...args} />;
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  href: 'https://daohaus.club/',
  children: 'External Link',
};

export const ExternalLinkWithIcon = Template.bind({});
ExternalLinkWithIcon.args = {
  href: 'https://daohaus.club/',
  external: false,
  children: 'External Link',
  RightIcon: RiAlertLine,
};
