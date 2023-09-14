# @daohaus/moloch-v3-fields

The moloch-v3-fields package is a collection of custom field components used by [@daohaus/form-builder](https://github.com/HausDAO/monorepo/tree/develop/libs/form-builder) when rendering forms.

These fields include some complex functionality above and beyond the basic fields in the [@daohaus/ui](https://github.com/HausDAO/monorepo/tree/develop/libs/ui) package.

### [View on NPM](https://www.npmjs.com/package/@daohaus/moloch-v3-fields)

## Usage

### Installation

```bash
yarn add @daohaus/moloch-v3-fields
```

### Examples

**How to create and add a custom field to your application**

1. Create a new field component

```jsx
import React from 'react';
import { Buildable, WrappedInput, Field } from '@daohaus/ui';

export const TestField = (props: Buildable<Field>) => {
  return (
    <div>
      <WrappedInput {...props} />
      <p>I am some strange new field with a line of text below it!!</p>
    </div>
  );
};
```

2. Add a fieldConfig.ts file to create a new list of available fields and add your custom field to that.

```ts
// fieldConfig.ts
import { MolochFields } from '@daohaus/moloch-v3-fields';
import { FieldLegoBase, FormLegoBase } from '@daohaus/utils';
import { TestField } from '..fieldTest';

export const AppFieldLookup = {
  ...MolochFields,
  strangeField: TestField,
};

export type CustomFieldLego = FieldLegoBase<typeof AppFieldLookup>;
export type CustomFormLego = FormLegoBase<typeof AppFieldLookup>;
```

3. Pass the new field lookup to the Form Builder component

```jsx
import { FormBuilder } from "@daohaus/form-builder";
import { MolochFields } from "@daohaus/moloch-v3-fields";


import { AppFieldLookup } from "./fieldConfig";

export const FormTest = () => {
  return (
    <FormBuilder
<!--       ...other props -->
      customFields={AppFieldLookup}
    />
  );
};

```

4. Use in a field lego with the new type

```ts
import { MolochFieldLego } from '@daohaus/moloch-v3-fields';

const StrangeFieldLego: MolochFieldLego = {
  id: 'anyId',
  type: 'strangeField',
  label: 'Whaaa???',
  placeholder: 'Enter something!',
};
```

## Building

Run `nx run moloch-v3-fields:build` to build the library.
