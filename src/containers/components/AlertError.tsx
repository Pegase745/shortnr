import * as React from 'react';
import { Message } from 'semantic-ui-react';

interface IProps {
  error: string;
}

const AlertError: React.FC<IProps> = props => (
  <Message error={true} header={props.error} />
);

export default React.memo<IProps>(AlertError);
