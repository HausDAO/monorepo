import React, { FocusEventHandler, FormEventHandler } from 'react';
import classNames from 'classnames';

import { SwitchProps } from './Switch.types';
import {
  SwitchBase,
  SwitchSlider,
  Container,
  LabelContainer,
  StyledLabel,
} from './Switch.styles.';

type LabelProps = {
  id?: string;
  children: React.ReactChild;
  className: string;
};

// ! Why this here? Should use label component. Refactor label out
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

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
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
