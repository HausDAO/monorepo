import { Field, OptionType } from '../../../types';

export type TimePickerProps = Field & {
  defaultValue?: string;
  options?: OptionType[];
  selectId?: string;
  selectPlaceholder?: string;
};
