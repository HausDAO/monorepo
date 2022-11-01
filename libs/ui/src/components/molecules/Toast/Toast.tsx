import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiCloseCircleFill,
} from 'react-icons/ri';

import { ParSm, Link } from '../../atoms';
import {
  ToastViewport,
  ToastHeaderContainer,
  ToastCopyContainer,
  ToastRoot,
  ToastIcon,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  CloseIcon,
} from './Toast.styles';
import {
  CustomToastProps,
  ToastLinksProps,
  ToastType,
} from '../../../types/toast.types';

export const Toast = (props: CustomToastProps) => {
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
      <ToastRoot
        type={type}
        open={open}
        duration={duration}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        className={toastType}
      >
        <ToastHeaderContainer>
          {getEnumIcons(toastType)}
          <ToastCopyContainer>
            <ToastTitle asChild>
              <ParSm>{title}</ParSm>
            </ToastTitle>
            {description && (
              <ToastDescription asChild>
                <ParSm>{description}</ParSm>
              </ToastDescription>
            )}
          </ToastCopyContainer>
          <ToastClose asChild aria-label={ariaLabelClose}>
            <CloseIcon>
              <RiCloseFill aria-hidden />
            </CloseIcon>
          </ToastClose>
        </ToastHeaderContainer>
        {toastLinks && <ToastLinks {...toastLinks} />}
      </ToastRoot>
      <ToastViewport label={label} hotkey={hotkey} />
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
    <ToastAction asChild altText={actionAltText || 'Related Link(s)'}>
      <div>
        {leftLink && <Link href={leftLink.path}>{leftLink.text}</Link>}
        {rightLink && <Link href={rightLink.path}>{rightLink.text}</Link>}
      </div>
    </ToastAction>
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
  return (
    <ToastIcon iconType={toastType}>{EnumIconsObject[toastType]}</ToastIcon>
  );
}
