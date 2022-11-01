import { forwardRef, RefObject } from 'react';
import { ParXs } from '../../atoms/Typography';

import { FieldAlertWrapper } from './FieldAlert.styles';

export type FieldAlertProps = {
  className?: string;
  message: string;
};

type Ref =
  | ((instance: HTMLBaseElement | null) => void)
  | RefObject<HTMLBaseElement>
  | null
  | undefined;

export const FieldAlert: React.FC<React.PropsWithChildren & FieldAlertProps> =
  forwardRef(({ className, message, children }, ref: Ref) => {
    return (
      <FieldAlertWrapper className={className}>
        <ParXs>{message}</ParXs>
        {children}
      </FieldAlertWrapper>
    );
  });
