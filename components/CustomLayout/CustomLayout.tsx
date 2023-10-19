'use client'

import StyledComponentsRegistryAnt from '../../lib/AntdRegistry'
import StyledComponentsRegistry from '../../lib/Registry'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { ConfigProvider, Layout, Grid } from 'antd'
import theme from '../../theme/themeConfig'
import { useState, useEffect } from 'react'
import Utils from '@/utils/utils'
import useIsMobile from '../../utils/useIsMobile'
import MobileNav from '../MobileNav/MobileNav'

const { Content } = Layout;

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileToggle, setIsMobileToggle] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setIsMobileToggle(true);
    } else {
      setIsMobileToggle(false);
    }
  }, [isMobile]);

  useEffect(() => {
    setCollapsed(false);
  }, [isMobileToggle])

  return (
    <StyledComponentsRegistry>
      <StyledComponentsRegistryAnt>
        <ConfigProvider theme={theme}>
          <Layout>
            <Header isMobile={isMobile} isMobileToggle={isMobileToggle} collapsed={collapsed} setCollapsed={setCollapsed} />
            <Content style={{ background: 'white' }} >{children}</Content>
            <Footer />
            {isMobileToggle && <MobileNav collapsed={collapsed} setCollapsed={setCollapsed} />}
          </Layout>
        </ConfigProvider>
      </StyledComponentsRegistryAnt>
    </StyledComponentsRegistry>
  );
}

export default CustomLayout;