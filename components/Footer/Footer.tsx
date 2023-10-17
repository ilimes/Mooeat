'use client'

import { Layout, Row, Col } from 'antd';

const { Footer } = Layout;

const FooterPage = () => {
    return (
        <Footer>
          <Row justify={'center'}>
            <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={10}>
              이용약관 개인정보처리방침 위치기반서비스 이용약관 이용자보호 비전과 계획 청소년보호정책
            </Col>
          </Row>
        </Footer>
    )
}

export default FooterPage;