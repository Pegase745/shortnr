import * as copyToClipboard from 'copy-to-clipboard';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

import ShortURL from '../ShortURL';

jest.mock('copy-to-clipboard');

const defaultProps = {
  fullURL: 'https://shortnr.local/r/shortURL',
};

describe('ShortURL.tsx', () => {
  it('should render', () => {
    const wrapper = shallow(<ShortURL {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should copy to clipboard', () => {
    const wrapper = mount(<ShortURL {...defaultProps} />);
    wrapper.find('Button').simulate('click');

    expect(copyToClipboard).toHaveBeenCalledTimes(1);
  });
});
