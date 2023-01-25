import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FormBuilder2 } from '@daohaus/form-builder';

import { getFormLegoById } from '../legos/form';
import { CustomFields } from '../legos/config';
import { useDao } from '@daohaus/moloch-v3-context';

export function NewProposal() {
  const location = useLocation();
  const navigate = useNavigate();
  const { daoid, daochain } = useParams();
  const { refreshAll } = useDao();

  const onFormComplete = () => {
    refreshAll?.();
    navigate(`/molochV3/${daochain}/${daoid}/proposals`);
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
    <FormBuilder2
      form={formLego}
      defaultValues={defaults}
      customFields={CustomFields}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
      targetNetwork={daochain}
    />
    // <FormBuilder
    //   form={formLego}
    //   customFields={CustomFields}
    //   lifeCycleFns={{
    //     onPollSuccess: () => {
    //       onFormComplete();
    //     },
    //   }}
    //   defaultValues={defaults}
    //   targetNetwork={daochain}
    // />
  );
}

export default NewProposal;
