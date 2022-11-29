import { useDaoData, useProposalData } from '@daohaus/moloch-v3-context';
import { Button } from '@daohaus/ui';

export function Yolo() {
  const { dao, refreshDao } = useDaoData();
  const { proposals, filter, filterProposals, paging } = useProposalData();

  console.log('proposals', proposals, filter);

  console.log('paging', paging);

  const handleFilterProps = () => {
    filterProposals({ proposalId: '2' });
  };
  return (
    <>
      <p>poopin</p>
      <Button onClick={refreshDao}>refresh dao</Button>
      <Button onClick={handleFilterProps}>filter proposals</Button>
    </>
  );
}

export default Yolo;
