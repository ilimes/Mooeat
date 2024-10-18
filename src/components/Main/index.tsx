'use client';

import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Avatar, Button, Card, Col, Empty, Row } from 'antd';
import Image from 'next/image';
import Buttons from './Buttons';
import useIntersectionObserver from '@/src/hooks/useIntersectionObserver2';
import Content from '../SharedComponents/Content';
import Image1 from '@/public/img/main/img1.png';
import Image2 from '@/public/img/main/img2.png';
import { useModal } from '@/src/hooks/useModal';
import TopContent from './TopContent';
import RecentPosts from './RecentPosts';

const Main: React.FC = () => {
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const searchParams = useSearchParams();
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { ref, visible } = useIntersectionObserver(targetRef);

  useEffect(() => {
    if (searchParams.get('token') === 'false') {
      openModal();
    }
  }, []);

  return (
    <>
      <Buttons router={router} />
      <div>
        <TopContent />
        {/* <div style={{ height: 490 }}>
          <RecentPosts />
        </div> */}
        <div style={{ background: '#fff8f2', padding: '20px 0' }}>
          <Content>
            <div style={{ margin: '0 auto', maxWidth: 1200, padding: '0 16px' }}>
              <Row style={{ alignItems: 'center' }}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#212121' }}>식단공유</div>
                  <h1 style={{ fontWeight: 800 }}>
                    <span style={{ color: '#212529' }}>친구에게,</span>
                    <br />
                    <StyledSpan1>나의 식단</StyledSpan1>
                    <span style={{ color: '#212529' }}>을 공유해보세요.</span>
                  </h1>
                  <div style={{ fontSize: 16, color: '#6b6d6d', lineHeight: 1.45 }}>
                    <div>등록된 친구와 서로 간편하게</div>
                    <div>식단을 공유할 수 있어요.</div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={12}
                  xl={12}
                  xxl={12}
                  style={{ textAlign: 'center' }}
                >
                  <Image src={Image1} alt="image1" height={300} style={{ maxWidth: '100%' }} />
                </Col>
              </Row>
            </div>
          </Content>
        </div>
        <div style={{ background: '#F6FDEC', padding: '20px 0px' }}>
          <Content>
            <div ref={ref} style={{ margin: '0 auto', maxWidth: 1200, padding: '0 16px' }}>
              <Row style={{ alignItems: 'center' }}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <div style={{ fontSize: 20, fontWeight: 'bold', color: '#212121' }}>건강정보</div>
                  <h1 style={{ fontWeight: 800 }}>
                    <StyledSpan2>건강 정보</StyledSpan2>
                    <span style={{ color: '#212529' }}>를,</span>
                    <br />
                    <span style={{ color: '#212529' }}>다 같이 공유해보세요.</span>
                  </h1>
                  <div style={{ fontSize: 16, color: '#6b6d6d', lineHeight: 1.45 }}>
                    <div>커뮤니티에서 건강 정보를</div>
                    <div>다 함께 공유할 수 있어요.</div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={12}
                  xl={12}
                  xxl={12}
                  style={{ textAlign: 'center' }}
                >
                  <Image src={Image2} alt="image2" height={300} style={{ maxWidth: '100%' }} />
                </Col>
              </Row>
            </div>
          </Content>
        </div>
      </div>
      {searchParams.get('token') === 'false' && (
        <Modal title="토큰 만료 알림" isOpen={isOpen} closeModal={closeModal}>
          <div style={{ margin: '30px 0' }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>토큰이 만료되었습니다.</div>
            <div style={{ color: 'grey' }}>다시 로그인해주세요.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button
              onClick={() => {
                router.push('/');
                closeModal();
              }}
            >
              확인
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Main;

const StyledSpan1 = styled.span`
  && {
    background: linear-gradient(to right, rgb(167, 129, 55), rgb(161, 131, 98));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StyledSpan2 = styled.span`
  && {
    background: linear-gradient(to right, rgb(32 105 106), rgb(112, 141, 148));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
