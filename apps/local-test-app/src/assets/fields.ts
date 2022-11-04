import { FieldLego } from '@daohaus/form-builder';

export const FIELD: Record<string, FieldLego> = {
  TITLE: {
    id: 'title',
    type: 'input',
    label: 'Proposal Title',
    placeholder: 'Enter title',
  },
  DESCRIPTION: {
    id: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter description',
  },
  LINK: {
    id: 'link',
    type: 'input',
    label: 'Link',
    placeholder: 'http://',
    expectType: 'url',
  },
};
