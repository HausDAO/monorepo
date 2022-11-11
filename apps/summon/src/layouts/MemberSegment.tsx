import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSegment, ParSm, WrappedTextArea } from '@daohaus/ui';
import { INFO_COPY } from '@daohaus/utils';

import { TextAreaSection } from '../layouts/FormLayouts';
import { transformMemberData, validateMemberData } from '../utils/common';
import { FORM_KEYS } from '../utils/formKeys';

export const MembersSegment = ({ formDisabled }: { formDisabled: boolean }) => {
  const {
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const members = watch(FORM_KEYS.MEMBERS);

  const [amtMembers, setAmtMembers] = useState(0);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    if (members == null) return;
    setAmtMembers(members?.memberAddresses?.length || 0);
    if (members === '') {
      setHelperText('');
      return;
    }
    if (!errors?.[FORM_KEYS.MEMBERS] && touchedFields[FORM_KEYS.MEMBERS]) {
      setHelperText('Formatting is valid.');
    }
  }, [members, errors, touchedFields]);

  return (
    <FormSegment
      title="Starting Members"
      description="You must have at least one member to summon. Add other summoning members as desired. Members can be added later through a proposal."
      formArea={
        <TextAreaSection style={{ width: '100%' }}>
          <ParSm className="number-display">{amtMembers} Members</ParSm>
          <WrappedTextArea
            label="Addresses & Stake Amounts"
            placeholder="0x00000000000000000000000000 1 0"
            id={FORM_KEYS.MEMBERS}
            info={INFO_COPY.MEMBERS}
            full
            number
            disabled={formDisabled}
            helperText={helperText}
            rules={{
              setValueAs: transformMemberData,
              validate: validateMemberData,
              required: 'Members is a required field',
            }}
          />
        </TextAreaSection>
      }
    />
  );
};
