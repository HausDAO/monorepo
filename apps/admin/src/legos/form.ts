import { SUMMON_COPY } from '../data/copy';
import { CustomFormLego } from './config';
import { FIELD } from './fields';
import { TABULA_TX, TX } from './tx';

export const getFormLegoById = (
  id: CustomFormLego['id']
): CustomFormLego | undefined => {
  const allForms = { ...PROPOSAL_FORMS, ...COMMON_FORMS };
  const formKey = Object.keys(allForms).find((key) => {
    return allForms[key].id === id;
  });
  if (!formKey) return;
  return allForms[formKey];
};

// Proposal settings fields (e.g. proposal expiry, proposal offering)
const PROPOSAL_SETTINGS_FIELDS = [FIELD.PROPOSAL_EXPIRY, FIELD.PROP_OFFERING];

/*
Quick Reference for forms

PROPOSAL_FORMS KEYS
- SHARE_SWAP
- SIGNAL
- ISSUE
- ADD_SHAMAN
- TRANSFER_ERC20
- TRANSFER_NETWORK_TOKEN
- UPDATE_GOV_SETTINGS
- TOKEN_SETTINGS
- TOKENS_FOR_SHARES
- GUILDKICK
- CREATE_PUBLICATION
- CREATE_ARTICLE

COMMON_FORMS KEYS
- METADATA_SETTINGS
- UPDATE_SHAMAN
*/

