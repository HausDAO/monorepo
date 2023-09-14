# @daohaus/moloch-v3-legos

Code Legos are static javascript objects that contain metadata used by Form Builder and Tx-Builder. The metadata is used to render UI elements, create transactions and interact with external smart contracts.

They allow you to create complex transactions and form UI.

## Types of Code Legos

- **[Form Legos](https://github.com/HausDAO/monorepo/blob/develop/libs/moloch-v3-legos/src/form.ts):** Instruct form builder to render forms.
- **[Field Legos](https://github.com/HausDAO/monorepo/blob/develop/libs/moloch-v3-legos/src/fields.ts):** Instruct form builder to render fields inside forms.
- **[Transaction Legos](https://github.com/HausDAO/monorepo/blob/develop/libs/moloch-v3-legos/src/tx.ts):** Provide the transaction schemas & prepare arguments for external smart contract calls.
- **[Contract Legos](https://github.com/HausDAO/monorepo/blob/develop/libs/moloch-v3-legos/src/contracts.ts):** Provide the contract addresses and Application Binary Interfaces (ABIs) required for external smart contract calls.

#### Related packages

- [**TX-Builder**](https://github.com/HausDAO/monorepo/tree/develop/libs/tx-builder)
- [**Form-builder**](https://github.com/HausDAO/monorepo/tree/develop/libs/form-builder)
- [**Moloch V3 Fields**](https://github.com/HausDAO/monorepo/tree/develop/libs/moloch-v3-fields)

### [View on NPM](https://www.npmjs.com/package/@daohaus/moloch-v3-legos)

## Usage

### Installation

```bash
yarn add @daohaus/moloch-v3-legos
```

### Examples

TODO: Link into new docs app when ready

**Here is a [tutorial on form and transaction building]().**

[**How to make a contract lego**]()

[**How to make a field lego**]()

[**How to make a transaction lego**]()

[**How to make a form lego**]()

## Building

Run `nx run moloch-v3-legos:build` to build the library.
