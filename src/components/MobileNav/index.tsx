'use client';

import { Menu, Drawer, Button, Divider } from 'antd';
import {
  CloseOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import styled from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { collapseState, menuState, userInfoState } from '@/src/recoil/states';
import Logo from '@/public/logo.png';
import { loadMenuList } from '@/src/app/api/Api';
import { MenuListTypes } from '@/src/types/Common/Common.interface';

const MobileNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const [collapsed, setCollapsed] = useRecoilState(collapseState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { data, isSuccess, isError } = useQuery({ queryKey: ['menuList'], queryFn: loadMenuList });

  const menuList = data?.list?.map((e: MenuListTypes) => ({
    key: e.menu_path,
    label: e.menu_nm,
    onClick: () => router.push(e.menu_path),
  }));

  const onClickLogo = () => {
    router.push('/');
    setCollapsed(false);
  };

  const onClickMenu = (path: string) => {
    router.push(path);
    setCollapsed(false);
  };

  /**
   * 로그아웃
   */
  const logout = () => {
    signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={() => setCollapsed(false)}
      open={collapsed}
      styles={{ body: { padding: '0 20px', fontSize: 15 } }}
      width="100%"
    >
      <div style={{ display: 'flex', height: 64 }}>
        <StyledLogo src={Logo} onClick={onClickLogo} width={130} alt="로고" />
        <StyledCloseButton
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <div className="mobile-nav-menu">
        {session && <h3>{session?.user?.info?.userInfo?.user_nm} 님 반가워요 :)</h3>}
        {!session && <h3>로그인 후 이용해주세요.</h3>}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          onClick={() => setCollapsed(false)}
          items={menuList}
          style={{ fontSize: 15 }}
        />
        <Divider />
        {session && (
          <div>
            {session?.user?.info?.userInfo?.role_rank > 2 && (
              <StyledProfileDiv onClick={() => onClickMenu('/admin')}>
                관리자페이지
              </StyledProfileDiv>
            )}
            <StyledProfileDiv onClick={() => onClickMenu('/myPage')}>
              <UserOutlined /> 마이페이지
            </StyledProfileDiv>
            <StyledProfileDiv onClick={() => logout()}>
              <LogoutOutlined /> 로그아웃
            </StyledProfileDiv>
          </div>
        )}
        {!session && (
          <div>
            <StyledProfileDiv onClick={() => onClickMenu('/auth/login')}>
              <LoginOutlined /> 로그인
            </StyledProfileDiv>
            <StyledProfileDiv onClick={() => onClickMenu('/auth/join')}>
              <UserAddOutlined /> 회원가입
            </StyledProfileDiv>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default MobileNav;

const StyledLogo = styled(Image)`
  && {
    align-self: center;
    font-weight: bold;
    margin-right: 20px;
    font-size: 20px;
    cursor: pointer;
  }
`;

const StyledProfileDiv = styled.div`
  && {
    border-radius: 16px;
    padding: 15px 10px;
    font-weight: 500;
    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
`;

const StyledCloseButton = styled(Button)`
  && {
    font-size: 22px;
    width: 42px;
    height: 48px;
    margin-top: 5px;
    margin-left: auto;
  }
`;
