import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { RiArrowDropDownLine } from 'react-icons/ri/index.js';
import { useTheme } from 'styled-components';

import type { SelectProps } from './Select.types';
import { BaseSelect, StyledOption, WithIcon } from './Select.styles';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      defaultValue,
      long,
      full,
      placeholder,
      disabled,
      error,
      warning,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const wrapperClasses = classNames({
      long,
      full,
    });
    const classes = classNames({
      long,
      full,
      error,
      warning,
    });
    return (
      <WithIcon className={`${containerClassName} ${wrapperClasses}`}>
        <BaseSelect
          {...props}
          ref={ref}
          className={`${className} ${classes}`}
          defaultValue={defaultValue}
          disabled={disabled}
        >
          {placeholder && <StyledOption value="">{placeholder}</StyledOption>}
          {options?.map((option) => (
            <StyledOption key={option.key || option.value} value={option.value}>
              {option.name}
            </StyledOption>
          ))}
        </BaseSelect>
        <RiArrowDropDownLine
          size="2rem"
          color={disabled ? theme.neutral.step11 : theme.secondary.step11}
        />
      </WithIcon>
    );
  }
);
