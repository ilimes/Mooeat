"use client"

import { useState, useEffect } from 'react';
import { Layout } from "antd";
import AdminLayout from "./AdminLayout";
import DefaultLayout from "./DefaultLayout";
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import { loadUserInfoData } from '@/api/Api';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '@/recoil/states';

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  const isAdminPage = pathname?.split("/")?.[1] === "admin" ? true : false;
  const [updated, setUpdated] = useState(false);
  const setUserInfo = useSetRecoilState(userInfoState);
  const token = session?.user?.info?.data?.token;

  const getUserInfoData = async () => {
    const result = await loadUserInfoData({});
    if (result?.success) {
      setUserInfo(result?.user_info)
    } else {
      setUserInfo(null);
    }
  }

  // useEffect(() => {
  //   if (!updated && status == 'authenticated') {
  //     console.log('test', updated)
  //     update();
  //     setUpdated(true);
  //   }
  // }, [status])

  useEffect(() => {
    if (status == 'authenticated') {
      getUserInfoData();
    }
  }, [status])

  return (
    <>
      {isAdminPage && <AdminLayout>{children}</AdminLayout>}
      {!isAdminPage && <DefaultLayout>{children}</DefaultLayout>}
    </>
  );
};

export default CustomLayout;
