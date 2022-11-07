import styled from 'styled-components';

import { Button, Spinner } from '../../atoms/';

export const StyledLoadingButton = styled(Button)`
  ${Spinner} {
    border-top: 1px solid red;
    border-right: 1px solid red;
    border-bottom: 1px solid red
    border-left: 1px solid green;
  }
`;
