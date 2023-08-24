import {
  ABI,
  ArbitraryState,
  TXLego,
  TXOverrides,
  toBigInt,
} from '@daohaus/utils';
import { Keychain, PinataApiKeys, ValidNetwork } from '@daohaus/keychain-utils';
import { BlockTag } from 'viem';

import { processArg } from './args';

const handleProposalOfferingValue = async ({
  appState,
  overrides,
  chainId,
  safeId,
  localABIs,
  rpcs,
  pinataApiKeys,
  explorerKeys,
}: {
  appState: ArbitraryState;
  overrides?: TXOverrides;
  chainId: ValidNetwork;
  safeId?: string;
  localABIs: Record<string, ABI>;
  rpcs: Keychain;
  pinataApiKeys: PinataApiKeys;
  explorerKeys: Keychain;
}) => {
  if (appState['formValues']?.proposalOffering) {
    return BigInt(appState['formValues']?.proposalOffering);
  }

  return overrides?.value
    ? toBigInt(
        await processArg({
          arg: overrides.value,
          chainId,
          safeId,
          localABIs,
          appState,
          rpcs,
          pinataApiKeys,
          explorerKeys,
        })
      )
    : BigInt(0);
};

export const processOverrides = async ({
  tx,
  chainId,
  safeId,
  localABIs,
  appState,
  rpcs,
  pinataApiKeys,
  explorerKeys,
}: {
  tx: TXLego;
  chainId: ValidNetwork;
  safeId?: string;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
  rpcs: Keychain;
  pinataApiKeys: PinataApiKeys;
  explorerKeys: Keychain;
}) => {
  const { overrides, staticOverrides } = tx;

  if (staticOverrides) {
    return {
      value: BigInt(0),
      ...staticOverrides,
    };
  }

  return {
    value: await handleProposalOfferingValue({
      appState,
      overrides,
      chainId,
      safeId,
      localABIs,
      rpcs,
      pinataApiKeys,
      explorerKeys,
    }),
    gasLimit:
      overrides?.gasLimit &&
      toBigInt(
        await processArg({
          arg: overrides.gasLimit,
          chainId,
          safeId,
          localABIs,
          appState,
          rpcs,
          pinataApiKeys,
          explorerKeys,
        })
      ),
    gasPrice:
      overrides?.gasPrice &&
      toBigInt(
        await processArg({
          arg: overrides.gasPrice,
          chainId,
          safeId,
          localABIs,
          appState,
          rpcs,
          pinataApiKeys,
          explorerKeys,
        })
      ),
    from:
      overrides?.from &&
      (await processArg({
        arg: overrides.from,
        chainId,
        safeId,
        localABIs,
        appState,
        rpcs,
        pinataApiKeys,
        explorerKeys,
      })),
    blockTag:
      overrides?.blockTag &&
      ((await processArg({
        arg: overrides.blockTag,
        chainId,
        safeId,
        localABIs,
        appState,
        rpcs,
        pinataApiKeys,
        explorerKeys,
      })) as BlockTag),
  };
};
