import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mooeat - 공유하기',
  description: 'Mooeat - 공유하기',
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="container">
    <div>{children}</div>
  </div>
);

export default Layout;
