import * as React from 'react';
import { Message } from 'semantic-ui-react';

const AlertCopy: React.FC<{}> = () => (
  <Message
    success={true}
    content="Your shortened URL was copied to your clipboard!"
  />
);

export default React.memo<{}>(AlertCopy);
