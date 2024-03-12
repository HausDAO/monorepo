import { NewPost } from '../generated/Poster/Poster';
import { log } from '@graphprotocol/graph-ts';
import {
  createDaoDatabaseRecord,
  createDaoProfile,
  createDaoProfileSummoning,
  createDaoSignal,
  getResultFromJson,
  getStringFromJson,
} from './util/parser';
import { constants } from './util/constants';
import {
  hasDaoDatabaseFields,
  isDaoSafe,
  isDaoShaman,
  isMember,
  isShareholder,
} from './util/validators';
import { addTransaction } from './util/transactions';

// event NewPost(address indexed user, string content, string indexed tag);
export function handleNewPost(event: NewPost): void {
  log.info('^^^handleNewPost tag, {}', [event.params.tag.toHexString()]);

  const validTags = [
    constants.DAOHAUS_SUMMONER_DAO_PROFILE_TAG,
    constants.DAOHAUS_SHARES_DAO_PROFILE_TAG,
    constants.DAOHAUS_PROPOSAL_SIGNAL,
    constants.DAOHAUS_PROPOSAL_DATABASE,
    constants.DAOHAUS_SHARES_DATABASE,
    constants.DAOHAUS_MEMBER_DATABASE,
  ];
  const validTag = validTags.includes(event.params.tag.toHexString());
  if (!validTag) {
    log.info('^^^invalidTag', []);
    return;
  }

  log.info('event.params.content, {}', [event.params.content]);

  const result = getResultFromJson(event.params.content);
  if (result.error != 'none') {
    log.error('no content', []);
    return;
  }
  const object = result.object;

  if (
    event.params.tag.toHexString() == constants.DAOHAUS_SUMMONER_DAO_PROFILE_TAG
  ) {
    log.info('&&& creating summon record', [event.params.content]);
    createDaoProfileSummoning(object, event.params.user, event);
    addTransaction(event.block, event.transaction, event.address);
    return;
  }

  const daoId = getStringFromJson(object, 'daoId');
  if (daoId.error != 'none') {
    log.error('no daoId', []);
    return;
  }

  if (
    event.params.tag.toHexString() ==
      constants.DAOHAUS_SHARES_DAO_PROFILE_TAG &&
    isShareholder(object, event.params.user)
  ) {
    createDaoProfile(object, event);
    addTransaction(event.block, event.transaction, event.address);
    return;
  }

  if (event.params.tag.toHexString() == constants.DAOHAUS_PROPOSAL_SIGNAL) {
    log.info(
      'sig: event.address, {}, event.params.user: {}, event.transaction.from: {}',
      [
        event.address.toHexString(),
        event.params.user.toHexString(),
        event.transaction.from.toHexString(),
      ]
    );

    createDaoSignal(object, event);
    addTransaction(event.block, event.transaction, event.address);
    return;
  }

  if (
    event.params.tag.toHexString() == constants.DAOHAUS_PROPOSAL_DATABASE &&
    hasDaoDatabaseFields(object) &&
    isDaoSafe(object, event.params.user)
  ) {
    log.info('&&& creating database record', [event.params.content]);
    createDaoDatabaseRecord(object, event);
    addTransaction(event.block, event.transaction, event.address);
    return;
  }

  if (
    event.params.tag.toHexString() == constants.DAOHAUS_SHARES_DATABASE &&
    hasDaoDatabaseFields(object) &&
    isShareholder(object, event.params.user)
  ) {
    log.info('&&& creating database record', [event.params.content]);
    createDaoDatabaseRecord(object, event);
    addTransaction(event.block, event.transaction, event.address);
    return;
  }

  if (
    event.params.tag.toHexString() == constants.DAOHAUS_MEMBER_DATABASE &&
    hasDaoDatabaseFields(object) &&
    isMember(object, event.params.user)
  ) {
    log.info('&&& creating database record', [event.params.content]);
    createDaoDatabaseRecord(object, event);
    addTransaction(event.block, event.transaction, event.address);
    return;
  }

  if (
    event.params.tag.toHexString() == constants.DAOHAUS_SHAMAN_DATABASE &&
    hasDaoDatabaseFields(object) &&
    isDaoShaman(object, event.params.user)
  ) {
    log.info('&&& creating database record', [event.params.content]);
    createDaoDatabaseRecord(object, event);
    addTransaction(event.block, event.transaction, event.address);
    return;
  }
}
