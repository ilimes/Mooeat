import '../../styles/not-found.css';

import { Button, Col, Row } from 'antd';
import { StopOutlined } from '@ant-design/icons';

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mooeat - 잘못된 접근',
  description: 'Mooeat - 잘못된 접근',
};

const NotAccepted = () => (
  <Row justify="center" style={{ marginBottom: 20 }}>
    <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={10} style={{ textAlign: 'center' }}>
      <StopOutlined style={{ fontSize: 140, margin: '30px 0' }} />
      <h2>접근할 수 없습니다.</h2>
      <div className="content">
        <div>요청하신 페이지는 관리자만 접근 가능합니다.</div>
        <div>관리자 계정으로 로그인 후 사용해주세요.</div>
      </div>
      <Link href="/">
        <Button style={{ marginBottom: 20, width: 230, height: 50 }}>홈으로 이동</Button>
      </Link>
    </Col>
  </Row>
);

export default NotAccepted;
