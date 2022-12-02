import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri/index.js';

import { widthQuery } from '../../../theme/global/breakpoints';
import { useBreakpoint } from '../../../hooks/useMediaQuery';
import { Dropdown, DropdownMenuItem } from '../../molecules';

import { IApp, AppSwitcherProps } from './AppSwitcher.types';
import { AppSwitcherLink, AppSwitcherTrigger } from './AppSwitcher.styles';

function getDropdownApps(apps: IApp[]) {
  return apps.map((app, index) => (
    <DropdownMenuItem key={index} asChild>
      <AppSwitcherLink
        href={app.url}
        LeftIcon={app.icon}
        linkType="no-icon-external"
      >
        {app.name}
      </AppSwitcherLink>
    </DropdownMenuItem>
  ));
}

export const AppSwitcher = ({
  className,
  trigger,
  apps,
  width,
}: AppSwitcherProps) => {
  const dropdownApps = getDropdownApps(apps);
  const isMobile = useBreakpoint(widthQuery.sm);

  const buttonWidth = width || isMobile ? '100%' : '17.4rem';

  return (
    <Dropdown
      className={className}
      menuMinWidth={width}
      trigger={
        <AppSwitcherTrigger
          width={buttonWidth}
          size={isMobile ? 'sm' : 'md'}
          IconLeft={trigger.icon}
          IconRight={RiArrowDropDownLine}
        >
          {trigger.name}
        </AppSwitcherTrigger>
      }
    >
      {dropdownApps}
    </Dropdown>
  );
};
