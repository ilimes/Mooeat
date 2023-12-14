const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ minHeight: 280 }}>
      <div>{children}</div>
    </div>
  )
};

export default Layout;
