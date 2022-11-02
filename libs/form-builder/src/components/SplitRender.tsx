import { Buildable, SplitColumn } from '@daohaus/ui';

import { FieldLego } from '../types';
import { FormBuilderFactory } from './FormBuilderFactory';

type SplitColumnProps = {
  id: string;
  rows: { rowId: string; left: FieldLego; right: FieldLego }[];
};

export const SplitColumnLayout = ({
  rows,
  ...props
}: Buildable<SplitColumnProps>) => {
  return (
    <SplitColumn
      rows={rows.map(({ left, right, rowId }) => {
        return {
          rowId,
          left: <FormBuilderFactory {...props} field={left} spacing={false} />,
          right: (
            <FormBuilderFactory {...props} field={right} spacing={false} />
          ),
        };
      })}
    />
  );
};
