import styled from 'styled-components';

export const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.field.labelFont};
  font-weight: ${({ theme }) => theme.font.weight.reg};
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${(props) => props.color};
`;
