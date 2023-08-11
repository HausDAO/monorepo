import { useFormContext } from 'react-hook-form';
import { Buildable, Field } from '../../../types/formAndField';
import { Input } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedInput = ({
  id,
  rules,
  helperText,
  ...rest
}: Buildable<Field>) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper {...rest} id={id} rules={rules} helperText={helperText}>
      <Input {...rest} {...register(id, rules)} id={id} />
    </FieldWrapper>
  );
};
