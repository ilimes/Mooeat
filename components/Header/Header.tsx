"use client";

import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from 'next/navigation';
import { useState } from "react";

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
  ];

  const onClickLogo = () => {
    router.push('/');
    setSelectedKeys(["1"]);
  }

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
        borderBottom: "1px solid #eee",
      }}
    >
      <div onClick={onClickLogo} style={{ fontWeight: "bold", marginRight: 30, fontSize: 20, cursor: 'pointer' }}>Mooeat</div>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={selectedKeys}
        items={items1}
        style={{ width: "100%", fontWeight: 700, fontSize: 18 }}
        onSelect={(e) => setSelectedKeys([e?.key])}
      />
    </Header>
  );
};

export default HeaderPage;
