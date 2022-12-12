import { NewPost } from '../generated/Poster/Poster';
import { log } from '@graphprotocol/graph-ts';
import { parser } from './util/parser';
import { constants } from './util/constants';
import { validators } from './util/validators';
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

  const result = parser.getResultFromJson(event.params.content);
  if (result.error != 'none') {
    log.error('no content', []);
    return;
  }
  const object = result.object;

  if (
    event.params.tag.toHexString() == constants.DAOHAUS_SUMMONER_DAO_PROFILE_TAG
  ) {
    log.info('&&& creating summon record', [event.params.content]);
    parser.createDaoProfileSummoning(object, event.params.user, event);
    addTransaction(event.block, event.transaction, event.address);
    return;
  }

  const daoId = parser.getStringFromJson(object, 'daoId');
  if (daoId.error != 'none') {
    log.error('no daoId', []);
    return;
  }

  if (
    event.params.tag.toHexString() ==
      constants.DAOHAUS_SHARES_DAO_PROFILE_TAG &&
    validators.isShareholder(event.params.user, daoId.data)
  ) {
    parser.createDaoProfile(object, daoId.data, event);
    addTransaction(event.block, event.transaction, event.address);
    return;
  }

  if (event.params.tag.toHexString() == constants.DAOHAUS_PROPOSAL_SIGNAL) {
    // todo add proposal validator
    // event .params.user is the safe for the dao
    log.info(
      'sig: event.address, {}, event.params.user: {}, event.transaction.from: {}',
      [
        event.address.toHexString(),
        event.params.user.toHexString(),
        event.transaction.from.toHexString(),
      ]
    );

    parser.createDaoSignal(daoId.data, event);
    addTransaction(event.block, event.transaction, event.address);
    return;
  }

  if (
    event.params.tag.toHexString() == constants.DAOHAUS_PROPOSAL_DATABASE &&
    validators.hasDaoDatabaseFields(object) &&
    validators.isDaoSafe(event.params.user, daoId.data)
  ) {
    log.info('&&& creating database record', [event.params.content]);

    // parser.createDaoSignal(daoId.data, event);
    addTransaction(event.block, event.transaction, event.address);
    return;
  }
}
