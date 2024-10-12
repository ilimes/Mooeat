import React, { useEffect, useState } from 'react';
import {
  UserOutlined,
  BarChartOutlined,
  HomeOutlined,
  DatabaseOutlined,
  LeftOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Tooltip, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { adminCollapsedState } from '@/src/recoil/states';
import useIsMobile from '@/src/hooks/useIsMobile';
import { MenuTypes } from '@/src/types/Admin/Admin.interface';

const { Header } = Layout;

const AdminHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useRecoilState(adminCollapsedState);
  const [selectedKeys, setSelectedKeys] = useState([pathname]);

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

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        borderBottom: '2px solid rgba(5, 5, 5, 0.06)',
      }}
    >
      {!isMobile && (
        <div
          onClick={() => setCollapsed(!collapsed)}
          aria-hidden="true"
          style={{ cursor: 'pointer', fontSize: 20, marginRight: 10 }}
        >
          <Tooltip title={collapsed ? '메뉴 펼치기' : '메뉴 접기'}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Tooltip>
        </div>
      )}
      <div style={{ marginRight: 20, fontWeight: 700 }}>Mooeat 관리자 페이지</div>
      {isMobile && (
        <Menu theme="light" mode="horizontal" items={menuItems} style={{ flex: 1, minWidth: 0 }} />
      )}
    </Header>
  );
};

export default AdminHeader;
