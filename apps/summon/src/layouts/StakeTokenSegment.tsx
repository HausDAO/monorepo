import { useFormContext } from 'react-hook-form';

import {
  FormSegment,
  SplitColumn,
  WrappedInput,
  WrappedSwitch,
} from '@daohaus/ui';

import { FORM_COPY, INFO_COPY } from '@daohaus/utils';
import { FORM_KEYS } from '../utils/formKeys';

export const StakeTokensSegment = ({
  formDisabled,
}: {
  formDisabled: boolean;
}) => {
  const { watch } = useFormContext();
  const formValues = watch();

  const votingTransferableLabel = formValues?.[FORM_KEYS.VOTE_TOKEN_TRANSFER]
    ? 'Transferable'
    : 'Not Transferable';
  const nvTransferableLabel = formValues?.[FORM_KEYS.NV_TOKEN_TRANSFER]
    ? 'Transferable'
    : 'Not Transferable';

  return (
    <FormSegment
      title={FORM_COPY.TOKENS.title}
      description={FORM_COPY.TOKENS.description}
      formArea={
        <SplitColumn
          rows={[
            {
              rowId: 'tokenNaming',
              left: (
                <WrappedInput
                  id={FORM_KEYS.TOKEN_NAME}
                  label="Voting Token Name"
                  placeholder="Voting Stake"
                  info={INFO_COPY.VOTING_STK}
                  full
                  disabled={formDisabled}
                  rules={{
                    required: 'Token name is required',
                    maxLength: {
                      value: 50,
                      message: 'Token name cannot be longer than 50 characters',
                    },
                  }}
                />
              ),
              right: (
                <WrappedInput
                  id={FORM_KEYS.TOKEN_SYMBOL}
                  label="Voting Token Symbol"
                  placeholder="vSTK"
                  info={INFO_COPY.TOKEN_SYMBOL}
                  full
                  disabled={formDisabled}
                  rules={{
                    required: 'Token symbol is required',
                    maxLength: {
                      value: 5,
                      message:
                        'Token symbol cannot be longer than 5 characters',
                    },
                  }}
                />
              ),
            },
            {
              rowId: 'lootTokenNaming',
              left: (
                <WrappedInput
                  id={FORM_KEYS.LOOT_TOKEN_NAME}
                  label="Non-Voting Token Name"
                  placeholder="Non-Voting Stake"
                  info={INFO_COPY.NON_VOTING_STK}
                  full
                  disabled={formDisabled}
                  rules={{
                    required: 'Token name is required',
                    maxLength: {
                      value: 50,
                      message: 'Token name cannot be longer than 50 characters',
                    },
                  }}
                />
              ),
              right: (
                <WrappedInput
                  id={FORM_KEYS.LOOT_TOKEN_SYMBOL}
                  label="Non-Voting Token Symbol"
                  placeholder="nvSTK"
                  info={INFO_COPY.LOOT_TOKEN_SYMBOL}
                  full
                  disabled={formDisabled}
                  rules={{
                    required: 'Token symbol is required',
                    maxLength: {
                      value: 5,
                      message:
                        'Token symbol cannot be longer than 5 characters',
                    },
                  }}
                />
              ),
            },
            {
              rowId: 'tokenTransfer',
              left: (
                <WrappedSwitch
                  id={FORM_KEYS.VOTE_TOKEN_TRANSFER}
                  label="Voting Stake"
                  info={INFO_COPY.STAKE_TRANSFER}
                  disabled={formDisabled}
                  switches={[
                    {
                      id: FORM_KEYS.VOTE_TOKEN_TRANSFER,
                      fieldLabel: votingTransferableLabel,
                      defaultChecked: false,
                    },
                  ]}
                />
              ),
              right: (
                <WrappedSwitch
                  id={FORM_KEYS.NV_TOKEN_TRANSFER}
                  label="Non-Voting Stake"
                  disabled={formDisabled}
                  info={INFO_COPY.NV_STAKE_TRANSFER}
                  switches={[
                    {
                      id: FORM_KEYS.NV_TOKEN_TRANSFER,
                      fieldLabel: nvTransferableLabel,
                      defaultChecked: false,
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      }
    />
  );
};
