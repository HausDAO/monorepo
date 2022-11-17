import { fromWei } from '@daohaus/utils';
import { isValidNetwork } from '@daohaus/keychain-utils';

import { useConnectedMembership, useDao } from '@daohaus/moloch-v3-context';
import { Buildable, ParMd, TintSecondary } from '@daohaus/ui';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDHConnect } from '@daohaus/connect';

export const ProposalOffering = (props: Buildable<{ id?: string }>) => {
  const { id = 'proposalOffering' } = props;
  const { daochain } = useParams();
  const { networks } = useDHConnect();
  const { dao } = useDao();
  const { connectedMembership } = useConnectedMembership();
  const { register, setValue } = useFormContext();
  const [requiresOffering, setRequiresOffering] = useState(false);

  const networkTokenSymbol =
    isValidNetwork(daochain) && networks?.[daochain]?.symbol;

  register(id);

  useEffect(() => {
    if (!dao || !id) return;

    if (
      !connectedMembership ||
      dao.sponsorThreshold > connectedMembership.shares
    ) {
      setRequiresOffering(true);
      setValue(id, dao.proposalOffering);
      return;
    }

    setValue(id, '0');
    setRequiresOffering(false);
    return;
  }, [dao, connectedMembership, setValue, id]);

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
