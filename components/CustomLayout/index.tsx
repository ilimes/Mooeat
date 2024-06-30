'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { Button, Space, message, notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import AdminLayout from './AdminLayout';
import DefaultLayout from './DefaultLayout';
import { loadNotificationList, loadUserInfoData, notificationConfirm } from '@/api/Api';

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status, update } = useSession();
  const userSeq = session?.user?.info?.userInfo?.user_seq;
  const user = session?.user;

  const { data: notiList, refetch: notiListRefetch } = useQuery({
    queryKey: ['notificationList'],
    queryFn: loadNotificationList,
    enabled: !!user,
  });

  const pathname = usePathname();
  const router = useRouter();
  const isAdminPage = pathname?.split('/')?.[1] === 'admin';

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, type?: string, link?: string, seq?: string) => {
    const key = `open${Date.now()}`;

    const notiConfirm = async () => {
      if (seq) {
        const formData = { seq: Number(seq) };
        const result = await notificationConfirm(formData);
        if (result?.success) {
          notiListRefetch();
        }
      }
    };

    const onClickViewArticle = async () => {
      api.destroy(key);
      router.push(`${link}` ?? '/');
      await notiConfirm();
    };

    const btn = (
      <Space>
        <Button type="primary" size="small" onClick={onClickViewArticle}>
          바로가기
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
          const link: string = JSON.parse(event.data)?.link;
          const seq: string = JSON.parse(event.data)?.seq;

          openNotification(message, type, link, seq);
          notiListRefetch();
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
