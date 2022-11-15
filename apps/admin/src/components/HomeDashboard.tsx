import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  handleErrorMessage,
  isValidNetwork,
  ITransformedMembership,
  ValidNetwork,
} from '@daohaus/utils';
import { Haus } from '@daohaus/moloch-v3-data';
import {
  H2,
  Spinner,
  useBreakpoint,
  useDebounce,
  widthQuery,
} from '@daohaus/ui';

import {
  defaultNetworks,
  DEFAULT_SORT_KEY,
  getDelegateFilter,
  SORT_FIELDS,
} from '../utils/hub';
import { DaoList } from './DaoList';
import { ListActions } from './ListActions';
import { useParams } from 'react-router-dom';

export enum ListType {
  Cards,
  Table,
}

export const HomeDashboard = () => {
  const { profile } = useParams();
  const isMobile = useBreakpoint(widthQuery.sm);

  const [daoData, setDaoData] = useState<ITransformedMembership[]>([]);
  const [filterNetworks, setFilterNetworks] =
    useState<Record<string, string>>(defaultNetworks);
  const [filterDelegate, setFilterDelegate] = useState<string | ''>('');
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_KEY);
  const [searchTerm, setSearchTerm] = useState<string | ''>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [listType, setListType] = useState<ListType>(ListType.Cards);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    let shouldUpdate = true;
    const getDaos = async (address: string) => {
      setLoading(true);
      try {
        const haus = Haus.create({
          graphApiKeys: {
            '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'],
          },
        });
        const query = await haus.profile.listDaosByMember({
          memberAddress: address,
          networkIds: Object.keys(filterNetworks) as ValidNetwork[],
          daoFilter: { name_contains_nocase: debouncedSearchTerm },
          memberFilter: getDelegateFilter(filterDelegate, address),
          ordering: SORT_FIELDS[sortBy].ordering,
        });
        if (query.data?.daos && shouldUpdate) {
          setDaoData(query.data.daos);
          setLoading(false);
        }
      } catch (error) {
        const errMsg = handleErrorMessage({
          error,
          fallback: 'Error loading DAOs',
        });
        console.error(errMsg);
      } finally {
        setLoading(false);
      }
    };
    if (!profile) return;
    getDaos(profile);
    return () => {
      shouldUpdate = false;
    };
  }, [profile, filterNetworks, filterDelegate, sortBy, debouncedSearchTerm]);

  const toggleNetworkFilter = (event: MouseEvent<HTMLButtonElement>) => {
    const network = event.currentTarget.value;
    if (network && isValidNetwork(network)) {
      filterNetworks[network]
        ? setFilterNetworks((prevState) => {
            delete prevState[network];
            return { ...prevState };
          })
        : setFilterNetworks((prevState) => ({
            ...prevState,
            [network]: network,
          }));
    }
  };
  const toggleDelegateFilter = (event: MouseEvent<HTMLButtonElement>) => {
    setFilterDelegate((prevState) =>
      prevState === event.currentTarget.value ? '' : event.currentTarget.value
    );
  };
  const switchSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const toggleListType = () => {
    setListType((prevState) =>
      prevState === ListType.Cards ? ListType.Table : ListType.Cards
    );
  };

  const tableControlProps = {
    toggleNetworkFilter,
    toggleDelegateFilter,
    toggleListType,
    switchSortBy,
    setSearchTerm,
    filterNetworks,
    filterDelegate,
    sortBy,
    listType,
    searchTerm,
    totalDaos: daoData.length,
    noun: {
      singular: 'DAO',
      plural: 'DAOs',
    },
  };

  if (!daoData.length) {
    return (
      <ListActions {...tableControlProps}>
        <NoDaosFound />
      </ListActions>
    );
  }
  if (loading) {
    return (
      <ListActions {...tableControlProps}>
        <Loading isMobile={isMobile} />
      </ListActions>
    );
  }
  return (
    <ListActions {...tableControlProps}>
      <DaoList daoData={daoData} isMobile={isMobile} listType={listType} />
    </ListActions>
  );
};

const CenterFrame = styled.div`
  height: 30rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .inner {
    position: absolute;
  }
`;

const Loading = ({ isMobile }: { isMobile: boolean }) => (
  <CenterFrame>
    <div className="inner">
      <Spinner size={isMobile ? '8rem' : '16rem'} />
    </div>
  </CenterFrame>
);
const NoDaosFound = () => (
  <CenterFrame>
    <H2>No Daos Found</H2>
  </CenterFrame>
);
