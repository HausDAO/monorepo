import { StyledLabel } from './Label.styles';

type LabelProps = {
  id?: string;
  children: React.ReactChild;
};

export const Label: React.FC<LabelProps> = ({
  children = 'label',
  id,
}: LabelProps) => {
  return <StyledLabel htmlFor={id}>{children}</StyledLabel>;
};
