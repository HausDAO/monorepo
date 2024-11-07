export const farcastleChain = (daoChain?: string) => daoChain !== '0xaa36a7';

export const getFarcastleFramemUrl = ({
  daoChain,
  daoId,
  location,
}: {
  daoChain: string;
  daoId: string;
  location?: string;
}): string | undefined => {
  if (daoChain === '0xaa36a7') return;
  const baseUrl = `https://warpcast.com/~/compose?text=&embeds[]=https://frames.farcastle.net/molochv3/${daoChain}/${daoId}`;

  return location ? `${baseUrl}/${location}` : baseUrl;
};
