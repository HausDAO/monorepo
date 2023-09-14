# Contributing

Thank you for considering contributing to the DAOHaus Protocol. We welcome any contributions that can help improve the project, including bug reports, feature requests, and code changes.

## Getting Started

Contributions are made to this repo via Issues and Pull Requests (PRs).

### Issues

- [Monorepo Issues](https://github.com/HausDAO/monorepo/issues)
- [DAO app starter](https://github.com/HausDAO/dao-app-starter-vite/issues)
- Contract repos
  - [Baal Contracts](https://github.com/HausDAO/Baal/issues)
  - [Shamans](https://github.com/HausDAO/baal-shamans/issues)
  - [Baal Tokens](https://github.com/HausDAO/baal-tokens/issues)

Issues should be used to report problems with the library, request a new feature, or to discuss potential changes before a PR is created. When you create a new Issue, a template will be loaded that will guide you through collecting and providing the information we need to investigate.

If you find an issue you want to work on follow the Pull Request instructions!

### Pull Requests

In general, PRs should:

- Address a single concern in the least number of changed lines as possible.
- Include documentation in the repo or on our [docs site](https://docs.daohaus.club/) if applicable.
- Be accompanied by a complete Pull Request template (loaded automatically when a PR is created).

In general, we follow the ["fork-and-pull" Git workflow](https://github.com/susam/gitpr)

1. Fork the repository to your own Github account
2. Clone the project to your machine
3. Create a branch locally with a succinct but descriptive name
4. Commit changes to the branch
5. Push changes to your fork
6. Open a PR in our repository and follow the PR template so that we can efficiently review the changes.

### Local Development

Our monorepos use [Nx](https://nx.dev/) as a build system and for scaffolding. If this your first time using Nx, you'll have to install it globally on your system:
`npm install -g nx`

Here is a basic guide. Each package README (and `project.json`) will have more details about commands within each package.

#### Clone and install

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

#### Set up .env

```bash
cp .env.sample .env
```

Rivet is the default RPC - Get a free Rivet key [here](https://rivet.cloud/)

```yaml
NX_RIVET_KEY
```

You can also use Alchemy API keys for Optimism, Arbitrum or Polygon

```yaml
NX_OPTIMISM_ALCHEMY_KEY
NX_ARBITRUM_ALCHEMY_KEY
NX_POLYGONPOS_ALCHEMY_KEY
```

Proposal details uses etherscan explorer APIs to fetch ABIs. Add a key for any chain you are supporting. Get an Etherscan API key [here](https://etherscan.io/apis)

```yaml
NX_ETHERSCAN_KEY
NX_ARBISCAN_KEY
NX_GNOSISSCAN_KEY
NX_POLYGONSCAN_KEY
NX_OPTIMISMSCAN_KEY
```

If developing for Mainnet or Gnosis Chain you can get an API key [here](https://thegraph.com/explorer/subgraph?id=GfHFdFmiSwW1PKtnDhhcxhArwtTjVuMnXxQ5XcETF1bP&view=Overview). Ignore this one if not worried about mainnet or gnosis chain yet.

```yaml
NX_GRAPH_API_KEY_MAINNET
```

#### Run the apps

Once cloned and everything is installed, you'll be able to run each package! Package-level commands are run with `nx run` instead of `yarn` -- this may be new if you're used to working in a different monorepo structure. Each package has similar command structure, but some packages have additional commands.

The package-level commands can be found in each package `project.json`.

```bash

# run a specific package locally (usually on localhost:3000)
# such as the component library or frontend applications

nx run app-name:serve

# example to run the Admin app:

nx run admin:serve

# lint a specific package

nx run app-name:lint

# example to lint the Hub app:

nx run hub-app:lint

# build a specific package:

nx run app-name:build

# example to build the Summon app:

nx run summon:build
```

## Getting Help

Join us in the [DAOHaus Discord](https://discord.com/invite/3drjHWWcRa) and post your question #support channel.
