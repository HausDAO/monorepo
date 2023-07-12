import styled, { keyframes } from 'styled-components';
import * as Collapsible from '@radix-ui/react-collapsible';

import { CardStyles } from '../../atoms/Card/Card.styles';
import { Card } from '../../atoms/Card/Card';

export const StyledCollapsibleCard = styled(Collapsible.Root)<{
  width?: string;
  noBackground?: boolean;
}>`
  ${CardStyles}
  background-color: ${({ noBackground, theme }) =>
    noBackground ? 'inherit' : theme.collapsibleCard.outer.bg};
  border: ${({ noBackground }) => (noBackground ? '0' : '1')}px solid
    ${({ theme }) => theme.collapsibleCard.outer.border};
  width: ${(props) => props.width};
`;

export const InnerCard = styled(Card)`
  background-color: ${({ theme }) => theme.collapsibleCard.inner.bg};
  border: 1px solid ${({ theme }) => theme.collapsibleCard.inner.border};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.width};
`;

export const StyledCardActionsContainer = styled.div`
  display: flex;
`;

export const StyledCollapsibleCardTrigger = styled(Collapsible.Trigger)`
  align-items: center;
  background-color: transparent;
  border: none;
  border-bottom: 2px transparent solid;
  color: ${({ theme }) => theme.collapsibleCard.trigger.color};
  cursor: pointer;
  display: inline-flex;
  font-size: 14px;
  letter-spacing: 1.5px;
  margin-left: 2rem;
  padding: 0;
  transition: 0.2s all;

  :hover {
    color: ${({ theme }) => theme.collapsibleCard.trigger.hover.color};
    text-decoration: none;
  }

  :focus {
    color: ${({ theme }) => theme.collapsibleCard.trigger.focus.color};
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

const open = keyframes`
  from { 
    height: 0 
  }
  to { 
    height: 100 
  }
`;

const close = keyframes`
  from { 
    height: 100 
  }
  to { 
    height: 0 
  }
`;

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
