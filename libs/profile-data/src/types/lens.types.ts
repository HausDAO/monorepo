import { ListProfileQuery } from '../subgraph/queries-lens/profiles.generated';

export type LensProfile = ListProfileQuery['profiles']['items'][number];
