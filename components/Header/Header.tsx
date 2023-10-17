"use client";

import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from 'next/navigation';

const { Header } = Layout;

const HeaderPage = () => {
  const router = useRouter();

  const items1: MenuProps["items"] = [
    {
      key: 1,
      label: "메인",
      onClick: () => router.push('/')
    },
    {
      key: 2,
      label: "룰루랄라",
      onClick: () => router.push('/ㅇㅈㅇㅈ')
    },
    {
      key: 3,
      label: "로그인",
      onClick: () => router.push('/login')
    },
    {
      key: 4,
      label: "중고거래",
    },
    {
      key: 5,
      label: "중고거래",
    },
    {
      key: 6,
      label: "중고거래",
    },
  ];

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
      <div style={{ fontWeight: "bold", marginRight: 30 }}>Mooeat</div>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items1}
        style={{ width: "100%", fontWeight: 700, fontSize: 18 }}
      />
    </Header>
  );
};

export default HeaderPage;
