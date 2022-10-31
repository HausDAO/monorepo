# DAOhaus v3 Monorepo

DAOhaus is a no-code platform for summoning and managing Moloch DAOs. We've worked to reimagine our platform into multiple apps, libraries, and microservices. We're using a monorepo to streamline the development of all of these elements, and we used [Nx](https://nx.dev) to scaffold our monorepo.

If you'd like to join our community, we coordinate on [Discord](https://discord.gg/gWH4vt3tWE).

### Contribution History
This is the 2nd version of this monorepo - several community members contributed to the development of this codebase. Contributions and fuller githistory can be seen in the [original repo](https://github.com/HausDAO/daohaus-monorepo/graphs/contributors).


## Packages

Our monorepo follows the [recommended Nx structure](https://nx.dev/structure/applications-and-libraries) with `apps` and `libs` folders. The `apps` folder contains our core applications, subgraphs, and infrastructure jobs. The `libs` has our utilities, librarires, and infrastructure resources.

### Apps

Our applications in the `apps` folder are our DAO infrastructure and leverage our libraries, subgraphs, and contracts. Currently, we have two categories for these applications:

- **User Interfaces**: These are our applications that are used to interact with DAOs.
  - Hub App
  - Summoner App
- **Deployed Infrastructure**: These are our jobs and subgraphs and are deployed to provide functionality leveraged throughout our other applications.
  - DAO Producer Job
  - v3 Subgraph


| App                                              | Build       | Entry Points                          |
| ------------------------------------------------ | ----------- | ------------------------------------- |
| [Core App](./apps/core-app)                      | vite, ts    | `apps/core-app`                       |
| [Hub App](./apps/hub-app)                        | vite, ts    | `apps/hub-app`                        |
| [Summoner App](./apps/summon-app/)               | vite, ts    | `apps/summon-app`                     |
| [DAO Producer Job](./apps/jobs/dao-producer-job) | webpack, ts | `apps/dao-producer-job`               |
| [v3 Subgraph](./apps/v3-subgraph/)               | webpack, ts | `apps/v3-subgraph, apps/summoner-app` |

### Libs

Our libraries in the `libs` folder are structured to be consumed by our apps as well as used by external developers using our tooling. Currently, we have three categories of libraries:

- **Utility Libraries**: These are libraries that are used to provide foundational utility that can be composed and integrated into applications.
  - Helm Chart Infrastructure Playbook
  - DAO Data SDK
  - Component Library
- **Feature Libraries**: These compose together other libraries such as the _DAO Data SDK_ and the _Component Library_ to create "smart components" that can be integrated into applications.
  - DAOhaus Connect
  - Tx Builder


| Lib                                                      | Entry Point                    |
| -------------------------------------------------------- | ------------------------------ |
| [ABI Utilities](./libs/abi-utilities/)                   | `libs/abi-utilities`           |
| [Contract Utilities](./libs/contract-utilties/)          | `libs/contract-utilties`       |
| [Common Utilities](./libs/common-utilities/)             | `libs/common-utilities`        |
| [DAO Data SDK](./libs/dao-data)                          | `libs/dao-data-sdk`            |
| [Component Library (UI)](./libs/ui)                      | `libs/ui`                      |
| [DAOhaus Connect](./libs/daohaus-connect-feature)        | `libs/daohaus-connect-feature` |
| [Tx Builder](./libs/tx-builder-feature)                  | `libs/tx-builder-feature`      |
| [Helm Chart Infrastructure Playbook](./libs/infra-chart) | `libs/infra-chart`             |

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

# example to run the Hub app:

nx run hub-app:serve

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

Our stack uses [Vite](https://vitejs.dev/) as our React build tool. This generator will scaffold a new React app, such as a frontend app, using `vite` and `styled-components`.

`nx g @nxext/react:application --name <name of app> --pascalCaseFiles true --routing true --style styled-components`

TypeScript is enabled and included by default.

### React Library

Our stack uses [Vite](https://vitejs.dev/) as our React build tool. This generator will scaffold a new React library (such as a component library) with `vite` and `styled-components`.

- `nx g @nxext/react:library --name here --importPath @daohaus/<package_name> --buildable true --publishable true --style styled-components`

TypeScript is enabled and included by default.

Notes: - use the `--publishable` flag for external libraries - use the `--buildable` flag for internal libraries

### TypeScript Library

- `nx g @nrwl/js:lib <lib_name> --importPath @daohaus/<package_name> --publishable true`

Notes: - use the `--publishable` flag for external libraries - use the `--buildable` flag for internal libraries

### Node Application

- `nx g @nrwl/node:application <app_name>`

### Lamdba Application

- `nx generate @ns3/nx-serverless:app <name> --plugin @ns3/nx-serverless/plugin`

### Common Issues

- Sometimes vite applications will have trouble finding dependencies with a depth greater than 1. To resolve this create a custom vite config like the one mentioned in [this](https://github.com/aleclarson/vite-tsconfig-paths/issues/12#issuecomment-1081160667) issue, and update the build and serve commands in the project.json to point to the new vite config path. Now your issues should be resolved.
