# @daohaus/keychain-utils

keychain-utils is a comprehensive reference point for managing chain-specific DAO data. It provides an easy way to retrieve a list of constants for any given chain. These constants include contract addresses, API endpoints, TheGraph endpoints, and block explorers. The keychain-utils are structured as objects, with chain IDs serving as the keys to these objects.

### [View on NPM](https://www.npmjs.com/package/@daohaus/keychain-utils)

## Usage

### Installation

```bash
yarn add @daohaus/keychain-utils
```

### Examples

**How to create a link to the block explorer for an address or transaction**

```ts
import { generateExplorerLink } from '@daohaus/keychain-utils';

const contractLink = generateExplorerLink({ chainId: '0x1', address: '0x0address', type: 'address' });

const txLink = generateExplorerLink({ chainId: '0x5', address: '0x0TxHash', type: 'tx' });
```

**How to get contract addresses for each supported network**

```ts
import { CONTRACT_KEYCHAINS } from '@daohaus/keychain-utils';

const vaultSummoner = CONTRACT_KEYCHAINS['VAULT_SUMMONER']['0x1'];
```

**How to get subgraph endpoints for each supported network**

```ts
import { ENDPOINTS } from '@daohaus/keychain-utils';

const arbitrumGraph = ENDPOINTS['V3_SUBGRAPH']['0xa'];

const hydratedEndpoints = addApiKeyToGraphEnpoints({ '0x1': 'someGraphApiKey' }, ENDPOINTS);
const mainnetGraph = hydratedEndpoints['V3_SUBGRAPH']['0x1'];
```

**How to get the name of a network from the id**

```ts
import { getNetworkName } from '@daohaus/keychain-utils';

const name = getNetworkName('0x64');
```

## Building

Run `nx run keychain-utils:build` to build the library.
