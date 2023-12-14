const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ paddingLeft: 24, minHeight: 280 }}>
      <div>{children}</div>
    </div>
  )
};

export default Layout;
