import { Address, JSONValue, log, TypedMap } from '@graphprotocol/graph-ts';
import { Dao, Member } from '../../generated/schema';
import { constants } from './constants';
import { parser } from './parser';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace validators {
  export function isShareholder(
    senderAddress: Address,
    daoId: string
  ): boolean {
    const memberId = daoId
      .concat('-member-')
      .concat(senderAddress.toHexString());

    const member = Member.load(memberId);
    if (!member || member.shares == constants.BIGINT_ZERO) {
      log.info('no member or shares', []);

      return false;
    }

    return true;
  }

  export function isMember(senderAddress: Address, daoId: string): boolean {
    const memberId = daoId
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

  export function isDaoSafe(senderAddress: Address, daoId: string): boolean {
    const dao = Dao.load(daoId);

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
    const table = parser.getStringFromJson(object, 'table');
    if (table.error != 'none') {
      log.error('no table', []);
      return false;
    }

    const queryType = parser.getStringFromJson(object, 'queryType');
    if (queryType.error != 'none') {
      log.error('no queryType', []);
      return false;
    }

    return true;
  }
}
