import { shallow } from 'enzyme';
import * as React from 'react';

import AlertCopy from '../AlertCopy';

const defaultProps = {};

describe('AlertCopy.tsx', () => {
  it('should render', () => {
    const app = shallow(<AlertCopy {...defaultProps} />);

    expect(app).toMatchSnapshot();
  });
});
