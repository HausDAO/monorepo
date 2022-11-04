import MuiAppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { Link, Text } from '@gnosis.pm/safe-react-components';

const BAAL_DOCS = 'https://summon.daohaus.fun';

const AppBar = () => {
  return (
    <StyledAppBar position="static" color="default">
      <StyledAppBarTitle size="xl">DAO Launcher</StyledAppBarTitle>
      <StyledSubtitleContainer>
        <Text size="md">
          Upgrade your DAO with a Moloch v3 DAO module. Read more about Moloch
          v3{' '}
          <Link href={BAAL_DOCS} target="_blank">
            here
          </Link>
        </Text>
      </StyledSubtitleContainer>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(MuiAppBar)`
  && {
    background: #fff;
    height: 70px;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    border-bottom: 2px solid #e8e7e6;
  }
`;

const StyledAppBarTitle = styled(Text)`
  font-size: 20px;
  margin-left: 38px;
  margin-right: 16px;
`;

const StyledSubtitleContainer = styled(Container)`
  && {
    margin-left: 16px;
    margin-right: 16px;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

export default AppBar;
