import {
  ignoreEmptyVal,
  isNumberish,
  toBaseUnits,
  ValidateField,
} from '@daohaus/utils';
import { Buildable, Field, WrappedInput } from '@daohaus/ui';
import { RegisterOptions } from 'react-hook-form';

export const ToWeiInput = (props: Buildable<Field>) => {
  const newRules: RegisterOptions = {
    setValueAs: (val: string) => (isNumberish(val) ? toBaseUnits(val) : val),
    validate: (val) => ignoreEmptyVal(val, (val) => ValidateField.number(val)),
    ...props.rules,
  };

  return <WrappedInput {...props} rules={newRules} defaultValue="0" />;
};
