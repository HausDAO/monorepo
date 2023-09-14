# @daohaus/contract-utils

The `contract-utils` package consists of TypeScript wrappers for our primary contracts. While you will read state data from `moloch-v3-data`, `contract-utils` equips you with instances of the contract and access to a set of helpers for making function calls and writing data to the contracts.

It utilizes [TypeChain](https://github.com/dethcrypto/TypeChain) for type generation.

### [View on NPM](https://www.npmjs.com/package/@daohaus/contract-utils)

## Usage

### Installation

```bash
yarn add @daohaus/profile-data
```

### Requirements

This packages uses ethers.js providers and rpc endpoints create the connection to the blockchain and contract. You should provide an ether.js provider.

### Examples

**How to init a contract and make a function call**

```ts
import { MolochV3Contract } from '@daohaus/contract-utils';

const molochV3 = MolochV3Contract.create({
  address: '0x0somedaoaddress',
  provider: new ethers.providers.JsonRpcProvider('https:///someProviderUrl.com'),
});

molochV3.sponsorProposal('1');
```

**How to summon a DAO**

**_TODO_**: add a link to user guide on dao params
Dao summoning argument explainer [here]
(https://docs.daohaus.club/user/summoner/summon)

```ts
import { MolochV3AdvTokenSummonerContract } from '@daohaus/contract-utils';

const molochV3AdvSummoner = MolochV3AdvTokenSummonerContract.create({
  networkIs: '0x5',
  provider: new ethers.providers.JsonRpcProvider('https:///someProviderUrl.com'),
});

const daoSetUpData = {
  sharesTokenName: 'Voting',
  sharesTokenSymbol: 'vote',
  lootTokenName: 'nonVoting',
  lootTokenSymbol: 'nvote',
  safeAddress: 'address if using exsiting safe for treasury, blank if creating a new one',
  tokenConfig: {
    pauseShares: true,
    pauseLoot: true,
  },
  governanceConfig: {
    voting: 86400,
    grace: 86400,
    newOffering: 0,
    quorum: 0,
    sponsor: 0,
    minRetention: 66,
  },
  shamanConfig: {
    shamans: ['shamanAddress'],
    permissions: [2],
  },
  sharesConfig: {
    to: ['initialMemberAddress', 'initialMemberAddress'],
    amount: [1000000000000000000, 2000000000000000000],
  },
  lootConfig: {
    to: ['initialLootHolderAddress'],
    amount: [1000000000000000000],
  },
  daoName: 'Cheese DAO',
};

await molochV3AdvSummoner.summonMolochV3(daoSetUpData);
```

## Building

Run `nx run contract-utils:build` to build the library.
