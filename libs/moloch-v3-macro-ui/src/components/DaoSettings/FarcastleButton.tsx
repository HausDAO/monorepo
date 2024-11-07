import { Button } from '@daohaus/ui';
import { getFarcastleFramemUrl } from '@daohaus/utils';

import FarcasterLogo from '../../assets/farcaster-logo.svg';

export const FarcastleButton = ({
  daoId,
  daoChain,
  location,
}: {
  daoId: string;
  daoChain: string;
  location?: string;
}) => {
  return (
    <Button
      color="secondary"
      href={getFarcastleFramemUrl({
        daoId,
        daoChain,
        location,
      })}
      style={{ gap: '.5rem' }}
    >
      <img src={FarcasterLogo} alt="farcaster" width="22px" /> Cast
    </Button>
  );
};
