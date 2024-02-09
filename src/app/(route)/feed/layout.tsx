import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mooeat - 피드',
  description: 'Mooeat - 피드',
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="container">
    <div>{children}</div>
  </div>
);

export default Layout;
