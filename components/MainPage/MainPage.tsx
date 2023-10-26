import styled from "styled-components";
import CardComponent from "../Card/Card";
import { Card, Col, Row } from 'antd';
import { LoginOutlined, UserAddOutlined, CameraOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Buttons from "./Buttons";

const MainPage: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Buttons router={router} />
            <div style={{ background: '#F2F6F8', padding: '100px 0px' }}>
                <div style={{ margin: '0 auto', maxWidth: 1200, padding: '0 16px' }}>
                    <div style={{ fontSize: 20, fontWeight: 'bold', color: '#47408F' }}>제목</div>
                    <h1>제목상단,<br />
                        제목하단</h1>
                </div>

            </div>
            <div style={{ background: '#F6FDEC', padding: '100px 0px' }}>
                <div style={{ margin: '0 auto', maxWidth: 1200, padding: '0 16px' }}>
                    <div style={{ fontSize: 20, fontWeight: 'bold', color: '#47408F' }}>제목</div>
                    <h1>제목상단,<br />
                        제목하단</h1>
                </div>

            </div>
            <div style={{ background: '#141617', color: '#fff', padding: '100px 0px' }}>
                <div style={{ margin: '0 auto', maxWidth: 1200, padding: '0 16px' }}>
                    <div style={{ fontSize: 20, fontWeight: 'bold', color: '#A09BD2' }}>제목</div>
                    <h1>제목상단,<br />
                        제목하단</h1>
                </div>
                <div className="container">
                    <div style={{ marginBottom: 20, fontWeight: 700, fontSize: 24 }}>
                        👀 둘러보기
                    </div>
                    <StyledDiv>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </StyledDiv>
                </div>

            </div>
        </>
    )
}

export default MainPage;

export const StyledDiv = styled.div`
    && {
        display: flex;
        gap: 10px;
        overflow: auto;
        padding-bottom: 1;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`