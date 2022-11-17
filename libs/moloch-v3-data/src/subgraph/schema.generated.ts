export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: string;
  BigInt: string;
  Bytes: string;
}

export interface BlockChangedFilter {
  number_gte: Scalars['Int'];
}

export interface Block_Height {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
}

export interface Dao {
  __typename?: 'Dao';
  /** count of share or loot holding members */
  activeMemberCount: Scalars['BigInt'];
  /** Indicates if admin shamans can be added to the DAO */
  adminLocked: Scalars['Boolean'];
  /** version of the baal contract and summoner */
  baalVersion: Scalars['String'];
  /** timestamp of the block when the dao was summoned */
  createdAt: Scalars['BigInt'];
  /** address that created the dao */
  createdBy: Scalars['Bytes'];
  /** address delegated to manage the active status of non-ragequittable vaults */
  delegatedVaultManager: Scalars['Bytes'];
  eventTransactions?: Maybe<EventTransaction>;
  /** was Dao summoned by an existing safe or did it create a new safe. */
  existingSafe: Scalars['Boolean'];
  /** was Dao summoned by an existing shares and loot token or did it create new ones. */
  existingSharesAndLoot: Scalars['Boolean'];
  /** Forwarder address */
  forwarder: Scalars['Bytes'];
  /** Indicates if governor shamans can be added to the DAO */
  governorLocked: Scalars['Boolean'];
  /** length in seconds of the current grace period */
  gracePeriod: Scalars['BigInt'];
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** ID of the last sponsored proposal */
  latestSponsoredProposalId: Scalars['BigInt'];
  /** contract address of the loot erc20 token */
  lootAddress: Scalars['Bytes'];
  /** indicates if loot transferability is on/off */
  lootPaused: Scalars['Boolean'];
  /** name of the erc20 loot token */
  lootTokenName?: Maybe<Scalars['String']>;
  /** symbol of the erc20 loot token */
  lootTokenSymbol?: Maybe<Scalars['String']>;
  /** Indicates if manager shamans can be added to the DAO */
  managerLocked: Scalars['Boolean'];
  /** members scoped to this dao */
  members: Array<Member>;
  /** auto-fails a proposal if more than (1- minRetentionPercent) * total shares exit before processing */
  minRetentionPercent: Scalars['BigInt'];
  /** name of the DAO */
  name?: Maybe<Scalars['String']>;
  /** count of proposal submitted */
  proposalCount: Scalars['BigInt'];
  /** amount of network token required as tribute to submit a proposal */
  proposalOffering: Scalars['BigInt'];
  /** proposals scoped to this dao */
  proposals?: Maybe<Array<Proposal>>;
  /** minimum % of shares that must vote yes for it to pass */
  quorumPercent: Scalars['BigInt'];
  /** rage quits scoped to this dao */
  rageQuits?: Maybe<Array<RageQuit>>;
  records?: Maybe<Array<Record>>;
  /** summoning referrer identifier */
  referrer?: Maybe<Scalars['String']>;
  /** contract address of the gnosis safe treasury */
  safeAddress: Scalars['Bytes'];
  /** shaman scoped to this dao */
  shaman?: Maybe<Array<Shaman>>;
  /** name of the erc20 shares token */
  shareTokenName?: Maybe<Scalars['String']>;
  /** symbol of the erc20 shares token */
  shareTokenSymbol?: Maybe<Scalars['String']>;
  /** contract address of the shares erc20 token */
  sharesAddress: Scalars['Bytes'];
  /** indicates if shares transferability is on/off */
  sharesPaused: Scalars['Boolean'];
  /** amount of shares needed to automatically sponsor a proposal */
  sponsorThreshold: Scalars['BigInt'];
  /** total circulating loot tokens */
  totalLoot: Scalars['BigInt'];
  /** total circulating shares tokens */
  totalShares: Scalars['BigInt'];
  /** transaction hash of the dao contract deployment */
  txHash: Scalars['Bytes'];
  vaults: Array<Vault>;
  /** length in seconds of the current voting period */
  votingPeriod: Scalars['BigInt'];
  /** length in seconds of the current voting period and grace period */
  votingPlusGraceDuration: Scalars['BigInt'];
}


export interface DaoMembersArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Member_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Member_Filter>;
}


export interface DaoProposalsArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Proposal_Filter>;
}


export interface DaoRageQuitsArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RageQuit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RageQuit_Filter>;
}


export interface DaoRecordsArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Record_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Record_Filter>;
}


export interface DaoShamanArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Shaman_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Shaman_Filter>;
}


export interface DaoVaultsArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Vault_Filter>;
}

