import { Link as RouterLink } from 'react-router-dom';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RiArrowDropDownLine, RiAlertLine } from 'react-icons/ri';

import { NewLink } from './Link';

export default {
  title: 'Atoms/Link',
  component: NewLink,
  decorators: [(ComponentStory) => <ComponentStory />],
} as ComponentMeta<typeof NewLink>;

const Template: ComponentStory<typeof NewLink> = (args) => {
  return (
    <div className="">
      <NewLink as="a" href="/home">
        Mark's Link
      </NewLink>
      <NewLink as="button">Router Link</NewLink>
      <NewLink as="h1">Router Default</NewLink>
      <NewLink as={RouterLink} to="/Home">
        Router Default
      </NewLink>
    </div>
  );
};

export const UniversalLinkBase = Template.bind({});
UniversalLinkBase.args = {
  // href: 'https://daohaus.club/',
  as: RouterLink,
  external: true,
  disabled: false,
  children: 'External Link',
};

export const ReactRouterLink = Template.bind({});
UniversalLinkBase.args = {
  href: 'https://daohaus.club/',

  as: RouterLink,
  external: true,
  disabled: false,
  children: 'Router Link',
};

// export const ExternalLink = Template.bind({});
// ExternalLink.args = {
//   href: 'https://daohaus.club/',
//   linkType: 'external',
//   children: 'External Link',
// };

// export const ExternalLinkWithIcon = Template.bind({});
// ExternalLinkWithIcon.args = {
//   href: 'https://daohaus.club/',
//   linkType: 'external',
//   children: 'External Link',
//   Icon: RiAlertLine,
// };

// export const InternalLink = Template.bind({});
// InternalLink.args = {
//   href: '/Home',
//   children: 'Internal Link',
// };

// export const InternalLinkWithIcon = Template.bind({});
// InternalLinkWithIcon.args = {
//   href: '/Home',
//   children: 'Internal Link',
//   Icon: RiArrowDropDownLine,
// };
