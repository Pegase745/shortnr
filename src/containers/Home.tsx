import { RouteComponentProps } from '@reach/router';
import axios from 'axios';
import * as copyToClipboard from 'copy-to-clipboard';
import * as React from 'react';
import { Header, Input, Message } from 'semantic-ui-react';

import Layout from '../components/Layout';
import ShortURL from './components/ShortURL';
import { getShortenedFullURL } from './utils';

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

interface IState {
  redirectURL: string;
  shortURL: string;
  isWorking: boolean;
}

class Home extends React.Component<RouteComponentProps, IState> {
  public state = {
    redirectURL: '',
    shortURL: '',
    isWorking: false,
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

        const fullURL = getShortenedFullURL(this.props.location.href, shortURL);
        copyToClipboard(fullURL);
      })
      .finally(() => {
        this.setState({ isWorking: false });
      });
  };

  public handleChange = event => {
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
          <ShortURL
            fullURL={getShortenedFullURL(
              this.props.location.href,
              this.state.shortURL
            )}
          />
        )}
      </React.Fragment>
    );
  }

  public renderFlashMessage() {
    if (this.state.isWorking || !this.state.shortURL) {
      return null;
    }

    return (
      <Message
        success={true}
        content="Your shortened URL was copied to your clipboard!"
      />
    );
  }

  public render() {
    return (
      <Layout>
        <Header as="h1" content="Shortnr" style={style.h1} textAlign="center" />
        <Header textAlign="center" style={style.sub}>
          A simple URL shortener. Why? Well.. Why not?
        </Header>
        {this.renderField()}
      </Layout>
    );
  }
}

export default Home;
