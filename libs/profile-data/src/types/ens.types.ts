import { GetEnsAvatarReturnType } from 'viem/ens';

export type ENSDomain =
  | string
  | {
      id?: string;
      registrationDate?: string;
      expiryDate?: string;
      domain?: {
        name?: string;
        avatar?: GetEnsAvatarReturnType;
      };
    }
  | undefined;
