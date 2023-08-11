import { RiCloseFill } from 'react-icons/ri/index.js';
import styled from 'styled-components';

import { WrappedInput } from '../WrappedInput';

export const FileInputContents = styled.div`
  padding: 3.6rem 0;
  display: flex;

  .hidden-input {
    display: none;
  }
`;

export const ImageDisplayWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 3.4rem;
  padding: 1rem;
  background: ${({ theme }) => theme.imageInput.imageWrapper.bg};
`;

export const CancelIcon = styled(RiCloseFill)`
  margin-left: 1rem;
  font-size: 2rem;
  color: ${({ theme }) => theme.imageInput.cancelIcon.color};
  &:hover {
    cursor: pointer;
  }
`;

export const HiddenWrappedInput = styled(WrappedInput)`
  .field-slot {
    display: 'none';
  }
`;
