import { ComponentProps, ReactNode } from 'react';

import { DaoHausNav, DaoHausNavMenu } from '../DaoHausNav/DaoHausNav';
import { AppSwitcher, MainLayout, widthQuery } from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';
import styled from 'styled-components';
import { DaoHausNavProps } from '../DaoHausNav/DaoHausNav.types';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.6rem 3rem;
  width: 100%;
  @media ${widthQuery.sm} {
    padding: 2rem;
  }
  .left-nav {
    @media ${widthQuery.sm} {
      width: 100%;
    }
  }
`;

export const DHLayout = ({
  navLinks,
  dropdownLinks,
  dropdownTriggerLabel,
  children,
  appNavLinks,
  leftNav,
  pathname,
  footer,
}: DaoHausNavProps & {
  children: ReactNode;
  leftNav?: ReactNode;
  appNavLinks?: ComponentProps<typeof AppSwitcher>;
  pathname: string;
  footer?: ReactNode;
}) => {
  return (
    <OuterLayout>
      <Header>
        <div className="left-nav">
          {appNavLinks && <AppSwitcher {...appNavLinks} />}
          {leftNav}
        </div>
        <DaoHausNav />
      </Header>
      <DaoHausNavMenu
        navLinks={navLinks}
        dropdownLinks={dropdownLinks}
        dropdownTriggerLabel={dropdownTriggerLabel}
        pathname={pathname}
      />
      <MainLayout>{children}</MainLayout>
      {footer}
    </OuterLayout>
  );
};
