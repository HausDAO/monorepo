import type { LabelProps } from './Label.types';
import { StyledLabel } from './Label.styles';

export const Label: React.FC<LabelProps> = ({
  children = 'label',
  id,
  className,
}: LabelProps) => {
  return (
    <StyledLabel htmlFor={id} className={className}>
      {children}
    </StyledLabel>
  );
};
