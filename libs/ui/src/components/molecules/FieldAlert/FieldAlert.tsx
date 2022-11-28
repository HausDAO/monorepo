import React from 'react';

import { ParXs } from '../../atoms/Typography';

import { FieldAlertProps } from './FieldAlert.types';
import { FieldAlertWrapper } from './FieldAlert.styles';

export const FieldAlert: React.FC<
  React.PropsWithChildren & FieldAlertProps
> = ({ className, message, children }) => {
  return (
    <FieldAlertWrapper className={className}>
      <ParXs>{message}</ParXs>
      {children}
    </FieldAlertWrapper>
  );
};
