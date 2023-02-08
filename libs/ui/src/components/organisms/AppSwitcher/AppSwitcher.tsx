import React from 'react';

import {
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '../../molecules/Dropdown';

import { IApp, AppSwitcherProps } from './AppSwitcher.types';
import { ReactComponent as Hub } from '../../../assets/Hub.svg';
import { ReactComponent as Daohaus } from '../../../assets/Daohaus.svg';
import { ReactComponent as Summoner } from '../../../assets/Summoner.svg';
import { ReactComponent as Docs } from '../../../assets/Docs.svg';
import { Button } from '../../atoms/Button';

function makeAppList(apps: IApp[]) {
  return apps.map((app, index) => (
    <DropdownItem key={index} asChild>
      <Button href={app.url} IconLeft={app.Icon}>
        {app.name}
      </Button>
    </DropdownItem>
  ));
}

export const AppSwitcher = ({
  currentApp,
  apps,
  className,
}: AppSwitcherProps) => {
  const appList = makeAppList(apps);
  return (
    <DropdownMenu>
      <DropdownTrigger IconLeft={currentApp.Icon}>
        {currentApp.name}
      </DropdownTrigger>
      <DropdownContent align="end">
        <DropdownItem asChild>
          <Button IconLeft={currentApp.Icon} href="https://hub.daohaus.club/">
            Hub
          </Button>
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
};
