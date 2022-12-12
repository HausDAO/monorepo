import { Address, JSONValue, log, TypedMap } from '@graphprotocol/graph-ts';
import { Dao, Member } from '../../generated/schema';
import { constants } from './constants';
import { getStringFromJson } from './parser';

export function isShareholder(
  object: TypedMap<string, JSONValue>,
  senderAddress: Address
): boolean {
  const daoId = getStringFromJson(object, 'daoId');
  if (daoId.error != 'none') {
    log.error('no table', []);
    return false;
  }

  const memberId = daoId.data
    .concat('-member-')
    .concat(senderAddress.toHexString());

  const member = Member.load(memberId);
  if (!member || member.shares == constants.BIGINT_ZERO) {
    log.info('no member or shares, member id {}', [memberId]);

    return false;
  }

  return true;
}

export function isMember(
  object: TypedMap<string, JSONValue>,
  senderAddress: Address
): boolean {
  const daoId = getStringFromJson(object, 'daoId');
  if (daoId.error != 'none') {
    log.error('no table', []);
    return false;
  }
  const memberId = daoId.data
    .concat('-member-')
    .concat(senderAddress.toHexString());

  const member = Member.load(memberId);
  if (!member) {
    log.info('no member', []);

    return false;
  }

  if (
    member.shares == constants.BIGINT_ZERO &&
    member.loot == constants.BIGINT_ZERO
  ) {
    log.info('no member shares or loot', []);

    return false;
  }

  return true;
}

export function isDaoSafe(
  object: TypedMap<string, JSONValue>,
  senderAddress: Address
): boolean {
  const daoId = getStringFromJson(object, 'daoId');
  if (daoId.error != 'none') {
    log.error('no table', []);
    return false;
  }

  const dao = Dao.load(daoId.data);
  if (!dao) {
    log.info('no dao', []);

    return false;
  }

  if (dao.safeAddress !== senderAddress) {
    log.info('not from the dao safe', []);

    return false;
  }

  return true;
}

export function hasDaoDatabaseFields(
  object: TypedMap<string, JSONValue>
): boolean {
  const table = getStringFromJson(object, 'table');
  if (table.error != 'none') {
    log.error('no table', []);
    return false;
  }

  const queryType = getStringFromJson(object, 'queryType');
  if (queryType.error != 'none') {
    log.error('no queryType', []);
    return false;
  }

  return true;
}
