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

export const farcastleChain = (daoChain?: string) => daoChain !== '0xaa36a7';

// https://warpcast.com/~/compose?text=&embeds[]=https://frames.farcastle.net/molochv3/0x64/0xe2f816d08c568a447d3804b265f1e277bc2c688d

// app.frame("molochv3/:chainid/:daoid", async (c) => {
//   return daoHomeFrame(c);
// });
// // app.frame("molochv3/:chainid/:daoid/proposals", async (c) => {
// //   return proposalFrame(c);
// // });
// app.frame("molochv3/:chainid/:daoid/proposals/:proposalids", async (c) => {
//   return proposalFrame(c);
// });
// app.frame("molochv3/:chainid/:daoid/proposals/:proposalids/vote", async (c) => {
