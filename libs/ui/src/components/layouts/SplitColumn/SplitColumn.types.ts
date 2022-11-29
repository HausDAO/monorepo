export type SplitColumnRowProps = {
  rowId: string;
  left: React.ReactNode;
  right: React.ReactNode;
};

export type SplitColumnProps = {
  rows: SplitColumnRowProps[] | SplitColumnRowProps;
};
