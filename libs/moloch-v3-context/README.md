# `@daohaus/moloch-v3-context`

**DAOhaus moloch-v3-context** provides a drop-in context for react applications that can provide data scoped to a provided dao address with hooks for accessing that data in your application components.

This is used throughout our applications and is designed to be leveraged by the larger DAOhaus community as a portal into the DAOhaus ecosystem.

This library was generated with [Nx](https://nx.dev).

## Getting Started

**Install**

```sh
yarn add @daohaus/moloch-v3-context
```

### Moloch V3 Context Provider

Start by importing the `MolochV3ContextProvider` component from the `@daohaus/moloch-v3-context` package.:

```jsx
// main.tsx

import { MolochV3ContextProvider } from '@daohaus/moloch-v3-context';
```

Once imported you can use it as you would any other Context Provider.

- daoid and daochain are required (dao contracr address and supported network id)
- if you pass a connected user address it will provide data related to that user's membership in the dao, if applicable
- if the dao is on mainnet you will need to pass a graph api key
  - get an api key here [the graph](https://thegraph.com/explorer/subgraph?id=GfHFdFmiSwW1PKtnDhhcxhArwtTjVuMnXxQ5XcETF1bP&view=Overview)

```jsx
export function DaoContainer() {
  const { daochain, daoid } = useParams();
  const { address } = useDHConnect();

  return (
    <MolochV3ContextProvider
      address={address}
      daoid={daoid}
      daochain={daochain}
      graphApiKeys={{ '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'] }}
    >
      <Dao />
    </MolochV3ContextProvider>
  );
}
```

After including the `<DHConnectProvider/>` component in your app, you'll be able to access the associated Context throughout your app.

### Accessing data

moloch-v3-context exposes several useful hooks that can be used throughout your app. Some examples:

```jsx
import {
  useDao,
  useConnectedMember,
  useMembers,
  useProposals,
} from '@daohaus/moloch-v3-context';

const { dao } = useDao();
const { members, membersNextPaging, loadMoreMembers, sortMembers } =
  useMembers();
const { connectedMember } = useConnectedMember();
const {
  isProposalsLoading,
  proposals,
  proposalsNextPaging,
  loadMoreProposals,
  filterProposals,
} = useProposals();
```

## Examples

We use DAOhaus Connect in both our Admin app.

## Building

Run `nx build moloch-v3-context` to build the library.
