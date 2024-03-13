'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import AdminLayout from './AdminLayout';
import DefaultLayout from './DefaultLayout';
import { loadUserInfoData } from '@/api/Api';

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdminPage = pathname?.split('/')?.[1] === 'admin';

  return (
    <>
      {isAdminPage && <AdminLayout>{children}</AdminLayout>}
      {!isAdminPage && <DefaultLayout>{children}</DefaultLayout>}
    </>
  );
};

export default CustomLayout;
