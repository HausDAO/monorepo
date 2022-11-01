import { Controller } from 'react-hook-form';
import { RadioGroupProps } from '@radix-ui/react-radio-group';

import type { Buildable } from '../../../types/formAndField';
import { Radio, Props } from '../../atoms/Radio';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import { useMemo } from 'react';

type RadioGroupComponentProps = RadioGroupProps & Props;
type RadioGroupWrapperProps = {
  defaultValue?: string;
  radioGroup: RadioGroupComponentProps;
};

export const WrappedRadio = (props: Buildable<RadioGroupWrapperProps>) => {
  const {
    id,
    helperText,
    info,
    label,
    error,
    success,
    warning,
    radioGroup,
    disabled,
    rules,
  } = props;
  const disableAll = disabled;
  const radios = useMemo(() => {
    return disableAll
      ? radioGroup?.radios.map((radio) => ({ ...radio, disabled: true }))
      : radioGroup.radios;
  }, [radioGroup, disableAll]);

  return (
    <FieldWrapper
      id={id}
      helperText={helperText}
      info={info}
      label={label}
      error={error}
      success={success}
      warning={warning}
    >
      <Controller
        name={radioGroup.name || id}
        defaultValue={radioGroup.defaultValue}
        rules={rules}
        render={({ field }) => {
          return (
            <Radio
              onValueChange={field.onChange}
              radios={radios}
              defaultValue={radioGroup.defaultValue}
              ref={field.ref}
            />
          );
        }}
      />
    </FieldWrapper>
  );
};