export interface Dao_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  activeMemberCount?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_gt?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_gte?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  activeMemberCount_lt?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_lte?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_not?: InputMaybe<Scalars['BigInt']>;
  activeMemberCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adminLocked?: InputMaybe<Scalars['Boolean']>;
  adminLocked_in?: InputMaybe<Array<Scalars['Boolean']>>;
  adminLocked_not?: InputMaybe<Scalars['Boolean']>;
  adminLocked_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  baalVersion?: InputMaybe<Scalars['String']>;
  baalVersion_contains?: InputMaybe<Scalars['String']>;
  baalVersion_contains_nocase?: InputMaybe<Scalars['String']>;
  baalVersion_ends_with?: InputMaybe<Scalars['String']>;
  baalVersion_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baalVersion_gt?: InputMaybe<Scalars['String']>;
  baalVersion_gte?: InputMaybe<Scalars['String']>;
  baalVersion_in?: InputMaybe<Array<Scalars['String']>>;
  baalVersion_lt?: InputMaybe<Scalars['String']>;
  baalVersion_lte?: InputMaybe<Scalars['String']>;
  baalVersion_not?: InputMaybe<Scalars['String']>;
  baalVersion_not_contains?: InputMaybe<Scalars['String']>;
  baalVersion_not_contains_nocase?: InputMaybe<Scalars['String']>;
  baalVersion_not_ends_with?: InputMaybe<Scalars['String']>;
  baalVersion_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baalVersion_not_in?: InputMaybe<Array<Scalars['String']>>;
  baalVersion_not_starts_with?: InputMaybe<Scalars['String']>;
  baalVersion_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  baalVersion_starts_with?: InputMaybe<Scalars['String']>;
  baalVersion_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdBy?: InputMaybe<Scalars['Bytes']>;
  createdBy_contains?: InputMaybe<Scalars['Bytes']>;
  createdBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdBy_not?: InputMaybe<Scalars['Bytes']>;
  createdBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  createdBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  delegatedVaultManager?: InputMaybe<Scalars['Bytes']>;
  delegatedVaultManager_contains?: InputMaybe<Scalars['Bytes']>;
  delegatedVaultManager_in?: InputMaybe<Array<Scalars['Bytes']>>;
  delegatedVaultManager_not?: InputMaybe<Scalars['Bytes']>;
  delegatedVaultManager_not_contains?: InputMaybe<Scalars['Bytes']>;
  delegatedVaultManager_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  eventTransactions_?: InputMaybe<EventTransaction_Filter>;
  existingSafe?: InputMaybe<Scalars['Boolean']>;
  existingSafe_in?: InputMaybe<Array<Scalars['Boolean']>>;
  existingSafe_not?: InputMaybe<Scalars['Boolean']>;
  existingSafe_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  existingSharesAndLoot?: InputMaybe<Scalars['Boolean']>;
  existingSharesAndLoot_in?: InputMaybe<Array<Scalars['Boolean']>>;
  existingSharesAndLoot_not?: InputMaybe<Scalars['Boolean']>;
  existingSharesAndLoot_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forwarder?: InputMaybe<Scalars['Bytes']>;
  forwarder_contains?: InputMaybe<Scalars['Bytes']>;
  forwarder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  forwarder_not?: InputMaybe<Scalars['Bytes']>;
  forwarder_not_contains?: InputMaybe<Scalars['Bytes']>;
  forwarder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  governorLocked?: InputMaybe<Scalars['Boolean']>;
  governorLocked_in?: InputMaybe<Array<Scalars['Boolean']>>;
  governorLocked_not?: InputMaybe<Scalars['Boolean']>;
  governorLocked_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  gracePeriod?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_gt?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_gte?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gracePeriod_lt?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_lte?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_not?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  latestSponsoredProposalId?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_gt?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_gte?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  latestSponsoredProposalId_lt?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_lte?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_not?: InputMaybe<Scalars['BigInt']>;
  latestSponsoredProposalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lootAddress?: InputMaybe<Scalars['Bytes']>;
  lootAddress_contains?: InputMaybe<Scalars['Bytes']>;
  lootAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lootAddress_not?: InputMaybe<Scalars['Bytes']>;
  lootAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  lootAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lootPaused?: InputMaybe<Scalars['Boolean']>;
  lootPaused_in?: InputMaybe<Array<Scalars['Boolean']>>;
  lootPaused_not?: InputMaybe<Scalars['Boolean']>;
  lootPaused_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  lootTokenName?: InputMaybe<Scalars['String']>;
  lootTokenName_contains?: InputMaybe<Scalars['String']>;
  lootTokenName_contains_nocase?: InputMaybe<Scalars['String']>;
  lootTokenName_ends_with?: InputMaybe<Scalars['String']>;
  lootTokenName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lootTokenName_gt?: InputMaybe<Scalars['String']>;
  lootTokenName_gte?: InputMaybe<Scalars['String']>;
  lootTokenName_in?: InputMaybe<Array<Scalars['String']>>;
  lootTokenName_lt?: InputMaybe<Scalars['String']>;
  lootTokenName_lte?: InputMaybe<Scalars['String']>;
  lootTokenName_not?: InputMaybe<Scalars['String']>;
  lootTokenName_not_contains?: InputMaybe<Scalars['String']>;
  lootTokenName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  lootTokenName_not_ends_with?: InputMaybe<Scalars['String']>;
  lootTokenName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lootTokenName_not_in?: InputMaybe<Array<Scalars['String']>>;
  lootTokenName_not_starts_with?: InputMaybe<Scalars['String']>;
  lootTokenName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lootTokenName_starts_with?: InputMaybe<Scalars['String']>;
  lootTokenName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lootTokenSymbol?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_contains?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_contains_nocase?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_ends_with?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_gt?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_gte?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  lootTokenSymbol_lt?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_lte?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_not?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_not_contains?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  lootTokenSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_starts_with?: InputMaybe<Scalars['String']>;
  lootTokenSymbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  managerLocked?: InputMaybe<Scalars['Boolean']>;
  managerLocked_in?: InputMaybe<Array<Scalars['Boolean']>>;
  managerLocked_not?: InputMaybe<Scalars['Boolean']>;
  managerLocked_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  members?: InputMaybe<Array<Scalars['String']>>;
  members_?: InputMaybe<Member_Filter>;
  members_contains?: InputMaybe<Array<Scalars['String']>>;
  members_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  members_not?: InputMaybe<Array<Scalars['String']>>;
  members_not_contains?: InputMaybe<Array<Scalars['String']>>;
  members_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  minRetentionPercent?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_gt?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_gte?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minRetentionPercent_lt?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_lte?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_not?: InputMaybe<Scalars['BigInt']>;
  minRetentionPercent_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposalCount?: InputMaybe<Scalars['BigInt']>;
  proposalCount_gt?: InputMaybe<Scalars['BigInt']>;
  proposalCount_gte?: InputMaybe<Scalars['BigInt']>;
  proposalCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalCount_lt?: InputMaybe<Scalars['BigInt']>;
  proposalCount_lte?: InputMaybe<Scalars['BigInt']>;
  proposalCount_not?: InputMaybe<Scalars['BigInt']>;
  proposalCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalOffering?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_gt?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_gte?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalOffering_lt?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_lte?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_not?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposals_?: InputMaybe<Proposal_Filter>;
  quorumPercent?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_gt?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_gte?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumPercent_lt?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_lte?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_not?: InputMaybe<Scalars['BigInt']>;
  quorumPercent_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rageQuits_?: InputMaybe<RageQuit_Filter>;
  records_?: InputMaybe<Record_Filter>;
  referrer?: InputMaybe<Scalars['String']>;
  referrer_contains?: InputMaybe<Scalars['String']>;
  referrer_contains_nocase?: InputMaybe<Scalars['String']>;
  referrer_ends_with?: InputMaybe<Scalars['String']>;
  referrer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  referrer_gt?: InputMaybe<Scalars['String']>;
  referrer_gte?: InputMaybe<Scalars['String']>;
  referrer_in?: InputMaybe<Array<Scalars['String']>>;
  referrer_lt?: InputMaybe<Scalars['String']>;
  referrer_lte?: InputMaybe<Scalars['String']>;
  referrer_not?: InputMaybe<Scalars['String']>;
  referrer_not_contains?: InputMaybe<Scalars['String']>;
  referrer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  referrer_not_ends_with?: InputMaybe<Scalars['String']>;
  referrer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  referrer_not_in?: InputMaybe<Array<Scalars['String']>>;
  referrer_not_starts_with?: InputMaybe<Scalars['String']>;
  referrer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referrer_starts_with?: InputMaybe<Scalars['String']>;
  referrer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  safeAddress?: InputMaybe<Scalars['Bytes']>;
  safeAddress_contains?: InputMaybe<Scalars['Bytes']>;
  safeAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  safeAddress_not?: InputMaybe<Scalars['Bytes']>;
  safeAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  safeAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  shaman_?: InputMaybe<Shaman_Filter>;
  shareTokenName?: InputMaybe<Scalars['String']>;
  shareTokenName_contains?: InputMaybe<Scalars['String']>;
  shareTokenName_contains_nocase?: InputMaybe<Scalars['String']>;
  shareTokenName_ends_with?: InputMaybe<Scalars['String']>;
  shareTokenName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenName_gt?: InputMaybe<Scalars['String']>;
  shareTokenName_gte?: InputMaybe<Scalars['String']>;
  shareTokenName_in?: InputMaybe<Array<Scalars['String']>>;
  shareTokenName_lt?: InputMaybe<Scalars['String']>;
  shareTokenName_lte?: InputMaybe<Scalars['String']>;
  shareTokenName_not?: InputMaybe<Scalars['String']>;
  shareTokenName_not_contains?: InputMaybe<Scalars['String']>;
  shareTokenName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  shareTokenName_not_ends_with?: InputMaybe<Scalars['String']>;
  shareTokenName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenName_not_in?: InputMaybe<Array<Scalars['String']>>;
  shareTokenName_not_starts_with?: InputMaybe<Scalars['String']>;
  shareTokenName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenName_starts_with?: InputMaybe<Scalars['String']>;
  shareTokenName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_contains?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_contains_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_ends_with?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_gt?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_gte?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  shareTokenSymbol_lt?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_lte?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_contains?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  shareTokenSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_starts_with?: InputMaybe<Scalars['String']>;
  shareTokenSymbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sharesAddress?: InputMaybe<Scalars['Bytes']>;
  sharesAddress_contains?: InputMaybe<Scalars['Bytes']>;
  sharesAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sharesAddress_not?: InputMaybe<Scalars['Bytes']>;
  sharesAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  sharesAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sharesPaused?: InputMaybe<Scalars['Boolean']>;
  sharesPaused_in?: InputMaybe<Array<Scalars['Boolean']>>;
  sharesPaused_not?: InputMaybe<Scalars['Boolean']>;
  sharesPaused_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  sponsorThreshold?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_gt?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_gte?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sponsorThreshold_lt?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_lte?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_not?: InputMaybe<Scalars['BigInt']>;
  sponsorThreshold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLoot?: InputMaybe<Scalars['BigInt']>;
  totalLoot_gt?: InputMaybe<Scalars['BigInt']>;
  totalLoot_gte?: InputMaybe<Scalars['BigInt']>;
  totalLoot_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLoot_lt?: InputMaybe<Scalars['BigInt']>;
  totalLoot_lte?: InputMaybe<Scalars['BigInt']>;
  totalLoot_not?: InputMaybe<Scalars['BigInt']>;
  totalLoot_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalShares?: InputMaybe<Scalars['BigInt']>;
  totalShares_gt?: InputMaybe<Scalars['BigInt']>;
  totalShares_gte?: InputMaybe<Scalars['BigInt']>;
  totalShares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalShares_lt?: InputMaybe<Scalars['BigInt']>;
  totalShares_lte?: InputMaybe<Scalars['BigInt']>;
  totalShares_not?: InputMaybe<Scalars['BigInt']>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  vaults_?: InputMaybe<Vault_Filter>;
  votingPeriod?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_gt?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_gte?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriod_lt?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_lte?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_not?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPlusGraceDuration?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_gt?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_gte?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPlusGraceDuration_lt?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_lte?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_not?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
}

export type Dao_OrderBy =
  | 'activeMemberCount'
  | 'adminLocked'
  | 'baalVersion'
  | 'createdAt'
  | 'createdBy'
  | 'delegatedVaultManager'
  | 'eventTransactions'
  | 'existingSafe'
  | 'existingSharesAndLoot'
  | 'forwarder'
  | 'governorLocked'
  | 'gracePeriod'
  | 'id'
  | 'latestSponsoredProposalId'
  | 'lootAddress'
  | 'lootPaused'
  | 'lootTokenName'
  | 'lootTokenSymbol'
  | 'managerLocked'
  | 'members'
  | 'minRetentionPercent'
  | 'name'
  | 'proposalCount'
  | 'proposalOffering'
  | 'proposals'
  | 'quorumPercent'
  | 'rageQuits'
  | 'records'
  | 'referrer'
  | 'safeAddress'
  | 'shaman'
  | 'shareTokenName'
  | 'shareTokenSymbol'
  | 'sharesAddress'
  | 'sharesPaused'
  | 'sponsorThreshold'
  | 'totalLoot'
  | 'totalShares'
  | 'txHash'
  | 'vaults'
  | 'votingPeriod'
  | 'votingPlusGraceDuration';

