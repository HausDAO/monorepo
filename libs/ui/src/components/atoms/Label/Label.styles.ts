import { font } from '../../../theme/global/font';
import styled from 'styled-components';

export const StyledLabel = styled.label`
  font-family: ${font.family.body};
  font-weight: ${font.weight.reg};
  font-size: ${font.size.md};
  color: ${(props) => props.color};
`;
