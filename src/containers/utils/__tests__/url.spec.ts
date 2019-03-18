import * as url from '../url';

describe('getShortenedFullURL', () => {
  it('should not return a URL when an argument is empty', () => {
    expect(url.getShortenedFullURL('', 'a')).toEqual('');
    expect(url.getShortenedFullURL('a', '')).toEqual('');
  });

  it('should return a full URL when both hostname and short URL are provided', () => {
    const shortened = url.getShortenedFullURL('https://website.com/', 'poe');
    expect(shortened).toEqual('https://website.com/r/poe');
  });
});
