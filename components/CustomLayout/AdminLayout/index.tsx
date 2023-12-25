"use client";

import React from "react";
import { Layout } from "antd";
import AdminHeader from "../../Admin/AdminHeader";
import AdminSider from "../../Admin/AdminSider";
import { StyledFooterDiv, StyledLayout } from "./style";

const { Content } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Layout style={{ background: "#F5F5F5" }}>
        <AdminHeader />
        <div style={{ padding: 24 }}>
          <StyledLayout>
            <AdminSider />
            <Content>{children}</Content>
          </StyledLayout>
        </div>
        <StyledFooterDiv>
          Mooeat ©2023 Created by ilimes
        </StyledFooterDiv>
      </Layout>
    </>
  );
};

export default AdminLayout;
