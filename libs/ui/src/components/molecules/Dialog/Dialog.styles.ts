import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';

// TODO: Add mediaQuery section to theme
import { widthQuery } from '../../../theme';

export const DialogRoot = DialogPrimitive.Root;
export const DialogPrimitiveTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

const overlayShow = keyframes`
  0% { opacity: 0 };
  100% { opacity: 1 };
`;

export const StyledDialogOverlay = styled(DialogPrimitive.Overlay)`
  background-color: ${({ theme }) => theme.dialog.overlay.bg};
  position: fixed;
  inset: 0;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const contentShow = keyframes`
  0% { opacity: 0; transform: translate(-50%, -48%) scale(.96) };
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1) };
`;

export const StyledDialogContent = styled(DialogPrimitive.Content)`
  background-color: ${({ theme }) => theme.dialog.content.bg};
  border-radius: ${({ theme }) => theme.dialog.radius};
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  color: ${({ theme }) => theme.dialog.content.color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  left: 50%;
  max-height: 85vh;
  max-width: 80%;
  min-height: 23rem;
  padding: 3rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &:focus {
    outline: none;
  }
`;

export const DialogBody = styled.div`
  display: flex;
  height: auto;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const CloseIcon = styled.div`
  margin-left: auto;
  cursor: pointer;
  font-size: 24px;
`;

export const ButtonContainer = styled.div<{
  align: 'start' | 'end';
}>`
  align-self: ${(props) => `flex-${props.align}`};
  display: flex;
  gap: 1rem;
  @media ${widthQuery.sm} {
    width: 100%;
  }
`;
