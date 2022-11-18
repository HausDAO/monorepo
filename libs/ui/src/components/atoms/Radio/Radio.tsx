import React from 'react';

import { Label } from '../Label/Label';
import { RadioItemGroupProps, RadioItemProps } from './Radio.types';
import {
  RadioGroup,
  RadioItem,
  RadioIndicator,
  Container,
  LabelContainer,
} from './Radio.styles';

export const Radio = React.forwardRef<HTMLInputElement, RadioItemGroupProps>(
  (props, ref) => {
    const { className, radios, defaultValue } = props;
    return (
      <RadioGroup {...props} defaultValue={defaultValue} className={className}>
        {radios.map((radio: RadioItemProps) => (
          <Container key={radio.id}>
            <RadioItem {...radio}>
              <RadioIndicator ref={ref} />
            </RadioItem>
            <LabelContainer>
              <Label id={radio.id}>{radio.label}</Label>
            </LabelContainer>
          </Container>
        ))}
      </RadioGroup>
    );
  }
);
