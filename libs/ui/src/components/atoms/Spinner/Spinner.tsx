import styled, { useTheme } from 'styled-components';
// TODO: DELETE and replace with Loader SVG.

import { SpinnerType } from './Spinner.types';

const StyledSpinner = styled.div<{
  topColor?: string;
  bottomColor?: string;
  size?: string;
  strokeWidth?: string;
  margin?: string;
  padding?: string;
  speed?: string;
}>`
  &.loader,
  &.loader:after {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &.loader {
    font-size: 1rem;
    position: relative;
    text-indent: -9999em;
    border-top: ${(props) => `${props.strokeWidth} solid ${props.bottomColor}`};
    border-right: ${(props) =>
      `${props.strokeWidth} solid ${props.bottomColor}`};
    border-bottom: ${(props: SpinnerType) =>
      `${props.strokeWidth} solid ${props.bottomColor}`};
    border-left: ${(props: SpinnerType) =>
      `${props.strokeWidth} solid ${props.topColor}`};
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 ${(props: SpinnerType) => props.speed} infinite
      linear;
    animation: load8 ${(props: SpinnerType) => props.speed} infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div<{
  size?: string;
  margin?: string;
  padding?: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export const Spinner = ({
  topColor,
  bottomColor,
  size = '4rem',
  margin = '0',
  padding = '0',
  strokeWidth = '.5rem',
  speed = '1.1s',
}: SpinnerType) => {
  const theme = useTheme();
  return (
    <Container size={size} margin={margin} padding={padding}>
      <StyledSpinner
        topColor={topColor || theme.primary.step9}
        bottomColor={bottomColor || theme.primary.step4}
        size={size}
        className="loader"
        strokeWidth={strokeWidth}
        speed={speed}
      />
    </Container>
  );
};
