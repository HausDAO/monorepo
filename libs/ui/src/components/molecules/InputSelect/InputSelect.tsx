import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputSelectProps } from '../../../types/formAndField';

import { Input, Select } from '../../atoms';

import { InputSelectBox } from './InputSelect.styles';

export const InputSelect = ({
  selectId,
  id,
  options,
  disabled,
  long,
  full,
  error,
  warning,
  placeholder,
  selectPlaceholder,
  registerSelect = {},
  registerInput = {},
  defaultValue,
  selectDefault,
}: InputSelectProps & {
  registerSelect?: UseFormRegisterReturn | Record<string, unknown>;
  registerInput?: UseFormRegisterReturn | Record<string, unknown>;
}) => {
  const classes = classNames({ long, full });
  const selectClasses = classNames({ 'match-long': long, 'match-full': full });

  return (
    <InputSelectBox className={classes}>
      <Input
        id={id}
        disabled={disabled}
        className={`input ${classes}`}
        placeholder={placeholder}
        error={error}
        warning={warning}
        full
        defaultValue={defaultValue}
        {...registerInput}
      />
      <Select
        id={selectId}
        options={options}
        defaultValue={selectDefault}
        disabled={disabled}
        className="select"
        containerClassName={`select-box ${selectClasses}`}
        placeholder={selectPlaceholder}
        error={error}
        warning={warning}
        {...registerSelect}
      />
    </InputSelectBox>
  );
};
