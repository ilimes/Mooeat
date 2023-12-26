import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mooeat - 마이페이지",
  description: "Mooeat - 마이페이지",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <div>{children}</div>
    </div>
  )
};

export default Layout;
