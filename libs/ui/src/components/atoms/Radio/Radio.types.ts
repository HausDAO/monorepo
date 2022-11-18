import {
  RadioGroupProps,
  RadioGroupItemProps,
} from '@radix-ui/react-radio-group';

export interface RadioItemGroupProps extends RadioGroupProps {
  defaultValue?: string;
  radios: RadioItemProps[];
}

export interface RadioItemProps extends RadioGroupItemProps {
  label: string;
}
