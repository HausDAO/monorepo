import { useFormContext } from 'react-hook-form';
import { Buildable, FileInputProps } from '../../../types/formAndField';
import { FileInput } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedFileInput = ({
  id,
  rules,
  helperText,
  onChange,
  ...rest
}: Buildable<FileInputProps>) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper id={id} rules={rules} helperText={helperText} {...rest}>
      <FileInput
        {...register(id, rules)}
        id={id}
        {...rest}
        onChange={onChange}
      />
    </FieldWrapper>
  );
};
