import { Link, RouteComponentProps } from '@reach/router';
import axios from 'axios';
import * as React from 'react';
import Button from 'react-bulma-components/lib/components/button';
import {
  Control,
  Field,
  Textarea,
} from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import Layout from '../components/Layout';

interface IProps {
  config: { [key: string]: any };
}

interface IState {
  redirectURL: string;
  shortURL: string;
  isWorking: boolean;
}

class Home extends React.Component<IProps & RouteComponentProps, IState> {
  public state = {
    redirectURL: '',
    shortURL: '',
    isWorking: false,
  };

  public handleShortening = () => {
    this.setState({ isWorking: true });

    axios
      .post(`/api/shorturls`, { redirectURL: this.state.redirectURL })
      .then(res => {
        const shortURL = res.headers['location-id'];
        this.setState({ shortURL });
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
        {this.state.shortURL !== '' && (
          <Link to={`/r/${this.state.shortURL}`}>{`${
            this.props.config.hostName
          }/r/${this.state.shortURL}`}</Link>
        )}

        <Field>
          <Control>
            <Textarea
              type="text"
              placeholder="Paste a link..."
              disabled={this.state.isWorking}
              value={this.state.redirectURL}
              onChange={this.handleChange}
            />
          </Control>
        </Field>
        <Button
          color="primary"
          position="end"
          loading={this.state.isWorking}
          disabled={!this.state.redirectURL}
          onClick={this.handleShortening}
        >
          Shorten me
        </Button>
      </React.Fragment>
    );
  }

  public render() {
    return (
      <Layout>
        <Heading>Shortnr</Heading>
        <Heading subtitle={true}>
          A simple URL shortener. Why? Well.. Why not?
        </Heading>
        {this.renderField()}
      </Layout>
    );
  }
}

export default Home;
