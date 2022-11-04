import { ValidNetwork } from '@daohaus/utils';
import { FindTxQuery, Haus, IFindQueryResult } from '@daohaus/moloch-v3-data';

// TS Challenge

// Need to be able to have a generic poll
// that we can pass in any shape of argume
// eslint-disable-next-line
type PollFetch<T> = (...args: any) => Promise<IFindQueryResult<T> | undefined>;
type PollTest<T> = (result?: IFindQueryResult<T>) => boolean;

type Poll<T> = ({
  poll,
  test,
  interval,
  variables,
  maxTries,
}: {
  poll: PollFetch<T>;
  test: PollTest<T>;
  interval?: number;
  variables: Parameters<typeof poll>;
  onPollStart?: () => void;
  onPollSuccess?: (result: IFindQueryResult<FindTxQuery> | undefined) => void;
  onPollError?: (error: unknown) => void;
  onPollTimeout?: (error: unknown) => void;
  maxTries?: number;
}) => void;

export const pollLastTX: PollFetch<FindTxQuery> = async ({
  chainId,
  txHash,
}: {
  chainId: ValidNetwork;
  txHash: string;
}) => {
  try {
    const haus = Haus.create();
    const result = await haus.query.findTransaction({
      networkId: chainId,
      txHash,
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const testLastTX = (
  result: IFindQueryResult<FindTxQuery> | undefined
) => {
  if (result?.data?.transaction) {
    return true;
  }
  return false;
};

export const standardGraphPoll: Poll<FindTxQuery> = async ({
  poll,
  test,
  interval = 5000,
  variables,
  onPollSuccess,
  onPollError,
  onPollTimeout,
  onPollStart,
  maxTries = 12,
}) => {
  onPollStart?.();
  let count = 0;
  const pollId = setInterval(async () => {
    if (count < maxTries) {
      try {
        const result = await poll(variables);
        console.log('**POLL RESULT**');
        console.log('result', result);
        const testPassed = test(result);
        if (testPassed) {
          console.log('TEST PASSED');
          onPollSuccess?.(result);
          clearInterval(pollId);
          return result;
        }
        count += 1;
        return;
      } catch (error) {
        onPollError?.(error);
        clearInterval(pollId);
        return;
      }
    } else {
      const error = new Error(
        'Transcaction Poll ran out of tries. There could be issues with the subgraph.'
      );
      onPollTimeout?.(error);
      return;
    }
  }, interval);
};
