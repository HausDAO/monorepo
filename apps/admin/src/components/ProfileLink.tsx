import { Button, Link } from '@daohaus/ui';
import { ComponentProps } from 'react';
import { useParams } from 'react-router-dom';

type ProfileLinkProps = {
  memberAddress: string;
} & Partial<ComponentProps<typeof Button>>;

export const ProfileLink = ({
  memberAddress,
  children,
  ...rest
}: ProfileLinkProps) => {
  const { daoid, daochain } = useParams();

  return (
    <Link href={`/molochv3/${daochain}/${daoid}/members/${memberAddress}`}>
      <Button {...rest}>{children}</Button>
    </Link>
  );
};
