import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mooeat - 이용약관",
  description: "Mooeat - 이용약관",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <div>{children}</div>
    </div>
  )
};

export default Layout;
