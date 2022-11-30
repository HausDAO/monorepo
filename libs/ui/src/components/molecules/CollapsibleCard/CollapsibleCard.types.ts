import { CollapsibleProps } from '@radix-ui/react-collapsible';

export type CollapsibleCardProps = CollapsibleProps & {
  collapsibleActions?: React.ReactNode;
  collapsibleContent?: React.ReactNode;
  triggerLabel: string;
  width: string;
};