export interface EventTransaction {
  __typename?: 'EventTransaction';
  /** block timestamp of the transaction */
  createdAt: Scalars['BigInt'];
  /** related DAO */
  dao?: Maybe<Dao>;
  daoAddress?: Maybe<Scalars['Bytes']>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
}

export interface EventTransaction_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dao?: InputMaybe<Scalars['String']>;
  daoAddress?: InputMaybe<Scalars['Bytes']>;
  daoAddress_contains?: InputMaybe<Scalars['Bytes']>;
  daoAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  daoAddress_not?: InputMaybe<Scalars['Bytes']>;
  daoAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  daoAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
}

export type EventTransaction_OrderBy =
  | 'createdAt'
  | 'dao'
  | 'daoAddress'
  | 'id';

export interface Member {
  __typename?: 'Member';
  /** block timestamp when the member entity was created (when the address first recieved shares or loot) */
  createdAt: Scalars['BigInt'];
  /** related dao */
  dao: Dao;
  /** members this member is delegating too */
  delegateOf?: Maybe<Array<Member>>;
  /** related votes */
  delegateOfCount: Scalars['BigInt'];
  /** total amount of shares this address votes with (thier own plus delegated shares) */
  delegateShares: Scalars['BigInt'];
  /** address the member is delegating to */
  delegatingTo: Scalars['Bytes'];
  /** subgraph id of member the address is delegating to */
  delegatingToMember?: Maybe<Member>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** the transaction hash when the delegate was last updated */
  lastDelegateUpdateTxHash?: Maybe<Scalars['Bytes']>;
  /** current loot held by the member */
  loot: Scalars['BigInt'];
  /** address of the member */
  memberAddress: Scalars['Bytes'];
  /** current shares held by the member */
  shares: Scalars['BigInt'];
  /** total shares, loot and delegate shares, if 0 the member is inactive */
  sharesLootDelegateShares: Scalars['BigInt'];
  /** transaction where the member was created */
  txHash: Scalars['Bytes'];
  votes?: Maybe<Array<Vote>>;
}


export interface MemberDelegateOfArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Member_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Member_Filter>;
}


export interface MemberVotesArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Vote_Filter>;
}

export interface Member_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dao?: InputMaybe<Scalars['String']>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegateOfCount?: InputMaybe<Scalars['BigInt']>;
  delegateOfCount_gt?: InputMaybe<Scalars['BigInt']>;
  delegateOfCount_gte?: InputMaybe<Scalars['BigInt']>;
  delegateOfCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegateOfCount_lt?: InputMaybe<Scalars['BigInt']>;
  delegateOfCount_lte?: InputMaybe<Scalars['BigInt']>;
  delegateOfCount_not?: InputMaybe<Scalars['BigInt']>;
  delegateOfCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegateOf_?: InputMaybe<Member_Filter>;
  delegateShares?: InputMaybe<Scalars['BigInt']>;
  delegateShares_gt?: InputMaybe<Scalars['BigInt']>;
  delegateShares_gte?: InputMaybe<Scalars['BigInt']>;
  delegateShares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegateShares_lt?: InputMaybe<Scalars['BigInt']>;
  delegateShares_lte?: InputMaybe<Scalars['BigInt']>;
  delegateShares_not?: InputMaybe<Scalars['BigInt']>;
  delegateShares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatingTo?: InputMaybe<Scalars['Bytes']>;
  delegatingToMember?: InputMaybe<Scalars['String']>;
  delegatingToMember_?: InputMaybe<Member_Filter>;
  delegatingToMember_contains?: InputMaybe<Scalars['String']>;
  delegatingToMember_contains_nocase?: InputMaybe<Scalars['String']>;
  delegatingToMember_ends_with?: InputMaybe<Scalars['String']>;
  delegatingToMember_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegatingToMember_gt?: InputMaybe<Scalars['String']>;
  delegatingToMember_gte?: InputMaybe<Scalars['String']>;
  delegatingToMember_in?: InputMaybe<Array<Scalars['String']>>;
  delegatingToMember_lt?: InputMaybe<Scalars['String']>;
  delegatingToMember_lte?: InputMaybe<Scalars['String']>;
  delegatingToMember_not?: InputMaybe<Scalars['String']>;
  delegatingToMember_not_contains?: InputMaybe<Scalars['String']>;
  delegatingToMember_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegatingToMember_not_ends_with?: InputMaybe<Scalars['String']>;
  delegatingToMember_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegatingToMember_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegatingToMember_not_starts_with?: InputMaybe<Scalars['String']>;
  delegatingToMember_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegatingToMember_starts_with?: InputMaybe<Scalars['String']>;
  delegatingToMember_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegatingTo_contains?: InputMaybe<Scalars['Bytes']>;
  delegatingTo_in?: InputMaybe<Array<Scalars['Bytes']>>;
  delegatingTo_not?: InputMaybe<Scalars['Bytes']>;
  delegatingTo_not_contains?: InputMaybe<Scalars['Bytes']>;
  delegatingTo_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lastDelegateUpdateTxHash?: InputMaybe<Scalars['Bytes']>;
  lastDelegateUpdateTxHash_contains?: InputMaybe<Scalars['Bytes']>;
  lastDelegateUpdateTxHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lastDelegateUpdateTxHash_not?: InputMaybe<Scalars['Bytes']>;
  lastDelegateUpdateTxHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  lastDelegateUpdateTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  loot?: InputMaybe<Scalars['BigInt']>;
  loot_gt?: InputMaybe<Scalars['BigInt']>;
  loot_gte?: InputMaybe<Scalars['BigInt']>;
  loot_in?: InputMaybe<Array<Scalars['BigInt']>>;
  loot_lt?: InputMaybe<Scalars['BigInt']>;
  loot_lte?: InputMaybe<Scalars['BigInt']>;
  loot_not?: InputMaybe<Scalars['BigInt']>;
  loot_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  memberAddress?: InputMaybe<Scalars['Bytes']>;
  memberAddress_contains?: InputMaybe<Scalars['Bytes']>;
  memberAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  memberAddress_not?: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  shares?: InputMaybe<Scalars['BigInt']>;
  sharesLootDelegateShares?: InputMaybe<Scalars['BigInt']>;
  sharesLootDelegateShares_gt?: InputMaybe<Scalars['BigInt']>;
  sharesLootDelegateShares_gte?: InputMaybe<Scalars['BigInt']>;
  sharesLootDelegateShares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sharesLootDelegateShares_lt?: InputMaybe<Scalars['BigInt']>;
  sharesLootDelegateShares_lte?: InputMaybe<Scalars['BigInt']>;
  sharesLootDelegateShares_not?: InputMaybe<Scalars['BigInt']>;
  sharesLootDelegateShares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shares_gt?: InputMaybe<Scalars['BigInt']>;
  shares_gte?: InputMaybe<Scalars['BigInt']>;
  shares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shares_lt?: InputMaybe<Scalars['BigInt']>;
  shares_lte?: InputMaybe<Scalars['BigInt']>;
  shares_not?: InputMaybe<Scalars['BigInt']>;
  shares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  votes_?: InputMaybe<Vote_Filter>;
}

