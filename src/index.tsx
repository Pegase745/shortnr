import * as React from 'react';
import { render } from 'react-dom';

import '../theme/semantic.less';
import App from './App';

export const moduleHotAccept = (module?: NodeModule) => {
  if (module && module.hot) {
    // Accept changes for hot reloading.
    module.hot.accept();
  }
};

export const renderApp = App =>
  render(<App />, document.getElementById('root') as HTMLElement);

moduleHotAccept(module);

renderApp(App);
