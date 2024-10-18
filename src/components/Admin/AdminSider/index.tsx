import React, { useEffect, useState } from 'react';
import {
  LeftOutlined,
  UserOutlined,
  BarChartOutlined,
  HomeOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
// import type { MenuProps } from "antd";
import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { adminCollapsedState } from '@/src/recoil/states';
import useIsMobile from '@/src/hooks/useIsMobile';
import { MenuTypes } from '@/src/types/Admin/Admin.interface';

const { Sider } = Layout;

const AdminSider = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const collasped = useRecoilValue(adminCollapsedState);
  const isMobile = useIsMobile();

  const menuItems: MenuTypes[] = [
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
      ],
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
      ],
    },
    {
      key: 'statistics',
      icon: React.createElement(BarChartOutlined),
      label: '통계',
      children: [
        {
          key: '/admin/api',
          label: 'API 통계',
          onClick: () => router.push('/admin/api'),
        },
        {
          key: '/admin/ip',
          label: 'IP 주소 통계',
          onClick: () => router.push('/admin/ip'),
        },
      ],
    },
    {
      key: 'home',
      icon: React.createElement(LeftOutlined),
      label: '사이트로 돌아가기',
      onClick: () => router.push('/'),
    },
  ];

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  return !isMobile ? (
    <Sider width={230} collapsed={collasped} style={{ background: '#fff', marginRight: 24 }}>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={menuItems?.map((e) => e.key)}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  ) : (
    <></>
  );
};

export default AdminSider;