export type Member_OrderBy =
  | 'createdAt'
  | 'dao'
  | 'delegateOf'
  | 'delegateOfCount'
  | 'delegateShares'
  | 'delegatingTo'
  | 'delegatingToMember'
  | 'id'
  | 'lastDelegateUpdateTxHash'
  | 'loot'
  | 'memberAddress'
  | 'shares'
  | 'sharesLootDelegateShares'
  | 'txHash'
  | 'votes';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export interface Proposal {
  __typename?: 'Proposal';
  /** indicates if the proposal is processed */
  actionFailed: Scalars['Boolean'];
  /** estimated gas needed to execute the proposal actions */
  actionGasEstimate: Scalars['BigInt'];
  /** indicates if the proposal is cancelled */
  cancelled: Scalars['Boolean'];
  /** the address that cancelled the proposal */
  cancelledBy?: Maybe<Scalars['Bytes']>;
  /** unix timestamp of when the proposal was cancelled */
  cancelledTxAt?: Maybe<Scalars['BigInt']>;
  /** transaction hash of the cancelled proposal */
  cancelledTxHash?: Maybe<Scalars['Bytes']>;
  /** proposal content URI derived from the details field */
  contentURI?: Maybe<Scalars['String']>;
  /** proposal Content URI type (ipfs hash, url) derived from the details field */
  contentURIType?: Maybe<Scalars['String']>;
  /** block timestamp when the proposal was submitted */
  createdAt: Scalars['BigInt'];
  /** address that submitted the proposal */
  createdBy: Scalars['Bytes'];
  /** is currently paasing quorum and has more yes votes than no votes */
  currentlyPassing: Scalars['Boolean'];
  /** related DAO entity */
  dao: Dao;
  /** proposal description derived from the details field */
  description?: Maybe<Scalars['String']>;
  /** string with human readable description of the proposal */
  details: Scalars['String'];
  /** unix timestamp after which proposal should be considered invalid and skipped */
  expiration: Scalars['BigInt'];
  /** proposal expiration time or if there is no expiration this will be a huge number to aid in querying unexpired proposals */
  expirationQueryField: Scalars['BigInt'];
  /** unix timestamp of when the grace period ends */
  graceEnds: Scalars['BigInt'];
  /** duration in seconds of the grace period for this proposal in seconds */
  gracePeriod: Scalars['BigInt'];
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** highest share+loot count during any individual yes vote */
  maxTotalSharesAndLootAtYesVote: Scalars['BigInt'];
  /** amount of current shares that have voted no */
  noBalance: Scalars['BigInt'];
  /** number of current no votes */
  noVotes: Scalars['BigInt'];
  /** indicates if the proposal passed */
  passed: Scalars['Boolean'];
  /** id of the previous proposal, set at sponsorship */
  prevProposalId: Scalars['BigInt'];
  /** the unix timestamp of when the proposal was processed */
  processTxAt?: Maybe<Scalars['BigInt']>;
  /** transaction hash of processing the proposal */
  processTxHash?: Maybe<Scalars['Bytes']>;
  /** indicates if the proposal is processed */
  processed: Scalars['Boolean'];
  /** address that processed the proposal */
  processedBy?: Maybe<Scalars['Bytes']>;
  /** raw transaction data that will be executed if the proposal passes */
  proposalData: Scalars['Bytes'];
  /** hash of raw transaction data that will be executed if the proposal passes */
  proposalDataHash: Scalars['Bytes'];
  /** id of the proposal */
  proposalId: Scalars['BigInt'];
  /** amount of native token that was provided as tribute when the proposal was submitted */
  proposalOffering: Scalars['BigInt'];
  /** proposal type derived from the details field */
  proposalType: Scalars['String'];
  /** member entity of proposer if applicable */
  proposerMembership?: Maybe<Member>;
  /** indicates if the proposal was automatically sponsored */
  selfSponsor: Scalars['Boolean'];
  /** address that sponsored the proposal */
  sponsor?: Maybe<Scalars['Bytes']>;
  /** member entity of the sponsor */
  sponsorMembership?: Maybe<Member>;
  /** unix timestamp of when the proposal was sponsored */
  sponsorTxAt?: Maybe<Scalars['BigInt']>;
  /** transaction hash of the proposal sponsor */
  sponsorTxHash?: Maybe<Scalars['Bytes']>;
  /** indicates if the proposal is sponsored */
  sponsored: Scalars['Boolean'];
  /** proposal title derived from the details field */
  title?: Maybe<Scalars['String']>;
  /** applicant submitting the tribute proposal */
  tributeEscrowRecipient?: Maybe<Scalars['Bytes']>;
  /** amount of tribute token offered */
  tributeOffered?: Maybe<Scalars['BigInt']>;
  /**
   * The following tribute fields will only have values if the proposal was submitted through the trbute minion contract.
   *  token address in tribute proposals.
   */
  tributeToken?: Maybe<Scalars['Bytes']>;
  /** decimal places of the tribute token */
  tributeTokenDecimals?: Maybe<Scalars['BigInt']>;
  /** symbol of the tribute token */
  tributeTokenSymbol?: Maybe<Scalars['String']>;
  /** transaction hash of the proposal */
  txHash: Scalars['Bytes'];
  /** votes scoped to this proposal */
  votes?: Maybe<Array<Vote>>;
  /** unix timestamp of when the voting period ends */
  votingEnds: Scalars['BigInt'];
  /** duration of the voting period for this proposal in seconds */
  votingPeriod: Scalars['BigInt'];
  /** duration in seconds of the grace and voting periods for this proposal in seconds */
  votingPlusGraceDuration: Scalars['BigInt'];
  /** unix timestamp of when the voting period starts */
  votingStarts: Scalars['BigInt'];
  /** amount of current shares that have voted yes */
  yesBalance: Scalars['BigInt'];
  /** number of current yes votes */
  yesVotes: Scalars['BigInt'];
}


export interface ProposalVotesArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Vote_Filter>;
}

