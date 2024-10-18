'use client';

import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Buttons from './Buttons';
import useIntersectionObserver from '@/src/hooks/useIntersectionObserver2';
import Content from '../SharedComponents/Content';
import Image1 from '@/public/img/main/img1.png';
import Image2 from '@/public/img/main/img2.png';
import { useModal } from '@/src/hooks/useModal';
import TopContent from './TopContent';
import RecentPosts from './RecentPosts';
import TokenExpirationModalContent from '../Modal/TokenExpirationModalContent';

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
        <StyledContentWrapper $bgColor="#fff8f2">
          <Content>
            <StyledInnerWrapper>
              <Row style={{ alignItems: 'center' }}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <StyledTitle>식단공유</StyledTitle>
                  <StyledHeading>
                    <span style={{ color: '#212529' }}>친구에게,</span>
                    <br />
                    <StyledSpan1>나의 식단</StyledSpan1>
                    <span style={{ color: '#212529' }}>을 공유해보세요.</span>
                  </StyledHeading>
                  <StyledDescription>
                    <div>등록된 친구와 서로 간편하게</div>
                    <div>식단을 공유할 수 있어요.</div>
                  </StyledDescription>
                </Col>
                <StyledImageCol xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Image src={Image1} alt="image1" height={300} style={{ maxWidth: '100%' }} />
                </StyledImageCol>
              </Row>
            </StyledInnerWrapper>
          </Content>
        </StyledContentWrapper>
        <StyledContentWrapper $bgColor="#f6fdec">
          <Content>
            <StyledInnerWrapper ref={ref}>
              <Row style={{ alignItems: 'center' }}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <StyledTitle>건강정보</StyledTitle>
                  <StyledHeading>
                    <StyledSpan2>건강 정보</StyledSpan2>
                    <span style={{ color: '#212529' }}>를,</span>
                    <br />
                    <span style={{ color: '#212529' }}>다 같이 공유해보세요.</span>
                  </StyledHeading>
                  <StyledDescription>
                    <div>커뮤니티에서 건강 정보를</div>
                    <div>다 함께 공유할 수 있어요.</div>
                  </StyledDescription>
                </Col>
                <StyledImageCol xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Image src={Image2} alt="image2" height={300} style={{ maxWidth: '100%' }} />
                </StyledImageCol>
              </Row>
            </StyledInnerWrapper>
          </Content>
        </StyledContentWrapper>
      </div>
      {searchParams.get('token') === 'false' && (
        <Modal title="토큰 만료 알림" isOpen={isOpen} closeModal={closeModal}>
          <TokenExpirationModalContent closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default Main;

const StyledContentWrapper = styled.div<{ $bgColor: string }>`
  background: ${({ $bgColor }) => $bgColor};
  padding: 20px 0;
`;

const StyledInnerWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 16px;
`;

const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #212121;
`;

const StyledHeading = styled.h1`
  font-weight: 800;
`;

const StyledDescription = styled.div`
  font-size: 16px;
  color: #6b6d6d;
  line-height: 1.45;
`;

const StyledImageCol = styled(Col)`
  text-align: center;
`;

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
