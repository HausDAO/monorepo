export const MaxUint256 = BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
);

export interface MetaTransaction {
  to: string;
  value: string | number | bigint;
  data: string;
  operation: number;
}