export interface Proposal_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  actionFailed?: InputMaybe<Scalars['Boolean']>;
  actionFailed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  actionFailed_not?: InputMaybe<Scalars['Boolean']>;
  actionFailed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  actionGasEstimate?: InputMaybe<Scalars['BigInt']>;
  actionGasEstimate_gt?: InputMaybe<Scalars['BigInt']>;
  actionGasEstimate_gte?: InputMaybe<Scalars['BigInt']>;
  actionGasEstimate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  actionGasEstimate_lt?: InputMaybe<Scalars['BigInt']>;
  actionGasEstimate_lte?: InputMaybe<Scalars['BigInt']>;
  actionGasEstimate_not?: InputMaybe<Scalars['BigInt']>;
  actionGasEstimate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelled?: InputMaybe<Scalars['Boolean']>;
  cancelledBy?: InputMaybe<Scalars['Bytes']>;
  cancelledBy_contains?: InputMaybe<Scalars['Bytes']>;
  cancelledBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  cancelledBy_not?: InputMaybe<Scalars['Bytes']>;
  cancelledBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  cancelledBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  cancelledTxAt?: InputMaybe<Scalars['BigInt']>;
  cancelledTxAt_gt?: InputMaybe<Scalars['BigInt']>;
  cancelledTxAt_gte?: InputMaybe<Scalars['BigInt']>;
  cancelledTxAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledTxAt_lt?: InputMaybe<Scalars['BigInt']>;
  cancelledTxAt_lte?: InputMaybe<Scalars['BigInt']>;
  cancelledTxAt_not?: InputMaybe<Scalars['BigInt']>;
  cancelledTxAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledTxHash?: InputMaybe<Scalars['Bytes']>;
  cancelledTxHash_contains?: InputMaybe<Scalars['Bytes']>;
  cancelledTxHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  cancelledTxHash_not?: InputMaybe<Scalars['Bytes']>;
  cancelledTxHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  cancelledTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  cancelled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  cancelled_not?: InputMaybe<Scalars['Boolean']>;
  cancelled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  contentURI?: InputMaybe<Scalars['String']>;
  contentURIType?: InputMaybe<Scalars['String']>;
  contentURIType_contains?: InputMaybe<Scalars['String']>;
  contentURIType_contains_nocase?: InputMaybe<Scalars['String']>;
  contentURIType_ends_with?: InputMaybe<Scalars['String']>;
  contentURIType_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentURIType_gt?: InputMaybe<Scalars['String']>;
  contentURIType_gte?: InputMaybe<Scalars['String']>;
  contentURIType_in?: InputMaybe<Array<Scalars['String']>>;
  contentURIType_lt?: InputMaybe<Scalars['String']>;
  contentURIType_lte?: InputMaybe<Scalars['String']>;
  contentURIType_not?: InputMaybe<Scalars['String']>;
  contentURIType_not_contains?: InputMaybe<Scalars['String']>;
  contentURIType_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contentURIType_not_ends_with?: InputMaybe<Scalars['String']>;
  contentURIType_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentURIType_not_in?: InputMaybe<Array<Scalars['String']>>;
  contentURIType_not_starts_with?: InputMaybe<Scalars['String']>;
  contentURIType_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contentURIType_starts_with?: InputMaybe<Scalars['String']>;
  contentURIType_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contentURI_contains?: InputMaybe<Scalars['String']>;
  contentURI_contains_nocase?: InputMaybe<Scalars['String']>;
  contentURI_ends_with?: InputMaybe<Scalars['String']>;
  contentURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentURI_gt?: InputMaybe<Scalars['String']>;
  contentURI_gte?: InputMaybe<Scalars['String']>;
  contentURI_in?: InputMaybe<Array<Scalars['String']>>;
  contentURI_lt?: InputMaybe<Scalars['String']>;
  contentURI_lte?: InputMaybe<Scalars['String']>;
  contentURI_not?: InputMaybe<Scalars['String']>;
  contentURI_not_contains?: InputMaybe<Scalars['String']>;
  contentURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contentURI_not_ends_with?: InputMaybe<Scalars['String']>;
  contentURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  contentURI_not_starts_with?: InputMaybe<Scalars['String']>;
  contentURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contentURI_starts_with?: InputMaybe<Scalars['String']>;
  contentURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdBy?: InputMaybe<Scalars['Bytes']>;
  createdBy_contains?: InputMaybe<Scalars['Bytes']>;
  createdBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdBy_not?: InputMaybe<Scalars['Bytes']>;
  createdBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  createdBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currentlyPassing?: InputMaybe<Scalars['Boolean']>;
  currentlyPassing_in?: InputMaybe<Array<Scalars['Boolean']>>;
  currentlyPassing_not?: InputMaybe<Scalars['Boolean']>;
  currentlyPassing_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  dao?: InputMaybe<Scalars['String']>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  details_contains?: InputMaybe<Scalars['String']>;
  details_contains_nocase?: InputMaybe<Scalars['String']>;
  details_ends_with?: InputMaybe<Scalars['String']>;
  details_ends_with_nocase?: InputMaybe<Scalars['String']>;
  details_gt?: InputMaybe<Scalars['String']>;
  details_gte?: InputMaybe<Scalars['String']>;
  details_in?: InputMaybe<Array<Scalars['String']>>;
  details_lt?: InputMaybe<Scalars['String']>;
  details_lte?: InputMaybe<Scalars['String']>;
  details_not?: InputMaybe<Scalars['String']>;
  details_not_contains?: InputMaybe<Scalars['String']>;
  details_not_contains_nocase?: InputMaybe<Scalars['String']>;
  details_not_ends_with?: InputMaybe<Scalars['String']>;
  details_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  details_not_in?: InputMaybe<Array<Scalars['String']>>;
  details_not_starts_with?: InputMaybe<Scalars['String']>;
  details_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  details_starts_with?: InputMaybe<Scalars['String']>;
  details_starts_with_nocase?: InputMaybe<Scalars['String']>;
  expiration?: InputMaybe<Scalars['BigInt']>;
  expirationQueryField?: InputMaybe<Scalars['BigInt']>;
  expirationQueryField_gt?: InputMaybe<Scalars['BigInt']>;
  expirationQueryField_gte?: InputMaybe<Scalars['BigInt']>;
  expirationQueryField_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expirationQueryField_lt?: InputMaybe<Scalars['BigInt']>;
  expirationQueryField_lte?: InputMaybe<Scalars['BigInt']>;
  expirationQueryField_not?: InputMaybe<Scalars['BigInt']>;
  expirationQueryField_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiration_gt?: InputMaybe<Scalars['BigInt']>;
  expiration_gte?: InputMaybe<Scalars['BigInt']>;
  expiration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiration_lt?: InputMaybe<Scalars['BigInt']>;
  expiration_lte?: InputMaybe<Scalars['BigInt']>;
  expiration_not?: InputMaybe<Scalars['BigInt']>;
  expiration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  graceEnds?: InputMaybe<Scalars['BigInt']>;
  graceEnds_gt?: InputMaybe<Scalars['BigInt']>;
  graceEnds_gte?: InputMaybe<Scalars['BigInt']>;
  graceEnds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  graceEnds_lt?: InputMaybe<Scalars['BigInt']>;
  graceEnds_lte?: InputMaybe<Scalars['BigInt']>;
  graceEnds_not?: InputMaybe<Scalars['BigInt']>;
  graceEnds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gracePeriod?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_gt?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_gte?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gracePeriod_lt?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_lte?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_not?: InputMaybe<Scalars['BigInt']>;
  gracePeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  maxTotalSharesAndLootAtYesVote?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_gt?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_gte?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxTotalSharesAndLootAtYesVote_lt?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_lte?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_not?: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  noBalance?: InputMaybe<Scalars['BigInt']>;
  noBalance_gt?: InputMaybe<Scalars['BigInt']>;
  noBalance_gte?: InputMaybe<Scalars['BigInt']>;
  noBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  noBalance_lt?: InputMaybe<Scalars['BigInt']>;
  noBalance_lte?: InputMaybe<Scalars['BigInt']>;
  noBalance_not?: InputMaybe<Scalars['BigInt']>;
  noBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  noVotes?: InputMaybe<Scalars['BigInt']>;
  noVotes_gt?: InputMaybe<Scalars['BigInt']>;
  noVotes_gte?: InputMaybe<Scalars['BigInt']>;
  noVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  noVotes_lt?: InputMaybe<Scalars['BigInt']>;
  noVotes_lte?: InputMaybe<Scalars['BigInt']>;
  noVotes_not?: InputMaybe<Scalars['BigInt']>;
  noVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  passed?: InputMaybe<Scalars['Boolean']>;
  passed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  passed_not?: InputMaybe<Scalars['Boolean']>;
  passed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  prevProposalId?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_gt?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_gte?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prevProposalId_lt?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_lte?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_not?: InputMaybe<Scalars['BigInt']>;
  prevProposalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  processTxAt?: InputMaybe<Scalars['BigInt']>;
  processTxAt_gt?: InputMaybe<Scalars['BigInt']>;
  processTxAt_gte?: InputMaybe<Scalars['BigInt']>;
  processTxAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  processTxAt_lt?: InputMaybe<Scalars['BigInt']>;
  processTxAt_lte?: InputMaybe<Scalars['BigInt']>;
  processTxAt_not?: InputMaybe<Scalars['BigInt']>;
  processTxAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  processTxHash?: InputMaybe<Scalars['Bytes']>;
  processTxHash_contains?: InputMaybe<Scalars['Bytes']>;
  processTxHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  processTxHash_not?: InputMaybe<Scalars['Bytes']>;
  processTxHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  processTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processedBy?: InputMaybe<Scalars['Bytes']>;
  processedBy_contains?: InputMaybe<Scalars['Bytes']>;
  processedBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  processedBy_not?: InputMaybe<Scalars['Bytes']>;
  processedBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  processedBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  proposalData?: InputMaybe<Scalars['Bytes']>;
  proposalDataHash?: InputMaybe<Scalars['Bytes']>;
  proposalDataHash_contains?: InputMaybe<Scalars['Bytes']>;
  proposalDataHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposalDataHash_not?: InputMaybe<Scalars['Bytes']>;
  proposalDataHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  proposalDataHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposalData_contains?: InputMaybe<Scalars['Bytes']>;
  proposalData_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposalData_not?: InputMaybe<Scalars['Bytes']>;
  proposalData_not_contains?: InputMaybe<Scalars['Bytes']>;
  proposalData_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposalId?: InputMaybe<Scalars['BigInt']>;
  proposalId_gt?: InputMaybe<Scalars['BigInt']>;
  proposalId_gte?: InputMaybe<Scalars['BigInt']>;
  proposalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalId_lt?: InputMaybe<Scalars['BigInt']>;
  proposalId_lte?: InputMaybe<Scalars['BigInt']>;
  proposalId_not?: InputMaybe<Scalars['BigInt']>;
  proposalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalOffering?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_gt?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_gte?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalOffering_lt?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_lte?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_not?: InputMaybe<Scalars['BigInt']>;
  proposalOffering_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalType?: InputMaybe<Scalars['String']>;
  proposalType_contains?: InputMaybe<Scalars['String']>;
  proposalType_contains_nocase?: InputMaybe<Scalars['String']>;
  proposalType_ends_with?: InputMaybe<Scalars['String']>;
  proposalType_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposalType_gt?: InputMaybe<Scalars['String']>;
  proposalType_gte?: InputMaybe<Scalars['String']>;
  proposalType_in?: InputMaybe<Array<Scalars['String']>>;
  proposalType_lt?: InputMaybe<Scalars['String']>;
  proposalType_lte?: InputMaybe<Scalars['String']>;
  proposalType_not?: InputMaybe<Scalars['String']>;
  proposalType_not_contains?: InputMaybe<Scalars['String']>;
  proposalType_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposalType_not_ends_with?: InputMaybe<Scalars['String']>;
  proposalType_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposalType_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposalType_not_starts_with?: InputMaybe<Scalars['String']>;
  proposalType_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposalType_starts_with?: InputMaybe<Scalars['String']>;
  proposalType_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposerMembership?: InputMaybe<Scalars['String']>;
  proposerMembership_?: InputMaybe<Member_Filter>;
  proposerMembership_contains?: InputMaybe<Scalars['String']>;
  proposerMembership_contains_nocase?: InputMaybe<Scalars['String']>;
  proposerMembership_ends_with?: InputMaybe<Scalars['String']>;
  proposerMembership_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposerMembership_gt?: InputMaybe<Scalars['String']>;
  proposerMembership_gte?: InputMaybe<Scalars['String']>;
  proposerMembership_in?: InputMaybe<Array<Scalars['String']>>;
  proposerMembership_lt?: InputMaybe<Scalars['String']>;
  proposerMembership_lte?: InputMaybe<Scalars['String']>;
  proposerMembership_not?: InputMaybe<Scalars['String']>;
  proposerMembership_not_contains?: InputMaybe<Scalars['String']>;
  proposerMembership_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposerMembership_not_ends_with?: InputMaybe<Scalars['String']>;
  proposerMembership_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposerMembership_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposerMembership_not_starts_with?: InputMaybe<Scalars['String']>;
  proposerMembership_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposerMembership_starts_with?: InputMaybe<Scalars['String']>;
  proposerMembership_starts_with_nocase?: InputMaybe<Scalars['String']>;
  selfSponsor?: InputMaybe<Scalars['Boolean']>;
  selfSponsor_in?: InputMaybe<Array<Scalars['Boolean']>>;
  selfSponsor_not?: InputMaybe<Scalars['Boolean']>;
  selfSponsor_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  sponsor?: InputMaybe<Scalars['Bytes']>;
  sponsorMembership?: InputMaybe<Scalars['String']>;
  sponsorMembership_?: InputMaybe<Member_Filter>;
  sponsorMembership_contains?: InputMaybe<Scalars['String']>;
  sponsorMembership_contains_nocase?: InputMaybe<Scalars['String']>;
  sponsorMembership_ends_with?: InputMaybe<Scalars['String']>;
  sponsorMembership_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sponsorMembership_gt?: InputMaybe<Scalars['String']>;
  sponsorMembership_gte?: InputMaybe<Scalars['String']>;
  sponsorMembership_in?: InputMaybe<Array<Scalars['String']>>;
  sponsorMembership_lt?: InputMaybe<Scalars['String']>;
  sponsorMembership_lte?: InputMaybe<Scalars['String']>;
  sponsorMembership_not?: InputMaybe<Scalars['String']>;
  sponsorMembership_not_contains?: InputMaybe<Scalars['String']>;
  sponsorMembership_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sponsorMembership_not_ends_with?: InputMaybe<Scalars['String']>;
  sponsorMembership_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sponsorMembership_not_in?: InputMaybe<Array<Scalars['String']>>;
  sponsorMembership_not_starts_with?: InputMaybe<Scalars['String']>;
  sponsorMembership_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sponsorMembership_starts_with?: InputMaybe<Scalars['String']>;
  sponsorMembership_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sponsorTxAt?: InputMaybe<Scalars['BigInt']>;
  sponsorTxAt_gt?: InputMaybe<Scalars['BigInt']>;
  sponsorTxAt_gte?: InputMaybe<Scalars['BigInt']>;
  sponsorTxAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sponsorTxAt_lt?: InputMaybe<Scalars['BigInt']>;
  sponsorTxAt_lte?: InputMaybe<Scalars['BigInt']>;
  sponsorTxAt_not?: InputMaybe<Scalars['BigInt']>;
  sponsorTxAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sponsorTxHash?: InputMaybe<Scalars['Bytes']>;
  sponsorTxHash_contains?: InputMaybe<Scalars['Bytes']>;
  sponsorTxHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sponsorTxHash_not?: InputMaybe<Scalars['Bytes']>;
  sponsorTxHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  sponsorTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sponsor_contains?: InputMaybe<Scalars['Bytes']>;
  sponsor_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sponsor_not?: InputMaybe<Scalars['Bytes']>;
  sponsor_not_contains?: InputMaybe<Scalars['Bytes']>;
  sponsor_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sponsored?: InputMaybe<Scalars['Boolean']>;
  sponsored_in?: InputMaybe<Array<Scalars['Boolean']>>;
  sponsored_not?: InputMaybe<Scalars['Boolean']>;
  sponsored_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_contains_nocase?: InputMaybe<Scalars['String']>;
  title_ends_with?: InputMaybe<Scalars['String']>;
  title_ends_with_nocase?: InputMaybe<Scalars['String']>;
  title_gt?: InputMaybe<Scalars['String']>;
  title_gte?: InputMaybe<Scalars['String']>;
  title_in?: InputMaybe<Array<Scalars['String']>>;
  title_lt?: InputMaybe<Scalars['String']>;
  title_lte?: InputMaybe<Scalars['String']>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']>;
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<Scalars['String']>>;
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  title_starts_with?: InputMaybe<Scalars['String']>;
  title_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tributeEscrowRecipient?: InputMaybe<Scalars['Bytes']>;
  tributeEscrowRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  tributeEscrowRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tributeEscrowRecipient_not?: InputMaybe<Scalars['Bytes']>;
  tributeEscrowRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  tributeEscrowRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tributeOffered?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_gt?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_gte?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tributeOffered_lt?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_lte?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_not?: InputMaybe<Scalars['BigInt']>;
  tributeOffered_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tributeToken?: InputMaybe<Scalars['Bytes']>;
  tributeTokenDecimals?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_gt?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_gte?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tributeTokenDecimals_lt?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_lte?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_not?: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tributeTokenSymbol?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_contains?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_contains_nocase?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_ends_with?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_gt?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_gte?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  tributeTokenSymbol_lt?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_lte?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_contains?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  tributeTokenSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_starts_with?: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tributeToken_contains?: InputMaybe<Scalars['Bytes']>;
  tributeToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tributeToken_not?: InputMaybe<Scalars['Bytes']>;
  tributeToken_not_contains?: InputMaybe<Scalars['Bytes']>;
  tributeToken_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  votes_?: InputMaybe<Vote_Filter>;
  votingEnds?: InputMaybe<Scalars['BigInt']>;
  votingEnds_gt?: InputMaybe<Scalars['BigInt']>;
  votingEnds_gte?: InputMaybe<Scalars['BigInt']>;
  votingEnds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingEnds_lt?: InputMaybe<Scalars['BigInt']>;
  votingEnds_lte?: InputMaybe<Scalars['BigInt']>;
  votingEnds_not?: InputMaybe<Scalars['BigInt']>;
  votingEnds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriod?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_gt?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_gte?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriod_lt?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_lte?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_not?: InputMaybe<Scalars['BigInt']>;
  votingPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPlusGraceDuration?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_gt?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_gte?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPlusGraceDuration_lt?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_lte?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_not?: InputMaybe<Scalars['BigInt']>;
  votingPlusGraceDuration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingStarts?: InputMaybe<Scalars['BigInt']>;
  votingStarts_gt?: InputMaybe<Scalars['BigInt']>;
  votingStarts_gte?: InputMaybe<Scalars['BigInt']>;
  votingStarts_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingStarts_lt?: InputMaybe<Scalars['BigInt']>;
  votingStarts_lte?: InputMaybe<Scalars['BigInt']>;
  votingStarts_not?: InputMaybe<Scalars['BigInt']>;
  votingStarts_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yesBalance?: InputMaybe<Scalars['BigInt']>;
  yesBalance_gt?: InputMaybe<Scalars['BigInt']>;
  yesBalance_gte?: InputMaybe<Scalars['BigInt']>;
  yesBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yesBalance_lt?: InputMaybe<Scalars['BigInt']>;
  yesBalance_lte?: InputMaybe<Scalars['BigInt']>;
  yesBalance_not?: InputMaybe<Scalars['BigInt']>;
  yesBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yesVotes?: InputMaybe<Scalars['BigInt']>;
  yesVotes_gt?: InputMaybe<Scalars['BigInt']>;
  yesVotes_gte?: InputMaybe<Scalars['BigInt']>;
  yesVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yesVotes_lt?: InputMaybe<Scalars['BigInt']>;
  yesVotes_lte?: InputMaybe<Scalars['BigInt']>;
  yesVotes_not?: InputMaybe<Scalars['BigInt']>;
  yesVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
}

