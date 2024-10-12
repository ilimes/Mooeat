'use client';

import React from 'react';
import { Layout } from 'antd';
import AdminHeader from '../../Admin/AdminHeader';
import AdminSider from '../../Admin/AdminSider';
import * as S from './style';

const { Content } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AdminHeader />
    <div style={{ display: 'flex', padding: 24 }}>
      <AdminSider />
      <S.StyledLayout>
        <div style={{ flex: 1 }}>
          <Content>{children}</Content>
        </div>
      </S.StyledLayout>
    </div>
    <S.StyledFooterDiv>Mooeat ©2024 Created by ilimes</S.StyledFooterDiv>
  </>
);

export default AdminLayout;
