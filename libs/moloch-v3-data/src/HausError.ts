export const QueryErrors: { [index: string]: string } = {
  SUBGRAPH_ERROR: 'Subgraph request error',
  UNSUPPORTED_NETWORK: 'Unsupported network',
  GNOSIS_ERROR: 'Gnosis api request error',
  REQUEST_ERROR: 'Request error',
};

interface ErrorProps {
  type: string;
  errorObject?: unknown;
}

export class HausError {
  readonly type: string;
  readonly message: string;
  readonly errorObject?: unknown;

  constructor(props: ErrorProps) {
    const { type, errorObject } = props;

    this.type = type;
    this.errorObject = errorObject;
    this.message = QueryErrors[type] || 'Unknown error';
  }
}
