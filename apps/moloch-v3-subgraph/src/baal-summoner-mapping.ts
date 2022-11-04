import { SummonBaal } from '../generated/BaalSummoner/BaalSummoner';
import {
  BaalTemplate,
  LootTemplate,
  SharesTemplate,
} from '../generated/templates';
import { Dao, TokenLookup } from '../generated/schema';
import { constants } from './util/constants';

export function handleSummonBaal(event: SummonBaal): void {
  BaalTemplate.create(event.params.baal);
  SharesTemplate.create(event.params.shares);
  LootTemplate.create(event.params.loot);

  let daoId = event.params.baal.toHexString();
  let dao = new Dao(daoId);
  if (dao === null) {
    return;
  }

  dao.createdAt = event.block.timestamp;
  dao.createdBy = event.transaction.from;
  dao.txHash = event.transaction.hash;
  dao.lootAddress = event.params.loot;
  dao.sharesAddress = event.params.shares;
  dao.safeAddress = event.params.safe;
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
  dao.existingSafe = event.params.existingSafe;
  dao.adminLocked = false;
  dao.governorLocked = false;
  dao.managerLocked = false;

  dao.baalVersion = '0.4.1';
  if (event.address.toHexString() === constants.BAAL_SUMMONER_V1_ADDRESS) {
    dao.baalVersion = '1.0.0';
  }

  dao.save();

  let shareTokenLookup = new TokenLookup(event.params.shares.toHexString());
  shareTokenLookup.dao = event.params.baal;

  shareTokenLookup.save();

  let lootTokenLookup = new TokenLookup(event.params.loot.toHexString());
  lootTokenLookup.dao = event.params.baal;

  lootTokenLookup.save();
}
