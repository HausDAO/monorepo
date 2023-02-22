import { Card, ParXs, Theme } from '@daohaus/ui';
import { RiErrorWarningLine } from 'react-icons/ri';
import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 0rem 3.6rem;
`;

export const DisplayContainer = styled.div`
  margin-top: 2rem;

  .display-segment {
    display: flex;
    flex-direction: column;
  }

  .data {
    word-break: break-all;
    margin-bottom: 2rem;
    .space,
    .address-display {
      margin-bottom: 2rem;
    }
  }
  .value-box {
    display: flex;
  }
`;

export const AlertContainer = styled.div`
  margin-bottom: 2rem;
`;

export const WarningContainer = styled(Card)`
  display: flex;
  width: 100%;
  background-color: ${({
  theme,
  error,
  warning,
}: {
  theme: Theme;
  error: boolean;
  warning: boolean;
}) => (error && theme.danger.step3) || (warning && theme.warning.step3)};
  border-color: ${({
  theme,
  error,
  warning,
}: {
  theme: Theme;
  error: boolean;
  warning: boolean;
}) => (error && theme.danger.step7) || (warning && theme.warning.step7)};
`;

export const StyledParXs = styled(ParXs)`
  color: ${({
  theme,
  error,
  warning,
}: {
  theme: Theme;
  error: boolean;
  warning: boolean;
}) => (error && theme.danger.step12) || (warning && theme.warning.step12)};
`;

export const Spacer = styled.div`
  margin-top: 2rem;
`;

export const WarningIcon = styled(RiErrorWarningLine)`
  color: ${({ theme }: { theme: Theme }) => theme.warning.step9};
  height: 2.5rem;
  width: 2.5rem;
`;

export const IconContainer = styled.div`
  margin-right: 1rem;
`;

export const MessageContainer = styled.div``;
