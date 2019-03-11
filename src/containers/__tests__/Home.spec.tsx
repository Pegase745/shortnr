import axios from 'axios';
import { shallow } from 'enzyme';
import * as React from 'react';

import Home from '../Home';

jest.mock('axios', () => ({
  default: {
    post: jest.fn(() =>
      Promise.resolve({ headers: { 'location-id': 'shortURL' } })
    ),
  },
}));

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

  xit('should set shortURL in the state', done => {
    const wrapper = shallow(<Home />);

    wrapper.find('Button').simulate('click');
    expect(wrapper.state('isWorking')).toBeTruthy();

    process.nextTick(() => {
      expect(axios.post).toBeCalledTimes(1);
      expect(wrapper.state('shortURL')).toEqual('shortURL');
      expect(wrapper.state('isWorking')).toBeFalsy();
      done();
    });
  });
});
