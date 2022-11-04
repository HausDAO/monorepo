import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { conversionFns, isNumberString, toSeconds } from '@daohaus/utils';
import { Field, OptionType, Buildable } from '../../../types';
import { WrappedInputSelect } from '../WrappedInputSelect';

const defaultOptions = [
  { name: 'Days', value: 'days' },
  { name: 'Hours', value: 'hours' },
  { name: 'Minutes', value: 'minutes' },
  { name: 'Seconds', value: 'seconds' },
];

type TimePickerProps = Field & {
  defaultValue?: string;
  options?: OptionType[];
  selectId?: string;
  selectPlaceholder?: string;
};
export const TimePicker = ({
  id,
  options = defaultOptions,
  selectId,
  rules,
  ...props
}: Buildable<TimePickerProps>) => {
  const { setValue, watch } = useFormContext();
  const unitId = useMemo(() => selectId || `${id}Units`, [selectId, id]);
  const [amt, units] = watch([id, unitId]);

  useEffect(() => {
    if (isNumberString(amt) && units in conversionFns) {
      setValue(`${id}InSeconds`, toSeconds(amt, units));
    }
    if (amt === '') {
      setValue(`${id}InSeconds`, 0);
    }
  }, [amt, units, id, setValue]);

  return (
    <WrappedInputSelect
      id={id}
      selectId={unitId}
      options={options}
      rules={{
        ...rules,
        validate: {
          isNumber: (value) =>
            value === '' || isNumberString(value) ? true : 'Must be a number',
          noZero: (value) =>
            value !== '0' ? true : 'Time units cannot be zero',
        },
      }}
      {...props}
    />
  );
};
