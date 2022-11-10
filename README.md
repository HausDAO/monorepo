# DAOhaus v3 Monorepo

DAOhaus is a no-code platform for summoning and managing Moloch DAOs. We've worked to reimagine our platform into multiple apps, libraries, and microservices. We're using a monorepo to streamline the development of all of these elements, and we used [Nx](https://nx.dev) to scaffold our monorepo.

If you'd like to join our community, we coordinate on [Discord](https://discord.gg/gWH4vt3tWE).

### Contribution History

This is the 2nd version of this monorepo - several community members contributed to the development of this codebase. Contributions and fuller githistory can be seen in the [original/deprecated repo](https://github.com/HausDAO/daohaus-monorepo-deprecated/graphs/contributors).

## Packages

Our monorepo follows the [recommended Nx structure](https://nx.dev/structure/applications-and-libraries) with `apps` and `libs` folders. The `apps` folder contains our core applications, subgraphs, and infrastructure jobs. The `libs` has our utilities, librarires, and infrastructure resources.

### Apps

Our applications in the `apps` folder are our DAO infrastructure and leverage our libraries, subgraphs, and contracts. Currently, we have two categories for these applications:

- **User Interfaces**: These are our applications that are used to interact with DAOs.
  - Admin App
  - Summoner App
- **Deployed Infrastructure**: These are our jobs and subgraphs and are deployed to provide functionality leveraged throughout our other applications.
  - v3 Subgraph

| App                                | Build       | Entry Points       |
| ---------------------------------- | ----------- | ------------------ |
| [Admin App](./apps/admin)          | webpack, ts | `apps/admin`       |
| [Summoner App](./apps/summon/)     | webpack, ts | `apps/summon`      |
| [v3 Subgraph](./apps/v3-subgraph/) | webpack, ts | `apps/v3-subgraph` |

### Libs

Our libraries in the `libs` folder are structured to be consumed by our apps as well as used by external developers using our tooling. Currently, we have three categories of libraries:

- **Utility Libraries**: These are libraries that are used to provide foundational utility that can be composed and integrated into applications.
  - Utilities libraries
  - Data reading libraries
  - Date writing libraries (contract function wrappers)
  - Component Library
- **Feature Libraries**: These compose together other libraries such as the _DAO Data SDK_ and the _Component Library_ to create "smart components" that can be integrated into applications.
  - DAOhaus Connect
  - Tx Builder
  - Form Builder
  - React application data context

| Lib                                          | Entry Point               |
| -------------------------------------------- | ------------------------- |
| [ABI Utilities](./libs/abis/)                | `libs/abis`               |
| [Contract Utilities](./libs/contract-utils/) | `libs/contract-utils`     |
| [Common Utilities](./libs/utils/)            | `libs/utils`              |
| [DAO Data SDK](./libs/moloch-v3-data)        | `libs/moloch-v3-data-sdk` |
| [Component Library (UI)](./libs/ui)          | `libs/ui`                 |
| [DAOhaus Connect](./libs/connect)            | `libs/connect`            |
| [Tx Builder](./libs/tx-builder)              | `libs/tx-builder`         |
| [Form Builder](./libs/form-builder)          | `libs/form-builder`       |
| [Reacgt Context](./libs/moloch-v3-context)   | `libs/moloch-v3-context`  |

## Getting Started

Our monorepos use [Nx](https://nx.dev/) as a build system and for scaffolding. If this your first time using Nx, you'll have to install it globally on your system:
`npm install -g nx`

Here is a basic guide. Each package README (and `project.json`) will have more details about commands within each package.

```bash

`git clone git@github.com:HausDAO/daohaus-monorepo.git` or `git@github.com:HausDAO/daohaus-monorepo.git`
# clone the entire monorepo at the top level on the develop branch
`nvm use`
# switch to node 16.16.0
`yarn global add nx`
# download nx globally for running nx commands
`yarn`
# run yarn to install all of the packages and dependencies

```

Once cloned and everything is installed, you'll be able to run each package! Package-level commands are run with `nx run` instead of `yarn` -- this may be new if you're used to working in a different monorepo structure. Each package has similar command structure, but some packages have additional commands.

The package-level commands can be found in each package's `project.json`.

```bash

# run a specific package locally (usually on localhost:3000)
# such as the component library or frontend applications

nx run app-name:serve

# example to run the Admin app:

nx run core-app:serve

# lint a specific package

nx run app-name:lint

# example to lint the Hub app:

nx run hub-app:lint

# build a specific package:

nx run app-name:build

# example to build the Hub app:

nx run hub-app:build

```

## Nx Generators

We've created _generators_ that leverage `nx` with predetermined option flags.

### React App

Our stack uses [Rollup](https://rollupjs.org/guide/en/) as our React build tool. This generator will scaffold a new React app.

`nx g @nrwl/react:app my-new-app`

TypeScript is enabled and included by default.

### React Library

Our stack uses [Rollup](https://rollupjs.org/guide/en/) as our React build tool. This generator will scaffold a new React library (such as a component library).

- `nx g @nrwl/react:lib my-new-lib --publishable --importPath @myorg/my-new-lib`

TypeScript is enabled and included by default.

Notes: - use the `--publishable` flag for external libraries - use the `--buildable` flag for internal libraries

### TypeScript Library

- `npx nx generate @nrwl/js:library my-new-lib --publishable --importPath @daohau/my-new-lib`

Notes: - use the `--publishable` flag for external libraries - use the `--buildable` flag for internal libraries
