"use client";

import { Layout, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Logo from "../../public/logo.png";
import { ServerStyleSheet } from "styled-components";

const { Header } = Layout;

const HeaderPage = ({ isMobile, isMobileToggle, collapsed, setCollapsed }: { isMobile: boolean, isMobileToggle: boolean, collapsed: boolean, setCollapsed: Dispatch<SetStateAction<boolean>> }) => {
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const router = useRouter();

  const items1: MenuProps["items"] = [
    {
      key: 1,
      label: "홈",
      onClick: () => router.push('/')
    },
    {
      key: 2,
      label: "친구",
      onClick: () => router.push('/ㅇㅈㅇㅈ')
    },
    {
      key: 3,
      label: "보관함",
      onClick: () => router.push('/login')
    },
    {
      key: 4,
      label: "커뮤니티",
    },
  ];

  const onClickLogo = () => {
    router.push('/');
    setSelectedKeys(["1"]);
  }

  return (
    // <StyledDiv>
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
      <StyledDiv>
        <StyledLogo src={Logo} onClick={onClickLogo} width={130} alt="로고" />
        {
          !isMobile &&
          <>
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={selectedKeys}
              items={items1}
              style={{ width: "100%", fontWeight: 700, fontSize: 18 }}
              onSelect={(e) => setSelectedKeys([e?.key])}
            />
            <div style={{ width: 100, textAlign: 'center', marginRight: 10 }}>
              <StyledButton type="primary" onClick={() => router.push('/join')}>
                회원가입
              </StyledButton>
            </div>
            <div style={{ width: 100, textAlign: 'center' }}>
              <StyledButton onClick={() => router.push('/login')} >
                로그인
              </StyledButton>
            </div>
          </>
        }
        {
          isMobile &&
          <div style={{ marginLeft: 'auto' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '22px',
                width: 42,
                height: 48,
                marginTop: 7,
              }}
            />
          </div>
        }
      </StyledDiv>
    </Header>
    // </StyledDiv>
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