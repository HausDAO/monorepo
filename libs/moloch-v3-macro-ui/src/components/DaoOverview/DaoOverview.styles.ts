import styled from 'styled-components';
import { border, Card, ProfileAvatar, Theme, widthQuery } from '@daohaus/ui';

export const OverviewCard = styled(Card)`
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const TokensCard = styled(OverviewCard)`
  padding: 2.4rem;
`;

export const DataGrid = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    padding: 2rem 0;
  }
`;

export const DaoProfileContainer = styled.div`
  width: 100%;
  border-radius: ${border.radius};
  border: 1px ${({ theme }: { theme: Theme }) => theme.secondary.step5} solid;
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  padding: 2.2rem;
  .avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.7rem;
    margin-bottom: 2.7rem;
    p {
      margin-right: auto;
    }
    @media ${widthQuery.xs} {
      flex-direction: column;
    }
  }
`;

export const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 18rem;
  height: 18rem;
`;

export const MissingProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.3rem;
`;

export const TagListContainer = styled.div`
  margin-top: 2.8rem;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
`;
