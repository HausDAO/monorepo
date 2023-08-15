import styled from 'styled-components';

export const ProgressVisualFull = styled.div<{ $backgroundColor: string }>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  display: flex;
  height: 10px;
`;

export const ProgressVisualPart = styled.div<{
  width: string;
  $backgroundColor: string;
}>`
  width: ${(props) => props.width};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  /* Number of the seconds for complete animation */
  transition: width 2s;
`;
