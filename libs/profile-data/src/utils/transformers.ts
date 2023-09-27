import { AccountProfile, isString } from '@daohaus/utils';
import { ENSDomain } from '../types';
import { GetEnsAvatarReturnType } from 'viem/ens';

export const transformProfile = ({
  address,
  ensDomain,
}: {
  address: string;
  ensDomain?: ENSDomain;
}): AccountProfile => {
  return {
    address,
    ens: isString(ensDomain) ? ensDomain : ensDomain?.domain?.name,
    avatar: isString(ensDomain)
      ? ensDomain
      : formatImageUrl(ensDomain?.domain?.avatar),
  };
};

const formatImageUrl = (
  imageUri?: GetEnsAvatarReturnType
): string | undefined => {
  if (!imageUri) return;
  if (
    imageUri.toLowerCase().startsWith('http') ||
    imageUri.toLowerCase().startsWith('data')
  ) {
    return imageUri;
  }

  if (imageUri.toLowerCase().startsWith('ipfs')) {
    return `https://daohaus.mypinata.cloud/ipfs/${imageUri.match(
      /Qm[a-zA-Z0-9/.]+/
    )}`;
  }
};
