import * as React from 'react';
import { render } from 'react-dom';

import './main.scss';
// tslint:disable-next-line:ordered-imports
import App from './App';

declare var module: any;
declare var CONFIG: { [key: string]: any };

const renderApp = App =>
  render(<App config={CONFIG} />, document.getElementById('root') as HTMLElement);

if (module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('./App', () => renderApp(require('./App').default));
}

renderApp(App);
