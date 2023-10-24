import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ValidNetwork } from '@daohaus/keychain-utils';
import {
  Button,
  Card,
  Identicon,
  Loader,
  Title,
  Text,
  GenericModal,
  Icon,
} from '@gnosis.pm/safe-react-components';
import { Container, Grid } from '@material-ui/core';
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';

import WizardForm from './WizardForm';
import { VALID_NETWORKS } from '../utils/chain';
import { MODULES } from '../utils/modules';
import { ModuleTemplate } from '../utils/types';

interface MarketProps {
  daoOnly?: boolean;
}

const ModuleMarket: React.FC<MarketProps> = (props: MarketProps) => {
  const [chainId, setChainId] = useState<ValidNetwork>();
  const [loading] = useState(false);
  const [wizardEnabled, toggleWizard] = useState<ModuleTemplate | undefined>();
  const [successModal, toggleSuccess] = useState(false);
  const [requireSignatures, setRequireSignatures] = useState(false);
  const { safe } = useSafeAppsSDK();

  useEffect(() => {
    setChainId(VALID_NETWORKS[safe.chainId]);
  }, [safe]);

  const installModuleTemplate = useCallback(async (module: ModuleTemplate) => {
    toggleWizard(module);
  }, []);

  return (
    <StyledMainContainer>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item style={{ marginBottom: '1rem' }}>
          {!wizardEnabled && (
            <Grid container direction="row" alignItems="center">
              <StyledTitle size="md">Modules Market</StyledTitle>
              <Text size="lg">
                You can install one of the DAOHaus specialized Modules for your
                Safe or DAO
              </Text>
            </Grid>
          )}
        </Grid>
      </Grid>
      {loading ? (
        <StyledContainer>
          <Loader size="sm" />
        </StyledContainer>
      ) : (
        <div>
          {!wizardEnabled ? (
            <Grid container direction="row" justifyContent="space-between">
              {Object.keys(MODULES)
                .filter(
                  (key) => chainId && MODULES[key].chain[chainId].moduleFactory
                )
                .map((mod, idx) => (
                  <Grid key={idx} item xs={6}>
                    <StyledDaoCard>
                      <Grid
                        container
                        direction="column"
                        spacing={2}
                        style={{ alignItems: 'center' }}
                      >
                        <Grid
                          item
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          {MODULES[mod].avatarImg ? (
                            <img
                              alt="Module Avatar"
                              src={MODULES[mod].avatarImg}
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                              }}
                            />
                          ) : (
                            <Identicon address={`0x${idx}`} size="xl" />
                          )}
                          <Text strong size="xl">
                            {MODULES[mod].name}
                          </Text>
                        </Grid>
                        <Grid item>
                          <div style={{ minHeight: '80px' }}>
                            <Text size="sm">{MODULES[mod].description}</Text>
                          </div>
                        </Grid>
                        <Grid item>
                          <Button
                            onClick={() => installModuleTemplate(MODULES[mod])}
                            size="md"
                            variant="bordered"
                          >
                            Install
                          </Button>
                        </Grid>
                      </Grid>
                    </StyledDaoCard>
                  </Grid>
                ))}
              {Object.keys(MODULES).filter(
                (key) => chainId && MODULES[key].chain[chainId].moduleFactory
              ).length === 0 && (
                <Grid container direction="column" alignItems="center">
                  <Icon size="md" type="info" color="error" />
                  <Text size="xl">
                    No modules available in the current Network
                  </Text>
                </Grid>
              )}
            </Grid>
          ) : (
            <WizardForm
              moduleTemplate={wizardEnabled}
              onBackClicked={(success = false, requireSignatures = false) => {
                toggleSuccess(success);
                setRequireSignatures(requireSignatures);
                toggleWizard(undefined);
              }}
            />
          )}
        </div>
      )}
      {successModal && (
        <GenericModal
          onClose={() => {
            toggleSuccess(false);
            setRequireSignatures(false);
          }}
          title="Summoning Module Complete"
          body={
            <Grid container direction="column" alignItems="center">
              <Text size="md" strong>
                <span role="img" aria-label="congrats">
                  🎉
                </span>
                You have successfully installed a Module on your Safe
                <span role="img" aria-label="congrats">
                  🎉
                </span>
              </Text>
              {requireSignatures && (
                <Text size="md" strong>
                  Tx is queued for signatures confirmation
                </Text>
              )}
            </Grid>
          }
        />
      )}
    </StyledMainContainer>
  );
};

const StyledTitle = styled(Title)`
  padding-left: 5px;
  padding-right: 5px;
`;

const StyledMainContainer = styled(Container)`
  && {
    padding: 0;
  }
`;

const StyledContainer = styled(Container)`
  && {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

const StyledDaoCard = styled(Card)`
  && {
    margin: 5px;
    padding: 15px 15px;
    min-height: 200px;
  }
`;

export default ModuleMarket;
