import { AccountProfile } from '@daohaus/utils';
import { LensProfile, ENSDomain } from '../types';

export const transformProfile = ({
  address,
  lensProfile,
  ensDomain,
}: {
  address: string;
  lensProfile?: LensProfile;
  ensDomain?: ENSDomain;
}): AccountProfile => {
  return {
    address,
    name: lensProfile?.name,
    ens: ensDomain?.domain?.name || lensProfile?.onChainIdentity?.ens?.name,
    // TODO: lens profile images have been unreliable
    image: '',
    description: lensProfile?.bio,
    lensHandle: lensProfile?.handle,
    lensId: lensProfile?.id,
  };
};
