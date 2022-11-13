import { LOCAL_ABI } from '@daohaus/abis';
import {
  CONTRACT_KEYCHAINS,
  NestedArray,
  POSTER_TAGS,
  TABULA_TAGS,
  ENCODED_0X0_DATA,
  TXLego,
  ValidArgType,
  TXLegoBase,
} from '@daohaus/utils';
import { buildMultiCallTX } from '@daohaus/tx-builder';
import { MaxUint256 } from '@ethersproject/constants';
import { ProposalTypeIds } from '../utils/constants';
import { CONTRACT } from './contracts';

const nestInArray = (arg: ValidArgType | ValidArgType[]): NestedArray => {
  return {
    type: 'nestedArray',
    args: Array.isArray(arg) ? arg : [arg],
  };
};

export const TX: Record<string, TXLego> = {
  POST_SIGNAL: buildMultiCallTX({
    id: 'POST_SIGNAL',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        proposalType: { type: 'static', value: ProposalTypeIds.Signal },
      },
    },
    actions: [
      {
        contract: CONTRACT.POSTER,
        method: 'post',
        args: [
          {
            type: 'JSONDetails',
            jsonSchema: {
              title: `.formValues.title`,
              description: `.formValues.description`,
              contentURI: `.formValues.link`,
              contentURIType: { type: 'static', value: 'url' },
              proposalType: { type: 'static', value: ProposalTypeIds.Signal },
            },
          },
          { type: 'static', value: POSTER_TAGS.signalProposal },
        ],
      },
    ],
  }),
  APPROVE_TOKEN: {
    id: 'APPROVE_TOKEN',
    contract: CONTRACT.ERC_20,
    method: 'approve',
    args: [
      { type: 'singleton', keychain: CONTRACT_KEYCHAINS.TRIBUTE_MINION },
      { type: 'static', value: MaxUint256 },
    ],
  },
  ISSUE: buildMultiCallTX({
    id: 'ISSUE',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        proposalType: {
          type: 'static',
          value: ProposalTypeIds.IssueSharesLoot,
        },
      },
    },
    actions: [
      {
        contract: CONTRACT.CURRENT_DAO,
        method: 'mintShares',
        args: [
          nestInArray('.formValues.recipient'),
          nestInArray('.formValues.sharesRequested'),
        ],
      },
      {
        contract: CONTRACT.CURRENT_DAO,
        method: 'mintLoot',
        args: [
          nestInArray('.formValues.recipient'),
          nestInArray('.formValues.lootRequested'),
        ],
      },
    ],
  }),
  ADD_SHAMAN: buildMultiCallTX({
    id: 'ADD_SHAMAN',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        proposalType: { type: 'static', value: ProposalTypeIds.AddShaman },
      },
    },
    actions: [
      {
        contract: CONTRACT.CURRENT_DAO,
        method: 'setShamans',
        args: [
          nestInArray('.formValues.shamanAddress'),
          nestInArray('.formValues.shamanPermission'),
        ],
      },
    ],
  }),
  ISSUE_ERC20: buildMultiCallTX({
    id: 'ISSUE_ERC20',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        proposalType: {
          type: 'static',
          value: ProposalTypeIds.TransferErc20,
        },
      },
    },
    actions: [
      {
        contract: CONTRACT.ERC_20_FUNDING,
        method: 'transfer',
        args: ['.formValues.recipient', '.formValues.paymentTokenAmt'],
      },
    ],
  }),
  ISSUE_NETWORK_TOKEN: buildMultiCallTX({
    id: 'ISSUE_NETWORK_TOKEN',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        proposalType: {
          type: 'static',
          value: ProposalTypeIds.TransferNetworkToken,
        },
      },
    },
    actions: [
      {
        contract: {
          type: 'static',
          contractName: 'NETWORK',
          abi: LOCAL_ABI.ERC20,
          targetAddress: '.formValues.recipient',
        },
        method: 'noMethod',
        args: [],
        value: '.formValues.paymentAmount',
        data: {
          type: 'static',
          value: ENCODED_0X0_DATA,
        },
      },
    ],
  }),
  UPDATE_METADATA_SETTINGS: {
    id: 'UPDATE_METADATA_SETTINGS',
    contract: CONTRACT.POSTER,
    method: 'post',
    args: [
      {
        type: 'JSONDetails',
        jsonSchema: {
          daoId: '.daoId',
          name: '.formValues.name',
          description: '.formValues.description',
          longDescription: '.formValues.long_description',
          avatarImg: '.formValues.icon',
          tags: '.formValues.tags',
          links: {
            type: 'nestedArray',
            args: [
              {
                type: 'JSONDetails',
                jsonSchema: {
                  url: '.formValues.discord',
                  label: { type: 'static', value: 'Discord' },
                },
              },
              {
                type: 'JSONDetails',
                jsonSchema: {
                  url: '.formValues.github',
                  label: { type: 'static', value: 'Github' },
                },
              },
              {
                type: 'JSONDetails',
                jsonSchema: {
                  url: '.formValues.blog',
                  label: { type: 'static', value: 'Blog' },
                },
              },
              {
                type: 'JSONDetails',
                jsonSchema: {
                  url: '.formValues.telegram',
                  label: { type: 'static', value: 'Telegram' },
                },
              },
              {
                type: 'JSONDetails',
                jsonSchema: {
                  url: '.formValues.twitter',
                  label: { type: 'static', value: 'Twitter' },
                },
              },
              {
                type: 'JSONDetails',
                jsonSchema: {
                  url: '.formValues.web',
                  label: { type: 'static', value: 'Web' },
                },
              },
              {
                type: 'JSONDetails',
                jsonSchema: {
                  url: '.formValues.custom1',
                  label: '.formValues.custom1Label',
                },
              },
              {
                type: 'JSONDetails',
                jsonSchema: {
                  url: '.formValues.custom2',
                  label: '.formValues.custom2Label',
                },
              },
              {
                type: 'JSONDetails',
                jsonSchema: {
                  url: '.formValues.custom3',
                  label: '.formValues.custom3Label',
                },
              },
            ],
          },
        },
      },
      { type: 'static', value: POSTER_TAGS.daoProfileUpdate },
    ],
  },
  UPDATE_GOV_SETTINGS: buildMultiCallTX({
    id: 'UPDATE_GOV_SETTINGS',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        proposalType: {
          type: 'static',
          value: ProposalTypeIds.UpdateGovSettings,
        },
      },
    },
    actions: [
      {
        contract: CONTRACT.CURRENT_DAO,
        method: 'setGovernanceConfig',
        args: [
          {
            type: 'argEncode',
            args: [
              '.formValues.votingPeriodInSeconds',
              '.formValues.gracePeriodInSeconds',
              '.formValues.newOffering',
              '.formValues.quorum',
              '.formValues.sponsorThreshold',
              '.formValues.minRetention',
            ],
            solidityTypes: [
              'uint32',
              'uint32',
              'uint256',
              'uint256',
              'uint256',
              'uint256',
            ],
          },
        ],
      },
    ],
  }),
  TOKEN_SETTINGS: buildMultiCallTX({
    id: 'TOKEN_SETTINGS',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        vTokenTransferable: '.formValues.vStake',
        nvTokenTransferable: '.formValues.nvStake',
        proposalType: {
          type: 'static',
          value: ProposalTypeIds.UpdateTokenSettings,
        },
      },
    },
    actions: [
      {
        contract: CONTRACT.CURRENT_DAO,
        method: 'setAdminConfig',
        args: ['.formValues.vStake', '.formValues.nvStake'],
      },
    ],
  }),
  TOKENS_FOR_SHARES: {
    id: 'TOKENS_FOR_SHARES',
    contract: CONTRACT.TRIBUTE_MINION,
    method: 'submitTributeProposal',
    args: [
      '.daoId',
      '.formValues.tokenAddress',
      '.formValues.tokenAmount',
      '.formValues.sharesRequested',
      '.formValues.lootRequested',
      {
        type: 'proposalExpiry',
        search: '.formValues.proposalExpiry',
        fallback: 0,
      },
      {
        type: 'static',
        value: '0',
      },
      {
        type: 'JSONDetails',
        jsonSchema: {
          title: '.formValues.title',
          description: '.formValues.description',
          contentURI: `.formValues.link`,
          contentURIType: { type: 'static', value: 'url' },
          proposalType: {
            type: 'static',
            value: ProposalTypeIds.TokensForShares,
          },
        },
      },
    ],
  },
  GUILDKICK: buildMultiCallTX({
    id: 'GUILDKICK',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        link: '.formValues.link',
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        proposalType: { type: 'static', value: ProposalTypeIds.GuildKick },
      },
    },
    actions: [
      {
        contract: CONTRACT.CURRENT_DAO,
        method: 'mintLoot',
        args: [
          {
            type: 'nestedArray',
            args: ['.formValues.memberAddress'],
          },
          {
            type: 'nestedArray',
            args: ['.formValues.memberShares'],
          },
        ],
      },
      {
        contract: CONTRACT.CURRENT_DAO,
        method: 'burnShares',
        args: [
          {
            type: 'nestedArray',
            args: ['.formValues.memberAddress'],
          },
          {
            type: 'nestedArray',
            args: ['.formValues.memberShares'],
          },
        ],
      },
    ],
  }),
  MANAGE_DELEGATE: {
    id: 'MANAGE_DELEGATE',
    contract: CONTRACT.SHARES_ERC20,
    method: 'delegate',
    args: ['.formValues.delegatingTo'],
  },
  RAGEQUIT: {
    id: 'RAGEQUIT',
    contract: CONTRACT.CURRENT_DAO,
    method: 'ragequit',
    args: [
      '.formValues.to',
      '.formValues.sharesToBurn',
      '.formValues.lootToBurn',
      '.formValues.tokens',
    ],
  },
  WALLETCONNECT: buildMultiCallTX({
    id: 'WALLETCONNECT',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        link: '.formValues.link',
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        proposalType: { type: 'static', value: ProposalTypeIds.WalletConnect },
      },
    },
    actions: [
      {
        contract: {
          type: 'static',
          contractName: 'ACE',
          abi: [],
          targetAddress: '.formValues.txTo',
        },
        args: [],
        method: 'noMethod',
        value: '.formValues.txValue',
        data: '.formValues.txData',
        operations: '.formValues.txOperation',
      },
    ],
  }),
};

