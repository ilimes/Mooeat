'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { Button, Space, message, notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import AdminLayout from './AdminLayout';
import DefaultLayout from './DefaultLayout';
import { loadUserInfoData } from '@/api/Api';

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status, update } = useSession();
  const userSeq = session?.user?.info?.userInfo?.user_seq;

  const pathname = usePathname();
  const router = useRouter();
  const isAdminPage = pathname?.split('/')?.[1] === 'admin';

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, type?: string, targetSeq?: string) => {
    const key = `open${Date.now()}`;

    const btn = (
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            api.destroy(key);
            router.push(`/articles/${targetSeq}` ?? '/');
          }}
        >
          게시글 바로가기
        </Button>
        <Button type="default" size="small" onClick={() => api.destroy(key)}>
          닫기
        </Button>
      </Space>
    );

    api.info({
      message: type ?? '알림',
      description: message,
      placement: 'bottomLeft',
      key,
      btn,
    });
  };

  useEffect(() => {
    let eventSource: EventSource;

    if (userSeq) {
      eventSource = new EventSource(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${userSeq}`,
      );

      eventSource.onmessage = (event) => {
        try {
          const message: string = JSON.parse(event.data)?.message;
          const type: string = JSON.parse(event.data)?.type;
          const targetSeq: string = JSON.parse(event.data)?.target_seq;

          openNotification(message, type, targetSeq);
        } catch (e) {
          console.error('Error parsing SSE data:', e);
        }
      };

      eventSource.onerror = (e) => {
        console.error('EventSource failed:', e);
        eventSource.close();
      };
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [userSeq]);

  return (
    <>
      {isAdminPage && <AdminLayout>{children}</AdminLayout>}
      {!isAdminPage && <DefaultLayout>{children}</DefaultLayout>}
      {contextHolder}
    </>
  );
};

export default CustomLayout;
