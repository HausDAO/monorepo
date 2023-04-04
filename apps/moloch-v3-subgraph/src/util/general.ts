import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import { Erc20 } from '../../generated/TributeMinion/Erc20';
import { Erc20Bytes32 } from '../../generated/TributeMinion/Erc20Bytes32';

export function getErc20Symbol(tokenAddress: Address): string | null {
  const contract = Erc20.bind(tokenAddress);

  const symbol = contract.try_symbol();
  if (symbol.reverted) {
    const erc20Bytes32 = Erc20Bytes32.bind(tokenAddress);

    const otherSymbol = erc20Bytes32.try_symbol();
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

export function getErc20Name(tokenAddress: Address): string | null {
  const contract = Erc20.bind(tokenAddress);

  const name = contract.try_name();
  if (name.reverted) {
    const erc20Bytes32 = Erc20Bytes32.bind(tokenAddress);

    const otherName = erc20Bytes32.try_name();
    if (otherName.reverted) {
      log.info('other symbol reverted token, {}', [tokenAddress.toHexString()]);
      return null;
    } else {
      return otherName.value.toString();
    }
  } else {
    return name.value;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function getErc20Decimals(tokenAddress: Address): BigInt | null {
  const contract = Erc20.bind(tokenAddress);

  const decimals = contract.try_decimals();
  if (decimals.reverted) {
    log.info('decimals reverted token, {}', [tokenAddress.toHexString()]);
    return null;
  } else {
    return BigInt.fromI32(decimals.value);
  }
}
