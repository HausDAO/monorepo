import styled from 'styled-components';
import { Button } from '../../atoms/Button';

import { Loading } from '../../atoms/Loading';

export const StyledLoadingButton = styled(Button)`
  svg {
    &.loading {
      visibility: hidden;
    }
  }
`;

export const LoadingAbsolute = styled(Loading)`
  position: absolute;
`;

export const StyledInvisibleSpan = styled.span`
  visibility: hidden;
`;
