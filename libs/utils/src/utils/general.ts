import { ethers } from 'ethers';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const votingPowerPercentage = (
  daoTotalShares: string,
  memberShares: string
): number => {
  if (Number(daoTotalShares) === 0) return 0;
  const perc =
    (Number(ethers.utils.formatEther(memberShares)) /
      Number(ethers.utils.formatEther(daoTotalShares))) *
    100;

  return Math.round(perc * 100) / 100;
};

export const nowInSeconds = (): number => new Date().getTime() / 1000;

export const memberTokenBalanceShare = (
  tokenBalance: string | number,
  daoTotalShares: string | number,
  daoTotalLoot: string | number,
  memberShares: string | number,
  memberLoot: string | number,
  decimals: string | number = 18
): number => {
  const daoSharesAndLoot =
    Number(ethers.utils.formatEther(daoTotalShares)) +
    Number(ethers.utils.formatEther(daoTotalLoot));
  const sharesAndLoot =
    Number(ethers.utils.formatEther(memberShares)) +
    Number(ethers.utils.formatEther(memberLoot));

  const ratio = sharesAndLoot / daoSharesAndLoot;

  const memberSharesWei = Number(tokenBalance) * ratio;
  return memberSharesWei / 10 ** Number(decimals);
};

export const memberUsdValueShare = (
  usdValue: string | number,
  daoTotalShares: string | number,
  daoTotalLoot: string | number,
  memberShares: string | number,
  memberLoot: string | number
): number => {
  const daoSharesAndLoot =
    Number(ethers.utils.formatEther(daoTotalShares)) +
    Number(ethers.utils.formatEther(daoTotalLoot));
  if (daoSharesAndLoot === 0) return 0;
  const sharesAndLoot =
    Number(ethers.utils.formatEther(memberShares)) +
    Number(ethers.utils.formatEther(memberLoot));

  const ratio = sharesAndLoot / daoSharesAndLoot;

  return Number(usdValue) * ratio;
};

export const sharesDelegatedToMember = (
  delegateShares: string | number,
  memberShares: string | number
) => {
  const val = Number(delegateShares) - Number(memberShares);
  if (!Number.isSafeInteger(val)) return BigInt(val).toString();
  return val.toString();
};

export const lowerCaseLootToken = (tokenName?: string): string => {
  if (!tokenName) return '';
  return tokenName.replace('LOOT', 'Loot');
};
