# @daohaus/wizard-form-builder

The Wizard Form Builder library is an extension of the Form Builder and enables multi-step form building.

#### Related packages

- [**Form-builder**](https://github.com/HausDAO/monorepo/tree/develop/libs/form-builder)
- [**TX-Builder**](https://github.com/HausDAO/monorepo/tree/develop/libs/tx-builder)
- [**Moloch V3 Legos**](https://github.com/HausDAO/monorepo/tree/develop/libs/moloch-v3-legos)
- [**Moloch V3 Fields**](https://github.com/HausDAO/monorepo/tree/develop/libs/moloch-v3-fields)

### [View on NPM](https://www.npmjs.com/package/@daohaus/wizard-form-builder)

## Usage

### Installation

```bash
yarn add @daohaus/wizardform-builder
```

**How to add to you application**

```jsx
import { WizardFormBuilder } from '@daohaus/form-builder';
import { MolochFields } from '@daohaus/moloch-v3-fields';

import { TARGET_DAO } from '../targetDao';

const WIZARD_FORM_LEGO = {
  id: 'WIZZ',
  tx: TX.SOME_TX_LEGO,
  log: true,
  submitButtonText: 'Deploy',
  confirmTitle: 'Review Data',
  confirmDescription: 'These settings cannot be changed once on-chain. Some other confirmation text.',
  steps: [
    {
      id: 'stepOne',
      title: 'Name Your DAO',
      description: 'You are summoning a Moloch DAO. Enter a name for your on-chain organization.  ',
      fields: [
        {
          type: 'input',
          id: 'daoName',
          label: 'DAO',
          placeholder: 'Name',
          rules: {
            maxLength: {
              value: 128,
              message: 'DAO name must be 128 characters or less',
            },
          },
        },
      ],
      requiredFields: { daoName: true },
    },
    {
      id: 'stepTwo',
      title: 'Describe Your DAO',
      description: 'What does your DAO do?',
      fields: [
        {
          type: 'textarea',
          id: 'daoDescription',
          label: 'Description',
          placeholder: 'Description',
        },
      ],
      requiredFields: { daoDescription: true },
    },
  ],
};

export const FormPage = () => {
  return <WizardFormBuilder form={WIZARD_FORM_LEGO} targetNetwork={'0x1'} customFields={MolochFields} />;
};
```
