import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mooeat - 커뮤니티",
  description: "Mooeat - 커뮤니티",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <div>{children}</div>
    </div>
  )
};

export default Layout;
