import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { handlePluralNoun, Noun } from '@daohaus/utils';

import { WrappedInput } from '../WrappedInput';

export const CSInput = (
  props: ComponentProps<typeof WrappedInput> & { itemNoun: Noun }
) => {
  const {
    rules,
    id,
    itemNoun = {
      singular: 'item',
      plural: 'items',
    },
  } = props;
  const { watch } = useFormContext();

  const value = watch(id);
  const amtItems = Array.isArray(value) ? value.length : 0;
  const helperText = `${amtItems} ${handlePluralNoun(
    itemNoun,
    amtItems
  )} typed`;

  const newRules = {
    ...rules,
    setValueAs: (value: string) => value.trim().split(',').filter(Boolean),
  };

  return <WrappedInput {...props} rules={newRules} helperText={helperText} />;
};
