'use client'

import { Layout, Row, Col } from 'antd';

const { Footer } = Layout;

const FooterPage = () => {
    return (
        <Footer style={{ padding: 0, fontSize: 13, color: '#44576c' }}>
            <div className='container'>
                <div style={{ marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, color: '#98a8b9', marginBottom: 10 }}>2023 Mooeat</div>
                    <div>본 사이트의 모든 콘텐츠나 정보, UI 등의 복제 행위를 금합니다.</div>
                </div>
                <span style={{ fontWeight: 700 }}>개인정보 처리방침</span> <span>이용약관</span>
            </div>
        </Footer>
    )
}

export default FooterPage;