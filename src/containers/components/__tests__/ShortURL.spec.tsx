import { shallow } from 'enzyme';
import * as React from 'react';

import ShortURL from '../ShortURL';

const defaultProps = {
  fullURL: 'https://shortnr.local/r/shortURL',
};

describe('ShortURL.tsx', () => {
  it('should render', () => {
    const app = shallow(<ShortURL {...defaultProps} />);

    expect(app).toMatchSnapshot();
  });
});
