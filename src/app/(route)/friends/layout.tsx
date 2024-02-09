import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mooeat - 친구',
  description: 'Mooeat - 친구',
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="container">
    <div>{children}</div>
  </div>
);

export default Layout;
