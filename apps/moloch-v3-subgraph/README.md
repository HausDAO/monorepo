# DAOhaus v3 Subgraph

## Deployment

Complete steps 1-3 for each network.

These require installing the graph cli locally and auth tokens for deployment to the hosted service or studio subgraphs

`npm install -g @graphprotocol/graph-cli`

`graph auth --studio <DEPLOY KEY>`

### 1. Subgraph yaml Generation

`nx run moloch-v3-subgraph:generate-config --network=goerli`

`nx run moloch-v3-subgraph:generate-config --network=xdai`

`nx run moloch-v3-subgraph:generate-config --network=mainnet`

`nx run moloch-v3-subgraph:generate-config --network=optimism`

`nx run moloch-v3-subgraph:generate-config --network=arbitrum-one`

`nx run moloch-v3-subgraph:generate-config --network=matic`

`nx run moloch-v3-subgraph:generate-config --network=sepolia`

`nx run moloch-v3-subgraph:generate-config --network=base`

### 2. Generate Subgraph Code

To generate subgraph code, run the following command:

`nx run moloch-v3-subgraph:generate-code`

## Deploy

`nx run moloch-v3-subgraph:graph-deploy-studio --name=daohaus-v3 --network=mainnet --semver=<NEW VERSION NUMBER>`

`nx run moloch-v3-subgraph:graph-deploy-studio --name=daohaus-v3-base --network=base --semver=<NEW VERSION NUMBER>`

`nx run moloch-v3-subgraph:graph-deploy-studio --name=daohaus-v3-sepolia-2 --network=sepolia --semver=<NEW VERSION NUMBER>`

`nx run moloch-v3-subgraph:graph-deploy-studio --name=daohaus-v3-polygon --network=matic --semver=<NEW VERSION NUMBER>`

`nx run moloch-v3-subgraph:graph-deploy-studio --name=daohaus-v3-arbitrum --network=arbitrum-one --semver=<NEW VERSION NUMBER>`

`nx run moloch-v3-subgraph:graph-deploy-studio --name=daohaus-v3-optimism --network=optimism --semver=<NEW VERSION NUMBER>`

`nx run moloch-v3-subgraph:graph-deploy-studio --name=daohaus-v3-gnosis --network=xdai --semver=<NEW VERSION NUMBER>`
