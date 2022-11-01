import React, { RefObject } from 'react';

import classNames from 'classnames';
import { RiCheckLine, RiAsterisk } from 'react-icons/ri';
import { CheckboxProps } from '@radix-ui/react-checkbox';

import { Label } from '../Label/Label';
import { Icon } from '../Icon';
import {
  StyledCheckbox,
  StyledIndicator,
  Container,
  LabelContainer,
  RequiredAsterisk,
} from './Checkbox.styles';

type Ref =
  | RefObject<HTMLButtonElement>
  | ((instance: HTMLButtonElement | null) => void)
  | null
  | undefined;

export const Checkbox = React.forwardRef((props: CheckboxProps, ref: Ref) => {
  const { id, title, disabled, required } = props;

  const classes = classNames({
    disabled,
  });

  return (
    <Container>
      <StyledCheckbox {...props} ref={ref}>
        <StyledIndicator className={classes}>
          <RiCheckLine />
        </StyledIndicator>
      </StyledCheckbox>
      <LabelContainer>
        {required && (
          <RequiredAsterisk>
            <Icon label="Required">
              <RiAsterisk />
            </Icon>
          </RequiredAsterisk>
        )}
        <Label id={id}>{title ? title : 'No Title Found'}</Label>
      </LabelContainer>
    </Container>
  );
});
