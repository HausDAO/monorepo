import { useFormContext } from 'react-hook-form';
import { Buildable, Field } from '../../../types/formAndField';
import { TextArea } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedTextArea = ({
  rules,
  helperText,
  full,
  ...rest
}: Buildable<Field>) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper rules={rules} helperText={helperText} {...rest}>
      <TextArea {...register(rest.id, rules)} {...rest} />
    </FieldWrapper>
  );
};
