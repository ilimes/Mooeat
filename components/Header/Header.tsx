"use client"

import { Layout, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { use, useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Logo from "../../public/logo.png";
import { ServerStyleSheet } from "styled-components";
import { collapseState, isMobileState, menuState } from "@/recoil/states";
import { useRecoilState, useRecoilValue } from "recoil";

const { Header } = Layout;

const HeaderPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const [collapsed, setCollapsed] = useRecoilState(collapseState);
  const menuList = useRecoilValue(menuState);
  const isMobile = useRecoilValue(isMobileState);

  const onClickLogo = () => {
    router.push('/');
  }

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname])

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: "#fff",
        boxShadow: "0 1px 5px rgba(57, 63, 72, 0.2)",
        padding: 16,
      }}
    >
      <div className="pc-menu-btn">
        <StyledLogo src={Logo} onClick={onClickLogo} width={130} alt="로고" />
        <>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={selectedKeys}
            items={menuList}
            style={{ width: "100%", fontWeight: 700, fontSize: 18 }}
            onSelect={(e) => setSelectedKeys([e?.key])}
          />
          <div style={{ width: 100, textAlign: 'center' }}>
            <StyledButton onClick={() => router.push('/auth/login')} >
              로그인
            </StyledButton>
          </div>
          <div style={{ width: 100, textAlign: 'center', marginLeft: 10 }}>
            <StyledButton type="primary" onClick={() => router.push('/auth/join')}>
              회원가입
            </StyledButton>
          </div>
        </>
      </div>
      <div className="mobile-btn">
        <StyledLogo src={Logo} onClick={onClickLogo} width={130} alt="로고" />
        <div style={{ marginLeft: 'auto' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '22px',
              width: 42,
              height: 48,
              marginTop: 5,
            }}
          />
        </div>
      </div>
    </Header>
  );
};

export default HeaderPage;

export const StyledLogo = styled(Image)`
  && {
    align-self: center;
    font-weight: bold;
    margin-right: 20px;
    font-size: 20px;
    cursor: pointer;
  }
`

export const StyledDiv = styled.div`
  justify-content: center;
  display: flex;
  background: #fff;
  margin: 0 auto;
  width: 1200px;
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