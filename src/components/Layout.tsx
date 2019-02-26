import * as React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Section from 'react-bulma-components/lib/components/section';
interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.SFC<ILayoutProps> = ({ children }) => (
  <Section>
    <Container>
      {children}
    </Container>
  </Section>
);

export default Layout;
