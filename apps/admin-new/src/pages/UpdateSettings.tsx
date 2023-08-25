import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormBuilder } from '@daohaus/form-builder';
import { COMMON_FORMS } from '@daohaus/moloch-v3-legos';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';

import { AppFieldLookup } from '../legos/legoConfig';

export const formatDaoProfileForForm = (dao: MolochV3Dao) => {
  const links = dao?.links || [];

  return {
    name: dao?.name,
    icon: dao?.avatarImg,
    tags: dao?.tags?.join(', '),
    description: dao?.description,
    long_description: dao?.longDescription,
    discord: links.find((link) => link.label === 'Discord')?.url,
    github: links.find((link) => link.label === 'Github')?.url,
    telegram: links.find((link) => link.label === 'Telegram')?.url,
    twitter: links.find((link) => link.label === 'Twitter')?.url,
    blog: links.find((link) => link.label === 'Blog')?.url,
    web: links.find((link) => link.label === 'Web')?.url,
    custom1: links[6]?.url,
    custom1Label: links[6]?.label,
    custom2: links[7]?.url,
    custom2Label: links[7]?.label,
    custom3: links[8]?.url,
    custom3Label: links[8]?.label,
  };
};

export function UpdateSettings() {
  const { dao, refetch } = useDaoData();
  const { daoId, daoChain } = useCurrentDao();
  const navigate = useNavigate();

  const defaultFields = useMemo(() => {
    if (dao) {
      return formatDaoProfileForForm(dao);
    }
    return undefined;
  }, [dao]);

  const onFormComplete = () => {
    refetch?.();
    navigate(`/molochV3/${daoChain}/${daoId}/settings`);
  };

  if (!dao) {
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={{ ...COMMON_FORMS.METADATA_SETTINGS }}
      customFields={AppFieldLookup}
      targetNetwork={daoChain}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
    />
  );
}

export default UpdateSettings;
