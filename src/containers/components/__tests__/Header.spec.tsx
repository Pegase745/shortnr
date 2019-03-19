import { shallow } from 'enzyme';
import * as React from 'react';

import Header from '../Header';

const defaultProps = {};

describe('Header.tsx', () => {
  it('should render', () => {
    const app = shallow(<Header {...defaultProps} />);

    expect(app).toMatchSnapshot();
  });
});
