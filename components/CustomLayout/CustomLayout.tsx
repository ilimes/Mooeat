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
import { collapseState, isMobileState, menuState, userInfoLoadingState, userInfoState } from '@/recoil/states'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import Wrapper from './Wrapper'

const { Content } = Layout;

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const setUserInfoLoading = useSetRecoilState(userInfoLoadingState);
  const setCollapsed = useSetRecoilState<boolean>(collapseState);
  const setMenuList = useSetRecoilState(menuState);
  const mobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    setCollapsed(false);

    if (mobile) setIsMobile(true);
    else setIsMobile(false);
  }, [mobile]);

  /**
   * 메뉴 리스트 불러오기
   */
  const getMenuList = async () => {
    const result = await fetchMenuData();
    const list = result?.list?.map((e: any) => ({ key: e.menu_path, label: e.menu_nm, onClick: () => router.push(e.menu_path)}));
    setMenuList(list);
  }

  /**
   * 유저 정보 불러오기
   */
  const userInfoSet = async () => {
    const token = localStorage.getItem("token");

    // 토큰이 존재할 때
    if (token) {
      const result = await fetchUserInfoData(token);
      
      // 토큰이 만료되지 않고 정상적인 경우
      if (result?.success) {
        setUserInfo(result?.user_info);
      } else {
        localStorage.removeItem("token");
        alert('토큰이 만료되어 로그아웃 되었습니다.');
      }
    }
    await setUserInfoLoading(true);
  }

  useEffect(() => {
    getMenuList();
    userInfoSet();
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

export const fetchMenuData = async () => {
  const res = await fetch(`/api/menu`, {
    method: 'POST',
  });
  const result = await res.json();
  
  return result?.data;
}

export const fetchUserInfoData = async (token: string | null) => {
  const res = await fetch(`/api/userInfo`, {
    method: 'POST',
    body: JSON.stringify(token)
  });
  const result = await res.json();
  
  return result?.data;
}