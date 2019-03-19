import * as React from 'react';
import { Header } from 'semantic-ui-react';

const style = {
  h1: {
    marginTop: '3em',
    marginBottom: 0,
  },
  sub: {
    marginTop: 0,
    marginBottom: '2em',
  },
};

const StyledHeader: React.FC<{}> = () => (
  <React.Fragment>
    <Header as="h1" content="Shortnr" style={style.h1} textAlign="center" />
    <Header textAlign="center" style={style.sub}>
      A simple URL shortener. Why? Well.. Why not?
    </Header>
  </React.Fragment>
);

export default React.memo<{}>(StyledHeader);
