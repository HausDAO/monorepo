import { FindRecordQuery } from '../subgraph/queries/records.generated';

export type MolochV3Record = FindRecordQuery['record'] & {
  parsedContent?: unknown;
};

export type FindRecordQueryRes = {
  record: MolochV3Record | undefined;
};

export type ListRecordQueryRes = {
  records: MolochV3Record[];
};
