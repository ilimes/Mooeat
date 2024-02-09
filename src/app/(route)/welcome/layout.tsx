import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mooeat - 환영합니다',
  description: 'Mooeat - 환영합니다',
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="container">
    <div>{children}</div>
  </div>
);

export default Layout;
