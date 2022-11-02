import styled from 'styled-components';
import { Card, SingleColumnLayout, widthQuery } from '@daohaus/ui';

import { useDao } from '@daohaus/dao-context';
import { MetadataSettings } from '../components/MetadataSettings';
import { GovernanceSettings } from '../components/GovernanceSettings';
import { ShamanSettings } from '../components/ShamanSettings';

const SettingsContainer = styled(Card)`
  width: 110rem;
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function Settings() {
  const { dao } = useDao();

  return (
    <SingleColumnLayout title="Settings">
      {dao && (
        <>
          <SettingsContainer>
            <MetadataSettings dao={dao} />
          </SettingsContainer>

          <SettingsContainer>
            <GovernanceSettings dao={dao} />
          </SettingsContainer>

          <SettingsContainer>
            <ShamanSettings dao={dao} />
          </SettingsContainer>
        </>
      )}
    </SingleColumnLayout>
  );
}

export default Settings;