export type Proposal_OrderBy =
  | 'actionFailed'
  | 'actionGasEstimate'
  | 'cancelled'
  | 'cancelledBy'
  | 'cancelledTxAt'
  | 'cancelledTxHash'
  | 'contentURI'
  | 'contentURIType'
  | 'createdAt'
  | 'createdBy'
  | 'currentlyPassing'
  | 'dao'
  | 'description'
  | 'details'
  | 'expiration'
  | 'expirationQueryField'
  | 'graceEnds'
  | 'gracePeriod'
  | 'id'
  | 'maxTotalSharesAndLootAtYesVote'
  | 'noBalance'
  | 'noVotes'
  | 'passed'
  | 'prevProposalId'
  | 'processTxAt'
  | 'processTxHash'
  | 'processed'
  | 'processedBy'
  | 'proposalData'
  | 'proposalDataHash'
  | 'proposalId'
  | 'proposalOffering'
  | 'proposalType'
  | 'proposerMembership'
  | 'selfSponsor'
  | 'sponsor'
  | 'sponsorMembership'
  | 'sponsorTxAt'
  | 'sponsorTxHash'
  | 'sponsored'
  | 'title'
  | 'tributeEscrowRecipient'
  | 'tributeOffered'
  | 'tributeToken'
  | 'tributeTokenDecimals'
  | 'tributeTokenSymbol'
  | 'txHash'
  | 'votes'
  | 'votingEnds'
  | 'votingPeriod'
  | 'votingPlusGraceDuration'
  | 'votingStarts'
  | 'yesBalance'
  | 'yesVotes';

export interface Query {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  dao?: Maybe<Dao>;
  daos: Array<Dao>;
  eventTransaction?: Maybe<EventTransaction>;
  eventTransactions: Array<EventTransaction>;
  member?: Maybe<Member>;
  members: Array<Member>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  rageQuit?: Maybe<RageQuit>;
  rageQuits: Array<RageQuit>;
  record?: Maybe<Record>;
  records: Array<Record>;
  shaman?: Maybe<Shaman>;
  shamans: Array<Shaman>;
  tokenLookup?: Maybe<TokenLookup>;
  tokenLookups: Array<TokenLookup>;
  vault?: Maybe<Vault>;
  vaults: Array<Vault>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
}


