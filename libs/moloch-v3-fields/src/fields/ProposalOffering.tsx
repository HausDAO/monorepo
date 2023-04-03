import { useEffect, useState } from 'react';
import { fromWei } from '@daohaus/utils';
import { useFormContext } from 'react-hook-form';

import { isValidNetwork } from '@daohaus/keychain-utils';
import {
  useConnectedMember,
  useDaoData,
  useCurrentDao,
} from '@daohaus/moloch-v3-hooks';
import { Buildable, ParMd, TintSecondary } from '@daohaus/ui';
import { useDHConnect } from '@daohaus/connect';

export const ProposalOffering = (props: Buildable<{ id?: string }>) => {
  const { id = 'proposalOffering' } = props;
  const { daoChain } = useCurrentDao();
  const { networks } = useDHConnect();
  const { dao } = useDaoData();
  const { connectedMember } = useConnectedMember();
  const { register, setValue } = useFormContext();
  const [requiresOffering, setRequiresOffering] = useState(false);
  const networkTokenSymbol =
    isValidNetwork(daoChain) && networks?.[daoChain]?.symbol;

  register(id);

  useEffect(() => {
    if (!dao || !id) return;

    if (!connectedMember || Number(dao.sponsorThreshold) > Number(connectedMember.shares)) {
      setRequiresOffering(true);
      setValue(id, dao.proposalOffering);
      return;
    }

    setValue(id, '0');
    setRequiresOffering(false);
    return;
  }, [dao, connectedMember, setValue, id]);

  if (!requiresOffering || !dao?.proposalOffering || !networkTokenSymbol)
    return null;

  return (
    <ParMd>
      Proposal Offering:{' '}
      <TintSecondary>
        {' '}
        {fromWei(dao.proposalOffering)} {networkTokenSymbol}
      </TintSecondary>
    </ParMd>
  );
};
