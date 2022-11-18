import { Contract, utils } from 'ethers';
import { LOCAL_ABI } from '@daohaus/abis';
import { ENDPOINTS, ValidNetwork } from '@daohaus/keychain-utils';
import SafeAppsSDK, {
  GatewayTransactionDetails,
} from '@gnosis.pm/safe-apps-sdk';
import { MultisigExecutionDetails } from '@gnosis.pm/safe-react-gateway-sdk';
import { calculateProxyAddress, CONTRACT_ABIS } from '@gnosis.pm/zodiac';

import { handleKeychains } from './summonTx';

export const calculateBaalAddress = async (
  chainId: ValidNetwork,
  sdk: SafeAppsSDK,
  saltNonce: string
) => {
  const { V3_FACTORY } = handleKeychains(chainId);
  const baalFactory = new Contract(V3_FACTORY, LOCAL_ABI.BAAL_SUMMONER);
  const rs: string = await sdk.eth.call([
    {
      to: V3_FACTORY,
      data: baalFactory.interface.encodeFunctionData('template'),
    },
    'latest',
  ]);
  const templateAddress = `0x${rs.substring(rs.length - 40, rs.length)}`;
  const baalSingleton = new Contract(templateAddress, LOCAL_ABI.BAAL);
  const moduleProxyFactory = new Contract(
    // TODO: switch to use the latest moduleProxyFactory from Zodiac
    // once the BaalSummoner gets updated
    // CONTRACT_ADDRESSES[Number(chainId)].factory,
    '0x00000000062c52e29e8029dc2413172f6d619d85',
    CONTRACT_ABIS.factory
  );
  const initData = baalSingleton.interface.encodeFunctionData('avatar');
  return calculateProxyAddress(
    moduleProxyFactory,
    templateAddress,
    initData,
    saltNonce
  );
};

export const encodeAddModule = (moduleAddress: string) => {
  const ifaceAvatar = new utils.Interface([
    'function enableModule(address module) public',
  ]);
  return ifaceAvatar.encodeFunctionData('enableModule', [moduleAddress]);
};

export const encodeSummonBaal = (params: Array<string>) => {
  const ifaceSummoner = new utils.Interface([
    'function summonBaal(bytes calldata initializationParams, bytes[] calldata initializationActions, uint256 _saltNonce) external returns (address)',
  ]);
  return ifaceSummoner.encodeFunctionData('summonBaalFromReferrer', params);
};

export const getSafeModules = async (safeAddress: string, sdk: SafeAppsSDK) => {
  const SAFE_V1_1_1 = [
    'function getModules() public view returns (address[] memory)',
  ];
  // const SAFE_V1_3_0 = [
  //   'function getModulesPaginated(address start, uint256 pageSize) external view returns (address[] memory array, address next)',
  // ]

  const iface = new utils.Interface(SAFE_V1_1_1);
  const rs: string = await sdk.eth.call([
    {
      to: safeAddress,
      data: iface.encodeFunctionData('getModules'),
    },
    'latest',
  ]);
  const response = rs
    ?.substring(2)
    .match(/.{1,64}/g)
    ?.map((v) => `0x${v}`);
  if (response && response.length > 0) {
    const totalModules = Number(response[2]);
    return totalModules > 0
      ? response
          .slice(2)
          .map((v) => `0x${v.substring(v.length - 40, v.length)}`)
      : [];
  }
};

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const pollSafeTx = async (
  chainId: ValidNetwork,
  sdk: SafeAppsSDK,
  safeTxHash: string,
  setTxExplorerURI?: (uri: string) => void
): Promise<GatewayTransactionDetails | undefined> => {
  let retries = 0;
  let safeTx;
  let waitForConfrimation = true;
  while (retries <= 15 && waitForConfrimation) {
    await timeout(15000);
    safeTx = await sdk.txs.getBySafeTxHash(safeTxHash);
    if (safeTx) {
      if (setTxExplorerURI && safeTx.txHash)
        setTxExplorerURI(`${ENDPOINTS.EXPLORER[chainId]}/tx/${safeTx.txHash}`);
      waitForConfrimation =
        (safeTx.detailedExecutionInfo as MultisigExecutionDetails)
          ?.confirmationsRequired === 1;
      if (waitForConfrimation === true && retries <= 600) {
        waitForConfrimation = safeTx.txStatus !== 'SUCCESS';
      }
    }
    retries++;
  }
  return safeTx;
};
