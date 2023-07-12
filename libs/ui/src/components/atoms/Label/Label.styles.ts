import styled from 'styled-components';
import { font } from '../../../theme/global/font';

export const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.font.family.body};
  font-weight: ${font.weight.reg};
  font-size: ${font.size.md};
  color: ${(props) => props.color};
`;
