import classNames from 'classnames';
import { forwardRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';

import { BaseSelect, StyledOption, WithIcon } from './Select.styles';
import { SelectProps } from '../../../types/formAndField';

type Ref =
  | React.RefObject<HTMLSelectElement>
  | ((instance: HTMLSelectElement | null) => void)
  | null
  | undefined;

export const Select = forwardRef(
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
    }: SelectProps,
    ref: Ref
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
