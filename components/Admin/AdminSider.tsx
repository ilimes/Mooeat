import React, { ReactElement, useEffect, useState } from "react";
import {
  LaptopOutlined,
  UserOutlined,
  BarChartOutlined,
  HomeOutlined,
  DatabaseOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { usePathname, useRouter } from 'next/navigation';

const { Sider } = Layout;

interface IMenuTypes {
  key: string;
  icon?: ReactElement,
  label: string,
  onClick?: () => void,
  children?: IMenuTypes[],
}

const AdminSider = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKeys, setSelectedKeys] = useState([pathname]);

  const menuItems: IMenuTypes[] = [
    {
      key: '/admin',
      icon: React.createElement(HomeOutlined),
      label: '관리자 페이지 홈',
      onClick: () => router.push('/admin'),
    },
    {
      key: 'user',
      icon: React.createElement(UserOutlined),
      label: '회원',
      children: [
        {
          key: '/admin/user',
          label: '회원 관리',
          onClick: () => router.push('/admin/user'),
        },
        {
          key: '/admin/auth',
          label: '권한 관리',
          onClick: () => router.push('/admin/auth'),
        },
      ]
    },
    {
      key: 'content',
      icon: React.createElement(DatabaseOutlined),
      label: '콘텐츠',
      children: [
        {
          key: '/admin/content',
          label: '글 관리',
          onClick: () => router.push('/admin/content'),
        },
        {
          key: '/admin/reply',
          label: '댓글 관리',
          onClick: () => router.push('/admin/reply'),
        },
      ]
    },
    {
      key: 'statistics',
      icon: React.createElement(BarChartOutlined),
      label: '통계',
      children: [
        {
          key: '/admin/api',
          label: 'API 통계',
          onClick: () => router.push('/admin/api')
        },
      ]
    },
  ]

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname])

  return (
    <Sider width={230} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={menuItems?.map(e => e.key)}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

export default AdminSider;
