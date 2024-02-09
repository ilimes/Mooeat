import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mooeat - 고객센터',
  description: 'Mooeat - 고객센터',
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="container">
    <div>{children}</div>
  </div>
);

export default Layout;
