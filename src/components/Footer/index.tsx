'use client';

import { Layout, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import useIsMobile from '@/src/hooks/useIsMobile';

const { Footer } = Layout;

const FooterPage = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <Footer
      style={{
        padding: 0,
        fontSize: 13,
        color: '#44576c',
        background: '#F5F5F5',
        marginBottom: isMobile ? 'calc(env(safe-area-inset-bottom) + 66px)' : 0,
      }}
    >
      <div className="container">
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontWeight: 800, color: '#98a8b9', marginBottom: 10 }}>2023 Mooeat</div>
          <div>본 사이트는 현재 개발 진행중인 사이트 입니다.</div>
        </div>
        <StyledDiv>
          <span
            onClick={() => router.push('/privacy')}
            style={{ fontWeight: 800 }}
            aria-hidden="true"
          >
            개인정보 처리방침
          </span>{' '}
          ·{' '}
          <span onClick={() => router.push('/tos')} aria-hidden="true">
            이용약관
          </span>{' '}
          ·{' '}
          <span onClick={() => router.push('/service')} aria-hidden="true">
            고객센터
          </span>
        </StyledDiv>
      </div>
    </Footer>
  );
};

export default FooterPage;

const StyledDiv = styled.div`
  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
