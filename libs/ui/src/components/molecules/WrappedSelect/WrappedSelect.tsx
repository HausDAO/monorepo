import { useFormContext } from 'react-hook-form';
import { Buildable, SelectProps } from '../../../types/formAndField';
import { Select } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedSelect = ({
  id,
  rules,
  helperText,
  address,
  onChange,
  ...rest
}: Buildable<SelectProps>) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper
      {...rest}
      id={id}
      rules={rules}
      address={address}
      helperText={helperText}
    >
      <Select {...register(id, rules)} {...rest} id={id} />
    </FieldWrapper>
  );
};
