type HasMessage = { message: string };
type HasReason = { reason: string };
type GasEstimationError = {
  reason: string;
  code: string;
  method: string;
  stack: string;
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEthersError = (error: any): error is GasEstimationError =>
  error?.reason !== undefined &&
  error?.code !== undefined &&
  error?.method !== undefined &&
  error?.message !== undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasMessage = (value: any): value is HasMessage =>
  value?.message !== undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isReasonable = (value: any): value is HasReason =>
  value?.reason !== undefined;

export const handleErrorMessage = ({
  error,
  fallback = 'Could not decode error message',
}: {
  error: unknown;
  fallback?: string;
}) => {
  if (error instanceof Error && isEthersError(error)) {
    return `Contact Error: ${error.reason}`;
  }
  if (isReasonable(error)) {
    return `Error: ${error.reason}`;
  }
  if (hasMessage(error)) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return fallback;
};
