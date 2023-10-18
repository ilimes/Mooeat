"use client";

import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import styled from "styled-components";

const { Header } = Layout;

const HeaderPage = () => {
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
    {
      key: 5,
      label: "로그인",
    },
  ];

  const onClickLogo = () => {
    router.push('/');
    setSelectedKeys(["1"]);
  }

  return (
    <div style={{ borderBottom: "1px solid #eee", justifyContent: 'center', display: 'flex', background: '#fff' }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: "#fff",
          maxWidth: 1200
        }}
      >
        <StyledLogo onClick={onClickLogo}>Mooeat</StyledLogo>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={selectedKeys}
          items={items1}
          style={{ width: "100%", fontWeight: 700, fontSize: 18 }}
          onSelect={(e) => setSelectedKeys([e?.key])}
        />
      </Header>
    </div>
  );
};

export default HeaderPage;

export const StyledLogo = styled.div`
  font-weight: bold;
  margin-right: 30px;
  font-size: 20px;
  cursor: pointer;
`