import React from 'react';
import { InputAdornment } from '@material-ui/core';
import { Control, Controller } from 'react-hook-form';
import { Icon, TextFieldInput } from '@gnosis.pm/safe-react-components';
import styled from 'styled-components';

type InputProps = {
  id: string
  label: string
  placeholder: string
  required?: boolean
  disabled?: boolean
  ethAdornment?: boolean
  shouldUnregister: boolean
  control: Control
};

const InputText: React.FC<InputProps> = (props: InputProps) => {
  const { id, disabled, ethAdornment, label, placeholder, required, shouldUnregister, control } = props;
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={''}
      shouldUnregister={shouldUnregister}
      rules={{
        required: {
          value: required !== undefined ? required : false,
          message: 'Required',
        },
      }}
      render={({ field, fieldState }) => (
        <StyledTextFieldInput
          disabled={disabled}
          label={label}
          placeholder={placeholder}
          autoComplete='off'
          name={field.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          error={fieldState.error?.message}
          required={required}
          InputProps={ethAdornment ? {
            endAdornment: (
              <InputAdornment position='end'>
                <Icon size='md' type='eth' />
              </InputAdornment>
            ),
          } : undefined}
        />
      )}
    />
  );
};

export const StyledTextFieldInput = styled(TextFieldInput)`
background-color: #fff;
border-radius: 6px;
border: 0;
`;

export default InputText;
