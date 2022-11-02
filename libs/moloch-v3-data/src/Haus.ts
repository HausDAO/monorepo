import Profile from './Profile';
import Query from './Query';
import { IHausOptions } from './types';

class Haus {
  query: Query;
  profile: Profile;

  private constructor(options?: IHausOptions) {
    this.query = new Query(options?.graphApiKeys);
    this.profile = new Profile(this.query);
  }

  static create(options?: IHausOptions): Haus {
    const hausSdk = new Haus(options);
    return hausSdk;
  }
}

export default Haus;
