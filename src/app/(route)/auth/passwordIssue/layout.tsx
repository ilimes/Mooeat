import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mooeat - 비밀번호 재설정",
  description: "Mooeat - 비밀번호 재설정",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>{children}</div>
  )
};

export default Layout;
