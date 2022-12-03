import { RiCloseFill } from 'react-icons/ri/index.js';
import styled from 'styled-components';

import { Theme } from '../../../types/theming';

export const FileInputContents = styled.div`
  padding: 3.6rem 0;
  display: flex;
`;

export const ImageDisplayWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 3.4rem;
  padding: 1rem;
  background: ${({ theme }: { theme: Theme }) => theme.secondary.step2};
`;

export const CancelIcon = styled(RiCloseFill)`
  margin-left: 1rem;
  font-size: 2rem;
  color: ${({ theme }: { theme: Theme }) => theme.secondary.step6};
  :hover {
    cursor: pointer;
  }
`;
