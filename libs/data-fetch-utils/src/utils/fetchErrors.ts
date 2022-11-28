export const QueryErrors: { [index: string]: string } = {
  SUBGRAPH_ERROR: 'Subgraph request error',
  UNSUPPORTED_NETWORK: 'Unsupported network',
  GNOSIS_ERROR: 'Gnosis api request error',
  REQUEST_ERROR: 'Request error',
};

interface ErrorArgs {
  type: string;
  errorObject?: unknown;
}

export const formatFetchError = (args: ErrorArgs) => {
  const { type, errorObject } = args;

  return {
    type,
    errorObject,
    message: QueryErrors[type] || 'Unknown error',
  };
};
