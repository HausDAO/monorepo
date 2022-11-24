import React, { useCallback, useEffect, useState } from 'react';
import { ListDaosQueryResDaos } from '@daohaus/moloch-v3-data';
import { Container, Grid } from '@material-ui/core';
import {
  Button,
  Card,
  Icon,
  Identicon,
  Link,
  Loader,
  Title,
  Text,
} from '@gnosis.pm/safe-react-components';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import styled from 'styled-components';

import { VALID_NETWORKS } from '../utils/chain';
import { fetchDaos } from '../utils/graphql';

interface DaosProps {
  newBaalEvent: () => void;
}

const Daos: React.FC<DaosProps> = (props: DaosProps) => {
  const { newBaalEvent } = props;
  const [loading, setLoading] = useState(false);
  const [listDaos, setListDaos] = useState<Array<ListDaosQueryResDaos>>([]);
  const { sdk, safe, connected } = useSafeAppsSDK();

  const fetchSafeInfo = useCallback(async () => {
    setLoading(true);
    const daos = await fetchDaos(
      VALID_NETWORKS[safe.chainId],
      safe.safeAddress
    );
    if (daos.length) {
      setListDaos(daos);
    }
    setLoading(false);
  }, [safe]);

  useEffect(() => {
    if (sdk && connected && !listDaos.length) {
      fetchSafeInfo();
    }
  }, [fetchSafeInfo, listDaos, sdk, connected]);

  return (
    <StyledMainContainer>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <StyledTitle size="md">Your DAOs</StyledTitle>
            <Link onClick={fetchSafeInfo}>
              <Icon size="md" type="resync" tooltip="Refresh DAO List" />
            </Link>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            iconType="add"
            size="md"
            textSize="lg"
            iconSize="sm"
            color="primary"
            onClick={() => newBaalEvent()}
          >
            New DAO
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <StyledContainer>
          <Loader size="sm" />
        </StyledContainer>
      ) : listDaos.length ? (
        <Grid container direction="row" justifyContent="space-between">
          {listDaos.map((dao, idx) => (
            <Grid key={idx} item xs={6}>
              <Link
                href={`https://admin.daohaus.fun/#/molochv3/${
                  VALID_NETWORKS[safe.chainId]
                }/${dao.id}`}
                target="_blank"
              >
                <StyledDaoCard>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      {dao.avatarImg ? (
                        <img
                          alt="DAO Avatar"
                          src={dao.avatarImg}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                          }}
                        />
                      ) : (
                        <Identicon address={dao.id} size="xl" />
                      )}
                    </Grid>
                    <Grid item>
                      <Text strong size="xl">
                        {dao.name}
                      </Text>
                    </Grid>
                    <Grid item>
                      <Text size="lg">{dao.activeMemberCount} Members</Text>
                    </Grid>
                    <Grid item>
                      <Text size="lg">{dao.proposalCount} Proposals</Text>
                    </Grid>
                    <Grid item>
                      <Text size="md">
                        Created:{' '}
                        {new Date(
                          Number(dao.createdAt) * 1000
                        ).toLocaleDateString()}
                      </Text>
                    </Grid>
                  </Grid>
                </StyledDaoCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <StyledContainer>
          <Text size="xl">No DAOs found</Text>
        </StyledContainer>
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

export default Daos;
