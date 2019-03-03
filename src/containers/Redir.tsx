import { RouteComponentProps } from '@reach/router';
import axios from 'axios';
import * as React from 'react';

interface IProps extends RouteComponentProps {
  shortURL?: string;
}
class Redir extends React.Component<IProps> {
  public componentDidMount() {
    axios.get(`/api/shorturls/${this.props.shortURL}`).then(res => {
      setTimeout(() => {
        window.location.assign(res.data.redirectURL);
      }, 1000);
    });
  }

  public render() {
    return <React.Fragment>Redirecting...</React.Fragment>;
  }
}

export default Redir;
