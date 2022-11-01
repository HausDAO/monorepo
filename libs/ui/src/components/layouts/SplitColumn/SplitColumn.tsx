import { StyledRow, StyledSplitColumn } from './SplitColumn.styles';

// REVIEW: No stories until there's a solid form sub-layout

type SplitColumnProps = {
  rows: Row[] | Row;
};
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

type Row = {
  rowId: string;
  left: React.ReactNode;
  right: React.ReactNode;
};
const Row = ({ left, right }: Row) => {
  return (
    <StyledRow>
      <div className="left-section">{left}</div>
      <div className="right-section">{right}</div>
    </StyledRow>
  );
};
