import styled, { keyframes } from 'styled-components';
import * as Collapsible from '@radix-ui/react-collapsible';

import { CardStyles } from '../../atoms/Card/Card.styles';
import { Card } from '../../atoms/Card/Card';
import { Theme } from '../../../types';
import { Button } from '../../atoms/Button';

type CardProps = {
  noBackground?: boolean;
  width: string;
  theme: Theme;
};

export const StyledCollapsibleCard = styled(Collapsible.Root)`
  ${CardStyles}
  background-color: ${({ noBackground, theme }: CardProps) =>
    noBackground ? 'inherit' : theme.secondary.step2};
  border: ${({ noBackground }: { noBackground?: boolean }) =>
      noBackground ? '0' : '1'}px
    solid ${({ theme }: { theme: Theme }) => theme.secondary.step5};
  width: ${(props) => props.width};
`;

export const InnerCard = styled(Card)`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondaryA.step3};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step5};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.width};
`;

export const StyledCardActionsContainer = styled.div`
  display: flex;
`;

export const StyledCollapsibleCardTrigger = Collapsible.Trigger;

export const StyledCollapsibleCardButton = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 2px transparent solid;
  /* color: ${(props) => props.theme.secondary.step12}; */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  letter-spacing: 1.5px;
  /* padding-bottom: 1rem; */
  transition: 0.2s all;
  /* svg {
    margin-left: 0.3rem;
  } */
  /* :hover {
    color: ${(props) => props.theme.secondary.step10};
    text-decoration: none;
  } */
  /* &.selected {
    color: white;
    border-bottom: 2px ${(props) => props.theme.secondary.step9} solid;
  }
  &.navTabs {
    padding-bottom: 1rem;
  } */

  color: ${({ theme }: { theme: Theme }) => theme.primary.step11};
  margin-left: 2rem;
  padding: 0;
  font-size: 14px;

  :hover {
    color: ${({ theme }: { theme: Theme }) => theme.primary.step10};
    text-decoration: none;
  }

  :focus {
    color: ${({ theme }: { theme: Theme }) => theme.primary.step12};
  }

  svg {
    font-size: 20px;
    margin-left: auto;
  }

  &[data-state='open'] {
    svg {
      transform: rotate(180deg);
    }
  }
`;

const open = keyframes({
  from: { height: 0 },
  to: { height: 100 },
});

const close = keyframes({
  from: { height: 100 },
  to: { height: 0 },
});

export const StyledCollapsibleContent = styled(Collapsible.Content)`
  margin-top: 2rem;
  overflow: hidden;
  &[data-state='open'] {
    animation: ${open} 300ms ease-out;
  }
  &[data-state='closed'] {
    animation: ${close} 300ms ease-out;
  }
`;
