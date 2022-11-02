import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IconType } from 'react-icons';

import { Dropdown, DropdownMenuItem } from '../../molecules';
import { AppSwitcherLink, AppSwitcherTrigger } from './AppSwitcher.styles';
import { useBreakpoint } from '../../../hooks/useMediaQuery';
import { widthQuery } from '../../../theme/global/breakpoints';

interface IApp {
  name: string;
  url: string;
  icon?:
    | IconType
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >;
}

export type AppSwitcherProps = {
  trigger: IApp;
  apps: IApp[];
  spacing?: string;
  width?: string;
  menuBg?: string;
  className?: string;
};

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
