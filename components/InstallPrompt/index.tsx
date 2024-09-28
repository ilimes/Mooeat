import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Image from 'next/image';
import IconImg from '@/public/maskable_icon_x192.png';

declare global {
  export interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPrompt = ({
  setIsPromptClosed,
}: {
  setIsPromptClosed: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | undefined>(
    undefined,
  );

  const checkUnsupportedBrowser = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return (
      (userAgent.indexOf('safari') > -1 &&
        userAgent.indexOf('chrome') <= -1 &&
        userAgent.indexOf('chromium') <= -1) ||
      (userAgent.indexOf('firefox') > -1 && userAgent.indexOf('seamonkey') <= -1)
    );
  };

  const promptAppInstall = async () => {
    const isUnsupportedBrowser = checkUnsupportedBrowser();
    if (isUnsupportedBrowser) {
      alert('공유 아이콘 -> 홈 화면에 추가를 클릭해 앱으로 편리하게 이용해보세요!');
    }
    if (!isUnsupportedBrowser) {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        setDeferredPrompt(undefined);
      } else {
        alert('이미 저희 서비스를 설치해주셨어요!');
      }
    }
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleCloseClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('installPromptClosed', 'true');
      setIsPromptClosed('true');
    }
  };

  return (
    <PromptWrap>
      <div
        role="button"
        tabIndex={0}
        onClick={handleCloseClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCloseClick();
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <CloseOutlined />
      </div>
      <div>
        <Image src={IconImg} alt="logo" width={40} height={40} style={{ borderRadius: 8 }} />
      </div>
      <MessageWrap>
        <div>Mooeat 앱으로 편하게 만나요!</div>
        <div>앱에선 알림을 받을 수 있어요.</div>
      </MessageWrap>
      <Button type="primary" onClick={promptAppInstall}>
        홈 화면에 추가
      </Button>
    </PromptWrap>
  );
};
export default InstallPrompt;

const PromptWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: sticky;
  top: 0;
  height: 60px;
  padding: 0 10px;
  z-index: 99;
  background: #f3f4f6;
`;

const MessageWrap = styled.div`
  flex: 1;
  color: #111827;
  div:nth-child(1) {
    font-size: 14px;
    font-weight: 500;
  }
  div:nth-child(2) {
    font-size: 12px;
    font-weight: 350;
  }
`;
