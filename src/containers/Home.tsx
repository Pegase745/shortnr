import { RouteComponentProps } from '@reach/router';
import axios from 'axios';
import * as copyToClipboard from 'copy-to-clipboard';
import * as React from 'react';
import { Input } from 'semantic-ui-react';

import Layout from '../components/Layout';
import AlertCopy from './components/AlertCopy';
import AlertError from './components/AlertError';
import Header from './components/Header';
import ShortURL from './components/ShortURL';

interface IState {
  redirectURL: string;
  shortURL: string;
  isWorking: boolean;
  error: string;
}

class Home extends React.Component<RouteComponentProps, IState> {
  public state = {
    redirectURL: '',
    shortURL: '',
    isWorking: false,
    error: '',
  };

  public inputRef;

  public handleRef = c => {
    this.inputRef = c;
  };

  public componentDidMount() {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  public handleKeyPress = event => {
    if (event.key === 'Enter' && this.state.redirectURL) {
      this.handleShortening();
    }
  };

  public handleShortening = () => {
    this.setState({ shortURL: '', isWorking: true });

    axios
      .post(`/api/shorturls`, { redirectURL: this.state.redirectURL })
      .then(res => {
        const shortURL = res.headers['location-id'];
        this.setState({ shortURL });
        copyToClipboard(shortURL);
      })
      .catch(err => {
        if (err.response && err.response.data.error) {
          this.setState({ error: err.response.data.error });
        }
      })
      .finally(() => {
        this.setState({ isWorking: false });
      });
  };

  public handleChange = event => {
    if (!!this.state.error) {
      this.setState({
        error: '',
      });
    }

    this.setState({
      redirectURL: event.target.value,
    });
  };

  public renderField() {
    return (
      <React.Fragment>
        <Input
          onKeyPress={this.handleKeyPress}
          ref={this.handleRef}
          fluid={true}
          size="huge"
          icon="linkify"
          iconPosition="left"
          action={{
            color: 'teal',
            content: 'Shorten',
            disabled: !this.state.redirectURL,
            loading: this.state.isWorking,
            onClick: this.handleShortening,
          }}
          placeholder="Paste a link..."
          disabled={this.state.isWorking}
          value={this.state.redirectURL}
          onChange={this.handleChange}
        />

        {this.renderFlashMessage()}

        {this.state.shortURL !== '' && (
          <ShortURL fullURL={this.state.shortURL} />
        )}
      </React.Fragment>
    );
  }

  public renderFlashMessage() {
    if (!!this.state.error) {
      return <AlertError error={this.state.error} />;
    }

    if (!this.state.isWorking && this.state.shortURL) {
      return <AlertCopy />;
    }

    return null;
  }

  public render() {
    return (
      <Layout>
        <Header />
        {this.renderField()}
      </Layout>
    );
  }
}

export default Home;
