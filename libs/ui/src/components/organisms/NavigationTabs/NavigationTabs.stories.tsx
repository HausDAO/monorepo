import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NavigationTabs } from './NavigationTabs';

export default {
  title: 'Organisms/NavigationTabs',
  component: NavigationTabs,
} as ComponentMeta<typeof NavigationTabs>;

const Template: ComponentStory<typeof NavigationTabs> = (args) => (
  <NavigationTabs {...args} />
);

export const NavigationTabsExample = Template.bind({});
NavigationTabsExample.args = {
  navLinks: [
    { label: 'Home', href: '/home' },
    { label: 'Proposals', href: '/proposals' },
    { label: 'Vaults', href: '/vaults' },
    { label: 'Members', href: '/members' },
  ],
};

export const NavigationTabsWithDropdown = Template.bind({});
NavigationTabsWithDropdown.args = {
  navLinks: [
    { label: 'Home', href: '/home' },
    { label: 'Proposals', href: '/proposals' },
    { label: 'Vaults', href: '/vaults' },
    { label: 'Members', href: '/members' },
  ],
  dropdownLinks: [
    { label: 'Dropdown Link 1', href: '/dropdown1' },
    { label: 'Dropdown Link 2', href: '/dropdown2' },
    { label: 'Dropdown Link 3', href: '/dropdown3' },
    { label: 'Dropdown Link 4', href: '/dropdown4' },
  ],
};
