import * as validator from 'validator';

/**
 * Check if URL is a valid URL with a TLD.
 * @param {string} URL
 * @return {boolean}
 */
const isValidUrl = (URL: string): boolean => {
  return validator.isURL(URL);
};

export default isValidUrl;
