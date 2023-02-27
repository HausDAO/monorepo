import { useMemo } from 'react';
import { Buildable, Field, WrappedSelect } from '@daohaus/ui';
import { useDaoData } from '@daohaus/moloch-v3-hooks';
import { truncateAddress } from '@daohaus/utils';

export const SafeSelect = (props: Buildable<Field>) => {
  const { dao } = useDaoData();

  const safeOptions = useMemo(() => {
    if (!dao) return null;

    return dao.vaults
      .filter((v) => !v.ragequittable)
      .map((v) => {
        return {
          name: `${v.name} (${truncateAddress(v.safeAddress)})`,
          value: v.safeAddress,
        };
      });
  }, [dao]);

  if (!safeOptions) return null;

  return <WrappedSelect {...props} options={safeOptions} />;
};
