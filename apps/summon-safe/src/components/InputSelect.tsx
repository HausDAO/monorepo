import React, { useState, useEffect } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { Grid } from '@material-ui/core';
import { Select, TextFieldInput } from '@gnosis.pm/safe-react-components';
import styled from 'styled-components';

export type SelectOpt = {
  id: string;
  label: string;
  subLabel?: string;
  iconUrl?: string;
};

interface InputProps {
  id: string
  label: string
  defaultValue: string
  options: Array<SelectOpt>
  placeholder: string
  required?: boolean
  disabled?: boolean
  shouldUnregister: boolean
  control: Control
  register: UseFormRegister<FieldValues>
  setValue: (id: string, selectedId: string, value: string) => void
  getValues: UseFormGetValues<FieldValues>
};

const InputText: React.FC<InputProps> = (props: InputProps) => {
  const {
    id,
    label,
    defaultValue,
    options,
    placeholder,
    required,
    disabled,
    control,
    shouldUnregister,
    register,
    setValue,
    getValues,
  } = props;
  const [activeItemId, setActiveItemId] = useState<string>(defaultValue);

  useEffect(() => {
    register(id)
  }, [id, register]);

  const updateValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    setValue(id, activeItemId, event.target.value);
    field.onChange(event);
  };

  const updateSelectValue = (activeItemIdChanged: string) => {
    setActiveItemId(activeItemIdChanged);
    setValue(id, activeItemIdChanged, getValues(`${id}_input`));
  };

  return (
    <Controller
      name={`${id}_input` as string}
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
        <Grid container>
          <Grid item xs={7}>
            <StyledTextFieldInput
              disabled={disabled}
              label={label}
              placeholder={placeholder}
              autoComplete='off'
              name={field.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateValue(event, field) }
              error={fieldState.error?.message}
              required={required}
            />
          </Grid>
          <Grid item xs={5}>
            <Select
              id={`${id}_select`}
              name={`${id}_select`}
              label={'(*)'}
              disabled={disabled}
              items={options}
              activeItemId={activeItemId}
              onItemClick={newId => updateSelectValue(newId)}
            />
          </Grid>
        </Grid>
      )}
    />
  );
};

const StyledTextFieldInput = styled(TextFieldInput)`
background-color: #fff;
border-radius: 6px;
border: 0;
`;

export default InputText;
