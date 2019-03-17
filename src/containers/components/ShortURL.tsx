import * as copyToClipboard from 'copy-to-clipboard';
import * as React from 'react';
import { Grid, Input, Segment } from 'semantic-ui-react';

interface IShortURLProps {
  shortURL: string;
  hostName: string;
}

const ShortURL: React.FC<IShortURLProps> = ({ shortURL, hostName }) => {
  const [copied, setCopied] = React.useState(false);
  const fullURL = `${hostName}r/${shortURL}`;
  const handleClick = () => {
    copyToClipboard(fullURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const actionProps = {
    color: 'teal',
    icon: 'copy',
    onClick: handleClick,
  };

  return (
    <Segment basic={true} textAlign="center">
      <Grid textAlign="center">
        <Grid.Column width={9}>
          <Input
            fluid={true}
            readOnly={true}
            action={actionProps}
            defaultValue={fullURL}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default React.memo<IShortURLProps>(ShortURL);