export interface Query_MetaArgs {
  block?: InputMaybe<Block_Height>;
}


export interface QueryDaoArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryDaosArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Dao_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Dao_Filter>;
}


export interface QueryEventTransactionArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryEventTransactionsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EventTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EventTransaction_Filter>;
}


export interface QueryMemberArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryMembersArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Member_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Member_Filter>;
}


export interface QueryProposalArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryProposalsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
}


export interface QueryRageQuitArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryRageQuitsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RageQuit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RageQuit_Filter>;
}


export interface QueryRecordArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryRecordsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Record_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Record_Filter>;
}


export interface QueryShamanArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryShamansArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Shaman_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Shaman_Filter>;
}


export interface QueryTokenLookupArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryTokenLookupsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenLookup_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenLookup_Filter>;
}


export interface QueryVaultArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryVaultsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vault_Filter>;
}


export interface QueryVoteArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryVotesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vote_Filter>;
}

export interface RageQuit {
  __typename?: 'RageQuit';
  /** block timestamp when the member rage quit */
  createdAt: Scalars['BigInt'];
  /** related DAO */
  dao: Dao;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** number of loot rage quit */
  loot: Scalars['BigInt'];
  /** related member */
  member: Member;
  /** number of shares rage quit */
  shares: Scalars['BigInt'];
  /** address the tokens where rage quit to */
  to: Scalars['Bytes'];
  /** list of treasury token addresses requested in the rage quit */
  tokens: Array<Scalars['Bytes']>;
  /** the transaction where the RageQuit occurred */
  txHash: Scalars['Bytes'];
}

export interface RageQuit_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dao?: InputMaybe<Scalars['String']>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  loot?: InputMaybe<Scalars['BigInt']>;
  loot_gt?: InputMaybe<Scalars['BigInt']>;
  loot_gte?: InputMaybe<Scalars['BigInt']>;
  loot_in?: InputMaybe<Array<Scalars['BigInt']>>;
  loot_lt?: InputMaybe<Scalars['BigInt']>;
  loot_lte?: InputMaybe<Scalars['BigInt']>;
  loot_not?: InputMaybe<Scalars['BigInt']>;
  loot_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  member?: InputMaybe<Scalars['String']>;
  member_?: InputMaybe<Member_Filter>;
  member_contains?: InputMaybe<Scalars['String']>;
  member_contains_nocase?: InputMaybe<Scalars['String']>;
  member_ends_with?: InputMaybe<Scalars['String']>;
  member_ends_with_nocase?: InputMaybe<Scalars['String']>;
  member_gt?: InputMaybe<Scalars['String']>;
  member_gte?: InputMaybe<Scalars['String']>;
  member_in?: InputMaybe<Array<Scalars['String']>>;
  member_lt?: InputMaybe<Scalars['String']>;
  member_lte?: InputMaybe<Scalars['String']>;
  member_not?: InputMaybe<Scalars['String']>;
  member_not_contains?: InputMaybe<Scalars['String']>;
  member_not_contains_nocase?: InputMaybe<Scalars['String']>;
  member_not_ends_with?: InputMaybe<Scalars['String']>;
  member_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  member_not_in?: InputMaybe<Array<Scalars['String']>>;
  member_not_starts_with?: InputMaybe<Scalars['String']>;
  member_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  member_starts_with?: InputMaybe<Scalars['String']>;
  member_starts_with_nocase?: InputMaybe<Scalars['String']>;
  shares?: InputMaybe<Scalars['BigInt']>;
  shares_gt?: InputMaybe<Scalars['BigInt']>;
  shares_gte?: InputMaybe<Scalars['BigInt']>;
  shares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shares_lt?: InputMaybe<Scalars['BigInt']>;
  shares_lte?: InputMaybe<Scalars['BigInt']>;
  shares_not?: InputMaybe<Scalars['BigInt']>;
  shares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_not?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
}

export type RageQuit_OrderBy =
  | 'createdAt'
  | 'dao'
  | 'id'
  | 'loot'
  | 'member'
  | 'shares'
  | 'to'
  | 'tokens'
  | 'txHash';

export interface Record {
  __typename?: 'Record';
  content: Scalars['String'];
  contentType: Scalars['String'];
  createdAt: Scalars['BigInt'];
  createdBy: Scalars['Bytes'];
  dao: Dao;
  id: Scalars['ID'];
  table: Scalars['String'];
  tag: Scalars['Bytes'];
}

export interface Record_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  content?: InputMaybe<Scalars['String']>;
  contentType?: InputMaybe<Scalars['String']>;
  contentType_contains?: InputMaybe<Scalars['String']>;
  contentType_contains_nocase?: InputMaybe<Scalars['String']>;
  contentType_ends_with?: InputMaybe<Scalars['String']>;
  contentType_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentType_gt?: InputMaybe<Scalars['String']>;
  contentType_gte?: InputMaybe<Scalars['String']>;
  contentType_in?: InputMaybe<Array<Scalars['String']>>;
  contentType_lt?: InputMaybe<Scalars['String']>;
  contentType_lte?: InputMaybe<Scalars['String']>;
  contentType_not?: InputMaybe<Scalars['String']>;
  contentType_not_contains?: InputMaybe<Scalars['String']>;
  contentType_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contentType_not_ends_with?: InputMaybe<Scalars['String']>;
  contentType_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentType_not_in?: InputMaybe<Array<Scalars['String']>>;
  contentType_not_starts_with?: InputMaybe<Scalars['String']>;
  contentType_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contentType_starts_with?: InputMaybe<Scalars['String']>;
  contentType_starts_with_nocase?: InputMaybe<Scalars['String']>;
  content_contains?: InputMaybe<Scalars['String']>;
  content_contains_nocase?: InputMaybe<Scalars['String']>;
  content_ends_with?: InputMaybe<Scalars['String']>;
  content_ends_with_nocase?: InputMaybe<Scalars['String']>;
  content_gt?: InputMaybe<Scalars['String']>;
  content_gte?: InputMaybe<Scalars['String']>;
  content_in?: InputMaybe<Array<Scalars['String']>>;
  content_lt?: InputMaybe<Scalars['String']>;
  content_lte?: InputMaybe<Scalars['String']>;
  content_not?: InputMaybe<Scalars['String']>;
  content_not_contains?: InputMaybe<Scalars['String']>;
  content_not_contains_nocase?: InputMaybe<Scalars['String']>;
  content_not_ends_with?: InputMaybe<Scalars['String']>;
  content_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  content_not_in?: InputMaybe<Array<Scalars['String']>>;
  content_not_starts_with?: InputMaybe<Scalars['String']>;
  content_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  content_starts_with?: InputMaybe<Scalars['String']>;
  content_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdBy?: InputMaybe<Scalars['Bytes']>;
  createdBy_contains?: InputMaybe<Scalars['Bytes']>;
  createdBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdBy_not?: InputMaybe<Scalars['Bytes']>;
  createdBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  createdBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dao?: InputMaybe<Scalars['String']>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  table?: InputMaybe<Scalars['String']>;
  table_contains?: InputMaybe<Scalars['String']>;
  table_contains_nocase?: InputMaybe<Scalars['String']>;
  table_ends_with?: InputMaybe<Scalars['String']>;
  table_ends_with_nocase?: InputMaybe<Scalars['String']>;
  table_gt?: InputMaybe<Scalars['String']>;
  table_gte?: InputMaybe<Scalars['String']>;
  table_in?: InputMaybe<Array<Scalars['String']>>;
  table_lt?: InputMaybe<Scalars['String']>;
  table_lte?: InputMaybe<Scalars['String']>;
  table_not?: InputMaybe<Scalars['String']>;
  table_not_contains?: InputMaybe<Scalars['String']>;
  table_not_contains_nocase?: InputMaybe<Scalars['String']>;
  table_not_ends_with?: InputMaybe<Scalars['String']>;
  table_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  table_not_in?: InputMaybe<Array<Scalars['String']>>;
  table_not_starts_with?: InputMaybe<Scalars['String']>;
  table_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  table_starts_with?: InputMaybe<Scalars['String']>;
  table_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['Bytes']>;
  tag_contains?: InputMaybe<Scalars['Bytes']>;
  tag_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tag_not?: InputMaybe<Scalars['Bytes']>;
  tag_not_contains?: InputMaybe<Scalars['Bytes']>;
  tag_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
}

export type Record_OrderBy =
  | 'content'
  | 'contentType'
  | 'createdAt'
  | 'createdBy'
  | 'dao'
  | 'id'
  | 'table'
  | 'tag';

