import { RouteComponentProps, Router } from '@reach/router';
import * as React from 'react';
import { Message } from 'semantic-ui-react';

import Home from './containers/Home';
import Redir from './containers/Redir';

export const NotFound: React.SFC<RouteComponentProps> = () => (
  <Message negative={true}>
    <Message.Header>Whoops</Message.Header>
    <p>Sorry, nothing to see here.</p>
  </Message>
);

const App = () => {
  return (
    <Router>
      <Home path="/" />
      {/* Deprecated route that will be removed in 1.0.0 release */}
      <Redir path="/r/:shortURL" />
      <Redir path="/:shortURL" />
      <NotFound default={true} />
    </Router>
  );
};

export default App;
