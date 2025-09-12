import { createPublicClient, http } from 'viem';
import { normalize } from 'viem/ens';
import { mainnet } from 'viem/chains';

import { AccountProfile } from '@daohaus/utils';

import { transformProfile } from './utils';

export const getProfileForAddress = async ({
  address,
  rpcUri,
}: {
  address: string;
  rpcUri?: string;
}): Promise<AccountProfile> => {
  // Allow opt-out (helps when public RPCs lack ENS support or rate limit)
  if (process.env['NX_DISABLE_ENS'] === 'true') {
    return transformProfile({ address });
  }

  const reverseEnsRecord = rpcUri
    ? await getENSReverseResolver({ address, rpcUri })
    : undefined;

  return transformProfile({
    address,
    ensDomain: reverseEnsRecord,
  });
};

const getENSReverseResolver = async ({
  address,
  rpcUri,
}: {
  address: string;
  rpcUri: string;
}) => {
  const tried: string[] = [];
  const candidates = buildEnsRpcCandidateList(rpcUri);
  for (const candidate of candidates) {
    if (!candidate) continue;
    tried.push(candidate);
    try {
      const client = createPublicClient({
        chain: mainnet,
        transport: http(candidate),
      });
      const ensName = await client.getEnsName({
        address: address as `0x${string}`,
      });
      if (!ensName) return; // No reverse record, stop.
      const ensText = await client.getEnsAvatar({
        name: normalize(ensName),
      });
      return {
        domain: {
          name: ensName,
          avatar: ensText,
        },
      };
    } catch (err: any) {
      // Detect internal or method unsupported style errors & continue to next candidate
      const msg = err?.message || '';
      const isRetryable =
        /internal error/i.test(msg) ||
        /rate limit/i.test(msg) ||
        /timeout/i.test(msg) ||
        /429/.test(msg) ||
        /not implemented/i.test(msg);
      if (!isRetryable) {
        // Non-retryable -> break, but keep logging minimal
  // Non-retryable; silent.
        break;
      }
  // Retryable; proceed to next.
      continue; // Try next candidate
    }
  }
  // All candidates failed – silent.
};

// Build ordered list of RPC candidates for ENS resolution.
// Priority: provided rpcUri -> NX_ENS_FALLBACK_RPC -> Alchemy (if key) -> Infura (if key) -> public Cloudflare
const buildEnsRpcCandidateList = (primary?: string): string[] => {
  const list: (string | undefined)[] = [];
  const fallbackEnv = process.env['NX_ENS_FALLBACK_RPC'];
  const alchemy = process.env['NX_ETHEREUM_ALCHEMY_KEY']
    ? `https://eth-mainnet.g.alchemy.com/v2/${process.env['NX_ETHEREUM_ALCHEMY_KEY']}`
    : undefined;
  const infura = process.env['NX_INFURA_API_KEY']
    ? `https://mainnet.infura.io/v3/${process.env['NX_INFURA_API_KEY']}`
    : undefined;
  const cloudflare = 'https://cloudflare-eth.com';
  [primary, fallbackEnv, alchemy, infura, cloudflare].forEach((u) => {
    if (u && !list.includes(u)) list.push(u);
  });
  return list as string[];
};
