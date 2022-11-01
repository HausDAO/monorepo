import React from 'react';
import { CollapsibleProps } from '@radix-ui/react-collapsible';

import {
  StyledCollapsibleCard,
  StyledCollapsibleCardTrigger,
  StyledCollapsibleCardButton,
  StyledCollapsibleContent,
  InnerCard,
} from './CollapsibleCard.styles';
import { RiArrowDropDownLine } from 'react-icons/ri';

export type CardProps = CollapsibleProps & {
  collapsibleContent?: React.ReactNode;
  triggerLabel: string;
  width: string;
};

export const CollapsibleContent = StyledCollapsibleContent;

export const CollapsibleCard = ({
  open,
  onChange,
  width = 'fit-content',
  children,
  collapsibleContent,
  triggerLabel = 'Show More',
}: CardProps) => {
  return (
    <StyledCollapsibleCard open={open} onChange={onChange} width={width}>
      <InnerCard>
        {children}
        <StyledCollapsibleCardTrigger asChild>
          <StyledCollapsibleCardButton>
            {triggerLabel}
            <RiArrowDropDownLine />
          </StyledCollapsibleCardButton>
        </StyledCollapsibleCardTrigger>
      </InnerCard>
      <StyledCollapsibleContent>
        {collapsibleContent ? collapsibleContent : <p>No Content found</p>}
      </StyledCollapsibleContent>
    </StyledCollapsibleCard>
  );
};
