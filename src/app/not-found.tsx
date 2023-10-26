'use client'

import { useRouter } from 'next/navigation';
import { Button, Col, Row } from 'antd';
import Image from 'next/image';
import NotFoundImage from '../../public/not-found.png';

const NotFound = () => {
  const router = useRouter();

  return (
    <Row justify={'center'}>
      <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={10} style={{ textAlign: 'center' }}>
        <Image src={NotFoundImage} alt='not found' width={300} style={{ marginTop: 20 }} />
        <h2>앗! 죄송해요.</h2>
        <div style={{ marginBottom: 30 }}>
          <div>요청하신 페이지를 찾을 수 없어요 😢</div>
          <div>찾으시려는 페이지의 주소가 잘못 입력되었거나,</div>
          <div>페이지 주소가 변경 또는 삭제되어</div>
          <div>현재 사용할 수 없는 상태입니다.</div>
        </div>
        <Button type='primary' onClick={() => router.push('/')} style={{ fontWeight: 'bold', marginBottom: 20, width: '90%', height: 50 }}>홈으로 이동</Button>
      </Col>
    </Row>
  )
}

export default NotFound;