import styled from "styled-components";
import { Card, Col, Row } from 'antd';
import { LoginOutlined, UserAddOutlined, CameraOutlined } from '@ant-design/icons';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Content from "../SharedComponents/Content";

const Buttons = ({ router }: { router: AppRouterInstance }) => {
    const btnInfoList = [
        {
            topMessage: '나의 식단을 공유해보세요!',
            icon: <CameraOutlined />,
            title: '공유하기',
            link: '/share'
        },
        {
            topMessage: '지금 바로 가입해보세요!',
            icon: <UserAddOutlined />,
            title: '회원 가입',
            link: '/auth/join'
        },
        {
            topMessage: '지금 바로 로그인해보세요!',
            icon: <LoginOutlined />,
            title: '로그인',
            link: '/auth/login'
        },
    ]

    return (
        <div className="container">
            <Content>
                <Row gutter={[16, 16]}>
                    {btnInfoList?.map((e, i) => (
                        <Col key={i} xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                            <button style={{ width: '100%' }}>
                                <StyledCard
                                    hoverable
                                    bodyStyle={{ padding: 16 }}
                                    onClick={() => router.push(e?.link)}
                                >
                                    <div style={{ fontSize: 14, color: '#47408f', fontWeight: 'bold', marginBottom: 10 }}>
                                        {e?.topMessage}
                                    </div>
                                    <div style={{ fontSize: 26, fontWeight: 'bold' }}>
                                        {e?.icon}{" "}
                                        {e?.title}
                                    </div>
                                </StyledCard>
                            </button>
                        </Col>
                    ))}
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
        box-shadow: 0 8px 20px 0 rgba(129, 137, 143, 0.18);
        transition: all 0.1s linear;
        &:hover {
            transform: scale(1.01);
        }
    }
`