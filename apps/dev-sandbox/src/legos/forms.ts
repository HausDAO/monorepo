import { TX } from '@daohaus/moloch-v3-legos';

import { CustomWizardFormLego } from './fieldConfig';

export const WIZARD_FORMS: Record<string, CustomWizardFormLego> = {
  TEXT_WIZARD: {
    id: 'WIZZ',
    tx: TX.APPROVE_TOKEN,
    log: true,
    submitButtonText: 'Deploy',
    confirmTitle: 'Review Data',
    confirmDescription:
      'These settings cannot be changed once on-chain. Some other confirmation text.',
    steps: [
      {
        id: 'stepOne',
        title: 'Name Your DAO',
        description:
          'You are summoning a Moloch DAO. Enter a name for your on-chain organization.  ',
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
  },
};
