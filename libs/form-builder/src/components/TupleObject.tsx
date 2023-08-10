import { RegisterOptions } from 'react-hook-form';
import { Buildable, Field, WrappedTextArea } from '@daohaus/ui';
import { ignoreEmptyVal, isObject, ValidateField } from '@daohaus/utils';

export const TupleObject = (props: Buildable<Field>) => {
  const newRules: RegisterOptions = {
    setValueAs: (val: string) => (isObject(val) ? JSON.parse(val) : val),
    validate: (val) =>
      ignoreEmptyVal(val, (val: any) => ValidateField.object(val)),
    ...props.rules,
  };

  return <WrappedTextArea {...props} rules={newRules} />;
};
