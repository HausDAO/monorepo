import React from 'react';
import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiCloseCircleFill,
} from 'react-icons/ri/index.js';

import { ParSm, Link } from '../../atoms';
import { ToastProps, ToastLinksProps, ToastType } from './Toast.types';
import {
  Provider,
  Viewport,
  HeaderContainer,
  CopyContainer,
  Root,
  Icon,
  Title,
  Description,
  Action,
  Close,
  CloseIcon,
} from './Toast.styles';

export const ToastProvider = Provider;

export const Toast = (props: ToastProps) => {
  const {
    title,
    description,
    type,
    defaultOpen,
    open,
    onOpenChange,
    duration,
    label,
    hotkey,
    toastType = 'default',
    ariaLabelClose = 'Close',
    toastLinks,
  } = props;

  return (
    <>
      <Root
        type={type}
        open={open}
        duration={duration}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        className={toastType}
      >
        <HeaderContainer>
          {getEnumIcons(toastType)}
          <CopyContainer>
            <Title asChild>
              <ParSm>{title}</ParSm>
            </Title>
            {description && (
              <Description asChild>
                <ParSm>{description}</ParSm>
              </Description>
            )}
          </CopyContainer>
          <Close asChild aria-label={ariaLabelClose}>
            <CloseIcon>
              <RiCloseFill aria-hidden />
            </CloseIcon>
          </Close>
        </HeaderContainer>
        {toastLinks && <ToastLinks {...toastLinks} />}
      </Root>
      <Viewport label={label} hotkey={hotkey} />
    </>
  );
};

// If Toast contains links
const ToastLinks = ({
  leftLink,
  rightLink,
  actionAltText,
}: ToastLinksProps) => {
  return (
    <Action asChild altText={actionAltText || 'Related Link(s)'}>
      <div>
        {leftLink && <Link href={leftLink.path}>{leftLink.text}</Link>}
        {rightLink && <Link href={rightLink.path}>{rightLink.text}</Link>}
      </div>
    </Action>
  );
};

// Creating enum object of Icons
const EnumIconsObject = {
  default: <RiCheckboxCircleFill />,
  success: <RiCheckboxCircleFill />,
  warning: <RiErrorWarningFill />,
  error: <RiCloseCircleFill />,
};

function getEnumIcons(toastType: ToastType) {
  return <Icon $iconType={toastType}>{EnumIconsObject[toastType]}</Icon>;
}
