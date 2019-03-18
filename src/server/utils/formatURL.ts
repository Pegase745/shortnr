import { parse as parseURL } from 'url';

/**
 * Format misspelled URLs.
 * Will only prepend HTTP protocol if missing for now.
 * @param {string} rawURL e.g. website.com, http://website.com
 * @return {string}
 */
const formatURL = (rawURL: string): string => {
  const parsed = parseURL(rawURL);

  if (!!parsed.protocol) {
    return rawURL;
  }

  return `http://${rawURL}`;
};

export default formatURL;
