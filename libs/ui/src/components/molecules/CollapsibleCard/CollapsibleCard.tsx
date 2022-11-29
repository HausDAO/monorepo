import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { CollapsibleCardProps } from './CollapsibleCard.types';
import {
  StyledCollapsibleCard,
  StyledCollapsibleCardTrigger,
  StyledCollapsibleCardButton,
  StyledCollapsibleContent,
  InnerCard,
} from './CollapsibleCard.styles';

export const CollapsibleContent = StyledCollapsibleContent;

export const CollapsibleCard = ({
  open,
  onChange,
  width = 'fit-content',
  children,
  collapsibleContent,
  triggerLabel = 'Show More',
}: CollapsibleCardProps) => {
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
