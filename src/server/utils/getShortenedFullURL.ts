/**
 * Get the full shortened URL for a given shortened URL ID.
 * @param {string} hostname e.g. http://website.com
 * @param {string} shortURL e.g. pOwn3d
 * @return {string}
 */
const getShortenedFullURL = (hostname: string, shortURL: string): string => {
  if (!hostname || !shortURL) {
    return '';
  }

  return `${hostname}/r/${shortURL}`;
};

export default getShortenedFullURL;
