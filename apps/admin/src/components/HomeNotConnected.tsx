import { breakpoints, H1, Italic, ParMd, ParXl } from '@daohaus/ui';
import styled from 'styled-components';

const ViewBox = styled.div`
  grid-area: body;
  width: 100%;
  height: 70rem;
  display: flex;
  background-image: url('assets/hub-illustration.svg');
  background-size: auto 60rem;
  background-repeat: no-repeat;
  background-position: -10% 180%;
  margin-top: 6.3rem;
  .text-section {
    width: 100%;
    max-width: 40rem;
    min-width: 28rem;
  }
  .hero {
    font-size: 6rem;
    font-weight: 900;
  }
  .tag-line {
    font-size: 1.6rem;
    margin-bottom: 3.2rem;
    font-weight: 700;
  }
  ul {
    margin-top: 2.4rem;
    padding-inline-start: 2.4rem;
    margin-top: 2.4rem;
  }
  li {
    font-size: 1.6rem;
  }
  @media (min-width: ${breakpoints.xs}) {
    height: 80rem;
    background-size: auto 70rem;
    background-position: 6rem 8rem;
  }
  @media (min-width: ${breakpoints.sm}) {
    height: 90rem;
    background-size: auto 80rem;
    background-position: 20rem 10rem;
    .hero {
      font-size: 6.6rem;
    }
    .connect {
      font-size: 3.6rem;
    }
    .tag-line {
      font-size: 3.2rem;
    }
    ul {
      margin-top: 3.2rem;
    }
    li {
      font-size: 2.4rem;
      margin-bottom: 1.6rem;
    }
  }
  @media (min-width: ${breakpoints.md}) {
    .text-section {
      max-width: 52rem;
    }
    height: 100rem;
    background-size: auto 90rem;
    background-position: 110% 30%;
  }
`;
export const HomeNotConnected = () => {
  return (
    <ViewBox>
      <div className="text-section">
        <H1 className="hero">HUB</H1>
        <ParXl className="tag-line">
          Schelling point for all your DAO activity
        </ParXl>
        <ParMd className="connect">
          <Italic>Connect a wallet to:</Italic>
        </ParMd>
        <ul>
          <ParMd>
            <li>See all your DAOs</li>
          </ParMd>
          <ParMd>
            <li>View Active Proposals</li>
          </ParMd>
          <ParMd>
            <li>Manage your shared profile</li>
          </ParMd>
        </ul>
      </div>
    </ViewBox>
  );
};
