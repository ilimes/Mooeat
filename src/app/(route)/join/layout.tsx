const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="login-container">
      <div>{children}</div>
    </div>
  )
};

export default Layout;
