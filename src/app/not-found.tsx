import './styles/not-found.css';
import type { Metadata } from 'next';
import { Button, Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import NotFoundImage from '../../public/not-found.png';

export const metadata: Metadata = {
  title: 'Mooeat - 페이지를 찾을 수 없습니다',
  description: 'Mooeat - 페이지를 찾을 수 없습니다',
};

const NotFound = () => (
  <Row className="row-container" justify="center">
    <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={10}>
      <Image src={NotFoundImage} alt="not found" width={250} style={{ marginTop: 20 }} />
      <h2>앗! 죄송해요.</h2>
      <div className="content">
        <div>요청하신 페이지를 찾을 수 없어요.</div>
        <div>찾으시려는 페이지의 주소가 잘못 입력되었거나,</div>
        <div>페이지 주소가 변경 또는 삭제되어</div>
        <div>현재 사용할 수 없는 상태입니다.</div>
      </div>
      <Link href="/">
        <Button className="home-btn">홈으로 이동</Button>
      </Link>
    </Col>
  </Row>
);

export default NotFound;
