const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth-container">
      <div>{children}</div>
    </div>
  )
};

export default Layout;
