import styled from 'styled-components';

export const StyledLoader = styled.svg<{ $margin: string; $padding: string }>`
  animation: spin 1s linear infinite;
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const StyledInvisibleSpan = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
