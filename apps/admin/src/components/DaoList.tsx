import styled from 'styled-components';

import { MolochV3Membership } from '@daohaus/utils';
import { breakpoints } from '@daohaus/ui';

import { DaoCard } from './DaoCard';
import { ListType } from './HomeDashboard';
import { DaoTable } from './DaoTable';

export const DaoList = ({
  daoData,
  isMobile,
  listType,
}: {
  daoData: MolochV3Membership[];
  isMobile: boolean;
  listType: ListType;
}) => {
  if (isMobile) {
    return <DaoCards daoData={daoData} />;
  }

  if (listType === ListType.Cards) return <DaoCards daoData={daoData} />;
  if (listType === ListType.Table) return <DaoTable daoData={daoData} />;

  return null;
};

const CardListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 4rem;
  row-gap: 2rem;
  justify-content: center;
  @media (min-width: ${breakpoints.xs}) {
    justify-content: flex-start;
  }
`;

const DaoCards = ({ daoData }: { daoData: MolochV3Membership[] }) => (
  <CardListBox>
    {daoData.map((dao) => (
      <DaoCard key={dao.dao} {...dao} />
    ))}
  </CardListBox>
);
