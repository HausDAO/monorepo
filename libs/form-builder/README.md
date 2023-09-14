# @daohaus/form-builder

Our DAOhaus apps utilize many forms, and we decided to build a Form Builder tool that can be used to scaffold React forms. Form Builder is designed to take in a form configuration and then leverages existing UI elements and other scaffolding to output a fully functional form component.

This library is highly composable and declarative, and utilizes form elements from our UI library. Form Builder pairs well with Tx Builder to reduce much of the complexity involved in creating froms from scratch. We utilize Form Builder and Tx Builder in our apps where users need to input data for a transaction.

#### Related packages

- [**TX-Builder**](https://github.com/HausDAO/monorepo/tree/develop/libs/tx-builder)
- [**Moloch V3 Legos**](https://github.com/HausDAO/monorepo/tree/develop/libs/moloch-v3-legos)
- [**Moloch V3 Fields**](https://github.com/HausDAO/monorepo/tree/develop/libs/moloch-v3-fields)

### [View on NPM](https://www.npmjs.com/package/@daohaus/form-builder)

## Usage

### Installation

```bash
yarn add @daohaus/form-builder
```

**How to add to you application**

```jsx
import { FormBuilder } from '@daohaus/form-builder';
import { MolochFields } from '@daohaus/moloch-v3-fields';
import { BASIC_PROPOSAL_FORMS } from '@daohaus/moloch-v3-legos';

import { TARGET_DAO } from '../targetDao';

export const FormPage = () => {
  return <FormBuilder form={BASIC_PROPOSAL_FORMS.TRANSFER_ERC20} targetNetwork={'0x5'} customFields={MolochFields} />;
};
```

### Examples

**Here is a [tutorial on form and transaction building](https://hackmd.io/@bootleggers/Skfd50_w3/https%3A%2F%2Fhackmd.io%2FW8PN8eO3SDCG0GLE05cQnw).**

### Components

Form Builder leverages form components from our UI library. It's possible to add _custom components_ to a Form Builder instance, but the default inputs and other elements commonly used in a form (such as title, subtitle, description) utilize our DAOhaus component designs.

Since Form Builder is an integrated library, the default input components include our learnings from buiding forms over the years. Here are some of the best practices utilized:

- Inputs use `forwardRef` so that the reference to the element is maintained (when passing from [React Hook Form](https://react-hook-form.com/)) to the input
  - user events need these
- After getting the input, it's styled with styled components
  - `input.tsx` with types at the top
  - `input.styles`
  - `input.stories`
- These all go together into the folder for each form element
- These then move into the wrapped input version, which wraps the input with the FieldWrapper which pulls in quite a lot from RHF (such as the helper text, required asterisks, etc)
- We have a buildable generic that adds the fieldwrapper and primitivewrapper
- info prop receives a string and renders a tooltip
- hasRules is the validation -- every form lego can accept the rules for validation
  - receive RHF validation rules, but can also pass in custom values
- CoreFieldLookup is for the FormBuilder and is the factory for all the supported inputs
  - New official DH inputs can be added to the `CoreFieldLookup`
    - This would pull it into `FieldLego` and ensure that the types match the values
    - data used can only be the props of the mapped component, which helps for typing the fields

### Development Guidelines

- When building a component, need to consider if its a form element that takes in data and if so you'll want to wrap in the `Buildable`
  - Can look at the other wrapped components as examples
    - Get the `useForm` context and registers everything
- Since folks may want just the field we create the wrapped and unwrapped versions
- Composing elements example:
  - CSInput wraps WrappedInput and watches eerything that comes in to this input and creates helper text and slices things up via the setValueAs -- slices up things that are separated by commas and turns into an array of strings
    - Gets props from the WrappedInput and adds 1 thing
  - Can keep wrapping and layering in the functionality
- Can folks overwrite rules if they don't want certain aspects?
  - We need consistent behavior, so it's tricky to overwrite -- the higher level rules take precedent so someone could add to the lower level rules or create their own wrapper (such as doing a slash separated input instead of a comma separated one)
- Like a pyramid -- higher level up is more specific and opinionated that you get
- `WrappedInput` won't be setting its own rules

## Building

Run `nx run form-builder:run` to build the library.
