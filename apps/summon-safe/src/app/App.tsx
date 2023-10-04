import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VALID_NETWORKS } from '@daohaus/keychain-utils';
import { Tab, TabItem, Card } from '@gnosis.pm/safe-react-components';
import { Container, Grid } from '@material-ui/core';
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';

import AppBar from '../components/AppBar';
import AppFooter from '../components/AppFooter';
import Daos from '../views/Daos';
import SummonForm from '../views/SummonForm';
import ModuleMarket from '../views/ModuleMarket';

const TAB_OPTS: Array<TabItem> = [
  { id: 'listBaal', label: 'DAOs', icon: 'apps' },
  { id: 'newBaal', label: 'New DAO', icon: 'owners' },
  { id: 'newBaalFromTemplate', label: 'New Module', icon: 'rocket' },
];

const SafeApp = (): React.ReactElement => {
  const { safe } = useSafeAppsSDK();
  const [selectedTab, setSelectedTab] = useState('listBaal');
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    setAvailable(
      Object.keys(VALID_NETWORKS).includes(`0x${safe.chainId.toString(16)}`)
    );
  }, [safe]);

  const resetTab = () => {
    setSelectedTab('listBaal');
  };

  return (
    <>
      <AppBar />
      <StyledMainContainer as="main">
        <StyledAppContainer container direction="column" alignItems="center">
          <StyledCardContainer item>
            <Tab
              onChange={setSelectedTab}
              selectedTab={selectedTab}
              variant="outlined"
              items={TAB_OPTS.map((tab) => ({ ...tab, disabled: !available }))}
            />
            <StyledCard>
              {selectedTab === 'listBaal' && (
                <Daos newBaalEvent={() => setSelectedTab('newBaal')} />
              )}
              {selectedTab === 'newBaal' && <SummonForm resetTab={resetTab} />}
              {selectedTab === 'newBaalFromTemplate' && <ModuleMarket />}
            </StyledCard>
          </StyledCardContainer>
        </StyledAppContainer>
      </StyledMainContainer>
      <AppFooter />
    </>
  );
};

const StyledMainContainer = styled(Container)`
  && {
    max-width: 100%;
    background-color: #f3f5f6;
    display: flex;
    height: calc(100% - 120px);
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
  }
`;

const StyledAppContainer = styled(Grid)`
  height: 100%;
  padding-top: 45px;
`;

const StyledCardContainer = styled(Grid)`
  // width: 484px;
  width: 584px;
  margin-top: 45px;
`;

const StyledCard = styled(Card)`
  && {
    box-shadow: none;
    margin-bottom: 45px;
  }
`;

export default SafeApp;
