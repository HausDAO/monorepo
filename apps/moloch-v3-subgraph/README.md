# DAOhaus v3 Subgraph

The v3 subgraph currently supports goerli. It's deployed here: https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-goerli/graphql

## Local Development

TBD

### Subgraph yaml Generation

`nx run moloch-v3-subgraph:generate-config --network=goerli`
`nx run moloch-v3-subgraph:generate-config --network=xdai`
`nx run moloch-v3-subgraph:generate-config --network=mainnet`
`nx run moloch-v3-subgraph:generate-config --network=optimism`
`nx run moloch-v3-subgraph:generate-config --network=arbitrum-one`
`nx run moloch-v3-subgraph:generate-config --network=matic`

Supported Networks:

- goerli
- gnosis
- mainnet
- optimism
- arbitrum-one
- polygon

### Generate Subgraph Code

To generate subgraph code, run the following command:

`nx run moloch-v3-subgraph:generate-code`

## Deployment

`nx run moloch-v3-subgraph:graph-deploy --name=hausdao/daohaus-v3-goerli --network=goerli`
`nx run moloch-v3-subgraph:graph-deploy --name=hausdao/daohaus-v3-gnosis --network=xdai`
`nx run moloch-v3-subgraph:graph-deploy --name=hausdao/daohaus-v3-optimism --network=optimism`
`nx run moloch-v3-subgraph:graph-deploy --name=hausdao/daohaus-v3-arbitrum --network=arbitrum-one`
`nx run moloch-v3-subgraph:graph-deploy --name=hausdao/daohaus-v3-polygon --network=matic`

### mainnet deployment to studio

`cd apps/moloch-v3-subgraph`
`graph deploy --studio daohaus-v3`

todo: get this nx command running with a version:
`nx run moloch-v3-subgraph:graph-deploy-studio --name=daohaus-v3 --network=mainnet`

_These require installing the graph cli locally and auth tokens for deployment to the hosted service or studio subgraphs_
`npm install -g @graphprotocol/graph-cli`

Supported names:

- `hausdao/daohaus-v3-goerli`
- `hausdao/daohaus-v3-gnosis`
- `hausdao/daohaus-v3-optimism`
- `hausdao/daohaus-v3-arbitrum`
- `hausdao/daohaus-v3-polygon`
- `daohaus-v3`
