import styled from 'styled-components';
import { useState } from 'react';

import { Footer, widthQuery } from '@daohaus/ui';
import { DaoHausNav, useDHConnect } from '@daohaus/connect';

import { TXBuilder } from '@daohaus/tx-builder';
import { SummonerForm } from '../layouts/SummonerForm';
import { SummonerLoading } from '../layouts/SummonerLoading';
import { CenterLayout } from '../layouts/FormLayouts';
import { SummonerSuccess } from '../layouts/SummonerSuccess';
import { SummonError } from '../layouts/SummonError';

const TemporaryLayout = styled.div`
  width: 100%;
  padding-top: 2.7rem;
  padding: 4rem;
  @media ${widthQuery.sm} {
    .title {
      font-size: 3.5rem;
      margin-bottom: 2rem;
    }
  }
`;

export type SummonStates = 'idle' | 'loading' | 'success' | 'error';
export const App = () => {
  const { provider, chainId } = useDHConnect();

  const [summonState, setSummonState] = useState<SummonStates>('idle');
  const [txHash, setTxHash] = useState<string>('');
  const [daoAddress, setDaoAddress] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  return (
    <TXBuilder provider={provider} chainId={chainId} appState={{}}>
      <TemporaryLayout>
        <DaoHausNav />
        <CenterLayout>
          {summonState === 'idle' && (
            <SummonerForm
              setSummonState={setSummonState}
              setTxHash={setTxHash}
              setDaoAddress={setDaoAddress}
              setErrMsg={setErrMsg}
            />
          )}
          {summonState === 'loading' && <SummonerLoading txHash={txHash} />}
          {summonState === 'success' && (
            <SummonerSuccess
              chainId={chainId}
              daoAddress={daoAddress}
              setSummonState={setSummonState}
            />
          )}
          {summonState === 'error' && (
            <SummonError
              errMsg={errMsg}
              setSummonState={setSummonState}
              daoAddress={daoAddress}
            />
          )}
        </CenterLayout>
        <Footer />
      </TemporaryLayout>
    </TXBuilder>
  );
};

export default App;
