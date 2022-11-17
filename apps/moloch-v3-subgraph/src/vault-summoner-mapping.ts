import {
  SetVault,
  SetDelegate,
} from '../generated/VaultSummoner/VaultSummoner';
import { Dao, Vault } from '../generated/schema';
import { addTransaction } from './util/transactions';

export function handleSetVault(event: SetVault): void {
  const daoId = event.params.vault.daoAddress.toHexString();

  let dao = Dao.load(daoId);
  if (dao === null) {
    dao = new Dao(daoId);
  }

  const vaultId = daoId
    .concat('-vault-')
    .concat(event.params.vault.vaultAddress.toHexString());
  let vault = Vault.load(vaultId);
  if (!vault) {
    vault = new Vault(vaultId);
    vault.createdAt = event.block.timestamp;
    vault.dao = daoId;
    vault.ragequittable = false;
    vault.name = event.params.vault.name;
    vault.safeAddress = event.params.vault.vaultAddress;
  }

  vault.active = event.params.vault.active;

  vault.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleSetVaultDelegate(event: SetDelegate): void {
  const daoId = event.params.daoAddress.toHexString();
  let dao = Dao.load(daoId);
  if (dao === null) {
    dao = new Dao(daoId);
  }

  dao.delegatedVaultManager = event.params.delegate;

  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}
