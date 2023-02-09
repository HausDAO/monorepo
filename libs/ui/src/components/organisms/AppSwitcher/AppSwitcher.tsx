import React from 'react';

import { Button } from '../../atoms/Button';
import {
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '../../molecules/Dropdown';

import { IApp, AppSwitcherProps } from './AppSwitcher.types';

function makeAppList(apps: IApp[]) {
  return apps.map((app, index) => (
    <DropdownItem key={index} asChild>
      <Button href={app.url} IconLeft={app.Icon}>
        {app.name}
      </Button>
    </DropdownItem>
  ));
}

export const AppSwitcher = ({ currentApp, apps }: AppSwitcherProps) => {
  const appList = makeAppList(apps);
  return (
    <DropdownMenu>
      <DropdownTrigger IconLeft={currentApp.Icon}>
        {currentApp.name}
      </DropdownTrigger>
      <DropdownContent align="end">{appList}</DropdownContent>
    </DropdownMenu>
  );
};
