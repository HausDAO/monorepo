import { Buildable, FormSegment } from '@daohaus/ui';
import { ComponentProps } from 'react';
import { FieldLego } from '../types';
import { FormBuilderFactory } from './FormBuilderFactory';

type Props = Omit<
  Buildable<
    ComponentProps<typeof FormSegment> & {
      fields: FieldLego[];
    }
  >,
  'formArea'
>;
export const SegmentRender = (props: Props) => {
  return (
    <FormSegment
      {...props}
      formArea={props.fields.map((field) => (
        <FormBuilderFactory key={field.id} field={field} />
      ))}
    />
  );
};
