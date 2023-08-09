import * as ToastPrimitive from '@radix-ui/react-toast';
import styled, { keyframes } from 'styled-components';

import { ToastType } from './Toast.types';

// TODO Rename to follow pattern established in Dropdown & Navigation Menu
export const Provider = ToastPrimitive.Provider;
export const Title = ToastPrimitive.Title;
export const Description = ToastPrimitive.Description;
export const Close = ToastPrimitive.Close;

const VIEWPORT_PADDING = 25;

const hide = keyframes`
0% { opacity: 1 };
  100% { opacity: 0 };
  `;

const slideIn = keyframes`
from { transform: translateX(calc(100% + ${VIEWPORT_PADDING}px)) };
to { transform: 'translateX(0)' };
`;

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

export const Viewport = styled(ToastPrimitive.Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  width: 395px;
  max-width: 90vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;

export const Root = styled(ToastPrimitive.Root)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.secondary.step3};
  border: 1px solid ${({ theme }) => theme.secondary.step5};
  border-radius: 0.8rem;
  height: auto;
  padding: 2rem;
  width: auto;

  &.success {
    background-color: ${({ theme }) => theme.success.step3};
    border: 0.1rem solid ${({ theme }) => theme.success.step7};
  }

  &.warning {
    background-color: ${({ theme }) => theme.warning.step3};
    border: 0.1rem solid ${({ theme }) => theme.warning.step7};
  }

  &.error {
    background-color: ${({ theme }) => theme.danger.step3};
    border: 0.1rem solid ${({ theme }) => theme.danger.step7};
  }

  @media (prefers-reduced-motion: no-preference) {
    &[data-state='open'] {
      animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    &[data-state='closed'] {
      animation: ${hide} 100ms ease-in forwards;
    }
    &[data-swipe='move'] {
      transform: 'translateX(var(--radix-toast-swipe-move-x))';
    }
    &[data-swipe='cancel'] {
      transform: 'translateX(0)';
      transition: 'transform 200ms ease-out';
    }
    &[data-swipe='end'] {
      animation: ${swipeOut} 100ms ease-out forwards;
    }
  } ;
`;

export const HeaderContainer = styled.div`
  display: flex;
`;

export const Icon = styled.span<{
  $iconType: ToastType;
}>`
  color: ${({ theme, $iconType }) => theme.toast.icon[$iconType]};
  font-size: 24px;
  margin-right: 1rem;
`;

export const CopyContainer = styled.div`
  display: block;
  width: 100%;
`;

export const Action = styled(ToastPrimitive.Action)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const CloseIcon = styled.div`
  cursor: pointer;
  font-size: 17px;
`;
