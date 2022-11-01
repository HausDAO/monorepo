import { useFormContext } from 'react-hook-form';
import { Buildable, FileInputProps } from '../../../types/formAndField';
import { FileInput } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedFileInput = ({
  id,
  rules,
  ...props
}: Buildable<FileInputProps>) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper {...props} id={id} rules={rules}>
      <FileInput {...props} {...register(id, rules)} id={id} />
    </FieldWrapper>
  );
};
