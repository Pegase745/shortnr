import { bootstrap } from '../server';

describe('server/server', () => {
  it('should be a function', () => {
    expect(typeof bootstrap).toBe('function');
  });
});
