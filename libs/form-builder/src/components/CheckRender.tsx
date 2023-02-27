import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { Buildable, CheckGate } from '@daohaus/ui';

import { FormBuilderFactory } from '@daohaus/form-builder-base';
import { FieldLego } from '../types';

type CheckRenderProps = Omit<
  Buildable<
    ComponentProps<typeof CheckGate> & {
      gateLabel: string;
      components: any[];
    }
  >,
  'fields'
>;

export const CheckRender = ({
  gateLabel,
  ...props
}: Buildable<CheckRenderProps>) => {
  const { setValue } = useFormContext();

  return (
    <CheckGate
      fields={props.components.map((field) => (
        <FormBuilderFactory key={field.id} field={field} />
      ))}
      {...props}
      gateLabel={gateLabel}
      onUnchecked={() => {
        props.components.forEach((field) => {
          if (field.defaultValue) setValue(field.id, field.defaultValue);
        });
      }}
    />
  );
};

export default CheckRender;
