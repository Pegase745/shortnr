import { shallow } from 'enzyme';
import * as React from 'react';
import Message from 'react-bulma-components/lib/components/message';

import App, { NotFound } from '../App';

describe('App.tsx', () => {
  it('should render', () => {
    const app = shallow(<App config={{}} />);

    expect(app).toMatchSnapshot();
  });

  it('should render NotFound', () => {
    const wrapper = shallow(<NotFound />, { disableLifecycleMethods: true });

    expect(wrapper.find(Message)).toExist();
  });
});
