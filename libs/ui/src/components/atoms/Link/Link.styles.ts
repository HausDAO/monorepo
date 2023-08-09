import styled, { css } from 'styled-components';

export const LinkStyles = css`
  align-items: center;
  color: ${({ theme }) => theme.link.color};
  cursor: pointer;
  display: inline-flex;
  font-family: ${({ theme }) => theme.font.family.body};
  font-weight: ${({ theme }) => theme.font.weight.reg};
  font-size: ${({ theme }) => theme.font.size.md};
  text-decoration: none;
  letter-spacing: 1.5px;
  &:hover {
    text-decoration: underline;
  }

  .icon-left {
    width: 25px;
    margin-right: 0.5rem;
  }

  svg {
    margin-left: 0.3rem;
  }
  &.button-link {
    &:hover {
      text-decoration: none;
    }
  }
`;

export const StyledLink = styled.a`
  ${LinkStyles}
`;
