import formatURL from '../formatURL';

describe('formatURL', () => {
  it('should not prepend HTTP protocol', () => {
    const rawURL = 'http://website.com';
    const formatted = formatURL(rawURL);
    expect(formatted).toEqual(rawURL);
  });

  it('should prepend HTTP protocol', () => {
    const formatted = formatURL('website.com');
    expect(formatted).toEqual('http://website.com');
  });
});
