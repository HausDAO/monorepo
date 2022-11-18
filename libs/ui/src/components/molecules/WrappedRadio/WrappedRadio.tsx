import { Controller } from 'react-hook-form';

import type { Buildable } from '../../../types/formAndField';
import type { RadioItemGroupProps } from '../../atoms/Radio/Radio.types';
import { Radio } from '../../atoms/Radio';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import { useMemo } from 'react';

type RadioGroupWrapperProps = {
  defaultValue?: string;
  radioGroup: RadioItemGroupProps;
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
