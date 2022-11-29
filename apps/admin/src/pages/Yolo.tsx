import {
  useDaoData,
  useMembersData,
  useProposalsData,
} from '@daohaus/moloch-v3-context';
import { Button } from '@daohaus/ui';

export function Yolo() {
  const { dao, refreshDao } = useDaoData();
  const { proposals, filter, filterProposals } = useProposalsData();
  const { members } = useMembersData();

  console.log('proposals', proposals, filter);
  console.log('members', members);
  console.log('dao', dao);

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
