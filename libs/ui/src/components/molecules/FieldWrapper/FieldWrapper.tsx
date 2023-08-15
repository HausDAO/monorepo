import { ReactNode } from 'react';
import classNames from 'classnames';
import { RiAsterisk } from 'react-icons/ri/index.js';
import { useFormContext } from 'react-hook-form';

import { Buildable } from '../../../types/formAndField';
import {
  Label,
  Tooltip,
  Icon,
  Loading,
  ErrorText,
  HelperText,
  SuccessText,
  WarningText,
} from '../../atoms/';

import { FieldWrapperHelperTextFactoryProps } from './FieldWrapper.types';
import {
  BottomContainer,
  FieldWrapperBase,
  LabelContainer,
  LeftAddonContainer,
  RequiredAsterisk,
  RightAddonContainer,
} from './FieldWrapper.styles';

// type FieldWrapperType = PrimitiveElement & PrimitiveWrapper & PrimitiveSizable;
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
          {loading && <Loading size={20} />}
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

const HelperTextFactory = ({
  error,
  success,
  warning,
  helperText,
}: FieldWrapperHelperTextFactoryProps) => {
  if (!error && !success && !warning && !helperText) return null;

  if (error) return <ErrorText>{error.message}</ErrorText>;
  if (warning) return <WarningText>{warning.message}</WarningText>;
  if (success) return <SuccessText>{success.message}</SuccessText>;
  return <HelperText>{helperText}</HelperText>;
};
