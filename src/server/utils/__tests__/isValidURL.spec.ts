import isValidURL from '../isValidURL';

describe('isValidURL', () => {
  it("should say that it's valid", () => {
    const rawURL = 'http://website.com';
    expect(isValidURL(rawURL)).toBeTruthy();
  });

  it("should say that it's not valid", () => {
    const rawURL = 'http://abcdef';
    expect(isValidURL(rawURL)).toBeFalsy();
  });
});
