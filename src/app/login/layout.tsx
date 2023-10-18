const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <div>{children}</div>
    </div>
  )
};

export default Layout;
