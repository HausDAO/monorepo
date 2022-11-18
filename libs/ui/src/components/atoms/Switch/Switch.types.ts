import React, { FocusEventHandler, FormEventHandler } from 'react';
import type { SwitchProps as RadixSwitchProps } from '@radix-ui/react-switch';

type OmittedSwitchProps = 'checked' | 'defaultChecked';

export interface SwitchProps
  extends Omit<RadixSwitchProps, OmittedSwitchProps> {
  defaultOn?: boolean;
  fieldLabel: string;
  id?: string;
  className?: string;
  switchOn?: boolean;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  onChange?: FormEventHandler<HTMLButtonElement>;
  onCheckedChange?: () => void;
}
