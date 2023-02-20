module.exports.config = {
  mainnet: {
    dataSources: [
      {
        name: 'baalSummoner-v1.0.0',
        template: 'baal-summoner-ds.yaml',
        address: '0xf020a55794DB5e065692F86a0Eb82197850a09b9',
        startBlock: 15796496,
      },
      {
        name: 'baalSummoner-v2.0.0',
        template: 'baal-summoner-2.0.0-ds.yaml',
        address: '0x7e988A9db2F8597735fc68D21060Daed948a3e8C',
        startBlock: 16028392,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 15796496,
      },
      {
        name: 'tributeMinion-v1.0.0',
        template: 'tribute-minion-ds.yaml',
        address: '0x5c17BFBaB751C5ddF1Ff267acF8fF919537F39Cf',
        startBlock: 15796555,
      },
      {
        name: 'vaultSummoner',
        template: 'vault-summoner-ds.yaml',
        address: '0x594E630efbe8dbd810c168e3878817a4094bB312',
        startBlock: 16028394,
      },
    ],
    templates: [
      {
        name: 'baalTemplate',
        template: 'baal-template.yaml',
      },
      {
        name: 'sharesTemplate',
        template: 'shares-template.yaml',
      },
      {
        name: 'lootTemplate',
        template: 'loot-template.yaml',
      },
    ],
  },
  'arbitrum-one': {
    dataSources: [
      {
        name: 'baalSummoner-v2.0.0',
        template: 'baal-summoner-2.0.0-ds.yaml',
        address: '0xb08Cc8C343cF6dC20d8cf51Fb2D6C436c6390dAa',
        startBlock: 54971296,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 54971296,
      },
      {
        name: 'tributeMinion-v1.0.0',
        template: 'tribute-minion-ds.yaml',
        address: '0x7707964B4C24A6b8b7B747F7507F56818857A7C2',
        startBlock: 54972411,
      },
      {
        name: 'vaultSummoner',
        template: 'vault-summoner-ds.yaml',
        address: '0xC39E8D4DE75c6aC025a0C07dCd8Aeb0728C5DBF1',
        startBlock: 54971346,
      },
    ],
    templates: [
      {
        name: 'baalTemplate',
        template: 'baal-template.yaml',
      },
      {
        name: 'sharesTemplate',
        template: 'shares-template.yaml',
      },
      {
        name: 'lootTemplate',
        template: 'loot-template.yaml',
      },
    ],
  },
  optimism: {
    dataSources: [
      {
        name: 'baalSummoner-v2.0.0',
        template: 'baal-summoner-2.0.0-ds.yaml',
        address: '0x3E0eAdE343Ddc556a6Cf0f858e4f685ba303ce71',
        startBlock: 70002741,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 70002741,
      },
      {
        name: 'tributeMinion-v1.0.0',
        template: 'tribute-minion-ds.yaml',
        address: '0x7707964B4C24A6b8b7B747F7507F56818857A7C2',
        startBlock: 69980091,
      },
      {
        name: 'vaultSummoner',
        template: 'vault-summoner-ds.yaml',
        address: '0xb04111e7b4576164145EF97EB81fd43DA0F2D675',
        startBlock: 70002814,
      },
    ],
    templates: [
      {
        name: 'baalTemplate',
        template: 'baal-template.yaml',
      },
      {
        name: 'sharesTemplate',
        template: 'shares-template.yaml',
      },
      {
        name: 'lootTemplate',
        template: 'loot-template.yaml',
      },
    ],
  },
  xdai: {
    dataSources: [
      {
        name: 'baalSummoner-v1.0.0',
        template: 'baal-summoner-ds.yaml',
        address: '0xf020a55794DB5e065692F86a0Eb82197850a09b9',
        startBlock: 24659969,
      },
      {
        name: 'baalSummoner-v2.0.0',
        template: 'baal-summoner-2.0.0-ds.yaml',
        address: '0x7e988A9db2F8597735fc68D21060Daed948a3e8C',
        startBlock: 25109196,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 24659969,
      },
      {
        name: 'tributeMinion-v1.0.0',
        template: 'tribute-minion-ds.yaml',
        address: '0x5c17BFBaB751C5ddF1Ff267acF8fF919537F39Cf',
        startBlock: 24659969,
      },
      {
        name: 'vaultSummoner',
        template: 'vault-summoner-ds.yaml',
        address: '0x594E630efbe8dbd810c168e3878817a4094bB312',
        startBlock: 25109199,
      },
    ],
    templates: [
      {
        name: 'baalTemplate',
        template: 'baal-template.yaml',
      },
      {
        name: 'sharesTemplate',
        template: 'shares-template.yaml',
      },
      {
        name: 'lootTemplate',
        template: 'loot-template.yaml',
      },
    ],
  },
  gnosis: {
    dataSources: [
      {
        name: 'baalSummoner-v1.0.0',
        template: 'baal-summoner-ds.yaml',
        address: '0xf020a55794DB5e065692F86a0Eb82197850a09b9',
        startBlock: 24659969,
      },
      {
        name: 'baalSummoner-v2.0.0',
        template: 'baal-summoner-2.0.0-ds.yaml',
        address: '0x7e988A9db2F8597735fc68D21060Daed948a3e8C',
        startBlock: 25109196,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 24659969,
      },
      {
        name: 'tributeMinion-v1.0.0',
        template: 'tribute-minion-ds.yaml',
        address: '0x5c17BFBaB751C5ddF1Ff267acF8fF919537F39Cf',
        startBlock: 24659969,
      },
      {
        name: 'vaultSummoner',
        template: 'vault-summoner-ds.yaml',
        address: '0x594E630efbe8dbd810c168e3878817a4094bB312',
        startBlock: 25109199,
      },
    ],
    templates: [
      {
        name: 'baalTemplate',
        template: 'baal-template.yaml',
      },
      {
        name: 'sharesTemplate',
        template: 'shares-template.yaml',
      },
      {
        name: 'lootTemplate',
        template: 'loot-template.yaml',
      },
    ],
  },
  matic: {
    dataSources: [
      {
        name: 'baalSummoner-v2.0.0',
        template: 'baal-summoner-2.0.0-ds.yaml',
        address: '0x7e988A9db2F8597735fc68D21060Daed948a3e8C',
        startBlock: 35941533,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 35941533,
      },
      {
        name: 'tributeMinion-v1.0.0',
        template: 'tribute-minion-ds.yaml',
        address: '0x51498dDdd2A8cdeC82932E08A37eBaF346C38EFd',
        startBlock: 38445036,
      },
      {
        name: 'vaultSummoner',
        template: 'vault-summoner-ds.yaml',
        address: '0x594E630efbe8dbd810c168e3878817a4094bB312',
        startBlock: 35941539,
      },
    ],
    templates: [
      {
        name: 'baalTemplate',
        template: 'baal-template.yaml',
      },
      {
        name: 'sharesTemplate',
        template: 'shares-template.yaml',
      },
      {
        name: 'lootTemplate',
        template: 'loot-template.yaml',
      },
    ],
  },
  goerli: {
    dataSources: [
      {
        name: 'baalSummoner-v1.0.0',
        template: 'baal-summoner-ds.yaml',
        address: '0xf020a55794DB5e065692F86a0Eb82197850a09b9',
        startBlock: 7798375,
      },
      {
        name: 'baalSummoner-v2.0.0',
        template: 'baal-summoner-2.0.0-ds.yaml',
        address: '0x7e988A9db2F8597735fc68D21060Daed948a3e8C',
        startBlock: 8001257,
      },
      {
        name: 'vaultSummoner',
        template: 'vault-summoner-ds.yaml',
        address: '0x594E630efbe8dbd810c168e3878817a4094bB312',
        startBlock: 8001258,
      },
      {
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 7798375,
      },
      {
        name: 'tributeMinion-v1.0.0',
        template: 'tribute-minion-ds.yaml',
        address: '0x5c17BFBaB751C5ddF1Ff267acF8fF919537F39Cf',
        startBlock: 7798495,
      },
    ],
    templates: [
      {
        name: 'baalTemplate',
        template: 'baal-template.yaml',
      },
      {
        name: 'sharesTemplate',
        template: 'shares-template.yaml',
      },
      {
        name: 'lootTemplate',
        template: 'loot-template.yaml',
      },
    ],
  },
};
