import { RouteComponentProps, Router } from '@reach/router';
import * as React from 'react';
import Message from 'react-bulma-components/lib/components/message';

import Home from './containers/Home';
import Redir from './containers/Redir';

const NotFound: React.SFC<RouteComponentProps> = () => (
  <Message color="danger">
    <Message.Body>
      <h4>Whoops</h4>
      <p>Sorry, nothing to see here.</p>
    </Message.Body>
  </Message>
);

interface IAppProps {
  config: { [key: string]: any };
}

const App = (props: IAppProps) => {
  return (
    <Router>
      <Home path="/" config={props.config} />
      <Redir path="/r/:shortURL" />
      <NotFound default={true} />
    </Router>
  );
};

export default App;
