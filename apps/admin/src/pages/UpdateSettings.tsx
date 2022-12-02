import { FormBuilder } from '@daohaus/form-builder';
import { useMemo } from 'react';
import { useDao } from '@daohaus/moloch-v3-context';
import { CustomFields } from '../legos/config';
import { COMMON_FORMS } from '../legos/form';
import { formatDaoProfileForForm } from '../utils/settingsHelper';
import { useParams } from 'react-router-dom';

export function UpdateSettings() {
  const { dao } = useDao();
  const { daochain } = useParams();

  const defaultFields = useMemo(() => {
    if (dao) {
      return formatDaoProfileForForm(dao);
    }
    return undefined;
  }, [dao]);

  if (!dao) {
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={{ ...COMMON_FORMS.METADATA_SETTINGS, log: true }}
      customFields={CustomFields}
      targetNetwork={daochain}
    />
  );
}

export default UpdateSettings;
