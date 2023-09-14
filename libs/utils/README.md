# @daohaus/utils

A set of helper tools and utilities that are used throughout our libraries and apps. This includes things like our constants, types, and various utilities and helper functions.

### [View on NPM](https://www.npmjs.com/package/@daohaus/utils)

## Usage

### Installation

```bash
yarn add @daohaus/utils
```

### Examples

**How to create a viem client**

```ts
import { createViemClient } from '@daohaus/utils';

const client = createViemClient({
  chainId: '0x1',
  rpcs: {
    '0x1': 'https://some-rpc-url.com',
  },
});
```

**How to format time and date from a timestamp in dao data**

```ts
import { formatDateTimeFromSeconds } from '@daohaus/utils';

const timeProposalWasCreated = formatDateTimeFromSeconds(proposal.createdAt);

console.log(timeProposalWasCreated);
('4:42 pm June 15th 2023');
```

**How to format an address into a shorter string**

```ts
import { truncateAddress } from '@daohaus/utils';

const shortAddr = truncateAddress('0xf844b98df9ccdfbe5d460d0d7bdca232cf9da923');

console.log(shortAddr);
('0xf844...a923');
```

**How to get the labels for proposal status used in the admin app**

```ts
import { PROPOSAL_STATUS } from '@daohaus/utils';

const needProcessingLabel = PROPOSAL_STATUS.needsProcessing;

console.log(needProcessingLabel);
('Ready for Execution');
```

**How to get some info copy for dao settings**

```ts
import { INFO_COPY } from '@daohaus/utils';

const votingPeriodInfoText = INFO_COPY.VOTING_PERIOD;

console.log(votingPeriodInfoText);
('How long should proposals remain open for voting?');
```

**How to type a token info object return in dao data**

```ts
import { TokenInfo } from '@daohaus/utils'


const someToken: TokenInfo  = {
  decimals: 18,
  symbol: 'HAUS',
  name: 'HAUS'
  logoUri: null,
};

```

## Building

Run `nx utils:build` to build the library.
