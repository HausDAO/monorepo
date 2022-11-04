import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { Buildable, CheckGate } from '@daohaus/ui';

import { FormBuilderFactory } from './FormBuilderFactory';
import { FieldLego } from '../types';

type CheckRenderProps = Omit<
  Buildable<
    ComponentProps<typeof CheckGate> & {
      gateLabel: string;
      components: FieldLego[];
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
      fields={props.components.map((field: FieldLego) => (
        <FormBuilderFactory key={field.id} field={field} />
      ))}
      {...props}
      gateLabel={gateLabel}
      onUnchecked={() => {
        props.components.forEach(
          (field: FieldLego & { defaultValue?: string }) => {
            if (field.defaultValue) setValue(field.id, field.defaultValue);
          }
        );
      }}
    />
  );
};

export default CheckRender;
