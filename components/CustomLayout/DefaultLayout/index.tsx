'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getToken } from 'firebase/messaging';
import Script from 'next/script';
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
    // 클라이언트 환경에서만 실행
    if (typeof window !== 'undefined') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js')
          .then((registration) => {
            console.log('Service Worker registration successful with scope: ', registration.scope);

            // 푸시 알림 권한 요청 및 토큰 받기
            getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
              serviceWorkerRegistration: registration,
            })
              .then((currentToken) => {
                if (currentToken) {
                  console.log('FCM Token:', currentToken);
                } else {
                  console.log('No registration token available.');
                }
              })
              .catch((err) => {
                console.error('Error getting token:', err);
              });
          })
          .catch((err) => {
            console.error('Service Worker registration failed:', err);
          });
      }
    }
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
      <Script src="/service-worker.js" />
      <Footer />
      {isMobile && <MobileNav />}
      {isMobile && <BottomNavbar />}
    </>
  );
};

export default DefaultLayout;
