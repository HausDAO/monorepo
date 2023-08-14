import React from 'react';
import classNames from 'classnames';

import type { InputProps } from './Input.types';
import { BaseInput, WithIcon } from './Input.styles';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
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
      placeholder,
      defaultValue,
      value,
      disabled,
      hidden,
      onChange,
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
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            disabled={disabled}
            hidden={hidden}
            onChange={onChange}
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
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        hidden={hidden}
        onChange={onChange}
      />
    );
  }
);
