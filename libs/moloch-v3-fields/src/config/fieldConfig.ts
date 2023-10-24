import { CoreFieldLookup } from '@daohaus/form-builder';
import { FieldLegoBase, FormLegoBase } from '@daohaus/utils';

import { ProposalExpiry } from '../fields';
import { TributeInput } from '../fields';
import { SelectApplicant } from '../fields';
import { RequestNativeToken } from '../fields';
import { RequestERC20 } from '../fields';
import { ShamanDeluxe } from '../fields';
import { TagsInput } from '../fields';
import { MarkdownField } from '../fields';

import { ProposalOffering } from '../fields';
import { DelegateInput } from '../fields';
import { RagequitToken } from '../fields';
import { RagequitTokenList } from '../fields';
import { WalletConnectLink } from '../fields';
import { MetadataLink } from '../fields';
import { SafeSelect } from '../fields';
import { MultisendActions } from '../fields';
import { AddressesAndAmounts } from '../fields';
import { EpochDatePicker } from '../fields';

export const MolochFields = {
  ...CoreFieldLookup,
  proposalExpiry: ProposalExpiry,
  selectApplicant: SelectApplicant,
  tributeInput: TributeInput,
  requestNativeToken: RequestNativeToken,
  requestERC20: RequestERC20,
  shamanPermissionDeluxe: ShamanDeluxe,
  tagsInput: TagsInput,
  proposalOffering: ProposalOffering,
  delegateInput: DelegateInput,
  ragequitToken: RagequitToken,
  ragequitTokenList: RagequitTokenList,
  walletConnectLink: WalletConnectLink,
  metadataLink: MetadataLink,
  safeSelect: SafeSelect,
  multisendActions: MultisendActions,
  addressesAndAmounts: AddressesAndAmounts,
  epochDatePicker: EpochDatePicker,
  markdownField: MarkdownField,
};

export type MolochFieldLego = FieldLegoBase<typeof MolochFields>;
export type MolochFormLego = FormLegoBase<typeof MolochFields>;
