import { useFormContext } from 'react-hook-form';
import { Buildable, Field } from '../../../types/formAndField';
import { TextArea } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedTextArea = ({ rules, ...props }: Buildable<Field>) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper {...props} rules={rules}>
      <TextArea {...register(props.id, rules)} {...props} />
    </FieldWrapper>
  );
};
