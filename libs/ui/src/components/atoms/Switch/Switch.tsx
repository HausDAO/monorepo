import React, { FocusEventHandler, FormEventHandler } from 'react';
import { SwitchProps } from '@radix-ui/react-switch';
import {
  SwitchBase,
  SwitchSlider,
  Container,
  LabelContainer,
  StyledLabel,
} from './Switch.styles.';
import classNames from 'classnames';

type LabelProps = {
  id?: string;
  children: React.ReactChild;
  className?: string;
};

const Label: React.FC<LabelProps> = ({
  children = 'label',
  id,
  className,
}: LabelProps) => {
  return (
    <StyledLabel htmlFor={id} className={className}>
      {children}
    </StyledLabel>
  );
};

export type Props = {
  defaultOn?: boolean;
  fieldLabel: string;
  id?: string;
  className?: string;
  switchOn?: boolean;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  onChange?: FormEventHandler<HTMLButtonElement>;
  onCheckedChange?: () => void;
};

type Ref =
  | React.RefObject<HTMLInputElement>
  | ((instance: HTMLInputElement | null) => void)
  | null
  | undefined;

export const Switch = React.forwardRef(
  (
    props: Omit<SwitchProps, 'checked' | 'defaultChecked'> & Props,
    ref: Ref
  ) => {
    const {
      fieldLabel,
      id,
      className,
      disabled,
      switchOn,
      defaultOn = false,
      onBlur,
      onChange,
      onCheckedChange,
    } = props;
    const classes = classNames({
      disabled,
    });
    return (
      <Container className={className}>
        <SwitchBase
          checked={switchOn}
          defaultChecked={defaultOn}
          onBlur={onBlur}
          onChange={onChange}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        >
          <SwitchSlider ref={ref} />
        </SwitchBase>
        <LabelContainer>
          <Label id={id} className={classes}>
            {fieldLabel}
          </Label>
        </LabelContainer>
      </Container>
    );
  }
);
