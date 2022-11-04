import { ArbitraryState, TXOverrides } from '@daohaus/utils';

export const processOverrides = ({
  overrideArgs,
  appState,
}: {
  overrideArgs?: TXOverrides;
  appState: ArbitraryState;
}): TXOverrides => {
  return {
    value: appState['formValues']?.proposalOffering
      ? Number(appState['formValues']?.proposalOffering).toFixed()
      : '0',
    ...overrideArgs,
  };
};
