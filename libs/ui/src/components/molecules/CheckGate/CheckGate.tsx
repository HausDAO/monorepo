import React, { useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox } from '../../atoms/Checkbox';
import { FieldWrapper } from '../FieldWrapper';
import { Buildable } from '../../../types/formAndField';

import { CheckGateProps } from './CheckGate.types';
import { CheckGateBox } from './CheckGate.styles';

export const CheckGate = ({
  id,
  fields,
  gateLabel,
  onUnchecked,
  rules,
  ...props
}: Buildable<CheckGateProps>) => {
  const [gatedOn, toggleGate] = useState(false);

  const onCheckedChanged = (checked: CheckedState) => {
    toggleGate(checked.valueOf() as boolean);
    if (!checked) onUnchecked?.();
  };

  return (
    <FieldWrapper {...props} id={id} rules={rules}>
      <Checkbox id={id} title={gateLabel} onCheckedChange={onCheckedChanged} />
      {gatedOn && <CheckGateBox>{fields}</CheckGateBox>}
    </FieldWrapper>
  );
};

export default CheckGate;
