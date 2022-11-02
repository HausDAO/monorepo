import { FormSegment, SplitColumn, TimePicker } from '@daohaus/ui';

import { INFO_COPY } from '@daohaus/utils';
import { FORM_KEYS } from '../utils/formKeys';

export const TimingSegment = ({ formDisabled }: { formDisabled: boolean }) => {
  return (
    <FormSegment
      title="Proposal Timing"
      description="Define your timing for voting and grace periods. These settings can
      be updated later through a proposal."
      formArea={
        <SplitColumn
          rows={{
            rowId: 'timing',
            left: (
              <TimePicker
                label="Voting Period"
                id={FORM_KEYS.VOTING_PERIOD}
                full
                info={INFO_COPY.VOTING_PERIOD}
                disabled={formDisabled}
                placeholder="0"
                rules={{
                  required: 'Time value is required',
                }}
              />
            ),
            right: (
              <TimePicker
                label="Grace Period"
                id={FORM_KEYS.GRACE_PERIOD}
                info={INFO_COPY.GRACE_PERIOD}
                full
                disabled={formDisabled}
                placeholder="0"
                rules={{
                  required: 'Time value is required',
                }}
              />
            ),
          }}
        />
      }
    />
  );
};
