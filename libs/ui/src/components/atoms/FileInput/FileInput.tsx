import React from 'react';
import classNames from 'classnames';

import { FileInputProps } from '../../../types/formAndField';
import { BaseFileInput } from './FileInput.styles';

type Ref =
  | React.RefObject<HTMLInputElement>
  | ((instance: HTMLInputElement | null) => void)
  | null
  | undefined;

export const FileInput = React.forwardRef((props: FileInputProps, ref: Ref) => {
  const { id, success, warning, error, multiple, className } = props;

  const inputClasses = classNames({
    success,
    warning,
    error,
  });

  return (
    <BaseFileInput
      key={id}
      name={id}
      className={`${inputClasses} ${className}`}
      ref={ref}
      type="file"
      multiple={multiple}
      {...props}
    />
  );
});
