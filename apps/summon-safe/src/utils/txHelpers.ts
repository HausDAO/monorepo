import { Contract, utils } from 'ethers';
import { LOCAL_ABI } from '@daohaus/abis';
import { ENDPOINTS, ValidNetwork } from '@daohaus/keychain-utils';
import SafeAppsSDK, {
  GatewayTransactionDetails,
} from '@gnosis.pm/safe-apps-sdk';
import { MultisigExecutionDetails } from '@gnosis.pm/safe-react-gateway-sdk';
import { calculateProxyAddress, CONTRACT_ABIS } from '@gnosis.pm/zodiac';
import { handleKeychains } from '@daohaus/contract-utils';

export const calculateBaalAddress = async (
  chainId: ValidNetwork,
  sdk: SafeAppsSDK,
  saltNonce: string
) => {
  const { V3_FACTORY_ADV_TOKEN, ZODIAC_FACTORY } = handleKeychains(chainId);
  const advTokenBaalFactory = new Contract(
    V3_FACTORY_ADV_TOKEN,
    LOCAL_ABI.BAAL_ADV_TOKEN_SUMMONER
  );
  const summonerRs: string = await sdk.eth.call([
    {
      to: V3_FACTORY_ADV_TOKEN,
      data: advTokenBaalFactory.interface.encodeFunctionData('_baalSummoner'),
    },
    'latest',
  ]);
  const baalSummonerAddr = `0x${summonerRs.substring(summonerRs.length - 40)}`;

  const baalFactory = new Contract(baalSummonerAddr, LOCAL_ABI.BAAL_SUMMONER);
  const rs: string = await sdk.eth.call([
    {
      to: baalSummonerAddr,
      data: baalFactory.interface.encodeFunctionData('template'),
    },
    'latest',
  ]);
  const templateAddress = `0x${rs.substring(rs.length - 40)}`;
  const baalSingleton = new Contract(templateAddress, LOCAL_ABI.BAAL);
  const moduleProxyFactory = new Contract(
    ZODIAC_FACTORY,
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
    'function summonBaalFromReferrer(address _safeAddr, address _forwarderAddr, uint256 _saltNonce, bytes calldata initializationMintParams, bytes calldata initializationTokenParams, bytes[] calldata postInitializationActions) external',
    // 'function summonBaalFromReferrer(bytes calldata initializationParams, bytes[] calldata initializationActions, uint256 _saltNonce) external returns (address)',
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
