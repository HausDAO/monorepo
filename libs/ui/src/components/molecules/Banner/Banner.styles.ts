import { breakpoints } from '../../../theme/global/breakpoints';
import styled from 'styled-components';

import { Theme } from '../../../types/theming';

export const StyledBanner = styled.div`
  align-items: center;
  display: flex;
  background-color: ${({ theme }: { theme: Theme }) => theme.banner.bg};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.banner.border};
  color: ${({ theme }: { theme: Theme }) => theme.banner.color};
  flex-wrap: wrap;
  height: auto;
  justify-content: space-between;
  min-height: 8rem;
  padding: 2rem 4rem;
  width: 100%;

  .banner--text-container {
    align-items: center;
    display: flex;
    margin-bottom: 1.6rem;
    @media (min-width: ${breakpoints.xs}) {
      margin-bottom: 0;
    }

    svg {
      font-size: 10.8rem;
      margin-right: 1.4rem;
      @media (min-width: ${breakpoints.xs}) {
        font-size: 2.8rem;
      }
    }
  }

  .banner--link-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media (min-width: ${breakpoints.xs}) {
      justify-content: flex-start;
      width: auto;
    }

    svg {
      font-size: 2.4rem;
      margin-right: 1rem;
    }
  }

  .banner--link-item {
    @media (min-width: ${breakpoints.xs}) {
      margin: 0 6rem;
    }
  }
`;
