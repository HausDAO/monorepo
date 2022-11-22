import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabLinks = styled.ul`
  display: flex;
  width: '100%';
  list-style: none;

  background-color: ${(props) => props.theme.secondary.step2};

  .nav-link-list {
    a {
      margin-right: 4rem;
    }
  }
  .mobile-box {
    padding: 2.6rem;
  }
`;

export const TabLink = styled.li`
  border-bottom: 2px transparent solid;
  color: ${(props) => props.theme.secondary.step9};
  cursor: pointer;
  font-size: 2.2rem;
  letter-spacing: 1.5px;
  padding: 3.2rem 3.5rem 2.2rem 3.5rem;
  padding-bottom: 1rem;
  transition: 0.2s all;
  svg {
    margin-left: 0.3rem;
  }

  :hover {
    color: ${(props) => props.theme.secondary.step10};
    text-decoration: none;
  }

  &.selected {
    color: white;
    border-bottom: 2px ${(props) => props.theme.secondary.step9} solid;
  }

  &.nav-tabs {
    padding-bottom: 1rem;
  }
`;
