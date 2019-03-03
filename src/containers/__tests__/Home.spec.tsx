import axios from 'axios';
import { shallow } from 'enzyme';
import * as React from 'react';
import Button from 'react-bulma-components/lib/components/button';
import { Textarea } from 'react-bulma-components/lib/components/form';

import Home from '../Home';

jest.mock('axios', () => ({
  default: {
    post: jest.fn(() =>
      Promise.resolve({ headers: { 'location-id': 'shortURL' } })
    ),
  },
}));

describe('Home.tsx', () => {
  const defaultProps = {
    config: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should change redirectURL in the state', () => {
    const wrapper = shallow(<Home {...defaultProps} />);
    wrapper
      .find(Textarea)
      .simulate('change', { target: { value: 'https://redirect.url' } });

    expect(wrapper.state('redirectURL')).toEqual('https://redirect.url');
  });

  it('should set shortURL in the state', done => {
    const wrapper = shallow(<Home {...defaultProps} />);
    wrapper.find(Button).simulate('click');

    expect(wrapper.state('isWorking')).toBeTruthy();
    setImmediate(() => {
      expect(axios.post).toBeCalledTimes(1);
      expect(wrapper.state('shortURL')).toEqual('shortURL');
      expect(wrapper.state('isWorking')).toBeFalsy();
      done();
    });
  });
});
