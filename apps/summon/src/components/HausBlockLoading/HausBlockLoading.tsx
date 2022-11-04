import { BlockImageContainer } from '../../layouts/FormLayouts';

import hausBlock from '../../assets/hausBlock.svg';
import hausBlockAnimated from '../../assets/hausBlockAnimated.svg';

export const HausBlockLoading = ({ loading }: { loading: boolean }) => {
  return (
    <BlockImageContainer>
      <div className="img-block">
        {loading ? (
          <img src={hausBlockAnimated} alt="daohaus block pattern" />
        ) : (
          <img src={hausBlock} alt="daohaus block pattern" />
        )}
      </div>
    </BlockImageContainer>
  );
};
