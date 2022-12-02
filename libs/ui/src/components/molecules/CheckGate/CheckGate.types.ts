import React, { ReactNode } from 'react';

export type CheckGateProps = {
  gateLabel: string;
  fields: Array<ReactNode>;
  onUnchecked?: () => void;
};
