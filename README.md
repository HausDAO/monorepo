# DAOhaus v3 Monorepo

DAOhaus is a platform for summoning and managing Moloch DAOs. We've worked to reimagine our platform into multiple apps, libraries, and microservices. We're using a monorepo to streamline the development of all of these elements, and we used [Nx](https://nx.dev) to scaffold our monorepo.

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
    **v3 Subgraph**

### Libs

Our libraries in the `libs` folder are structured to be consumed by our apps as well as used by external developers using our tooling. Currently, we have three categories of libraries:

- **Utility Libraries**: The utilities packages contain a host of common functions, constants, and helper utilities that are routinely used across our other libraries.
- **Data Libraries**: The data packages wrap our contracts, subgraphs and other data sources. They help with fetching dao data, profile data and writing to contracts.
- **UI Component Library**: The DAOhaus UI package is a comprehensive library, offering a robust set of UI components. You can import and use these to construct your application’s user interface. The package caters particularly to TypeScript app development and can be adapted to any framework.
- **Feature Libraries**: These features are a powerful blend of UI and data elements, crafted with the intention to provide you with robust, ready-to-use components that seamlessly integrate with your applications.

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

- `npx nx generate @nrwl/js:library my-new-lib --publishable --importPath @daohaus/my-new-lib`

Notes: - use the `--publishable` flag for external libraries - use the `--buildable` flag for internal libraries
