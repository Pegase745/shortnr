import * as React from 'react';
import GithubCorner from 'react-github-corner';
import { Container } from 'semantic-ui-react';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => (
  <React.Fragment>
    <Container>{children}</Container>
    <GithubCorner
      href="https://github.com/Pegase745/shortnr#readme"
      bannerColor="#4974BE"
    />
  </React.Fragment>
);

export default Layout;
