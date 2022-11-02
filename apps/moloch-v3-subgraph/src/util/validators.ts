import { Address, dataSource, log } from '@graphprotocol/graph-ts';
import { Member } from '../../generated/schema';
import { constants } from './constants';

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
}
