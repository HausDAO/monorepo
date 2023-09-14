# @daohaus/abis

**Abis** is a simple package providing quick access to all of the main moloch v3 contract abis.

This library was generated with [Nx](https://nx.dev).

### [View on NPM](https://www.npmjs.com/package/@daohaus/abis)

## Usage

### Installation

```sh
yarn add @daohaus/abis
```

### Examples

**How to get ABI instances**

```ts
import { LOCAL_ABI } from '@daohaus/abis';

const summonerContractAbi = LOCAL_ABI.BAAL_SUMMONER;

console.log(summonerContractAbi);
```

## Building

Run `nx run abis:build` to build the library.
