import styled from 'styled-components';
import { Link } from '@gnosis.pm/safe-react-components';
import { Container } from '@material-ui/core';

const AppFooter = () => {
  return (
    <StyledFooter>
      <Link href="https://daohaus.club/" target="_blank">
        <StyledImage alt="built by daohaus" src="/assets/daohaus.png" />
      </Link>
    </StyledFooter>
  );
};

const StyledImage = styled.img`
  max-height: 150px;
  max-width: 200px;
`;

const StyledFooter = styled(Container)`
  && {
    margin-left: 30px;
    margin-right: 30px;
    padding: 0;
  }
`;

export default AppFooter;
