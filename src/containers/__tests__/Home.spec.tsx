import axios from 'axios';
import * as copyToClipboard from 'copy-to-clipboard';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

import Home from '../Home';

jest.mock('axios');
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

  it('should clear error on value change', () => {
    const wrapper = shallow(<Home />);
    wrapper.setState({ error: 'an error' });

    wrapper
      .find('Input')
      .simulate('change', { target: { value: 'https://redirect.url' } });

    expect(wrapper.state('error')).toEqual('');
  });

  it('should shorten on Enter', () => {
    const wrapper = shallow<Home>(<Home />);
    wrapper.instance().handleShortening = jest.fn();

    wrapper.setState({ redirectURL: 'http://redirect.url' });
    wrapper.find('Input').simulate('keypress', { key: 'Enter' });

    expect(wrapper.instance().handleShortening).toBeCalled();
  });

  it('should not shorten on Enter and without an input', () => {
    const wrapper = shallow<Home>(<Home />);
    wrapper.instance().handleShortening = jest.fn();

    wrapper.find('Input').simulate('keypress', { key: 'Enter' });

    expect(wrapper.instance().handleShortening).not.toBeCalled();
  });

  it('should set shortURL in the state', done => {
    const mockedAxiosPost = jest.fn();
    axios.post = mockedAxiosPost;

    mockedAxiosPost.mockImplementation(() =>
      Promise.resolve({ headers: { 'location-id': 'shortURL' } })
    );

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

  it('should display an error Alert', done => {
    const mockedAxiosPost = jest.fn();
    axios.post = mockedAxiosPost;

    mockedAxiosPost.mockImplementation(() =>
      Promise.reject({
        response: { data: { message: 'a deep error message' } },
      })
    );

    const wrapper = mount(<Home />);

    wrapper.setState({ redirectURL: 'http://redirect.url' });
    expect(wrapper.state('isWorking')).toBeFalsy();
    wrapper.find('Button').simulate('click');
    expect(wrapper.state('isWorking')).toBeTruthy();

    process.nextTick(() => {
      expect(axios.post).toBeCalledTimes(1);
      expect(wrapper.state('error')).toEqual('a deep error message');
      expect(wrapper.state('isWorking')).toBeFalsy();
      expect(wrapper.find('AlertError')).toBeDefined();
      done();
    });
  });
});
