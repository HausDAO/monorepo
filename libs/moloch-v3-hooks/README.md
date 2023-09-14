# @daohaus/moloch-v3-hooks

The moloch-v3-hooks pakage is a collection of react hooks you can use fetch and store data and the use it in components anywhere in your application, like:

- Current dao data (including proposals, members, vaults and dao records)
- Current connected address membership data
- ERC20 data

### [View on NPM](https://www.npmjs.com/package/@daohaus/moloch-v3-hooks)

## Usage

### Installation

```bash
yarn add @daohaus/moloch-v3-hooks
```

### Requirements

If you are trying to query for data on Etheruem Mainnet or Gnosis Chain (and more to come) you will need to provide an api Key from The Graph. Learn to get those [here](https://thegraph.com/docs/en/querying/managing-api-keys/) and [here](https://thegraph.com/studio/apikeys/).

These hooks use [React-Query](https://tanstack.com/query/v3/) so you will need to wrap your app in a QueryClientProvider as seen [here](https://tanstack.com/query/v3/docs/react/examples/react/basic)

```jsx
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <HausThemeProvider>
          <Routes />
        </HausThemeProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
```

### Examples

**How to get DAO data**

```jsx
import { useDaoData, useDaoMember, useDaoProposals } from '@daohaus/moloch-v3-hooks';

const { dao } = useDaoData({
  daoChain: '0x1',
  daoId '0x0someAddress'
});

const { member } = useDaoMember({
  daoChain: '0x1',
  daoId '0x0someAddress',
  memberAddress: '0x0memberAddress',
});

const { proposals } = useDaoProposals({
  daoChain: '0x1',
  daoId '0x0someAddress',
});
```

**How to refetch data**

```jsx
import { useDaoData } from '@daohaus/moloch-v3-hooks';

const { dao, refetch } = useDaoData({
  daoChain: '0x1',
  daoId '0x0someAddress'
});

const someAction = () => {
  refetch();
}
```

**How tto filter, sort and paginate a list of proposals or members**

```jsx
import { useDaoProposals } from '@daohaus/moloch-v3-hooks';

const { proposals, filterProposals, filter, ordering, orderProposals, hasNextPage, fetchNextPage } = useDaoProposals({
  daoChain: '0x1',
  daoId '0x0someAddress',
});


//Filtering
console.log('current filter', filter)
// {}

const updateFilter = { cancelled: true }
filterProposals(updateFilter);
// proposals variable in the hook will be refetched updated


//Sorting
console.log('current ordering', ordering)
// {orderBy: 'createdAt', orderDirection: 'desc'}

const updatedOrdering = {
  orderBy: 'votingStarts',
  orderDiection: 'asc'
}

orderProposals(updatedOrdering)
// proposals variable in the hook will be refetched updated


//Getting the next page of data
console.log('does it have another page?', hasNextPage)
// true

fetchNextPage();
// proposal variable will have the next page of proposals added to it
```

**How to store the current DAO data**
If you store your target dao address and chain id in the CurrentDaoContext all of these hooks will not need yo to pass the daoId and chainId to them.

```jsx
import { CurrentDaoProvider } from '@daohaus/moloch-v3-hooks';

<CurrentDaoProvider
  targetDao={{
    daoChain,
    daoId,
  }}
>
  {children}
</CurrentDaoProvider>;
```

Then in a component you can use this hook:

```jsx
import { UseCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';


const { daoChain, daoId } = useCurrentDao();
const { useDaoData } = useDaoData();

// instead of

const { useDaoData } = useDaoData({daoId: 'someid' daoChain: 'somechainid'});
```

## Building

Run `nx run moloch-v3-hooks:build` to build the library.
