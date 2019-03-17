import * as React from 'react';
import { Container } from 'semantic-ui-react';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => (
  <Container>{children}</Container>
);

export default Layout;
