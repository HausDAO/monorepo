import { Controller, useFormContext } from 'react-hook-form';
import type { Buildable } from '../../../types/formAndField';
import { Checkbox } from '../../atoms/Checkbox';
import { CheckboxProps } from '@radix-ui/react-checkbox';

import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedCheckbox = (
  props: Buildable<{ checkboxes: CheckboxProps[] }>
) => {
  const { id, helperText, info, label, error, success, warning, checkboxes } =
    props;
  const { control } = useFormContext();
  return (
    <FieldWrapper
      id={id}
      helperText={helperText}
      info={info}
      label={label}
      error={error}
      success={success}
      warning={warning}
    >
      {checkboxes.map((checkbox) => (
        <Controller
          key={checkbox.id}
          name={checkbox.name || id}
          control={control}
          defaultValue={checkbox.defaultChecked}
          render={({ field }) => {
            return (
              <Checkbox
                {...field}
                {...checkbox}
                value={field.value}
                checked={field.value}
                onCheckedChange={checkbox.onCheckedChange || field.onChange}
                ref={field.ref}
              />
            );
          }}
        />
      ))}
    </FieldWrapper>
  );
};
