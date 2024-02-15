'use client';

import { Card, Col, Row } from 'antd';
import { ShareAltOutlined, CommentOutlined, SaveOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Image from 'next/image';
import Freepik from '@/components/Freepik';

const freepikLink =
  'https://kr.freepik.com/free-vector/happy-tiny-people-near-huge-welcome-word-flat-illustration_11235579.htm#page=2&query=welcome&position=38&from_view=search&track=sph&uuid=6287d2e5-782a-4493-9732-1435f02ee2c0';

const Welcome = () => (
  <>
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18} style={{ marginTop: 20 }}>
        <Row>
          <TopLeft />
          <TopRight />
        </Row>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <Row gutter={[40, 40]}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <h1>Mooeat의 컨텐츠</h1>
            <div style={{ color: 'grey' }}>Mooeat은 아래와 같은 컨텐츠가 있습니다.</div>
          </Col>
          {cardContentArr?.map((e: any, i: number) => (
            <ContentCard key={i} icon={e.icon} title={e.title} description={e.description} />
          ))}
        </Row>
      </Col>
    </Row>
    <Freepik link={freepikLink} name1="작가 pch.vector" name2="출처 Freepik" />
  </>
);

const TopLeft = () => (
  <Col
    xs={24}
    sm={24}
    md={24}
    lg={9}
    xl={9}
    xxl={9}
    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
  >
    <div style={{ fontSize: '2.25rem' }}>
      <div>반갑습니다</div>
      <div style={{ fontWeight: 700, color: '#4f4791' }}>Mooeat</div>
      <div>입니다.</div>
    </div>
    <div style={{ marginTop: 20, color: 'grey' }}>
      <div>Mooeat은 커뮤니티 사이트 입니다.</div>
      <div>현재 사이트 개발 중 입니다.</div>
    </div>
  </Col>
);

const TopRight = () => (
  <Col xs={24} sm={24} md={24} lg={15} xl={15} xxl={15}>
    <StyledImage src="/img/welcome/welcome.png" alt="welcome" width={0} height={0} sizes="100vw" />
  </Col>
);

const cardContentArr = [
  {
    icon: <ShareAltOutlined style={{ fontSize: 30 }} />,
    title: '친구에게 공유',
    description: '등록한 친구끼리 서로의 식단을 편리하게 공유할 수 있습니다.',
  },
  {
    icon: <CommentOutlined style={{ fontSize: 30 }} />,
    title: '커뮤니티',
    description:
      '커뮤니티에서 여러 유저들에게 정보를 공유하거나, 유저들로부터 정보를 얻을 수 있습니다.',
  },
  {
    icon: <SaveOutlined style={{ fontSize: 30 }} />,
    title: '구독 기능',
    description: '구독 기능이 있어 내가 원하는 컨텐츠를 정리하여 볼 수 있습니다.',
  },
];

const ContentCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
    <StyledCard>
      {icon}
      <h2>{title}</h2>
      <div>{description}</div>
    </StyledCard>
  </Col>
);

export default Welcome;

const StyledCard = styled(Card)`
  box-shadow: 0 8px 15px 0 rgba(129, 137, 143, 0.18);
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
`;
