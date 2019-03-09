import { Link } from '@reach/router';
import * as React from 'react';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Notification from 'react-bulma-components/lib/components/notification';
import * as CopyToClipboard from 'react-copy-to-clipboard';

interface IShortURLProps {
  shortURL: string;
  hostName: string;
}

const ShortURL: React.FC<IShortURLProps> = ({ shortURL, hostName }) => {
  const [copied, setCopied] = React.useState(false);
  const fullURL = `${hostName}r/${shortURL}`;

  return (
    <Notification>
      <Columns>
        <Columns.Column>
          <Link to={`/r/${shortURL}`}>{fullURL}</Link>
        </Columns.Column>
        <Columns.Column>
          <CopyToClipboard
            text={fullURL}
            onCopy={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 3000);
            }}
          >
            <Button
              color="light"
              position="end"
              size="small"
              inverted={true}
              rounded={true}
            >
              {copied ? 'Copied to clipboard' : 'Copy to clipboard'}
            </Button>
          </CopyToClipboard>
        </Columns.Column>
      </Columns>
    </Notification>
  );
};

export default React.memo<IShortURLProps>(ShortURL);
