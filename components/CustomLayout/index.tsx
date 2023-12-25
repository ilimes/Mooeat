"use client"

import { Layout } from "antd";
import AdminLayout from "./AdminLayout";
import DefaultLayout from "./DefaultLayout";
import { usePathname } from 'next/navigation';

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdminPage = pathname?.split("/")?.[1] === "admin" ? true : false;

  return (
    <Layout>
      {isAdminPage && <AdminLayout>{children}</AdminLayout>}
      {!isAdminPage && <DefaultLayout>{children}</DefaultLayout>}
    </Layout>
  );
};

export default CustomLayout;
