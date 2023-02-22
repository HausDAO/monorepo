import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useTheme } from 'styled-components';

import {
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuTrigger,
  NavMenuContent,
  NavMenuLink,
  NavMenuViewport,
  NavMenuIndicator,
} from './NavigationMenu';

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
            <ul
              style={{
                position: 'relative',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
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
        <NavMenuItem>
          <NavMenuTrigger>Dropdown Two</NavMenuTrigger>
          <NavMenuContent>
            <ul
              style={{
                position: 'relative',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li>
                <NavMenuItem>
                  <NavMenuLink>Dropdown 2 List Item One Content</NavMenuLink>
                </NavMenuItem>
              </li>
              <li>
                <NavMenuItem>
                  <NavMenuLink>Dropdown 2 List Item Two Content</NavMenuLink>
                </NavMenuItem>
              </li>
              <li>
                <NavMenuItem>
                  <NavMenuLink>Dropdown 2 List Item Three Content</NavMenuLink>
                </NavMenuItem>
              </li>
            </ul>
          </NavMenuContent>
        </NavMenuItem>
      </NavMenuList>
      <NavMenuIndicator />
    </NavMenu>
  );
};

export const BaseNavigationMenu = Template.bind({});

BaseNavigationMenu.args = {
  children: 'Button',
  color: 'primary',
};
