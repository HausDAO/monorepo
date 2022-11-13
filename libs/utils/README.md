# @daohaus/utils

Our **@daohaus/utils** package is a set of helper tools and utilities that are used throughout our libraries and apps. This includes things like our constants, types that are commonly shared across packages, and various utilities and helper functions.

This library was generated with [Nx](https://nx.dev).

## Getting Started

**Install**

```sh
yarn add @daohaus/utils
```

## Overview

Future documentation will go more in depth about each part of the common utilities package, but for now, here is an overview of each folder:

### Constants

**Constants** are a set of constants that are used throughout our libraries and apps that we need to frequently use and that we want to ensure are consistent.

`contracts.ts`

Exports contract addresses for contracts that we commonly use throughout our packages.

`proposals.ts`

This contains our commonly used proposal statuses.

### Types

This folder contains commonly used types such as ones that relate to contracts, keychains, and a React _setter_ pattern.

### Utils

This folder is a collection of utility functions mostly related to data formatting, processing, and encoding.

## Usage

All of the constants, types, and utilities can be imported directly from the package. You don't need to specify that you're importing from `types`, for example.

If you wanted to import the `formatValueTo` function, you would do:

```typescript
import { formatValueTo } from '@daohaus/common-utilities';
```

Similarly, if you wanted to use the `EXPLORER` constant, you can import the `ENDPOINTS` constant object and then reference the `EXPLORER` constant with `ENDPOINTS.EXPLORER`.
