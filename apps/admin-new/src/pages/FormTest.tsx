import { FormBuilder } from '@daohaus/form-builder';
import { useCurrentDao } from '@daohaus/moloch-v3-hooks';
import React from 'react';
import { PROPOSAL_FORMS } from '../legos/form';

export const FormTest = () => {
  const { daoChain } = useCurrentDao();
  return <FormBuilder form={PROPOSAL_FORMS.SIGNAL} targetNetwork={daoChain} />;
};
