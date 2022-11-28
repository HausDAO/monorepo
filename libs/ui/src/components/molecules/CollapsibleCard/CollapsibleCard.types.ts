import { CollapsibleProps } from '@radix-ui/react-collapsible';

export type CollapsibleCardProps = CollapsibleProps & {
  collapsibleContent?: React.ReactNode;
  triggerLabel: string;
  width: string;
};
