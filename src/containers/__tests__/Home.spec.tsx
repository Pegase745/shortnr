import axios from 'axios';
import * as copyToClipboard from 'copy-to-clipboard';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

import Home from '../Home';

jest.mock('axios', () => ({
  default: {
    post: jest.fn(() =>
      Promise.resolve({ headers: { 'location-id': 'shortURL' } })
    ),
  },
}));

jest.mock('copy-to-clipboard');

describe('Home.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should change redirectURL in the state', () => {
    const wrapper = shallow(<Home />);
    wrapper
      .find('Input')
      .simulate('change', { target: { value: 'https://redirect.url' } });

    expect(wrapper.state('redirectURL')).toEqual('https://redirect.url');
  });

  it('should set shortURL in the state', done => {
    const wrapper = mount(<Home />);

    wrapper.setState({ redirectURL: 'http://redirect.url' });
    expect(wrapper.state('isWorking')).toBeFalsy();
    wrapper.find('Button').simulate('click');
    expect(wrapper.state('isWorking')).toBeTruthy();

    process.nextTick(() => {
      expect(axios.post).toBeCalledTimes(1);
      expect(copyToClipboard).toBeCalledTimes(1);
      expect(wrapper.state('shortURL')).toEqual('shortURL');
      expect(wrapper.state('isWorking')).toBeFalsy();
      done();
    });
  });
});
