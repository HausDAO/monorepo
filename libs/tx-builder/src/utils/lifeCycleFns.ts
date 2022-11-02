import { LifeCycleNames, TXLifeCycleFns } from '../TXBuilder';

export const bundleLifeCycleFns = ({
  appEffects,
  componentEffects,
}: {
  appEffects: TXLifeCycleFns;
  componentEffects: TXLifeCycleFns;
}): TXLifeCycleFns => {
  const allCycles: LifeCycleNames[] = [
    'onRequestSign',
    'onTxHash',
    'onTxError',
    'onTxSuccess',
    'onPollStart',
    'onPollError',
    'onPollSuccess',
  ];

  const blended = allCycles.reduce((acc, cycle) => {
    if (appEffects[cycle] && componentEffects[cycle]) {
      return {
        ...acc,
        // TS CHALLENGE
        /*
          This is likely solvable by using some roundabout way of gathering 
          the args of each function and binding them to each method name
          similar to the way that we handle Field Legos
          However, this may still result in TS not regonizing the reconstituted
          type and likely not worth our time, atm
        */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [cycle]: (...args: any[]) => {
          // @ts-expect-error: explanation above
          appEffects[cycle]?.(...args);
          // @ts-expect-error: explanation above
          componentEffects[cycle]?.(...args);
        },
      };
    }
    if (appEffects[cycle]) {
      return {
        ...acc,
        [cycle]: appEffects[cycle],
      };
    }
    if (componentEffects[cycle]) {
      return {
        ...acc,
        [cycle]: componentEffects[cycle],
      };
    }
    return acc;
  }, {});

  return blended;
};
