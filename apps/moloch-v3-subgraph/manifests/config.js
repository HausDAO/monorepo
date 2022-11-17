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
    dataSources: [],
    templates: [],
  },
  optimism: {
    dataSources: [],
    templates: [],
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
        name: 'poster',
        template: 'poster-ds.yaml',
        address: '0x000000000000cd17345801aa8147b8d3950260ff',
        startBlock: 24659969,
      },
      {
        name: 'tributeMinion-v1.0.0',
        template: 'tribute-minion-ds.yaml',
        address: '0x5c17BFBaB751C5ddF1Ff267acF8fF919537F39Cf',
        startBlock: 24660234,
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
    dataSources: [],
    templates: [],
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
        address: '0x1FD666e54a769d7dd945924cbb13Aed2CFeA2953',
        startBlock: 7965684,
      },
      {
        name: 'vaultSummoner',
        template: 'vault-summoner-ds.yaml',
        address: '0xe74F14fe5699deD32ad0Cd50F89d277093ed52E9',
        startBlock: 7965685,
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
