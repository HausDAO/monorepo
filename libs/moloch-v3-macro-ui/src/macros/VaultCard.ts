import React from 'react';
import { DaoVault, MolochV3Dao } from '@daohaus/moloch-v3-data';

type VaultOverviewProps = {
  dao: MolochV3Dao;
  vault: DaoVault;
};

export const VaultCard = ({ dao, vault }: VaultOverviewProps) => {
  return <p>poopin</p>;
};
