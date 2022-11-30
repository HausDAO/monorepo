import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { CollapsibleCardProps } from './CollapsibleCard.types';
import {
  StyledCollapsibleCard,
  StyledCardActionsContainer,
  StyledCollapsibleCardTrigger,
  StyledCollapsibleCardButton,
  StyledCollapsibleContent,
  InnerCard,
} from './CollapsibleCard.styles';

export const CollapsibleContent = StyledCollapsibleContent;

export const CollapsibleCard = ({
  defaultOpen,
  open,
  onChange,
  width = 'fit-content',
  children,
  collapsibleActions,
  collapsibleContent,
  triggerLabel = 'Show More',
}: CollapsibleCardProps) => {
  return (
    <StyledCollapsibleCard
      defaultOpen={defaultOpen}
      open={open}
      onChange={onChange}
      width={width}
    >
      <InnerCard width={width}>
        {children}
        <StyledCardActionsContainer>
          {collapsibleActions}
          <StyledCollapsibleCardTrigger asChild>
            <StyledCollapsibleCardButton>
              {triggerLabel}
              <RiArrowDropDownLine />
            </StyledCollapsibleCardButton>
          </StyledCollapsibleCardTrigger>
        </StyledCardActionsContainer>
      </InnerCard>
      <StyledCollapsibleContent>
        {collapsibleContent ? collapsibleContent : <p>No Content found</p>}
      </StyledCollapsibleContent>
    </StyledCollapsibleCard>
  );
};
