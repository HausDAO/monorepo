import React from 'react';
import { hoursToSeconds, minutesToSeconds } from 'date-fns/esm';
import { Control, UseFormRegister, UseFormGetValues, UseFormSetValue, FieldValues } from 'react-hook-form';

import InputSelect, { SelectOpt } from '../components/InputSelect';

const TIME_OPTS: Array<SelectOpt> = [
  { id: 'days', label: 'Days' },
  { id: 'hours', label: 'Hours' },
  { id: 'minutes', label: 'Minutes' },
  { id: 'seconds', label: 'Seconds' },
];

const conversionFns = {
  days: (amt: number) => hoursToSeconds(amt * 24),
  hours: (amt: number) => hoursToSeconds(amt),
  minutes: (amt: number) => minutesToSeconds(amt),
  seconds: (amt: number) => amt,
};

const toSeconds = (amt: number, unit: string) =>
  conversionFns[unit as keyof typeof conversionFns]?.(amt);

type TimePickerProps = {
  id: string
  label: string
  defaultValue: string
  placeholder: string
  required?: boolean
  disabled?: boolean
  shouldUnregister: boolean
  control: Control
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  getValues: UseFormGetValues<FieldValues>
};

const TimePicker: React.FC<TimePickerProps> = (props: TimePickerProps) => {
  const { setValue } = props
  return (
    <InputSelect
      {...props}
      options={TIME_OPTS}
      setValue={(id: string, selectedId: string, value: string) => setValue(id, toSeconds(Number(value), selectedId))}
    />
  )
};

export default TimePicker;
