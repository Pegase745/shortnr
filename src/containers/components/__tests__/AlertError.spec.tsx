import { shallow } from 'enzyme';
import * as React from 'react';

import AlertError from '../AlertError';

const defaultProps = {
  error: 'A big error',
};

describe('AlertError.tsx', () => {
  it('should render', () => {
    const app = shallow(<AlertError {...defaultProps} />);

    expect(app).toMatchSnapshot();
  });
});
