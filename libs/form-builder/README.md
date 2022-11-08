# `@daohaus/form-builder`

**DAOhaus form-builder** provides a drop-in component for creating dao proposal and transaction forms in conjuction with the @daohaus/tx-builder package.

This is used throughout our applications and is designed to be leveraged by the larger DAOhaus community as a portal into the DAOhaus ecosystem.

This library was generated with [Nx](https://nx.dev).

## Getting Started

**Install**

```sh
yarn add @daohaus/form-builder
```

### Usage

You'll most commonly be using this within the txbuilder context.

```jsx
// main.tsx

import { TXBuilder } from '@daohaus/tx-builder';
import { FormBuilder } from '@daohaus/form-builder';
```

```jsx
// main.tsx

    <TXBuilder
      provider={"<some provider>"}
      chainId="0x5"
      daoId=")x0"
      safeId="0x0"
      appState={{}}
    >
        <FormBuilder form={FORM.SIGNAL} targetNetwork="0x5" />
    </TXBuilder>
);
```

TODO: Code Lego documentation - Form, TX, Lego

## Examples

We use the Form Builder throughout our Admin app.

## Building

Run `nx build connect` to build the library.
