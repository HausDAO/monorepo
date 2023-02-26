import { TXLifeCycleFns } from '@daohaus/tx-builder';

export type ActionLifeCycleFns = TXLifeCycleFns & {
  onActionTriggered?: () => void;
};
