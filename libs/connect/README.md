# `@daohaus/connect`

**DAOhaus Connect** provides a drop-in component for handling wallet connection, and includes additional functionality such as notifying users of unsupported networks, switching networks, and displaying ens data and [Lens profile data](https://www.lens.xyz/) data if the user has one set.

This is used throughout our applications and is designed to be leveraged by the larger DAOhaus community as a portal into the DAOhaus ecosystem.

This library was generated with [Nx](https://nx.dev).

## Getting Started

**Install**

```sh
yarn add @daohaus/connect
```

### DHConnectProvider Context Provider

Start by importing the `DHConnectProvider` component from the `@daohaus/connect` package at your app's root component, such as `main.tsx`:

```jsx
// main.tsx

import { DHConnectProvider } from '@daohaus/daohaus-connect-feature';
```

Once imported you can use it as you would any other Context Provider:

```jsx
// main.tsx

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <DHConnectProvider>
        <App />
      </DHConnectProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
```

After including the `<DHConnectProvider/>` component in your app, you'll be able to access the associated Context throughout your app.

### Connecting to a Wallet

DAOhaus Connect exposes several useful tools that can be used throughout your app. You can access these by importing `useDHConnect` from DAOhas Connect:

```jsx
import { useDHConnect } from '@daohaus/daohaus-connect-feature';
```

Once this is imported, you can destructure out useful tools, such as `connectWallet`:

```jsx
const { connectWallet } = useDHConnect();
```

This can then be passed into any Button with an `onClick` handler:

```jsx
<Button onClick={connectWallet} size="sm" type="button">
  Connect
</Button>
```

There are other useful tools such as interacting with Ceramic that we'll continue to add to the documentation.

## Examples

We use DAOhaus Connect in both our Admin and Summon apps.

## Building

Run `nx build connect` to build the library.
