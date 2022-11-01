import React from 'react';

import classNames from 'classnames';
import { BaseTextArea } from './TextArea.styles';
import { Field } from '../../../types/formAndField';

export type TextAreaProps = Field & {
  className?: string;
  height?: string;
};

type Ref =
  | React.RefObject<HTMLTextAreaElement>
  | ((instance: HTMLTextAreaElement | null) => void)
  | null
  | undefined;

export const TextArea = React.forwardRef((props: TextAreaProps, ref: Ref) => {
  const { full, warning, error, success, className, height } = props;
  const classes = classNames({
    full,
    success,
    warning,
    error,
  });

  return (
    <BaseTextArea
      {...props}
      className={`${classes} ${className}`}
      ref={ref}
      rows={10}
      height={height}
    />
  );
});
