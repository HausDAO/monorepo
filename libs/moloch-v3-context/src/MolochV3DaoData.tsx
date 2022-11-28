import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { fetchDao, fetchProposalsList, InitialDaoData } from './utils';

type MolochV3DaoDataProps = {
  address: string | null | undefined;
  daoid: string | null | undefined;
  daochain: string | null | undefined;
  graphApiKeys: Keychain | undefined;
  children: ReactNode;
};

export const MolochV3DaoData = ({
  address,
  daoid,
  daochain,
  graphApiKeys,
  children,
}: MolochV3DaoDataProps) => {
  //refetch here uses default filter/order/pagination
  //will context refetch for us?
  //why fetch here

  // maybe this level just keeps the while state object?
  useEffect(() => {
    const fetchDaoData = async () => {
      if (daoid && daochain) {
        const daoRes = await fetchDao({
          daoid,
          daochain: daochain as ValidNetwork,
          graphApiKeys,
        });

        const proposalRes = await fetchProposalsList({
          filter: { dao: daoid },
          daochain: daochain as ValidNetwork,
          graphApiKeys,
        });

        return {
          dao: daoRes,
          proposals: proposalRes,
        };
      }
    };
    if (daoid && daochain) {
      fetchDaoData();
    }
  }, [daoid, daochain, graphApiKeys]);

  return (
    <>
      <p>poopin</p>
      {children}
    </>
    // <MolochV3ContextProvider
    //   address={address}
    //   daoid={daoid}
    //   daochain={daochain}
    //   graphApiKeys={{ '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'] }}
    // >
    //   <Dao />
    // </MolochV3ContextProvider>
  );
};

export default MolochV3DaoData;
