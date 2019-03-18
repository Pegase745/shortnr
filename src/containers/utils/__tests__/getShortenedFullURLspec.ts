import getShortenedFullURL from '../getShortenedFullURL';

describe('getShortenedFullURL', () => {
  it('should not return a URL when an argument is empty', () => {
    expect(getShortenedFullURL('', 'a')).toEqual('');
    expect(getShortenedFullURL('a', '')).toEqual('');
  });

  it('should return a full URL when both hostname and short URL are provided', () => {
    const shortened = getShortenedFullURL('https://website.com/', 'poe');
    expect(shortened).toEqual('https://website.com/r/poe');
  });
});
