'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import PWAPrompt from 'react-ios-pwa-prompt';
import Header from '../../Header';
import Footer from '../../Footer';
import Wrapper from '../Wrapper';
import MobileNav from '../../MobileNav';
import useIsMobile from '@/hooks/useIsMobile';
import { collapseState, isMobileState, menuState } from '@/recoil/states';
import BottomNavbar from '@/components/BottomNav';

const { Content } = Layout;

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const mobile = useIsMobile();
  const router = useRouter();
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const setCollapsed = useSetRecoilState<boolean>(collapseState);
  const [shouldShowPWAPrompt, setShouldShowPWAPrompt] = useState(false);

  useEffect(() => {
    setCollapsed(false);

    if (mobile) {
      setIsMobile(true);
      setShouldShowPWAPrompt(true);
    } else {
      setIsMobile(false);
    }
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
      <PWAPrompt promptOnVisit={1} timesToShow={1} isShown={shouldShowPWAPrompt} />
    </>
  );
};

export default DefaultLayout;
