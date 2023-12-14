import React from "react";
import {
  LeftOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { useRouter } from 'next/navigation';

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const AdminHeader = () => {
  const router = useRouter();
  
  return (
    <Header style={{ display: "flex", alignItems: "center", background: '#fff', borderBottom: '2px solid rgba(5, 5, 5, 0.06)' }}>
      {/* <div className="demo-logo" /> */}
      <div style={{ marginRight: 20, fontWeight: 600 }}>
        Mooeat 관리자 페이지
      </div>
      {/* <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items1}
        style={{ flex: 1, minWidth: 0 }}
      /> */}
      <Button type='primary' onClick={() => router.push('/')} style={{ fontWeight: 600 }}><LeftOutlined /> 사이트로 돌아가기</Button>
    </Header>
  );
};

export default AdminHeader;
