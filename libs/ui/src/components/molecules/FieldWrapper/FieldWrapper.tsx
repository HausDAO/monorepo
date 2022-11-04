import { ReactNode } from 'react';
import classNames from 'classnames';
import { RiAsterisk } from 'react-icons/ri';

import { Label } from '../../atoms/Label';
import { Tooltip } from '../../atoms/Tooltip';
import { Icon } from '../../atoms/Icon';
import {
  ErrorText,
  HelperText,
  SuccessText,
  WarningText,
} from '../../atoms/HelperTexts';
import { Spinner } from '../../atoms/Spinner';
import {
  BottomContainer,
  FieldWrapperBase,
  LabelContainer,
  LeftAddonContainer,
  RequiredAsterisk,
  RightAddonContainer,
} from './FieldWrapper.styles';
import { Buildable } from '../../../types/formAndField';
import {
  ErrorMessage,
  WarningMessage,
  SuccessMessage,
} from '../../../types/formAndField';
import { FieldError, useFormContext } from 'react-hook-form';

// type FieldWrapperType = PrimitiveElement & PrimitiveWrapper & PrimitiveSizable;

type HelperTextFactoryProps = {
  error?: ErrorMessage | FieldError;
  warning?: WarningMessage;
  success?: SuccessMessage;
  helperText?: string;
};

export const FieldWrapper = ({
  children,
  label,
  loading,
  info,
  error,
  success,
  warning,
  helperText,
  hidden,
  long,
  full,
  address,
  id,
  rules,
  rightAddon,
}: Buildable<{ children: ReactNode }>) => {
  const classes = classNames({ long: long || address, full, hidden });
  const { getFieldState } = useFormContext();

  const fieldError = getFieldState(id).error;

  return (
    <FieldWrapperBase className={classes}>
      <LabelContainer>
        {rules?.required && (
          <RequiredAsterisk>
            <Icon label="Required">
              <RiAsterisk />
            </Icon>
          </RequiredAsterisk>
        )}
        {label && <Label id={id}>{label}</Label>}
        {info && <Tooltip content={info} />}
      </LabelContainer>
      <div className="field-slot">{children}</div>
      <BottomContainer className={classes}>
        <LeftAddonContainer>
          {loading && <Spinner size="2rem" />}
          <HelperTextFactory
            error={error || fieldError}
            success={success}
            warning={warning}
            helperText={helperText}
          />
        </LeftAddonContainer>
        {rightAddon && <RightAddonContainer>{rightAddon}</RightAddonContainer>}
      </BottomContainer>
    </FieldWrapperBase>
  );
};

export default FieldWrapper;

const HelperTextFactory = ({
  error,
  success,
  warning,
  helperText,
}: HelperTextFactoryProps) => {
  if (!error && !success && !warning && !helperText) return null;

  if (error) return <ErrorText>{error.message}</ErrorText>;
  if (warning) return <WarningText>{warning.message}</WarningText>;
  if (success) return <SuccessText>{success.message}</SuccessText>;
  return <HelperText>{helperText}</HelperText>;
};
