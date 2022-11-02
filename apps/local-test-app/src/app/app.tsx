import { HausLayout, useHausConnect } from '@daohaus/connect';
import { FormBuilder } from '@daohaus/form-builder';
import { TXBuilder } from '@daohaus/tx-builder';
import { FORM } from '../assets/forms';

function App() {
  const { provider } = useHausConnect();
  return (
    <TXBuilder
      provider={provider}
      chainId="0x5"
      daoId="0x643e8e197de8760a23c64cf78bef7047084d5408"
      safeId="0xacdbe468400d3cb18ab796e85b91395f7fb5db09"
      appState={{}}
    >
      <HausLayout pathname="/">
        <FormBuilder form={FORM.SIGNAL} targetNetwork="0x5" />
      </HausLayout>
    </TXBuilder>
  );
}

export default App;
