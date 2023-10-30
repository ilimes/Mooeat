'use client'

import StyledComponentsRegistryAnt from '../../lib/AntdRegistry'
import StyledComponentsRegistry from '../../lib/Registry'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { ConfigProvider, Layout, Grid } from 'antd'
import theme from '../../theme/themeConfig'
import { useState, useEffect } from 'react'
import Utils from '@/utils/utils'
import useIsMobile from '../../hooks/useIsMobile'
import MobileNav from '../MobileNav/MobileNav'
import { useRouter } from 'next/navigation'

const { Content } = Layout;

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileToggle, setIsMobileToggle] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [items, setItems] = useState([]);
  const isMobile = useIsMobile();
  const router = useRouter();
  const props = { isMobile, isMobileToggle, collapsed, setCollapsed, items };

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

  const getMenuList = async () => {
    const result = await fetchData();
    const list = result?.list?.map((e: any) => ({ key: e.menu_path, label: e.menu_nm, onClick: () => router.push(e.menu_path)}));
    setItems(list);
  }

  useEffect(() => {
    getMenuList();
  }, [])

  return (
    <StyledComponentsRegistry>
      <StyledComponentsRegistryAnt>
        <ConfigProvider theme={theme}>
          <Layout>
            <Header {...props} />
            <Content style={{ background: 'white' }} >{children}</Content>
            <Footer />
            {isMobileToggle && <MobileNav {...props} />}
          </Layout>
        </ConfigProvider>
      </StyledComponentsRegistryAnt>
    </StyledComponentsRegistry>
  );
}

export default CustomLayout;

export const fetchData = async () => {
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_FRONT_URL}/api/menu`, {
    method: 'POST',
  });
  const result = await res.json();
  
  return result?.data;
}