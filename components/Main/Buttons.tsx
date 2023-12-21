import styled from "styled-components";
import { Card, Col, Row } from 'antd';
import { CommentOutlined, CameraOutlined, CheckCircleOutlined, NotificationOutlined } from '@ant-design/icons';
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
            topMessage: '매일 출석체크 하고 포인트 획득!',
            icon: <CheckCircleOutlined />,
            title: '출석체크',
            link: '/attendance'
        },
        {
            topMessage: 'Mooeat이 궁금하시다면?',
            icon: <CommentOutlined />,
            title: '자주 묻는 질문',
            link: '/service'
        },
        {
            topMessage: '공지사항을 확인해보세요 :)',
            icon: <NotificationOutlined />,
            title: '공지사항',
            link: '/service?page=notice'
        },
    ]

    return (
        <div className="container">
            <Content>
                <Row gutter={[16, 16]}>
                    {btnInfoList?.map((e, i) => (
                        <Col key={i} xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                            <button style={{ width: '100%' }}>
                                <StyledCard
                                    bodyStyle={{ padding: 16 }}
                                    onClick={() => router.push(e?.link)}
                                >
                                    <div style={{ fontSize: 14, color: '#47408f', fontWeight: 'bold', marginBottom: 10 }}>
                                        {e?.topMessage}
                                    </div>
                                    <div style={{ fontSize: 26, fontWeight: 'bold' }}>
                                        <span style={{ marginRight: 10 }}>{e?.icon}</span>
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

const StyledCard = styled(Card)`
    && {
        width: 100%;
        height: 105px;
        box-shadow: 0 8px 15px 0 rgba(129, 137, 143, 0.18);
        transition: all 0.1s linear;
        &:hover {
            transform: scale(1.01);
            box-shadow: 0 8px 15px 0 rgba(129, 137, 143, 0.38);
        }
    }
`