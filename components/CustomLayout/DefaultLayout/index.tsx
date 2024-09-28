'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import dynamic from 'next/dynamic';
import Header from '../../Header';
import Footer from '../../Footer';
import Wrapper from '../Wrapper';
import MobileNav from '../../MobileNav';
import useIsMobile from '@/hooks/useIsMobile';
import { collapseState, isMobileState, menuState } from '@/recoil/states';
import BottomNavbar from '@/components/BottomNav';
import InstallPrompt from '@/components/InstallPrompt';

const PushNotification = dynamic(() => import('../../PushNotification'), { ssr: false });

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

const { Content } = Layout;

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const mobile = useIsMobile();
  const router = useRouter();
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const [isPromptClosed, setIsPromptClosed] = useState<string | null>('true');
  const setCollapsed = useSetRecoilState<boolean>(collapseState);

  useEffect(() => {
    setCollapsed(false);

    if (mobile) setIsMobile(true);
    else setIsMobile(false);
  }, [mobile]);

  const checkPWA = () => {
    const nav = navigator as NavigatorStandalone;
    return window.matchMedia('(display-mode: standalone)').matches || nav.standalone;
  };

  useEffect(() => {
    if (checkPWA()) {
      setIsPromptClosed('true');
    } else if (typeof window !== 'undefined') {
      const closed = localStorage.getItem('installPromptClosed');
      setIsPromptClosed(closed);
    }
  }, []);

  return (
    <>
      {isMobile && !isPromptClosed && <InstallPrompt setIsPromptClosed={setIsPromptClosed} />}
      <Header isPromptClosed={isPromptClosed} />
      <Wrapper>
        <Content style={{ background: 'white' }}>{children}</Content>
      </Wrapper>
      <Footer />
      {isMobile && <MobileNav />}
      {isMobile && <BottomNavbar />}
      <PushNotification />
    </>
  );
};

export default DefaultLayout;
