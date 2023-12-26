import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mooeat - 개인정보 처리방침",
  description: "Mooeat - 개인정보 처리방침",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <div>{children}</div>
    </div>
  )
};

export default Layout;
