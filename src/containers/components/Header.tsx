import * as React from 'react';
import { Image, Segment } from 'semantic-ui-react';

const style = {
  img: {
    paddingTop: '4em',
    width: '50%',
    maxWidth: 200,
  },
};

const StyledHeader: React.FC<{}> = () => (
  <Segment basic={true}>
    <Image
      as="img"
      style={style.img}
      src="assets/logo.png"
      centered={true}
      fluid={true}
    />
  </Segment>
);

export default React.memo<{}>(StyledHeader);
