export type FormValues = {
  daoName?: string;
  tokenName?: string;
  tokenSymbol?: string;
  votingTransferable?: boolean;
  nvTransferable?: boolean;
  quorum?: string;
  minRetention?: string;
  sponsorThreshold?: string;
  newOffering?: string;
  votingPeriod?: string;
  votingPeriodInSeconds?: number;
  gracePeriod?: string;
  gracePeriodInSeconds?: number;
  shamans?:
    | ''
    | {
        shamanAddresses: string[];
        shamanPermissions: string[];
      };
  members?:
    | ''
    | {
        memberAddresses: string[];
        memberShares: string[];
        memberLoot: string[];
      };
};
