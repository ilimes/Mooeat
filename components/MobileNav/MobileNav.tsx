'use client'

import { Layout, Menu, Drawer, Button, Divider, message } from "antd";
import {
  CloseOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import Logo from "../../public/logo.png";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession, signOut } from 'next-auth/react'
import styled from "styled-components";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import { collapseState, menuState, userInfoState } from "@/recoil/states";

const { Sider } = Layout;

const MobileNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const [collapsed, setCollapsed] = useRecoilState(collapseState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const menuList = useRecoilValue(menuState);

  const onClickLogo = () => {
    router.push('/');
    setCollapsed(false);
  }

  const onClickMenu = (path: string) => {
    router.push(path)
    setCollapsed(false);
  }

  /**
   * 로그아웃
   */
  const logout = () => {
    signOut();
    // 토큰 비우기
    // localStorage.removeItem("token");

    // 유저 정보 비우기
    // setUserInfo(null);

    // 홈으로 이동
    // router.push('/');
  }

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname])

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={() => setCollapsed(false)}
      open={collapsed}
      styles={{ body: { padding: "0 20px" } }}
      width={"100%"}
    >
      <div style={{ display: "flex", height: 64 }}>
        <StyledLogo src={Logo} onClick={onClickLogo} width={130} alt="로고" />
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "22px",
            width: 42,
            height: 48,
            marginTop: 5,
            marginLeft: "auto",
          }}
        />
      </div>
      <div className="mobile-nav-menu">
        <div className="demo-logo-vertical" />
        {
          session &&
          <h3>{session?.user?.token?.userInfo?.user_nm} 님 반가워요 :)</h3>
        }
        {
          !session &&
          <h3>로그인 후 이용해주세요.</h3>
        }
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          onClick={() => setCollapsed(false)}
          items={menuList}
        />
        <Divider />
        {
          session &&
          <>
            <div>
              <StyledProfileDiv onClick={() => message.info('준비중 입니다.')}>
                프로필 수정
              </StyledProfileDiv>
              <StyledProfileDiv onClick={() => onClickMenu("/myPage")}>
                마이 페이지
              </StyledProfileDiv>
              <StyledProfileDiv onClick={() => logout()}>
                <LogoutOutlined /> 로그아웃
              </StyledProfileDiv>
            </div>
          </>
        }
        {
          !session &&
          <>
            <div>
              <StyledProfileDiv onClick={() => onClickMenu("/auth/login")}>
                <LoginOutlined /> 로그인
              </StyledProfileDiv>
              <StyledProfileDiv onClick={() => onClickMenu("/auth/join")}>
                <UserAddOutlined /> 회원가입
              </StyledProfileDiv>
            </div>
          </>
        }
      </div>
    </Drawer>
  );
}

export default MobileNav;

export const StyledLogo = styled(Image)`
    && {
    align-self: center;
    font-weight: bold;
    margin-right: 20px;
    font-size: 20px;
    cursor: pointer;
    }
`
export const StyledButton = styled(Button)`
  && {
    font-size: 15px;
    transition: all 0.1s linear;
    &:hover {
        transform: scale(1.03);
    }
  }
`

const StyledProfileDiv = styled.div`
  && {
    border-radius: 10px;
    padding: 15px 10px;
    font-weight: 500;
    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
`