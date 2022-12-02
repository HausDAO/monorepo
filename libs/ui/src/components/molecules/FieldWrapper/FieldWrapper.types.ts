import { FieldError } from 'react-hook-form';

import {
  ErrorMessage,
  WarningMessage,
  SuccessMessage,
} from '../../../types/formAndField';

export type FieldWrapperHelperTextFactoryProps = {
  error?: ErrorMessage | FieldError;
  warning?: WarningMessage;
  success?: SuccessMessage;
  helperText?: string;
};
