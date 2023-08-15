import { useFormContext } from 'react-hook-form';
import { Buildable, SelectProps } from '../../../types/formAndField';
import { Select } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedSelect = ({
  id,
  rules,
  helperText,
  address,
  long,
  full,
  success,
  warning,
  error,
  className,
  placeholder,
  defaultValue,
  value,
  disabled,
  hidden,
  rightAddon,
  label,
  loading,
  info,
  options,
  containerClassName,
  onChange,
}: Buildable<SelectProps>) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper
      id={id}
      helperText={helperText}
      rules={rules}
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
      <Select
        {...register(id, rules)}
        id={id}
        long={long}
        full={full}
        success={success}
        warning={warning}
        error={error}
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        hidden={hidden}
        options={options}
        containerClassName={containerClassName}
        onChange={onChange}
      />
    </FieldWrapper>
  );
};
