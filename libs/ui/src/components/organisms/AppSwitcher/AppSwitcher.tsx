import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri/index.js';

import { widthQuery } from '../../../theme/global/breakpoints';
import { useBreakpoint } from '../../../hooks/useMediaQuery';
import {
  DropdownCheckbox,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownSeparator,
  DropdownTrigger,
} from '../../molecules/Dropdown';

import { IApp, AppSwitcherProps } from './AppSwitcher.types';
import { ReactComponent as Hub } from '../../../assets/Hub.svg';
import { ReactComponent as Daohaus } from '../../../assets/Daohaus.svg';
import { ReactComponent as Summoner } from '../../../assets/Summoner.svg';
import { ReactComponent as Docs } from '../../../assets/Docs.svg';
import { AppSwitcherLink } from './AppSwitcher.styles';
import { Button } from '../../atoms/Button';
import { Link } from '../../atoms';

function makeDropdownList(apps: IApp[]) {
  return apps.map((app, index) => (
    <DropdownItem asChild IconLeft={app.Icon}>
      <Link href={app.url}>{app.name}</Link>
    </DropdownItem>
  ));
}

export const AppSwitcher = ({ className }: AppSwitcherProps) => {
  return (
    <DropdownMenu>
      <DropdownTrigger IconLeft={Hub}>Hub</DropdownTrigger>
      <DropdownContent align="end">
        <DropdownItem asChild>
          <Button size="sm" href="https://storybook.daohaus.fun/?">
            Storybook
          </Button>
        </DropdownItem>
        <DropdownItem onClick={() => alert('changing to Home')} IconLeft={Docs}>
          Docs
        </DropdownItem>
        <DropdownItem
          onClick={() => alert('changing to Home')}
          IconLeft={Daohaus}
        >
          DAOHaus
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
};
