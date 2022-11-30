import React from 'react';
import styled from 'styled-components';

import { Divider, H5, ParMd } from '../../atoms';
import { FormSegmentProps } from './FormSegment.types';
import { StyledDivider, StyledFormSegment } from './FormSegment.styles';
import { CollapsibleCard } from '../../molecules/CollapsibleCard';

// REVIEW: No stories until there's a solid form sub-layout
export const FormSegment = ({
  collapsible,
  defaultOpen,
  title,
  description,
  formArea,
}: FormSegmentProps) => {
  if (collapsible) {
    return (
      <>
        <CollapsibleCard
          children={
            <div>
              <H5 className="segment-title">{title}</H5>
              <ParMd className="segment-description">{description}</ParMd>
            </div>
          }
          collapsibleContent={<div>{formArea}</div>}
          defaultOpen={defaultOpen}
          triggerLabel={''}
          width="100%"
        />
        <StyledDivider />
      </>
    );
  }
  return (
    <StyledFormSegment>
      <H5 className="segment-title">{title}</H5>
      <ParMd className="segment-description">{description}</ParMd>
      <div>{formArea}</div>
      <Divider />
    </StyledFormSegment>
  );
};
