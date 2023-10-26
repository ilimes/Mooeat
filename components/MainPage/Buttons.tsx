import styled from "styled-components";
import { Card, Col, Row } from 'antd';
import { LoginOutlined, UserAddOutlined, CameraOutlined } from '@ant-design/icons';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Content from "../SharedComponents/Content";

const Buttons = ({ router }: { router: AppRouterInstance }) => {
    return (
        <div className="container">
            <Content>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <StyledCard
                            hoverable
                            bodyStyle={{ padding: 16 }}
                            onClick={() => router.push('/share')}
                        >
                            <div style={{ fontSize: 14, color: '#47408f', fontWeight: 'bold', marginBottom: 10 }}>
                                무엇을 먹었는지 공유해보세요!
                            </div>
                            <div style={{ fontSize: 26, fontWeight: 'bold' }}>
                                <CameraOutlined />{" "}
                                공유하기
                            </div>
                        </StyledCard>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <StyledCard
                            hoverable
                            bodyStyle={{ padding: 16 }}
                            onClick={() => router.push('/join')}
                        >
                            <div style={{ fontSize: 14, color: '#47408f', fontWeight: 'bold', marginBottom: 10 }}>
                                지금 바로 가입해보세요!
                            </div>
                            <div style={{ fontSize: 26, fontWeight: 'bold' }}>
                                <UserAddOutlined />{" "}
                                회원 가입
                            </div>
                        </StyledCard>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <StyledCard
                            hoverable
                            bodyStyle={{ padding: 16 }}
                            onClick={() => router.push('/login')}
                        >
                            <div style={{ fontSize: 14, color: '#47408f', fontWeight: 'bold', marginBottom: 10 }}>
                                지금 바로 로그인해보세요!
                            </div>
                            <div style={{ fontSize: 26, fontWeight: 'bold' }}>
                                <LoginOutlined />{" "}
                                로그인
                            </div>
                        </StyledCard>
                    </Col>
                </Row>
            </Content>
        </div>
    )
}

export default Buttons;

export const StyledCard = styled(Card)`
    && {
        width: 100%;
        height: 110px;
        border: 1px solid #B9CBD9;
        box-shadow: 0 8px 24px 0 rgba(129, 137, 143, 0.12);
        transition: all 0.1s linear;
        &:hover {
            transform: scale(1.01);
        }
    }
`