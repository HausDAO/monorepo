# @daohaus/connect

**DAOhaus Connect** provides a drop-in component for handling wallet connection. It includes additional functionality such as notifying users of unsupported networks, switching networks, and displaying ens data. It also includes a top-of-page navigation component and a layout component to enable rapid application development. It is opinionated and composed with the following libraries:

- [Web3 Modal and Wallet Connect](https://web3modal.com/)
- [React-Router](https://reactrouter.com/en/main)

### [View on NPM](https://www.npmjs.com/package/@daohaus/connect)

## Usage

### Installation

```bash
yarn add @daohaus/connect
```

Note: This will also install @daohaus/connect-context

### Requirements

You will need to provide a Wallet Connect V2 api key as an env variable at NX_WALLET_CONNECT_ID. You can get those from [Wallet Connect](https://docs.walletconnect.com/2.0/api/auth/overview#key-features)

```
NX_WALLET_CONNECT_ID=<some wc api key>
```

### Examples

**How to add to your application**

```jsx
import { DHConnectProvider } from `@daohaus/connect`;

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <DHConnectProvider
        daoId={"some dao id if scoping to a single dao"}
        daoChain={"some dao chain id if scoping to single chain"}>
        <App />
      </DHConnectProvider>
    </BrowserRouter>
  </StrictMode>,
document.getElementById('root')

```

**How to add the DAOHaus layout and nav**

```jsx
import { HausLayout } from '@daohaus/daohaus-connect-feature'

<HausLayout
  pathname={location.pathname}
  navLinks={[{ label: 'Home', href: '/'` }]}
  footer={<Footer />}
>
  <YourApp /> // any other components that are needed
</HausLayout>
```

**How to make a connect button**

```jsx
const { connectWallet } = useConnect();

<Button onClick={connectWallet} sm type="button">
  Connect
</Button>;
```

**How to get connected wallet data**

```jsx
const { isConnected, address } = useConnect();

...

if (!isConnected) {
    return <ConnectWalletButton isSm={isSm} />;
  }

  return <p>{address}</p>;
};
```

## Building

Run `nx run connect:build` to build the library.
