import { shallow } from 'enzyme';
import * as React from 'react';

import Layout from '../Layout';

describe('Layout.tsx', () => {
  it('should render', () => {
    const app = shallow(<Layout>Test</Layout>);

    expect(app).toMatchSnapshot();
  });
});
