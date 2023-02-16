import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSegment, ParSm, Link, WrappedTextArea } from '@daohaus/ui';
import { INFO_COPY } from '@daohaus/utils';

import { TextAreaSection } from '../layouts/FormLayouts';
import { transformShamans, validateShamanData } from '../utils/common';
import { FORM_KEYS } from '../utils/formKeys';

export const ShamanSegment = ({ formDisabled }: { formDisabled: boolean }) => {
  const {
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const shamans = watch(FORM_KEYS.SHAMANS);

  const [amtShamans, setAmtShamans] = useState(0);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    if (shamans == null) return;
    setAmtShamans(shamans?.shamanAddresses?.length || 0);
    if (shamans === '') {
      setHelperText('');
      return;
    }
    if (!errors?.[FORM_KEYS.SHAMANS] && touchedFields[FORM_KEYS.SHAMANS]) {
      setHelperText('Formatting is valid.');
    }
  }, [shamans, errors, touchedFields]);

  return (
    <FormSegment
      title="Starting Shamans"
      description="Shamans are powerful and have control over key components of the DAO. Use caution in the spirit world."
      formArea={
        <TextAreaSection>
          <Link className="link" href="https://moloch.daohaus.fun/tools/shaman">
            How to add a Shaman
          </Link>
          <ParSm className="number-display">{amtShamans} Shamans</ParSm>
          <WrappedTextArea
            label="Addresses & Permissions"
            placeholder="0x00000000000000000000000000 3"
            id={FORM_KEYS.SHAMANS}
            full
            info={INFO_COPY.SHAMAN}
            number
            disabled={formDisabled}
            helperText={helperText}
            rules={{
              setValueAs: transformShamans,
              validate: validateShamanData,
            }}
          />
        </TextAreaSection>
      }
    />
  );
};
