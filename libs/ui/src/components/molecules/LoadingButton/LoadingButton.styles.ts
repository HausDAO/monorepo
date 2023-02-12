import styled from 'styled-components';
import { Button } from '../../atoms/Button';

import { Loading } from '../../atoms/Loading';

export const StyledLoadingButton = styled(Button)`
  &.loading {
    .icon-left,
    .icon-right {
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
