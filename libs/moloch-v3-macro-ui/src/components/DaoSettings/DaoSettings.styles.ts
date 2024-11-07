import styled from 'styled-components';
import { Card, widthQuery, ProfileAvatar } from '@daohaus/ui';

export const SettingsContainer = styled(Card)`
  width: 110rem;
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const MetaCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

export const MetaCardLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const MetaContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 3.4rem;
  .icon {
    margin-top: 1.2rem;
  }
  .section-middle {
    width: 38rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .links {
    margin: 1.2rem 0;
  }
`;

export const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 8.9rem;
  height: 8.9rem;
`;

export const WarningContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 2rem;
  margin-top: 3rem;
  background-color: ${({ theme }) => theme.warning.step3};
  border-color: ${({ theme }) => theme.warning.step7};
  .title {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
`;
export const GovernanceContainer = styled.div`
  h4 {
    margin-top: 4rem;
  }
`;

export const GovernanceCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

export const TokensHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
`;

export const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    margin-top: 3rem;
    width: 34rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;

export const TokenDataGrid = styled(DataGrid)`
  div {
    width: 22.7rem;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.primary.step10};
  &:hover {
    text-decoration: none;
  }
`;
export const ShamanContainer = styled.div`
  .tokens {
    margin-top: 3rem;
  }
  h4 {
    margin-top: 4rem;
  }
`;
export const ShamanCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;
export const ShamanListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    margin-top: 3rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
  .contract {
    width: 60%;
  }
  .manage {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 40%;
  }
`;
