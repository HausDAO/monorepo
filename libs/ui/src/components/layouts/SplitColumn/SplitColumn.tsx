import React from 'react';

import { SplitColumnProps, SplitColumnRowProps } from './SplitColumn.types';
import { StyledRow, StyledSplitColumn } from './SplitColumn.styles';

// REVIEW: No stories until there's a solid form sub-layout
export const SplitColumn = ({ rows }: SplitColumnProps) => {
  return (
    <StyledSplitColumn>
      {Array.isArray(rows) ? (
        rows.map((row) => {
          return <Row key={row.rowId} {...row} />;
        })
      ) : (
        <Row {...rows} />
      )}
    </StyledSplitColumn>
  );
};

const Row = ({ left, right }: SplitColumnRowProps) => {
  return (
    <StyledRow>
      <div className="left-section">{left}</div>
      <div className="right-section">{right}</div>
    </StyledRow>
  );
};
