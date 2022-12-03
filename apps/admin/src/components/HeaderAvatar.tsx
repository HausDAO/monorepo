import { H4, ProfileAvatar } from '@daohaus/ui';
import styled from 'styled-components';

const DaoNavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.7rem;
`;

const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 4.8rem;
  height: 4.8rem;
`;

type HAvatar = {
  name: string;
  address: string;
  imgUrl?: string;
};
export const HeaderAvatar = ({ name, imgUrl, address }: HAvatar) => {
  return (
    <DaoNavContainer>
      <DaoProfileAvatar image={imgUrl} address={address} />
      <H4>{name}</H4>
    </DaoNavContainer>
  );
};
