import { Buildable, FormSegment } from '@daohaus/ui';
import { FieldLegoBase, LookupType } from '@daohaus/utils';
import { ComponentProps } from 'react';
import { FormBuilderFactory } from '@daohaus/form-builder-base';

type Props = Omit<
  Buildable<
    ComponentProps<typeof FormSegment> & {
      fields: FieldLegoBase<LookupType>[];
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