export const TABULA_TX: Record<string, TXLego> = {
  CREATE_PUBLICATION: buildMultiCallTX({
    id: 'CREATE_PUBLICATION',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        proposalType: { type: 'static', value: 'Create Publication Proposal' },
      },
    },
    actions: [
      {
        contract: CONTRACT.POSTER,
        method: 'post',
        args: [
          {
            type: 'JSONDetails',
            jsonSchema: {
              action: { type: 'static', value: TABULA_TAGS.PUB_ACTION },
              title: '.formValues.pubName',
              tags: '.formValues.tags',
              description: '.formValues.pubDescription',
              image: '.formValues.pubImage',
            },
          },
          { type: 'static', value: TABULA_TAGS.PUBLICATION },
        ],
      },
    ],
  }),
  CREATE_ARTICLE: buildMultiCallTX({
    id: 'CREATE_ARTICLE',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        proposalType: { type: 'static', value: 'Create Article Proposal' },
      },
    },
    actions: [
      {
        contract: CONTRACT.POSTER,
        method: 'post',
        args: [
          {
            type: 'JSONDetails',
            jsonSchema: {
              action: { type: 'static', value: TABULA_TAGS.ARTICLE_ACTION },
              publicationId: '.formValues.pubId',
              article: { type: 'ipfsPinata', content: '.formValues.article' },
              title: '.formValues.articleTitle',
            },
          },
          { type: 'static', value: TABULA_TAGS.PUBLICATION },
        ],
      },
    ],
  }),
};

export const ACTION_TX: Record<string, TXLegoBase> = {
  SPONSOR: {
    id: 'SPONSOR',
    contract: CONTRACT.CURRENT_DAO,
    method: 'sponsorProposal',
  },
  VOTE: {
    id: 'VOTE',
    contract: CONTRACT.CURRENT_DAO,
    method: 'submitVote',
  },
  PROCESS: {
    id: 'PROCESS',
    contract: CONTRACT.CURRENT_DAO,
    method: 'processProposal',
  },
  CANCEL: {
    id: 'CANCEL',
    contract: CONTRACT.CURRENT_DAO,
    method: 'cancelProposal',
  },
};
