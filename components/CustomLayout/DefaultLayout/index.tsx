'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getToken } from 'firebase/messaging';
import Header from '../../Header';
import Footer from '../../Footer';
import Wrapper from '../Wrapper';
import MobileNav from '../../MobileNav';
import useIsMobile from '@/hooks/useIsMobile';
import { collapseState, isMobileState, menuState } from '@/recoil/states';
import { messaging } from '@/firebase';
import BottomNavbar from '@/components/BottomNav';
import '@/utils/fcm';

const { Content } = Layout;

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const mobile = useIsMobile();
  const router = useRouter();
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const setCollapsed = useSetRecoilState<boolean>(collapseState);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registration successful with scope: ', registration.scope);
        })
        .catch((err) => {
          console.error('Service Worker registration failed: ', err);
        });
    }

    async function requestPermission() {
      console.log('권한 요청 중...');
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('알림 권한이 허용됨');
        try {
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
          });
          // server 측에게 토큰 넘겨줘서 관리
          console.log('currentToken:', currentToken);
        } catch (error) {
          console.error('Error getting token:', error);
        }
      } else {
        console.log('알림 권한 허용 안됨');
      }
    }
    requestPermission();
  }, []);

  useEffect(() => {
    setCollapsed(false);

    if (mobile) setIsMobile(true);
    else setIsMobile(false);
  }, [mobile]);

  return (
    <>
      <Header />
      <Wrapper>
        <Content style={{ background: 'white' }}>{children}</Content>
      </Wrapper>
      <Footer />
      {isMobile && <MobileNav />}
      {isMobile && <BottomNavbar />}
    </>
  );
};

export default DefaultLayout;
