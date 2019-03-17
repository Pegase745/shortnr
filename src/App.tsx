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
      <Redir path="/r/:shortURL" />
      <NotFound default={true} />
    </Router>
  );
};

export default App;
