import type { LabelProps } from './Label.types';
import { StyledLabel } from './Label.styles';

export const Label: React.FC<LabelProps> = ({
  children = 'label',
  id,
}: LabelProps) => {
  return <StyledLabel htmlFor={id}>{children}</StyledLabel>;
};
