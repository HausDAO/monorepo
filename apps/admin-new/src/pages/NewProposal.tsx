import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FormBuilder } from '@daohaus/form-builder';
import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { getFormLegoById } from '@daohaus/moloch-v3-legos';
import { AppFieldLookup } from '../legos/legoConfig';

export function NewProposal() {
  const location = useLocation();
  const navigate = useNavigate();
  const { daoChain, daoId } = useCurrentDao();
  const { refetch } = useDaoData();

  const onFormComplete = () => {
    refetch?.();
    navigate(`/molochV3/${daoChain}/${daoId}/proposals`);
  };

  const formLego = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const legoId = params.get('formLego');

    if (!legoId) return null;
    return getFormLegoById(legoId);
  }, [location]);

  const defaults = useMemo(() => {
    if (formLego) {
      const params = new URLSearchParams(location.search);
      const defaultValues = params.get('defaultValues');

      if (!defaultValues) return null;
      return JSON.parse(defaultValues);
    }
    return null;
  }, [location, formLego]);

  if (!formLego) return null;

  return (
    <FormBuilder
      form={formLego}
      defaultValues={defaults}
      customFields={AppFieldLookup}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
      targetNetwork={daoChain}
    />
  );
}

export default NewProposal;
