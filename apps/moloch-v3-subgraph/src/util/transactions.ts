import { Bytes, ethereum } from '@graphprotocol/graph-ts';
import { EventTransaction } from '../../generated/schema';

export function addTransaction(
  block: ethereum.Block,
  tx: ethereum.Transaction,
  dao: Bytes
): void {
  let transaction = new EventTransaction(tx.hash.toHex());
  transaction.createdAt = block.timestamp;
  transaction.dao = dao.toHexString();
  transaction.daoAddress = dao;
  transaction.save();
}
