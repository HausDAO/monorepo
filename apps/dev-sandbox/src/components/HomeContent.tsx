import styled from 'styled-components';

import { breakpoints, H1, ParXl } from '@daohaus/ui';

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
    .tag-line {
      font-size: 3.2rem;
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
export const HomeContent = () => {
  return (
    <ViewBox>
      <div className="text-section">
        <H1 className="hero">Home</H1>
        <ParXl className="tag-line">Development Sandbox</ParXl>
      </div>
    </ViewBox>
  );
};
