import styled from 'styled-components';

export const WithIcon = styled.div`
  display: flex;
  align-items: flex-start;
  svg {
    color: ${(props) => props.color};
  }
  p {
    margin-left: 0.65rem;
    color: ${(props) => props.color};
  }
`;
