export const DAOHAUS_SUMMONER_REFERRER =
  '0x64616f6861757300000000000000000000000000000000000000000000000000';
export const DAOHAUS_SAFE_SUMMONER_REFERRER =
  '0x64616f686175732d736166652d61707000000000000000000000000000000000';
export const DAOHAUS_CONTRACT_UTILS_REFERRER =
  '0x64616f686175732d636f6e74726163742d7574696c7300000000000000000000';
export const SUMMON_COPY = {
  VOTING_STK:
    'What does your DAO want to name the tokens representing voting stake?',
  TOKEN_SYMBOL:
    'How would your DAO like to abbreviate the tokens representing voting stake?',
  STAKE_TRANSFER:
    'Should DAO members be allowed to transfer voting stake to other accounts? After summoning, the DAO can change this with a proposal.',
  NV_STAKE_TRANSFER:
    'Should DAO members be allowed to transfer non-voting stake to other accounts? After summoning, the DAO can change this with a proposal.',
  VOTING_PERIOD: 'How long should proposals remain open for voting?',
  GRACE_PERIOD:
    'How long is the period between proposal approval and execution? This provides time for members to ragequit their shares before approved proposals are executed.',
  QUORUM:
    'What is the minimum percentage of DAO members (voting stake) required to approve a proposal for it to be executed? This percentage can greatly affect DAO operations. After summoning, the DAO can change it with a proposal.',
  MIN_RETENTION:
    'What is the maximum percentage of DAO members (voting and non-voting stake) required to remain in the DAO after grace period? If the percentage falls below this number, the proposal is not executed.',
  SPONSOR_THRESHOLD:
    'What is minimum number of delegated stake tokens a member needs to sponsor a proposal?',
  NEW_OFFERING:
    'Would you like to require a fee to submit proposals? This feature is intended to protect against spam proposals. Fees go into the DAO treasury.',
  SHAMAN:
    'Input shaman list with contract address and permission level per row using spaces. Example: \n 0x00000000000000 2 \n 0x00000000000000 1',
  MEMBERS:
    'Input member list with member address, voting stake amount, and non-voting stake amount per row using spaces. Example: \n 0x00000000000000 20 0 \n 0x00000000000000 10 0',
};
