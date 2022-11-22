export interface Tab {
  label: string;
  Component: () => JSX.Element;
}

export type State = {
  selected: number;
};

export type TabsProps = {
  tabList: [];
  className?: string;
};

export type Action = { type: 'selected'; payload: number };
