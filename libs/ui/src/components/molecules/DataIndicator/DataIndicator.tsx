import { DataMd, DataXl, Tooltip } from '../../atoms';
import {
  DataIndicatorContainer,
  DataIndicatorLabelSm,
  DataIndicatorLabelMd,
} from './DataIndicator.styles';

type DataIndicatorProps = {
  label?: string;
  data?: string | number;
  size?: 'lg' | 'sm';
  info?: string;
};

export const DataIndicator = ({
  label,
  data,
  size = 'lg',
  info,
}: DataIndicatorProps) => {
  if (size === 'sm') {
    return (
      <DataIndicatorContainer>
        <DataIndicatorLabelMd style={{ marginBottom: '0.5rem' }}>
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
