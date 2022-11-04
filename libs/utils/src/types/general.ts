export type Noun = {
  singular: string;
  plural: string;
};

// By definition this needs to use any.
// But we should be dilligent about using this type and make sure that
// in cases where we're using this to handle highly level functionality
// we can extends with more specific types (ex. TXBuilder)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ArbitraryState = Record<string, any>;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];
export type EthAddress = `0x${string}`;
export type ValueOf<T> = T[keyof T];
