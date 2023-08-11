import React from 'react';
import classNames from 'classnames';

import { TextAreaProps } from './TextArea.types';
import { BaseTextArea } from './TextArea.styles';

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { full, warning, error, success, className, height, ...rest } = props;
    const classes = classNames({
      full,
      success,
      warning,
      error,
    });

    return (
      <BaseTextArea
        {...rest}
        className={`${classes} ${className}`}
        ref={ref}
        rows={10}
        height={height}
      />
    );
  }
);
