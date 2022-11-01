import React from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons/ri';

import { BaseInput, WithIcon } from './Input.styles';
import { Field } from '../../../types/formAndField';

export type InputProps = Field & {
  icon?: IconType;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string;
};

type Ref =
  | React.RefObject<HTMLInputElement>
  | ((instance: HTMLInputElement | null) => void)
  | null
  | undefined;

export const Input = React.forwardRef((props: InputProps, ref: Ref) => {
  const {
    id,
    long,
    full,
    icon,
    success,
    warning,
    error,
    number,
    address,
    className,
  } = props;

  const inputClasses = classNames({
    long: long || address,
    full,
    success,
    warning,
    error,
    number: number || address,
  });

  if (icon) {
    const wrapperClasses = classNames({
      long: long || address,
      full,
    });
    const Icon = icon;

    return (
      <WithIcon className={wrapperClasses}>
        <BaseInput
          name={id}
          className={`${inputClasses} ${className}`}
          ref={ref}
          {...props}
        />
        <Icon size="2rem" />
      </WithIcon>
    );
  }

  return (
    <BaseInput
      key={id}
      name={id}
      className={`${inputClasses} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
