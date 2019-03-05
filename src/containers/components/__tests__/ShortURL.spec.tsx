import { shallow } from 'enzyme';
import * as React from 'react';

import ShortURL from '../ShortURL';

const defaultProps = {
  shortURL: 'shortURL',
  hostName: 'https://shortnr.local',
};

describe('ShortURL.tsx', () => {
  it('should render', () => {
    const app = shallow(<ShortURL {...defaultProps} />);

    expect(app).toMatchSnapshot();
  });
});
