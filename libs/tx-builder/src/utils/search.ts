import {
  ABI,
  ArbitraryState,
  isArgType,
  JSONDetailsSearch,
  StringSearch,
} from '@daohaus/utils';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';

import { processArg } from './args';

export const checkArgType = (arg: unknown) => {
  if (isArgType(arg)) {
    return arg;
  }
  throw new Error(`Invalid arg type ${arg}`);
};

export const deepSearch = (
  appState: ArbitraryState,
  pathString: StringSearch
): unknown => {
  const path = pathString.trim().split('.').filter(Boolean);
  let state = { ...appState };
  for (let i = 0, len = path.length; i < len; i++) {
    state = state?.[path?.[i]];
  }
  return state;
};

export const searchApp = (
  appState: ArbitraryState,
  pathString: StringSearch,
  shouldThrow = false
) => {
  const result = deepSearch(appState, pathString);

  if (result == null) {
    if (shouldThrow) {
      console.log('**Application State**', appState);
      console.log('result', result);
      throw new Error(`Could not find ${pathString}`);
    } else {
      return false;
    }
  }
  return result;
};

export const checkHasCondition = (pathString: StringSearch) =>
  pathString.includes('||');
export const handleConditionalPath = (pathString: StringSearch) => {
  const paths = pathString
    .trim()
    .split('||')
    .map((str) => str.trim())
    .filter(Boolean);

  return paths;
};

export const searchArg = ({
  appState,
  searchString,
  shouldThrow = false,
}: {
  appState: ArbitraryState;
  searchString: StringSearch;
  shouldThrow: boolean;
}) => {
  const hasCondition = checkHasCondition(searchString);

  if (hasCondition) {
    const paths = handleConditionalPath(searchString);
    for (const path of paths) {
      const result = searchApp(appState, path as StringSearch);
      if (result) {
        return checkArgType(result);
      }
    }
    throw new Error(
      `No paths in conditional path string: ${searchString} returns a value`
    );
  }
  return checkArgType(searchApp(appState, searchString, shouldThrow));
};

export const handleDetailsJSON = async ({
  arg,
  appState,
  localABIs,
  chainId,
  safeId,
  rpcs,
}: {
  arg: JSONDetailsSearch;
  appState: ArbitraryState;
  localABIs: Record<string, ABI>;
  chainId: ValidNetwork;
  safeId?: string;
  rpcs: Keychain;
}) => {
  const detailsList = await Promise.all(
    Object.entries(arg.jsonSchema).map(async ([key, arg]) => {
      return {
        id: key,
        value: await processArg({
          arg,
          chainId,
          safeId,
          localABIs,
          appState,
          rpcs,
        }),
      };
    })
  );
  if (!detailsList) {
    console.log('arg', arg);
    throw new Error(`Error Compiling JSON Details`);
  }

  return JSON.stringify(
    detailsList.reduce((acc, arg) => {
      return { ...acc, [arg.id]: arg.value };
    }, {})
  );
};
