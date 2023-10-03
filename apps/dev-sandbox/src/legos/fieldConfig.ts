import { MolochFields } from '@daohaus/moloch-v3-fields';
import { FieldLegoBase, FormLegoBase } from '@daohaus/utils';
import { WizardFormLegoBase } from '@daohaus/wizard-form-builder';

export const AppFieldLookup = {
  ...MolochFields,
};

export type CustomFieldLego = FieldLegoBase<typeof AppFieldLookup>;
export type CustomFormLego = FormLegoBase<typeof AppFieldLookup>;

export type CustomWizardFormLego = WizardFormLegoBase<typeof AppFieldLookup>;
