# @daohaus/data-fetch-utils

data-fetch-utils provides a subset of utilities primarily utilized within our data libraries. These are key functions required for making API calls to fetch data from a range of sources such as our subgraphs, IPFS, or any other data points we access. This library is not usually used on it's own, but in the context of [@daohaus/moloch-v3-data](https://github.com/HausDAO/monorepo/tree/develop/libs/moloch-v3-data) and [@daohaus/profile-data](https://github.com/HausDAO/monorepo/tree/develop/libs/profile-data).

### [View on NPM](https://www.npmjs.com/package/@daohaus/data-fetch-utils)

## Usage

### Installation

```bash
yarn add @daohaus/data-fetch-utils
```

### Examples

**How to post to IPFS w/ Pinata**

```ts
import { pinataPostJSON } from '@daohaus/keychain-utils';

const res = await pinataPostJSON({
  creds: {
    pinata_api_key,
    pinata_api_secret,
  },
  jsonString: JSON.stringify({ this: 'is fun' }),
});
```

## Building

Run `nx data-fetch-utils:build` to build the library.
