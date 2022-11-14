import {
  SetVault,
  SetDelegate,
} from '../generated/VaultSummoner/VaultSummoner';
import { Dao, Vault } from '../generated/schema';

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
    vault.ragequitable = false;
    vault.name = event.params.vault.name;
  }

  vault.active = event.params.vault.active;

  vault.save();
}

export function handleSetVaultDelegate(event: SetDelegate): void {
  const daoId = event.params.daoAddress.toHexString();
  let dao = Dao.load(daoId);
  if (dao === null) {
    dao = new Dao(daoId);
  }

  dao.delegatedVaultManager = event.params.delegate;

  dao.save();
}
