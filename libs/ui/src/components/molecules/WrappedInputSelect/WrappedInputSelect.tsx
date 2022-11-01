import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from '../FieldWrapper';
import { InputSelect } from '../InputSelect';
import { Buildable, InputSelectProps } from '../../../types/formAndField';

export const WrappedInputSelect = ({
  id,
  selectId,
  rules,
  ...props
}: Buildable<InputSelectProps>) => {
  const { register } = useFormContext();

  return (
    <FieldWrapper {...props} id={id} rules={rules}>
      <InputSelect
        {...props}
        registerInput={register(id, rules)}
        registerSelect={register(selectId)}
        id={id}
        selectId={selectId}
      />
    </FieldWrapper>
  );
};
