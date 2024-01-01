"use client";

import React from "react";
import { Layout } from "antd";
import AdminHeader from "../../Admin/AdminHeader";
import AdminSider from "../../Admin/AdminSider";
import * as S from "./style";

const { Content } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Layout style={{ background: "#F5F5F5" }}>
        <AdminHeader />
        <div style={{ padding: 24 }}>
          <S.StyledLayout>
            <AdminSider />
            <Content>{children}</Content>
          </S.StyledLayout>
        </div>
        <S.StyledFooterDiv>
          Mooeat ©2023 Created by ilimes
        </S.StyledFooterDiv>
      </Layout>
    </>
  );
};

export default AdminLayout;
