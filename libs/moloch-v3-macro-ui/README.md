# @daohaus/moloch-v3-macro-ui

A set of fully functional DAO user interface React components that allow you to rapidly develop complex DAO apps.

- DAO Overview ans settings
- Proposal cards, lists, details and votes
- Member cards, lists and profiles
- Safe/vault cards and lists

### [View on NPM](https://www.npmjs.com/package/@daohaus/moloch-v3-macro-ui)

## Usage

### Installation

```bash
yarn add @daohaus/moloch-v3-macro-ui
```

### Requirements

If your are targeting a DAO on the Etheruem Mainnet or Gnosis Chain (and more to come) you will need to provide an API key from TheGraph. Learn to get those [here](https://thegraph.com/docs/en/querying/managing-api-keys/) and [here](https://thegraph.com/studio/apikeys/).

You will need to wrap the tree of your app with macro components in the <HausThemeProvider /> from @daohaus/ui and the <TXBuilder /> from @daohaus/tx-builder and the CurrentDaoProvider from @daohaus/moloch-v3-hooks

```jsx
// main.tsx
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <DHConnectProvider daoChainId={"0x1"}>
          <HausThemeProvider>
            <Routes />
          </HausThemeProvider>
        </DHConnectProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);

//somePage.tsx
import { useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { CurrentDaoProvider } from "@daohaus/moloch-v3-hooks";

export const LayoutContainer = () => {
  const { publicClient, address } = useDHConnect();

  return (
    <TXBuilder
      publicClient={publicClient}
      chainId={"0x1"}
      daoId={"0x0daoaddress"}
      safeId={'0x0safeaddress'}
    >
      <CurrentDaoProvider
        targetDao={{
          daoChain: "0x1",
          daoId: "0x0daoaddress",
        }}
      >
        <SomeComponentWithMacroUI />
      </CurrentDaoProvider>
    </TXBuilder>
  );
};
```

### Examples

**There are examples of all macro components in our [dao-app-starter repo](https://github.com/HausDAO/dao-app-starter-vite/tree/main)**

**How to display a DAO overview**

```jsx
import { DaoOverview } from '@daohaus/moloch-v3-macro-ui';

export const Dao = () => {
  return <DaoOverview daoChain={'0x0'} daoId={'0x0daoaddress'} />;
};
```

**How to display a proposal list**

```jsx
import { ProposalList } from '@daohaus/moloch-v3-macro-ui';
import { SingleColumnLayout } from '@daohaus/ui';

export const Proposals = () => {
  return (
    <SingleColumnLayout>
      <ProposalList header="Proposals" allowLinks={true} />
    </SingleColumnLayout>
  );
};
```

How to display a members list

```jsx
import { MemberList } from '@daohaus/moloch-v3-macro-ui';
import { SingleColumnLayout } from '@daohaus/ui';

export const Members = () => {
  return (
    <SingleColumnLayout title="Members">
      <MemberList daoChain={'0x1'} daoId={'0x0daoaddress'} />
    </SingleColumnLayout>
  );
};
```

## Building

Run `nx run moloch-v3-macro-ui:build` to build the library.
