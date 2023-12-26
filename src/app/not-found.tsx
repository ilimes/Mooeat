import type { Metadata } from 'next';
import { Button, Col, Row } from 'antd';
import Image from 'next/image';
import NotFoundImage from '../../public/not-found.png';
import Link from 'next/link';
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: "Mooeat - 404 Not Found",
  description: "Mooeat - 404 Not Found",
};

const NotFound = () => {
  const header = headers()
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  console.log(ip)
  return (
    <Row justify={'center'} style={{ marginBottom: 20 }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={10} style={{ textAlign: 'center' }}>
        <Image src={NotFoundImage} alt='not found' width={250} style={{ marginTop: 20 }} />
        <h2>앗! 죄송해요.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 30, color: '#00000078', fontSize: 14 }}>
          <div>요청하신 페이지를 찾을 수 없어요.</div>
          <div>찾으시려는 페이지의 주소가 잘못 입력되었거나,</div>
          <div>페이지 주소가 변경 또는 삭제되어</div>
          <div>현재 사용할 수 없는 상태입니다.</div>
        </div>
        <Link href={"/"}>
          <Button style={{ marginBottom: 20, width: 230, height: 50 }}>홈으로 이동</Button>
        </Link>
      </Col>
    </Row>
  )
}

export default NotFound;