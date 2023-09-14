# @daohaus/moloch-v3-data

The `moloch-v3-data` package was developed to encapsulate our subgraphs, empowering you to perform common queries across diverse entities with ease. The library is designed with optimization at its core, transforming the data you receive into a highly user-friendly and easy-to-manipulate format.

The library's functions let you find single entities or query lists, and the list queries are supplemented with several helper tools for paginating, filtering and sorting.

### [View on NPM](https://www.npmjs.com/package/@daohaus/moloch-v3-data)

## Usage

### Installation

```bash
yarn add @daohaus/moloch-v3-data
```

### Requirements

If you are trying to query for data on Etheruem Mainnet or Gnosis Chain (and more to come) you will need to provide an api Key from The Graph. Learn to get those [here](https://thegraph.com/docs/en/querying/managing-api-keys/) and [here](https://thegraph.com/studio/apikeys/).

### Examples

**How to find a single entity by ID.**

```ts
import { findDao } from '@daohaus/moloch-v3-data';

const daoRes = await findDao({
  networkId: '0x1',
  dao: '0x0DaoContractAddress',
  includeTokens: true,
  graphApiKeys: {
    '0x1': 'graphApiKey',
  },
});
```

**How to find a a list of entities.**

```ts
import { listProposals, Proposal_Filter, Proposal_OrderBy } from '@daohaus/moloch-v3-data';

const list = await listProposals({
  networkId: '0x1',
  filter: {
    createdAt_gte: '1656693140',
  },
  ordering: {
    orderBy: 'createdAt',
    orderDirection: 'asc',
  },
  paging: {
    pageSize: '20',
    offset: '1',
  },
  graphApiKeys: {
    '0x1': 'graphApiKey',
  },
});
```

**_Filtering_**
Provide any query the graph supports on fields within the entity you are querying. The Graph docs contain examples on [filtering](https://thegraph.com/docs/en/querying/graphql-api/#filtering).

**_Ordering_**
Provide a field to order by and the order direction (asc or desc).

**_Paging_**
The SDK supports offest and cursor pagination. Cursor pagination overrides the ordering to the ID field. Pagination defaults to returning the first 100 results and provides the query required to get to the next page.

```js
{
  pageSize: '20',
  offset: '0'
}

{
  pageSize: '2000',
  lastId: '0'
}
```

## Building

Run `nx run moloch-v3-data:build` to build the library.

## Generating GraphQL Schema and Types

1. When updates are deployed to the moloch-v3haus V3 subgraphs, a new schema should be generated

   run `nx generate-gql-schema moloch-v3-data` to create a new `src/subgraph/schema.graphql` file

2. When there is a new schema or new query files are added, new types should be generated

   run `nx generate-gql-types moloch-v3-data` to create type files for each query file in `src/subgraph/queries`
