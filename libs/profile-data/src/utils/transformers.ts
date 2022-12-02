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
    image:
      lensProfile?.picture?.__typename === 'MediaSet'
        ? `https://daohaus.mypinata.cloud/ipfs/${lensProfile.picture.original.url.match(
            /Qm[a-zA-Z0-9/.]+/
          )}`
        : '',
    description: lensProfile?.bio,
    lensHandle: lensProfile?.handle,
    lensId: lensProfile?.id,
  };
};
