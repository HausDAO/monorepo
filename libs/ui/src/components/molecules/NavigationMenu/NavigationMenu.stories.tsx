import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useTheme } from 'styled-components';

import {
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuTrigger,
  NavMenuContent,
  NavMenuLink,
  NavViewport,
  NavViewportPosition,
} from './NavigationMenu';
import React from 'react';

export default {
  title: 'Molecules/NavigationMenu',
  component: NavMenu,
  subcomponents: {
    NavMenuItem,
    NavMenuTrigger,
    NavMenuContent,
    NavMenuLink,
  },
} as ComponentMeta<typeof NavMenu>;

const Template: ComponentStory<typeof NavMenu> = (args) => {
  const theme = useTheme();
  return (
    <NavMenu>
      <NavMenuList>
        <NavMenuItem>
          <NavMenuLink>Link One</NavMenuLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavMenuLink>Link Two</NavMenuLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavMenuLink>Link Three</NavMenuLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavMenuTrigger>Dropdown One</NavMenuTrigger>
          <NavMenuContent>
            <ul>
              <li>
                <NavMenuItem>
                  <NavMenuLink>List Item One Content</NavMenuLink>
                </NavMenuItem>
              </li>
              <li>
                <NavMenuItem>
                  <NavMenuLink>List Item Two Content</NavMenuLink>
                </NavMenuItem>
              </li>
              <li>
                <NavMenuItem>
                  <NavMenuLink>List Item Three Content</NavMenuLink>
                </NavMenuItem>
              </li>
            </ul>
          </NavMenuContent>
        </NavMenuItem>
      </NavMenuList>
      <NavViewportPosition>
        <NavViewport />
      </NavViewportPosition>
    </NavMenu>
  );
};

export const BaseNavigationMenu = Template.bind({});

BaseNavigationMenu.args = {
  children: 'Button',
  color: 'primary',
};
