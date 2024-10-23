import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  widthQuery,
  Button,
  font,
  DropdownLinkStyles,
} from '@daohaus/ui';

export const SafeContainer = styled(Card)`
  padding: 3rem;
  width: 100%;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const SafeOverviewCard = styled(Card)`
  background-color: ${({ theme }) => theme.secondary.step3};
  border: none;
  padding: 3rem;
  width: 100%;
`;

export const SafeCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;

  .right-section {
    display: flex;
  }

  .safe-link {
    padding: 0.9rem;
    background-color: ${({ theme }) => theme.secondary.step5};
    border-radius: 4px;
  }
`;

export const TagSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
`;

export const SafeActionMenuTrigger = styled(Button)`
  width: 0.5rem;

  &[data-state='open'] {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  svg.icon-left {
    color: ${({ theme }) => theme.primary.step9};
    margin-right: 0;
    margin: 5rem;
  }
`;

export const SafeActionMenuLink = styled(RouterLink)`
  ${DropdownLinkStyles}
  font-weight: ${font.weight.bold};
`;

export const SafeToken = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
