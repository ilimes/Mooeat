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
import { collapseState, isMobileState, menuState } from '@/recoil/states'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Wrapper from './Wrapper'

const { Content } = Layout;

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const setCollapsed = useSetRecoilState<boolean>(collapseState);
  const setMenuList = useSetRecoilState(menuState);
  const mobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    setCollapsed(false);

    if (mobile) setIsMobile(true);
    else setIsMobile(false);
  }, [mobile]);

  const getMenuList = async () => {
    const result = await fetchData();
    const list = result?.list?.map((e: any) => ({ key: e.menu_path, label: e.menu_nm, onClick: () => router.push(e.menu_path)}));
    setMenuList(list);
  }

  useEffect(() => {
    getMenuList();
  }, [])

  return (
    <StyledComponentsRegistry>
      <StyledComponentsRegistryAnt>
        <ConfigProvider theme={theme}>
          <Layout>
            <Header />
            <Wrapper>
              <Content style={{ background: 'white' }}>{children}</Content>
            </Wrapper>
            <Footer />
            {isMobile && <MobileNav />}
          </Layout>
        </ConfigProvider>
      </StyledComponentsRegistryAnt>
    </StyledComponentsRegistry>
  );
}

export default CustomLayout;

export const fetchData = async () => {
  const res = await fetch(`/api/menu`, {
    method: 'POST',
  });
  const result = await res.json();
  
  return result?.data;
}