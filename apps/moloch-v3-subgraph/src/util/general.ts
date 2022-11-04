import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import { Erc20 } from '../../generated/TributeMinion/Erc20';
import { Erc20Bytes32 } from '../../generated/TributeMinion/Erc20Bytes32';

export function getErc20Symbol(tokenAddress: Address): string | null {
  let contract = Erc20.bind(tokenAddress);

  let symbol = contract.try_symbol();
  if (symbol.reverted) {
    let erc20Bytes32 = Erc20Bytes32.bind(tokenAddress);

    let otherSymbol = erc20Bytes32.try_symbol();
    if (otherSymbol.reverted) {
      log.info('other symbol reverted token, {}', [tokenAddress.toHexString()]);
      return null;
    } else {
      return otherSymbol.value.toString();
    }
  } else {
    return symbol.value;
  }
}

export function getErc20Decimals(tokenAddress: Address): BigInt | null {
  let contract = Erc20.bind(tokenAddress);

  let decimals = contract.try_decimals();
  if (decimals.reverted) {
    log.info('decimals reverted token, {}', [tokenAddress.toHexString()]);
    return null;
  } else {
    return BigInt.fromI32(decimals.value);
  }
}
