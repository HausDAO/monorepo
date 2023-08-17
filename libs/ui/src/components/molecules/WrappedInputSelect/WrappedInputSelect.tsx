import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from '../FieldWrapper';
import { InputSelect } from '../InputSelect';
import { Buildable, InputSelectProps } from '../../../types/formAndField';

export const WrappedInputSelect = ({
  id,
  selectId,
  rules,
  options,
  disabled,
  long,
  full,
  error,
  warning,
  placeholder,
  selectPlaceholder,
  defaultValue,
  selectDefault,
  helperText,
  label,
  loading,
  info,
  success,
  hidden,
  address,
  rightAddon,
}: Buildable<InputSelectProps>) => {
  const { register } = useFormContext();

  return (
    <FieldWrapper
      id={id}
      rules={rules}
      helperText={helperText}
      label={label}
      loading={loading}
      info={info}
      error={error}
      success={success}
      warning={warning}
      hidden={hidden}
      long={long}
      full={full}
      address={address}
      rightAddon={rightAddon}
    >
      <InputSelect
        options={options}
        disabled={disabled}
        long={long}
        full={full}
        error={error}
        warning={warning}
        placeholder={placeholder}
        selectPlaceholder={selectPlaceholder}
        defaultValue={defaultValue}
        selectDefault={selectDefault}
        registerInput={register(id, rules)}
        registerSelect={register(selectId)}
        id={id}
        selectId={selectId}
      />
    </FieldWrapper>
  );
};
