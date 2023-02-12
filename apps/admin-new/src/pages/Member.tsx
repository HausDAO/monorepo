import { useDaoMember } from '@daohaus/moloch-v3-hooks';
import { ParLg, SingleColumnLayout } from '@daohaus/ui';

import { JSONDisplay } from '../components/JSONDisplay';

export const Member = () => {
  const { member } = useDaoMember();

  console.log('member', member);

  return (
    <SingleColumnLayout>
      <ParLg>{member?.memberAddress}</ParLg>
      <JSONDisplay data={member} />
    </SingleColumnLayout>
  );
};
