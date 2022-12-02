import { Dispatch, SetStateAction } from 'react';
import { IListQueryResults } from '@daohaus/data-fetch-utils';
import { Keychain } from '@daohaus/keychain-utils';
import {
  MolochV3Dao,
  Member_Filter,
  Member_OrderBy,
  Proposal_Filter,
  Proposal_OrderBy,
  MolochV3Proposal,
  MolochV3Members,
  MolochV3Member,
} from '@daohaus/moloch-v3-data';

export type MolochV3DaoContextType = {
  address: string | null | undefined;
  daoid: string | null | undefined;
  daochain: string | null | undefined;
  graphApiKeys: Keychain | undefined;
  daoData: MolochV3DaoData | undefined;
  setDaoData: Dispatch<SetStateAction<MolochV3DaoData>>;
  connectedMemberData: MolochV3ConnectedMemberData | undefined;
  setConnectedMemberData: Dispatch<SetStateAction<MolochV3ConnectedMemberData>>;
  refreshAll: () => Promise<void>;
};

export type MolochV3DaoData = {
  dao?: MolochV3Dao;
  proposals?: IListQueryResults<
    Proposal_OrderBy,
    Proposal_Filter,
    MolochV3Proposal[]
  >;
  members?: IListQueryResults<Member_OrderBy, Member_Filter, MolochV3Members>;
};

export type MolochV3ConnectedMemberData = {
  connectedMember?: MolochV3Member;
};
