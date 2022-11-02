import { Haus } from '../src/index';

describe('haus', () => {
  let haus: Haus;

  beforeAll(async () => {
    haus = Haus.create();
  });
  it('should have a query class', () => {
    expect(haus.query).toBeTruthy();
  });
});
