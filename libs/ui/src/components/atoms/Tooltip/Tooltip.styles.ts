import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import styled from 'styled-components';

import { font } from '../../../theme/global/font';
import { fadeIn } from '../../../animations/general';
import { Theme } from '../../../types/theming';
import { border } from '../../../theme/global/border';

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipPortal = TooltipPrimitive.Portal;
export const TooltipTrigger = styled(TooltipPrimitive.Trigger)`
  background-color: transparent;
  border: none;
  padding: 0;
  svg {
    color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
  }
`;

export const TooltipArrow = styled(TooltipPrimitive.Arrow)`
  fill: ${({ theme }: { theme: Theme }) => theme.secondary.step6};
`;

export const TooltipContent = styled(TooltipPrimitive.Content)`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step6};
  border-radius: ${border.radius};
  color: ${({ theme }: { theme: Theme }) => theme.rootFontColor};
  font-size: ${font.size.md};
  line-height: 2.4rem;
  max-width: 30rem;
  padding: 1.2rem 1.5rem;

  &[data-state='delayed-open'] {
    animation: ${fadeIn} 0.15s ease-in forwards;
  }
`;
