# @daohaus/contract-utils

**@daohaus/contract-utils** is a package providing:

- quick access to the main moloch v3 contract addresses across networks
- contract abis
- contract function helpers utilities
- typescript wrapped contract instances for easily making the most common transactions

It utilizes [TypeChain](https://github.com/dethcrypto/TypeChain) for type generation.

This library was generated with [Nx](https://nx.dev).

## Getting Started

**Install**

```sh
yarn add @daohaus/contract-utils
```

## Usage

**Get contract addresses**

```ts
import { getContractAddressesForChain } from '@daohaus/contract-utils';

const goerliNetworkId = '0x5';

const contracts = {
  posterAddress: getContractAddressesForChain('POSTER', goerliNetworkId),
  gnosisMultisendAddress: getContractAddressesForChain(
    'GNOSIS_MULTISEND',
    goerliNetworkId
  ),
  baalSummonerAddress: getContractAddressesForChain(
    'V3_FACTORY_ADV_TOKEN',
    goerliNetworkId
  ),
  tributeMinionAddress: getContractAddressesForChain(
    'TRIBUTE_MINION',
    goerliNetworkId
  ),
};
```

**Get contract abis**

```ts
import { getContractAbi } from '@daohaus/contract-utils';

const baalAbi = getContractAbi('BAAL');
```

**Get contract abis**

```ts
import { getContractAbi } from '@daohaus/contract-utils';

const baalAbi = getContractAbi('BAAL');
```

**Init contract and make function call**

```ts
const molochV3 = MolochV3Contract.create({
  address: '0x0somedaoaddress',
  provider: new ethers.providers.JsonRpcProvider('someproviderurl'),
});

molochV3.sponsorProposal('1');
```

There are some helper functions to look through that will help create the arguments needed for some of the function calls, ie.) gas estimates, and encoded action data:

/src/lib/estimate-utils.ts
/src/lib/encoding-utils.ts

## Building

Run `nx build contract-utils` to build the library.

## Running unit tests

Run `nx test contract-utils` to execute the unit tests via [Jest](https://jestjs.io).
