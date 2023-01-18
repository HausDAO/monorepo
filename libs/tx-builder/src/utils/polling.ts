/* eslint-disable @typescript-eslint/no-explicit-any */
import { findTransaction } from '@daohaus/moloch-v3-data';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { IFindQueryResult } from '@daohaus/data-fetch-utils';

// TS Challenge

// Need to be able to have a generic poll
// that we can pass in any shape of argume
// eslint-disable-next-line
type PollFetch = (...args: any) => Promise<any>;
type PollTest = (result?: any) => boolean;

type Poll = ({
  poll,
  test,
  interval,
  variables,
  maxTries,
}: {
  poll: PollFetch;
  test: PollTest;
  interval?: number;
  variables: Parameters<typeof poll>;
  onPollStart?: () => void;
  onPollSuccess?: (result: any) => void;
  onPollError?: (error: unknown) => void;
  onPollTimeout?: (error: unknown) => void;
  maxTries?: number;
}) => void;

export const pollLastTX: PollFetch = async ({
  chainId,
  txHash,
  graphApiKeys,
}: {
  chainId: ValidNetwork;
  txHash: string;
  graphApiKeys: Keychain;
}) => {
  try {
    const result = await findTransaction({
      networkId: chainId,
      txHash,
      graphApiKeys,
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const testLastTX = (result: IFindQueryResult<any> | undefined) => {
  if (result?.data?.transaction) {
    return true;
  }
  return false;
};

export const standardGraphPoll: Poll = async ({
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
