import * as url from '../url';

describe('formatURL', () => {
  it('should not prepend HTTP protocol', () => {
    const rawURL = 'http://website.com';
    const formatted = url.formatURL(rawURL);
    expect(formatted).toEqual(rawURL);
  });

  it('should prepend HTTP protocol', () => {
    const formatted = url.formatURL('website.com');
    expect(formatted).toEqual('http://website.com');
  });
});
