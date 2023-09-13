# @daohaus/profile-data

Profile data provides a simple query to get data related to a single address. This could include an ENS and [Lens Protocol](https://lens.xyz/) profile data.

### [View on NPM](https://www.npmjs.com/package/@daohaus/profile-data)

## Usage

### Installation

```bash
yarn add @daohaus/profile-data
```

### Requirements

This packages uses an rpc endpoint to get the ens name for an address. You should provide an ethereum mainnet rpc url.

### Examples

**How to fetch a profile by address**

```ts
import { getProfileForAddress } from '@daohaus/profile-data';

const profile = await getProfileForAddress('0x0address', 'https://some-rpc-endpoint.com');
```

## Building

Run `nx profile-data:build` to build the library.
