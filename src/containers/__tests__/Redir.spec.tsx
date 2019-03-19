import axios from 'axios';
import { shallow } from 'enzyme';
import * as React from 'react';

import Redir from '../Redir';

jest.mock('axios', () => ({
  default: {
    get: jest.fn(() =>
      Promise.resolve({ data: { redirectURL: 'redirectURL' } })
    ),
  },
}));

describe('Redir.tsx', () => {
  const defaultProps = {
    shortURL: 'shortURL',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get the redirect URL on mount', done => {
    window.location.assign = jest.fn();
    shallow(<Redir {...defaultProps} />);

    expect(axios.get).toBeCalledTimes(1);
    setTimeout(() => {
      expect(window.location.assign).toBeCalledWith('redirectURL');
      done();
    }, 2000);
  });
});
