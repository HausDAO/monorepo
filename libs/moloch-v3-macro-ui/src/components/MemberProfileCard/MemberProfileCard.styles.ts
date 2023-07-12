import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import {
  breakpoints,
  Button,
  Card,
  DropdownLabel,
  DropdownLinkStyles,
  font,
  ProfileAvatar,
  widthQuery,
} from '@daohaus/ui';
import { indigoDark } from '@radix-ui/colors';

export const MProfileCard = styled(Card)`
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const ValueRow = styled.div`
  width: 64rem;
  padding: 3rem 0;
  text-align: left;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AlertContainer = styled(Card)`
  display: flex;
  gap: 3rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  padding: 2.3rem 2.5rem;
  border: none;
  min-height: 23.8rem;

  @media ${widthQuery.sm} {
    gap: 2rem;
    height: auto;
    margin-bottom: 2rem;
  }
`;

export const AvatarLarge = styled(ProfileAvatar)`
  height: 12rem;
  width: 12rem;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: ${indigoDark.indigo5};
  padding: 2.8rem;
  min-height: 30rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${indigoDark.indigo5};
`;

export const PSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ProfileNameContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ProfileMetadataContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;

  @media (min-width: ${breakpoints.xs}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const ProfileDataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    padding: 2rem 0;
    width: 18rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;

export const ProfileMenuTrigger = styled(Button)`
  padding: 0 4px 0 4px;

  &[data-state='open'] {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  svg.icon-right {
    color: ${({ theme }) => theme.primary.step9};
  }

  svg.icon-left {
    margin-right: 0;
    width: 5rem;
  }
`;

export const ProfileMenuLink = styled(RouterLink)`
  ${DropdownLinkStyles}
  font-weight: ${font.weight.bold};
`;

export const ProfileMenuText = styled(DropdownLabel)`
  border-radius: 2px;
  color: ${(props) => props.theme.secondary.step12};
  font-weight: ${font.weight.bold};
  cursor: pointer;
  display: flex;
  padding: 1rem;
  transition: 0.2s all;
  width: 100%;
  font-size: ${font.size.md};

  svg {
    margin-left: 0.3rem;
  }

  :hover {
    background-color: ${(props) => props.theme.secondary.step4};
    border-color: ${(props) => props.theme.secondary.step8};
    text-decoration: none;
  }

  &.disabled {
    color: ${(props) => props.theme.secondary.step11};
  }
`;

export const MemberContainer = styled.div`
  button {
    padding-left: 0 !important;
  }
`;

export const StyledRouterLink = styled(RouterLink)`
  ${DropdownLinkStyles}
  :hover {
    text-decoration: none;
  }
`;
