# @daohaus/tx-builder

This feature allows your React application to easily make transactions with all the JavaScript app lifecycle functions baked-in to trigger error and success messages, along with other cool features. Transactions are at the core of our platform, so we designed this library to provide helper utilities for this purpose.

The core element is a React Context that bundles together generic transaction calls with subgraph polling within the function. This provides lifecycle methods that we can use to control UI based on synchronized events from within the React component.

The package uses [Viem](https://viem.sh/).

#### Related packages

- [**Moloch V3 Legos**](https://github.com/HausDAO/monorepo/tree/develop/libs/moloch-v3-legos)
- [**Form-Builder**](https://github.com/HausDAO/monorepo/tree/develop/libs/form-builder)
- [**Moloch V3 Fields**](https://github.com/HausDAO/monorepo/tree/develop/libs/moloch-v3-fields)

### [View on NPM](https://www.npmjs.com/package/@daohaus/tx-builder)

## Usage

### Installation

```bash
yarn add @daohaus/tx-builder
```

### Requirements

**Graph API Keys**
If you are trying to query for data on Etheruem Mainnet or Gnosis Chain (and more to come) you will need to provide an API key from TheGraph. Learn to get those [here](https://thegraph.com/docs/en/querying/managing-api-keys/) and [here](https://thegraph.com/studio/apikeys/).

**RPC endpoints**
This package makes transaction to the blockchain so you will also need to provide RPC endpoints for the chains you are targeting.

**Blockchain Explorer API keys**
This package fetches ABIs in some instances if you are not providing the ABI in the txLego. You can provide those keys from [etherscan](https://docs.etherscan.io/) flavored explorers if needed.

```jsx!
<TXBuilder
  ...
  //all other props
  chainId={'0x1'}
  graphApiKeys={{'0x1': 'some api key'}}
  rpcs={{'0x1': 'some rpc url'}}
  explorerKeys={{'0x1': 'some explorer api key'}}
>
  {children}
</TXBuilder>
```

**How to add to you application**
Tx-builder uses [Viem](https://viem.sh/) and requires you to pass a publicClient as a prop. This example shows a component wrapped in our DHConnectProvider from the [@daohaus/connect](https://github.com/HausDAO/monorepo/tree/develop/libs/connect) package that set up a publicClient upon wallet connection.

```jsx
import { TXBuilder } from '@daohaus/tx-builder';

export const SomePage = () => {
  const { publicClient } = useDHConnect();

  return (
    <TXBuilder publicClient={publicClient} chainId={'0x1'} daoId={'0xsomedaoaddress'} safeId={'0x0somedaosafeaddress'}>
      {children}
    </TXBuilder>
  );
};
```

| Prop Name      |                                                                                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| chainId        | target network chain id                                                                                                                                                                          |
| daoId          | target dao contract addresss                                                                                                                                                                     |
| safeId         | target dao's main treasury safe contract addresss                                                                                                                                                |
| publicClient   | [viem public client](https://viem.sh/docs/clients/public.html)                                                                                                                                   |
| appState       | object of arbitrary state data passed to the tx-builder                                                                                                                                          |
| txLifeCycleFns | custom functions to be run on tx lifecycle moments - [view here](https://github.com/HausDAO/monorepo/blob/develop/libs/tx-builder/src/utils/lifeCycleFns.ts)                                     |
| localABIs      | custom abis you might want to pass to the tx-builder, these can be added in your [txLego as well](https://hackmd.io/@bootleggers/Skfd50_w3/https%3A%2F%2Fhackmd.io%2F%40bootleggers%2FHJRr1xFv3) |
| rpcs           | list of rpc endpoints by chain id                                                                                                                                                                |
| graphApiKeys   | list of graph api keys by chain id (required for mainnet and gnosis chain)                                                                                                                       |
| explorerKeys   | list of etherscan explorer keys by chain id                                                                                                                                                      |

### Examples

TODO: link to these when the new docs app is ready.

**Here is a [tutorial on form and transaction building]().**

[Here are some examples]( of contract and transaction legos used in tx-builder.

**How to fire a transaction**

Tx Builder exposes several handy functions that can be used throughout your app. These can be accessed by importing `useTxBuilder` from Tx Builder:

```jsx
// Anywhere in your app

import { useTxBuilder } from '@daohaus/tx-builder-feature';

...

const { fireTransaction } = useTxBuilder();

...

  fireTransaction({
    tx: ACTION_TX.SOME_TX_LEGO,
    lifeCycleFns:{
      onTxSuccess: () => {
        console.log('do something on success');
      },
    };

```

For a detailed example, refer to the `CancelProposal.tsx` our [Admin App](https://github.com/HausDAO/monorepo/blob/develop/apps/admin/src/components/CancelProposal.tsx).

## Building

Run `nx tx-builder:build` to build the library.
