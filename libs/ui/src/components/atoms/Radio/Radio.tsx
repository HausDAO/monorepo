import React from 'react';
import {
  RadioGroupProps,
  RadioGroupItemProps,
} from '@radix-ui/react-radio-group';

import {
  RadioGroup,
  RadioItem,
  RadioIndicator,
  Container,
  LabelContainer,
} from './Radio.styles';
import { Label } from '../Label/Label';

export type RadioProps = { label: string; id: string } & RadioGroupItemProps;
export type Props = {
  className?: string;
  defaultValue?: string;
  radios: RadioProps[];
};

type Ref =
  | React.RefObject<HTMLInputElement>
  | ((instance: HTMLInputElement | null) => void)
  | null
  | undefined;

export const Radio = React.forwardRef(
  (props: RadioGroupProps & Props, ref: Ref) => {
    const { className, radios, defaultValue } = props;
    return (
      <RadioGroup {...props} defaultValue={defaultValue} className={className}>
        {radios.map((radio: RadioProps) => (
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