export const PROPOSAL_FORMS: Record<string, CustomFormLego> = {
  SIGNAL: {
    id: 'SIGNAL',
    title: 'Signal Form',
    subtitle: 'Signal Proposal',
    description: 'Ratify on-chain using a DAO proposal.',
    requiredFields: { title: true, description: true },
    log: true,
    tx: TX.POST_SIGNAL,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  ISSUE: {
    id: 'ISSUE',
    title: 'Request DAO Tokens',
    subtitle: 'Token Proposal',
    log: true,
    description: 'Request membership or increased stake in the DAO.',
    tx: TX.ISSUE,
    requiredFields: {
      title: true,
      description: true,
      sharesRequested: true,
      lootRequested: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        expectType: 'ethAddress',
        placeholder: '0x...',
      },
      {
        ...FIELD.TO_WEI,
        label: 'Voting Token Requested',
        id: 'sharesRequested',
      },
      {
        ...FIELD.TO_WEI,
        label: 'Non-Voting Token Requested',
        id: 'lootRequested',
      },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  ADD_SHAMAN: {
    id: 'ADD_SHAMAN',
    title: 'Add a Shaman',
    description: 'Learn more about Shamans in our documentation.',
    subtitle: 'Add Shaman Proposal',
    requiredFields: {
      title: true,
      description: true,
      shamanAddress: true,
      shamanPermission: true,
    },
    tx: TX.ADD_SHAMAN,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      FIELD.SHAMAN_ADDRESS,
      FIELD.SHAMAN_PERMISSION,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  TRANSFER_ERC20: {
    id: 'TRANSFER_ERC20',
    title: 'Request ERC-20',
    subtitle: 'Funding Proposal',
    description:
      'Create a proposal to request ERC-20 tokens from the DAO treasury',
    log: true,
    tx: TX.ISSUE_ERC20,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_TOKEN,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  TRANSFER_ERC20_SIDECAR: {
    id: 'TRANSFER_ERC20_SIDECAR',
    title: 'Transfer ERC-20',
    subtitle: 'Transfer Proposal',
    description:
      'Create a proposal to transfer ERC-20 tokens from the DAO safe',
    log: true,
    tx: TX.ISSUE_ERC20_SIDECAR,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      FIELD.SAFE_SELECT,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_TOKEN,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  TRANSFER_NETWORK_TOKEN: {
    id: 'TRANSFER_NETWORK_TOKEN',
    title: 'Reqest Network Token',
    subtitle: 'Funding Proposal',
    description:
      "Create a proposal to request funding from the DAO treasury in the network's native token",
    log: true,
    tx: TX.ISSUE_NETWORK_TOKEN,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_NATIVE_TOKEN,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  UPDATE_GOV_SETTINGS: {
    id: 'UPDATE_GOV_SETTINGS',
    title: 'Update Governance Settings',
    subtitle: 'Governance Setting Proposal',
    log: true,
    description: 'Learn more about Governance Settings in our documentation.',
    tx: TX.UPDATE_GOV_SETTINGS,
    requiredFields: {
      title: true,
      description: true,
      votingPeriod: true,
      gracePeriod: true,
      quorum: true,
      minRetention: true,
      sponsorThreshold: true,
      newOffering: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'timing',
        type: 'formSegment',
        title: 'Proposal Timing',
        description: 'Update your timing for Voting and Grace periods.',
        fields: [
          {
            id: 'timingSplit',
            type: 'splitColumn',
            rows: [
              {
                rowId: 'timingRows',
                left: {
                  id: 'votingPeriod',
                  type: 'timePicker',
                  label: 'Voting Period',
                  info: SUMMON_COPY.VOTING_PERIOD,
                },
                right: {
                  id: 'gracePeriod',
                  type: 'timePicker',
                  label: 'Grace Period',
                  info: SUMMON_COPY.GRACE_PERIOD,
                },
              },
            ],
          },
        ],
      },
      {
        id: 'advanced',
        type: 'formSegment',
        title: 'Advanced Governance',
        description: 'Modify some advanced governance features.',
        fields: [
          {
            id: 'advancedSplit',
            type: 'splitColumn',
            rows: [
              {
                rowId: 'row1',
                left: {
                  id: 'quorum',
                  type: 'input',
                  expectType: 'percent',
                  label: 'Quorum %',
                  placeholder: '20',
                  info: SUMMON_COPY.QUORUM,
                },
                right: {
                  id: 'minRetention',
                  type: 'input',
                  label: 'Min Retention',
                  expectType: 'percent',
                  placeholder: '66',
                  info: SUMMON_COPY.MIN_RETENTION,
                },
              },
              {
                rowId: 'row2',
                left: {
                  id: 'sponsorThreshold',
                  type: 'toWeiInput',
                  expectType: 'number',
                  label: 'Sponsor Threshold',
                  placeholder: '1',
                  info: SUMMON_COPY.SPONSOR_THRESHOLD,
                },
                right: {
                  id: 'newOffering',
                  type: 'toWeiInput',
                  label: 'New Offering',
                  expectType: 'number',
                  placeholder: '0',
                  info: SUMMON_COPY.NEW_OFFERING,
                },
              },
            ],
          },
        ],
      },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  TOKEN_SETTINGS: {
    id: 'TOKEN_SETTINGS',
    title: 'Change Token Settings',
    log: true,
    subtitle: 'Token Settings Proposal',
    description: 'Learn more about Token Settings in our documentation.',
    tx: TX.TOKEN_SETTINGS,
    requiredFields: {
      title: true,
      description: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'tokenSettings',
        type: 'formSegment',
        title: 'DAO Tokens',
        description: 'Update Token Transferability',
        fields: [
          {
            id: 'split',
            type: 'splitColumn',
            rows: [
              {
                rowId: 'row1',
                left: {
                  id: 'vStake',
                  type: 'switch',
                  label: 'Voting Token',
                  info: SUMMON_COPY.STAKE_TRANSFER,
                  switches: [
                    {
                      id: 'vStake',
                      fieldLabel: {
                        off: 'Transferable',
                        on: 'Not Transferable',
                      },
                    },
                  ],
                },
                right: {
                  id: 'nvStake',
                  type: 'switch',
                  label: 'Non-Voting Token',
                  info: SUMMON_COPY.NV_STAKE_TRANSFER,
                  switches: [
                    {
                      id: 'nvStake',
                      fieldLabel: {
                        off: 'Transferable',
                        on: 'Not Transferable',
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  TOKENS_FOR_SHARES: {
    id: 'TOKENS_FOR_SHARES',
    title: 'Swap Tokens for Shares',
    description:
      'Request membership or increased stake in the DAO. Any tribute must be available in your wallet when proposal is executed.',
    subtitle: 'Token Proposal',
    tx: TX.TOKENS_FOR_SHARES,
    requiredFields: {
      title: true,
      description: true,
      sharesRequested: true,
      lootRequested: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        ...FIELD.TO_WEI,
        label: 'Voting Token Requested',
        id: 'sharesRequested',
      },
      {
        ...FIELD.TO_WEI,
        label: 'Non-Voting Token Requested',
        id: 'lootRequested',
      },
      FIELD.TRIBUTE,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  GUILDKICK: {
    id: 'GUILDKICK',
    title: 'Guild Kick Proposal',
    subtitle: 'Guild Kick Member',
    description:
      'Propose to exchange a member’s voting token balance with non-voting tokens. If passed, this will mean they can no longer vote on proposals.',
    tx: TX.GUILDKICK,
    requiredFields: {
      title: true,
      memberAddress: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        ...FIELD.APPLICANT,
        id: 'memberAddress',
        label: 'Member',
        // @ts-expect-error: doing object spread, even if the field definition has the property
        daoMemberOnly: true,
      },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  WALLETCONNECT: {
    devtool: true,
    id: 'WALLETCONNECT',
    title: 'WalletConnect Proposal',
    subtitle: 'Use WalletConnect to create a Proposal',
    description: 'Extend DAO Proposals to external contracts',
    tx: TX.WALLETCONNECT,
    requiredFields: {
      title: true,
      walletConnectLink: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      FIELD.WALLETCONNECT_LINKER,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
};

export const TABULA_FORMS: Record<string, CustomFormLego> = {
  CREATE_PUBLICATION: {
    id: 'CREATE_PUBLICATION',
    title: 'Start Publication',
    subtitle: 'Publication Proposal',
    description: 'Start a new DAO publication on Tabula.gg',
    tx: TABULA_TX.CREATE_PUBLICATION,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'pubData',
        type: 'formSegment',
        title: 'Publication Data',
        description: 'Some information about your publication.',
        fields: [
          {
            id: 'pubName',
            type: 'input',
            label: 'Publication Name',
            placeholder: 'Name',
          },
          {
            id: 'tags',
            type: 'csInput',
            label: 'Publication Name',
            placeholder: 'comma, separated, tags',
            itemNoun: {
              singular: 'tag',
              plural: 'tags',
            },
          },
          {
            id: 'pubDescription',
            type: 'textarea',
            label: 'Publication Description',
            placeholder: 'Description',
          },
          {
            id: 'pubImage',
            type: 'input',
            label: 'Publication Image',
            placeholder: 'Image URL',
            expectType: 'url',
          },
        ],
      },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  CREATE_ARTICLE: {
    id: 'CREATE_ARTICLE',
    title: 'Write an Article',
    subtitle: 'Tabula Article Proposal',
    description: 'Write an article on Tabula.gg',
    log: true,
    tx: TABULA_TX.CREATE_ARTICLE,
    requiredFields: {
      title: true,
      description: true,
      articleTitle: true,
      fakeMD: true,
      pub_id: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'pubData',
        type: 'formSegment',
        title: 'Publication Data',
        description: 'Some information about your publication.',
        fields: [
          {
            id: 'articleTitle',
            type: 'input',
            label: 'Article Title',
            placeholder: "ex. 10 Signs You're a Real Champ",
          },
          // @ts-expect-error: cannot resolve nested custom field types
          FIELD.FAKE_MD,
        ],
      },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
};

export const COMMON_FORMS: Record<string, CustomFormLego> = {
  METADATA_SETTINGS: {
    id: 'METADATA_SETTINGS',
    title: 'Update Metadata Settings',
    subtitle: 'Settings',
    requiredFields: { name: true },
    log: true,
    tx: TX.UPDATE_METADATA_SETTINGS,
    fields: [
      FIELD.NAME,
      FIELD.DESCRIPTION,
      {
        ...FIELD.DESCRIPTION,
        id: 'long_description',
        label: 'Long Description',
      },
      { ...FIELD.LINK, id: 'icon', label: 'Icon' },
      {
        id: 'links',
        type: 'formSegment',
        title: 'Add links to important content for your DAO',
        fields: [
          // @ts-expect-error: cannot resolve nested custom field types
          { ...FIELD.LINK, id: 'discord', label: 'Discord' },
          // @ts-expect-error: cannot resolve nested custom field types
          { ...FIELD.METADATA_LINK, id: 'github', label: 'Github' },
          // @ts-expect-error: cannot resolve nested custom field types
          { ...FIELD.METADATA_LINK, id: 'blog', label: 'Blog' },
          // @ts-expect-error: cannot resolve nested custom field types
          { ...FIELD.METADATA_LINK, id: 'telegram', label: 'Telegram' },
          // @ts-expect-error: cannot resolve nested custom field types
          { ...FIELD.METADATA_LINK, id: 'twitter', label: 'Twitter' },
          // @ts-expect-error: cannot resolve nested custom field types
          { ...FIELD.METADATA_LINK, id: 'web', label: 'Website' },
          // @ts-expect-error: cannot resolve nested custom field types
          { ...FIELD.METADATA_LINK, id: 'custom1', label: 'Custom Link 1' },
          // @ts-expect-error: cannot resolve nested custom field types
          { ...FIELD.METADATA_LINK, id: 'custom2', label: 'Custom Link 2' },
          // @ts-expect-error: cannot resolve nested custom field types
          { ...FIELD.METADATA_LINK, id: 'custom3', label: 'Custom Link 3' },
        ],
      },
      FIELD.TAGS,
    ],
  },
  UPDATE_SHAMAN: {
    id: 'UPDATE_SHAMAN',
    title: 'Manage Shaman',
    description: 'Learn more about Shamans in our documentation.',
    subtitle: 'Manange Shaman Proposal',
    requiredFields: {
      title: true,
      description: true,
      shamanAddress: true,
      shamanPermission: true,
    },
    tx: TX.ADD_SHAMAN,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      { ...FIELD.SHAMAN_ADDRESS, disabled: true },
      FIELD.SHAMAN_DELUXE,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  MANAGE_DELEGATE: {
    id: 'MANAGE_DELEGATE',
    fields: [FIELD.DELEGATE],
    requiredFields: {
      delegatingTo: true,
    },
    submitButtonText: 'Update Delegate',
    tx: TX.MANAGE_DELEGATE,
  },
  RAGEQUIT: {
    id: 'RAGEQUIT',
    title: 'Ragequit',
    subtitle: 'Members',
    fields: [
      {
        id: 'tokenAmounts',
        type: 'formSegment',
        title: 'Step 1. Select voting and/or non-voting tokens to ragequit',
        fields: [
          {
            id: 'sharesToBurn',
            // @ts-expect-error: cannot resolve type within formSegment using custom fields sent from the core-app
            type: 'ragequitToken',
          },
          // @ts-expect-error: cannot resolve type within formSegment using custom fields sent from the core-app
          { id: 'lootToBurn', type: 'ragequitToken' },
        ],
      },
      {
        id: 'tokenAddresses',
        type: 'formSegment',
        title:
          'Step 2. Select treasury tokens you want to receive in exchange for your DAO tokens',
        fields: [
          // @ts-expect-error: cannot resolve type within formSegment using custom fields sent from the core-app
          { id: 'tokens', type: 'ragequitTokenList' },
        ],
      },
      {
        id: 'checkRender',
        type: 'checkRender',
        gateLabel: 'Ragequit to different address (optional)',
        components: [
          {
            id: 'to',
            type: 'input',
            label: 'Address to send funds',
            expectType: 'ethAddress',
            placeholder: '0x...',
          },
        ],
      },
    ],
    tx: TX.RAGEQUIT,
  },
  ADD_SAFE: {
    id: 'ADD_SAFE',
    description:
      'Create a new Gnosis Safe and attach to your DAO as a non-ragequittable vault.',
    requiredFields: {
      name: true,
    },
    tx: TX.ADD_SAFE,
    fields: [
      {
        id: 'name',
        type: 'input',
        label: 'Safe Name',
        placeholder: 'Enter name',
      },
    ],
    submitButtonText: 'Create',
  },
};
