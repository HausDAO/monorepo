export type ArgType = string | number | boolean | bigint | ArgType[];
export type JsonFragmentType = {
  readonly name?: string;
  readonly indexed?: boolean;
  readonly type?: string;
  readonly internalType?: string;
  readonly components?: ReadonlyArray<JsonFragmentType>;
};

export type JsonFragment = {
  readonly name?: string;
  readonly type?: string;

  readonly anonymous?: boolean;

  readonly payable?: boolean;
  readonly constant?: boolean;
  readonly stateMutability?: string;

  readonly inputs?: ReadonlyArray<JsonFragmentType>;
  readonly outputs?: ReadonlyArray<JsonFragmentType>;

  readonly gas?: string;
};
export type ABI = (JsonFragment | JsonFragmentType)[];

// Exported Types

export type Bytes = ArrayLike<number>;

export type BytesLike = Bytes | string;

export type BigIntish = Bytes | bigint | string | number;
