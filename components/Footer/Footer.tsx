'use client'

import { Layout, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const { Footer } = Layout;

const FooterPage = () => {
    const router = useRouter();
    return (
        <Footer style={{ padding: 0, fontSize: 13, color: '#44576c', background: '#F5F5F5' }}>
            <div className='container'>
                <div style={{ marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, color: '#98a8b9', marginBottom: 10 }}>2023 Mooeat</div>
                    <div>본 사이트의 모든 콘텐츠나 정보, UI 등의 복제 행위를 금합니다.</div>
                </div>
                <StyledDiv>
                    <span onClick={() => router.push('/privacy')} style={{ fontWeight: 700 }}>개인정보 처리방침</span> · <span onClick={() => router.push('/tos')}>이용약관</span> · <span onClick={() => router.push('/service')}>고객센터</span>
                </StyledDiv>
            </div>
        </Footer>
    )
}

export default FooterPage;

export const StyledDiv = styled.div`
    span:hover {
        text-decoration: underline;
        cursor: pointer;
    }    
`