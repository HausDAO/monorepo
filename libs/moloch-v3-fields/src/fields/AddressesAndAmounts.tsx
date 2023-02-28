import { useMemo } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import { Buildable, Field, WrappedTextArea } from '@daohaus/ui';

import {
  transformAddressesAndAmountsData,
  validateAddressesAndAmountsData,
} from '../utils/fieldHelpers';

export const AddressesAndAmounts = (props: Buildable<Field>) => {
  const { watch } = useFormContext();

  const multipleSharesField = watch('addressesAndAmounts');

  const validFieldMsg = useMemo(() => {
    if (multipleSharesField === '' || !multipleSharesField) {
      return undefined;
    }
    if (validateAddressesAndAmountsData(multipleSharesField)) {
      return 'Formatting is valid.';
    }
    return undefined;
  }, [multipleSharesField]);

  const newRules: RegisterOptions = {
    ...props.rules,
    setValueAs: transformAddressesAndAmountsData,
    validate: validateAddressesAndAmountsData,
  };

  return (
    <WrappedTextArea
      {...props}
      label="Addresses & Amounts"
      placeholder="0x00000000000000000000000000 1"
      rules={newRules}
      helperText={validFieldMsg}
    />
  );
};
