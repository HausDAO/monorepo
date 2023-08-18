import { useFormContext } from 'react-hook-form';
import { Buildable, FileInputProps } from '../../../types/formAndField';
import { FileInput } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedFileInput = ({
  id,
  rules,
  helperText,
  long,
  full,
  icon,
  success,
  warning,
  error,
  number,
  address,
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
  multiple,
  accept,
}: Buildable<FileInputProps>) => {
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
      <FileInput
        {...register(id, rules)}
        id={id}
        long={long}
        full={full}
        icon={icon}
        success={success}
        warning={warning}
        error={error}
        number={number}
        address={address}
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        hidden={hidden}
        multiple={multiple}
        accept={accept}
      />
    </FieldWrapper>
  );
};
