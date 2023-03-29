import { SummonBaal } from '../generated/BaalSummoner/BaalSummoner';
import {
  SummonBaal as SummonBaalV2,
  DaoReferral,
} from '../generated/BaalSummonerV2/BaalSummonerV2';

import {
  BaalTemplate,
  LootTemplate,
  SharesTemplate,
} from '../generated/templates';
import { Dao, TokenLookup, Vault } from '../generated/schema';
import { constants } from './util/constants';
import { Address } from '@graphprotocol/graph-ts';
import { getErc20Name, getErc20Symbol } from './util/general';

export function handleSummonBaalV2(event: SummonBaalV2): void {
  BaalTemplate.create(event.params.baal);
  SharesTemplate.create(event.params.shares);
  LootTemplate.create(event.params.loot);

  const daoId = event.params.baal.toHexString();
  const dao = new Dao(daoId);
  if (dao === null) {
    return;
  }

  dao.createdAt = event.block.timestamp;
  dao.createdBy = event.transaction.from;
  dao.txHash = event.transaction.hash;
  dao.lootAddress = event.params.loot;
  dao.sharesAddress = event.params.shares;
  dao.totalShares = constants.BIGINT_ZERO;
  dao.totalLoot = constants.BIGINT_ZERO;
  dao.latestSponsoredProposalId = constants.BIGINT_ZERO;
  dao.lootPaused = false;
  dao.sharesPaused = false;
  dao.gracePeriod = constants.BIGINT_ZERO;
  dao.votingPeriod = constants.BIGINT_ZERO;
  dao.votingPlusGraceDuration = constants.BIGINT_ZERO;
  dao.proposalOffering = constants.BIGINT_ZERO;
  dao.quorumPercent = constants.BIGINT_ZERO;
  dao.sponsorThreshold = constants.BIGINT_ZERO;
  dao.minRetentionPercent = constants.BIGINT_ZERO;
  dao.activeMemberCount = constants.BIGINT_ZERO;
  dao.proposalCount = constants.BIGINT_ZERO;
  dao.members = [];
  dao.adminLocked = false;
  dao.governorLocked = false;
  dao.managerLocked = false;

  dao.safeAddress = event.params.safe;
  dao.delegatedVaultManager = Address.fromString(constants.ADDRESS_ZERO);

  dao.lootTokenName = getErc20Name(event.params.loot);
  dao.lootTokenSymbol = getErc20Symbol(event.params.loot);

  const vaultId = daoId
    .concat('-vault-')
    .concat(event.params.safe.toHexString());
  let vault = Vault.load(vaultId);
  if (!vault) {
    vault = new Vault(vaultId);
  }
  vault.dao = daoId;
  vault.createdAt = event.block.timestamp;
  vault.active = true;
  vault.ragequittable = true;
  vault.name = 'Treasury';
  vault.safeAddress = event.params.safe;

  vault.save();

  dao.forwarder = event.params.forwarder;
  dao.existingSafe =
    event.params.existingAddrs == constants.BIGINT_ONE ||
    event.params.existingAddrs === constants.BIGINT_THREE;
  dao.existingSharesAndLoot =
    event.params.existingAddrs == constants.BIGINT_TWO ||
    event.params.existingAddrs === constants.BIGINT_THREE;

  dao.baalVersion = '2.0.0';

  dao.save();

  const shareTokenLookup = new TokenLookup(event.params.shares.toHexString());
  shareTokenLookup.dao = event.params.baal;

  shareTokenLookup.save();

  const lootTokenLookup = new TokenLookup(event.params.loot.toHexString());
  lootTokenLookup.dao = event.params.baal;

  lootTokenLookup.save();
}

export function handleSummonBaal(event: SummonBaal): void {
  BaalTemplate.create(event.params.baal);
  SharesTemplate.create(event.params.shares);
  LootTemplate.create(event.params.loot);

  const daoId = event.params.baal.toHexString();
  const dao = new Dao(daoId);
  if (dao === null) {
    return;
  }

  dao.createdAt = event.block.timestamp;
  dao.createdBy = event.transaction.from;
  dao.txHash = event.transaction.hash;
  dao.lootAddress = event.params.loot;
  dao.sharesAddress = event.params.shares;
  dao.totalShares = constants.BIGINT_ZERO;
  dao.totalLoot = constants.BIGINT_ZERO;
  dao.latestSponsoredProposalId = constants.BIGINT_ZERO;
  dao.lootPaused = false;
  dao.sharesPaused = false;
  dao.gracePeriod = constants.BIGINT_ZERO;
  dao.votingPeriod = constants.BIGINT_ZERO;
  dao.votingPlusGraceDuration = constants.BIGINT_ZERO;
  dao.proposalOffering = constants.BIGINT_ZERO;
  dao.quorumPercent = constants.BIGINT_ZERO;
  dao.sponsorThreshold = constants.BIGINT_ZERO;
  dao.minRetentionPercent = constants.BIGINT_ZERO;
  dao.activeMemberCount = constants.BIGINT_ZERO;
  dao.proposalCount = constants.BIGINT_ZERO;
  dao.members = [];
  dao.adminLocked = false;
  dao.governorLocked = false;
  dao.managerLocked = false;
  dao.forwarder = Address.fromString(constants.ADDRESS_ZERO);
  dao.existingSafe = event.params.existingSafe;
  dao.existingSharesAndLoot = false;

  dao.safeAddress = event.params.safe;
  dao.delegatedVaultManager = Address.fromString(constants.ADDRESS_ZERO);

  dao.lootTokenName = getErc20Name(event.params.loot);
  dao.lootTokenSymbol = getErc20Symbol(event.params.loot);

  const vaultId = daoId
    .concat('-vault-')
    .concat(event.params.safe.toHexString());
  let vault = Vault.load(vaultId);
  if (!vault) {
    vault = new Vault(vaultId);
  }
  vault.createdAt = event.block.timestamp;
  vault.dao = daoId;
  vault.active = true;
  vault.ragequittable = true;
  vault.name = 'Treasury';
  vault.safeAddress = event.params.safe;

  vault.save();

  dao.baalVersion = '1.0.0';

  dao.save();

  const shareTokenLookup = new TokenLookup(event.params.shares.toHexString());
  shareTokenLookup.dao = event.params.baal;

  shareTokenLookup.save();

  const lootTokenLookup = new TokenLookup(event.params.loot.toHexString());
  lootTokenLookup.dao = event.params.baal;

  lootTokenLookup.save();
}

export function handleDaoReferral(event: DaoReferral): void {
  const daoId = event.params.daoAddress.toHexString();

  let dao = Dao.load(daoId);
  if (dao === null) {
    dao = new Dao(daoId);
  }

  dao.referrer = event.params.referrer.toString();

  dao.save();
}
