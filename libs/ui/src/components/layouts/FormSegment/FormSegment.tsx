import React from 'react';

import { Divider, H5, ParMd } from '../../atoms';
import { FormSegmentProps } from './FormSegment.types';
import { StyledFormSegment } from './FormSegment.styles';

// REVIEW: No stories until there's a solid form sub-layout
export const FormSegment = ({
  title,
  description,
  formArea,
}: FormSegmentProps) => {
  return (
    <StyledFormSegment>
      <H5 className="segment-title">{title}</H5>
      <ParMd className="segment-description">{description}</ParMd>
      <div>{formArea}</div>
      <Divider />
    </StyledFormSegment>
  );
};