export interface Shaman {
  __typename?: 'Shaman';
  /** block timestamp when the shaman was added */
  createdAt: Scalars['BigInt'];
  /** related DAO */
  dao: Dao;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** permission level of the shaman (0-7) */
  permissions: Scalars['BigInt'];
  /** address of the shaman */
  shamanAddress: Scalars['Bytes'];
}

export interface Shaman_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dao?: InputMaybe<Scalars['String']>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  permissions?: InputMaybe<Scalars['BigInt']>;
  permissions_gt?: InputMaybe<Scalars['BigInt']>;
  permissions_gte?: InputMaybe<Scalars['BigInt']>;
  permissions_in?: InputMaybe<Array<Scalars['BigInt']>>;
  permissions_lt?: InputMaybe<Scalars['BigInt']>;
  permissions_lte?: InputMaybe<Scalars['BigInt']>;
  permissions_not?: InputMaybe<Scalars['BigInt']>;
  permissions_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shamanAddress?: InputMaybe<Scalars['Bytes']>;
  shamanAddress_contains?: InputMaybe<Scalars['Bytes']>;
  shamanAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  shamanAddress_not?: InputMaybe<Scalars['Bytes']>;
  shamanAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  shamanAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
}

export type Shaman_OrderBy =
  | 'createdAt'
  | 'dao'
  | 'id'
  | 'permissions'
  | 'shamanAddress';

export interface Subscription {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  dao?: Maybe<Dao>;
  daos: Array<Dao>;
  eventTransaction?: Maybe<EventTransaction>;
  eventTransactions: Array<EventTransaction>;
  member?: Maybe<Member>;
  members: Array<Member>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  rageQuit?: Maybe<RageQuit>;
  rageQuits: Array<RageQuit>;
  record?: Maybe<Record>;
  records: Array<Record>;
  shaman?: Maybe<Shaman>;
  shamans: Array<Shaman>;
  tokenLookup?: Maybe<TokenLookup>;
  tokenLookups: Array<TokenLookup>;
  vault?: Maybe<Vault>;
  vaults: Array<Vault>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
}


export interface Subscription_MetaArgs {
  block?: InputMaybe<Block_Height>;
}


export interface SubscriptionDaoArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionDaosArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Dao_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Dao_Filter>;
}


export interface SubscriptionEventTransactionArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionEventTransactionsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EventTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EventTransaction_Filter>;
}


export interface SubscriptionMemberArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionMembersArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Member_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Member_Filter>;
}


export interface SubscriptionProposalArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionProposalsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
}


export interface SubscriptionRageQuitArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionRageQuitsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RageQuit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RageQuit_Filter>;
}


export interface SubscriptionRecordArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionRecordsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Record_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Record_Filter>;
}


export interface SubscriptionShamanArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionShamansArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Shaman_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Shaman_Filter>;
}


export interface SubscriptionTokenLookupArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionTokenLookupsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenLookup_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenLookup_Filter>;
}


export interface SubscriptionVaultArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionVaultsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vault_Filter>;
}


export interface SubscriptionVoteArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionVotesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vote_Filter>;
}

export interface TokenLookup {
  __typename?: 'TokenLookup';
  /** related DAO */
  dao: Scalars['Bytes'];
  /** unique identifier and primary key of the entity (share or loot token address) */
  id: Scalars['ID'];
}

export interface TokenLookup_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  dao?: InputMaybe<Scalars['Bytes']>;
  dao_contains?: InputMaybe<Scalars['Bytes']>;
  dao_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dao_not?: InputMaybe<Scalars['Bytes']>;
  dao_not_contains?: InputMaybe<Scalars['Bytes']>;
  dao_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
}

export type TokenLookup_OrderBy =
  | 'dao'
  | 'id';

export interface Vault {
  __typename?: 'Vault';
  /** indicates if the vault is active */
  active: Scalars['Boolean'];
  /** block timestamp of the transaction */
  createdAt: Scalars['BigInt'];
  /** related DAO */
  dao: Dao;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** name assigned when vault is set */
  name: Scalars['String'];
  /** indicates of the funds in the vault are ragequittable */
  ragequittable: Scalars['Boolean'];
  /** contract address of the gnosis safe treasury */
  safeAddress: Scalars['Bytes'];
}

export interface Vault_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  active?: InputMaybe<Scalars['Boolean']>;
  active_in?: InputMaybe<Array<Scalars['Boolean']>>;
  active_not?: InputMaybe<Scalars['Boolean']>;
  active_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dao?: InputMaybe<Scalars['String']>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_ends_with?: InputMaybe<Scalars['String']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_gt?: InputMaybe<Scalars['String']>;
  dao_gte?: InputMaybe<Scalars['String']>;
  dao_in?: InputMaybe<Array<Scalars['String']>>;
  dao_lt?: InputMaybe<Scalars['String']>;
  dao_lte?: InputMaybe<Scalars['String']>;
  dao_not?: InputMaybe<Scalars['String']>;
  dao_not_contains?: InputMaybe<Scalars['String']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dao_starts_with?: InputMaybe<Scalars['String']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ragequittable?: InputMaybe<Scalars['Boolean']>;
  ragequittable_in?: InputMaybe<Array<Scalars['Boolean']>>;
  ragequittable_not?: InputMaybe<Scalars['Boolean']>;
  ragequittable_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  safeAddress?: InputMaybe<Scalars['Bytes']>;
  safeAddress_contains?: InputMaybe<Scalars['Bytes']>;
  safeAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  safeAddress_not?: InputMaybe<Scalars['Bytes']>;
  safeAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  safeAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
}

export type Vault_OrderBy =
  | 'active'
  | 'createdAt'
  | 'dao'
  | 'id'
  | 'name'
  | 'ragequittable'
  | 'safeAddress';

export interface Vote {
  __typename?: 'Vote';
  /** indicates yes vote/no vote */
  approved: Scalars['Boolean'];
  /** shares balance of the voting member at the time of the vote */
  balance: Scalars['BigInt'];
  /** block timestamp when the vote was submitted */
  createdAt: Scalars['BigInt'];
  /** contract address of the DAO related to this vote */
  daoAddress: Scalars['Bytes'];
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** related/voting member */
  member: Member;
  /** related proposal */
  proposal: Proposal;
  /** transaction hash of the vote */
  txHash: Scalars['Bytes'];
}

export interface Vote_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  approved?: InputMaybe<Scalars['Boolean']>;
  approved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  approved_not?: InputMaybe<Scalars['Boolean']>;
  approved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  daoAddress?: InputMaybe<Scalars['Bytes']>;
  daoAddress_contains?: InputMaybe<Scalars['Bytes']>;
  daoAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  daoAddress_not?: InputMaybe<Scalars['Bytes']>;
  daoAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  daoAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  member?: InputMaybe<Scalars['String']>;
  member_?: InputMaybe<Member_Filter>;
  member_contains?: InputMaybe<Scalars['String']>;
  member_contains_nocase?: InputMaybe<Scalars['String']>;
  member_ends_with?: InputMaybe<Scalars['String']>;
  member_ends_with_nocase?: InputMaybe<Scalars['String']>;
  member_gt?: InputMaybe<Scalars['String']>;
  member_gte?: InputMaybe<Scalars['String']>;
  member_in?: InputMaybe<Array<Scalars['String']>>;
  member_lt?: InputMaybe<Scalars['String']>;
  member_lte?: InputMaybe<Scalars['String']>;
  member_not?: InputMaybe<Scalars['String']>;
  member_not_contains?: InputMaybe<Scalars['String']>;
  member_not_contains_nocase?: InputMaybe<Scalars['String']>;
  member_not_ends_with?: InputMaybe<Scalars['String']>;
  member_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  member_not_in?: InputMaybe<Array<Scalars['String']>>;
  member_not_starts_with?: InputMaybe<Scalars['String']>;
  member_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  member_starts_with?: InputMaybe<Scalars['String']>;
  member_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal?: InputMaybe<Scalars['String']>;
  proposal_?: InputMaybe<Proposal_Filter>;
  proposal_contains?: InputMaybe<Scalars['String']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_ends_with?: InputMaybe<Scalars['String']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_gt?: InputMaybe<Scalars['String']>;
  proposal_gte?: InputMaybe<Scalars['String']>;
  proposal_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_lt?: InputMaybe<Scalars['String']>;
  proposal_lte?: InputMaybe<Scalars['String']>;
  proposal_not?: InputMaybe<Scalars['String']>;
  proposal_not_contains?: InputMaybe<Scalars['String']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_starts_with?: InputMaybe<Scalars['String']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
}

export type Vote_OrderBy =
  | 'approved'
  | 'balance'
  | 'createdAt'
  | 'daoAddress'
  | 'id'
  | 'member'
  | 'proposal'
  | 'txHash';

export interface _Block_ {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
}

/** The type for the top-level _meta field */
export interface _Meta_ {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
}

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';
