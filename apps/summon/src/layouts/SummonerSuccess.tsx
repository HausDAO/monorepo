import {
  Bold,
  Button,
  H1,
  ParMd,
  Link,
  AddressDisplay,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';

import { InfoSection } from './FormLayouts';
import { HausBlockLoading } from '../components/HausBlockLoading/HausBlockLoading';
import { ReactSetter } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';

import { SummonStates } from '../app/App';
import styled from 'styled-components';

type SuccessProps = {
  daoAddress: string;
  chainId: string | null | undefined;
  setSummonState: ReactSetter<SummonStates>;
};

const AddressInfoSection = styled(InfoSection)`
  p,
  div {
    margin-bottom: 1rem;
  }

  a {
    margin-bottom: 1rem;
    align-items: flex-start;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 3rem;
  a {
    button {
      width: 200px;
      justify-content: center;
    }
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    button {
      margin-bottom: 2rem;
    }
  }
  /* justify-content: flex-start; */
`;

export const SummonerSuccess = ({
  daoAddress,
  chainId,
  setSummonState,
}: SuccessProps) => {
  const handleResetSummon = () => {
    setSummonState('idle');
  };
  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <div>
      <H1 className="title">
        <Bold>DAO Summoned</Bold>
      </H1>
      <ParMd>
        Learn more about{' '}
        <Link href="https://daohaus.mirror.xyz/U_JQtheSzdpRFqQwf9Ow3LgLNG0WMZ6ibAyrjWDu_fc">
          Moloch v3
        </Link>
      </ParMd>
      <HausBlockLoading loading={false} />
      <AddressInfoSection>
        <ParMd className="info">DAO contract:</ParMd>
        <AddressDisplay
          address={daoAddress}
          copy
          explorerNetworkId={chainId as keyof Keychain}
          truncate={isMobile}
        />
      </AddressInfoSection>
      <ButtonGroup>
        <Button
          color="secondary"
          onClick={handleResetSummon}
          // centerAlign={isMobile}
          fullWidth={isMobile}
        >
          <Bold>Summon Another DAO</Bold>
        </Button>
        <Link
          href={`https://admin.daohaus.fun/#/molochv3/${chainId}/${daoAddress}`}
          showExternalIcon={false}
        >
          <Button
            // centerAlign={isMobile}
            fullWidth={isMobile}
          >
            View DAO
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};
