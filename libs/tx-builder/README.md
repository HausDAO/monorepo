# @daohaus/tx-builder

**@daohaus/tx-builder** is a feature library that provides a React component specifically intended to help users build transactions. Transactions are at the core of our platform, so we designed this library to provide helper utilities for this purpose. This library is an evolution of the patterns utilized in DAOhaus v2.

The core element is that its a React Context that bundles together generic transaction calls with subgraph polling within the function. This provides lifecycle methods that we can use to control UI based on synchronized events from within the React component.

This library was generated with [Nx](https://nx.dev).

## Getting Started

**Install**

```sh
yarn add @daohaus/tx-builder
```

## Usage

Begin by importing the `TXBuilder` component from the `@daohaus/tx-builder-feature` package at a high-level component, such as `App.tsx`, in your app. This doesn't need to be at the root of your app with other Context Providers.

### TxBuilder

```jsx
// App.tsx
import { TXBuilder } from '@daohaus/tx-builder-feature';
```

Once `TXBuilder` is imported, you can wrap your component with it and pass in the connected user's `provider` and `chainId`, which can come in from DAOhaus Connect.

In this example, `TXBuilder` is used in combination with DAOhaus Connect, where the `provider` and `chainId` are coming from the DAOhaus Connect context and are provided as props to `TXBuilder`:

```jsx
// App.tsx
const { provider, chainId } = useHausConnect();

<TXBuilder provider={provider} chainId={chainId}>
  <YourComponents />
</TXBuilder>;
```

`<TXBuilder />` expects a `provider`, `chainId`, and `children` as props.

### useTxBuilder

Tx Builder exposes useful functionality that you can use throughout your app as well. You can access these by importing `useTxBuilder` from Tx Builder:

```jsx
// Anywhere in your app

`import { useTxBuilder } from '@daohaus/tx-builder-feature';`;

const { fireTransaction } = useTxBuilder();
```

You're then able to utilize the `fireTranscation` function which composes the transation calls and subgraph polling. For a more detailed example, look to the `SummonerForm.tsx` in our [Summon App](../../apps/summon-app/).

## Examples

`TXBuilder` is used in our Admin App. We'll be adding more examples to our documentation as we go!
