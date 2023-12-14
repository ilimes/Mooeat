'use client'

import { useRouter } from 'next/navigation';
import { Button, Col, Row } from 'antd';
import { StopOutlined } from '@ant-design/icons';

const NotAccepted = () => {
  const router = useRouter();

  return (
    <Row justify={'center'} style={{ marginBottom: 20 }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={10} style={{ textAlign: 'center' }}>
        <StopOutlined style={{ fontSize: 140, margin: '30px 0' }} />
        <h2>접근할 수 없습니다.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 30, color: '#00000078', fontSize: 14 }}>
          <div>요청하신 페이지는 관리자만 접근 가능합니다.</div>
          <div>관리자 계정으로 로그인 후 사용해주세요.</div>
        </div>
        <Button onClick={() => router.push('/')} style={{ marginBottom: 20, width: 230, height: 50 }}>홈으로 이동</Button>
      </Col>
    </Row>
  )
}

export default NotAccepted;