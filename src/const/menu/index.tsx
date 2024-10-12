import {
  UserOutlined,
  BarChartOutlined,
  HomeOutlined,
  DatabaseOutlined,
  LeftOutlined,
} from '@ant-design/icons';

import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { MenuTypes } from '@/src/types/Admin/Admin.interface';

export const menuItems = (router: AppRouterInstance): MenuTypes[] => [
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
