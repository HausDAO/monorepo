import { DataMd, DataXl, Tooltip } from '../../atoms';

import { DataIndicatorProps } from './DataIndicator.types';
import {
  DataIndicatorContainer,
  DataIndicatorLabelSm,
  DataIndicatorLabelMd,
} from './DataIndicator.styles';

export const DataIndicator = ({
  label,
  data,
  size = 'lg',
  info,
}: DataIndicatorProps) => {
  if (size === 'sm') {
    return (
      <DataIndicatorContainer>
        <DataIndicatorLabelMd>
          {label} {info && <Tooltip content={info} />}
        </DataIndicatorLabelMd>
        <DataMd>{data}</DataMd>
      </DataIndicatorContainer>
    );
  }

  return (
    <DataIndicatorContainer>
      <DataIndicatorLabelSm>
        {label} {info && <Tooltip content={info} />}
      </DataIndicatorLabelSm>
      <DataXl>{data}</DataXl>
    </DataIndicatorContainer>
  );
};
