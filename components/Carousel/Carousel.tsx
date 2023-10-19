import { Carousel, Col, Row } from 'antd';
import Image from 'next/image';
import TestImg from '../../public/test.png';

const contentStyle: React.CSSProperties = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#47408f',
};

const CarouselComponent = () => {
    return (
        <>
            <div style={{ background: '#47408f', marginTop: 20 }}>
                <Row>
                    <Col span={24}>
                        <Carousel autoplay dotPosition={'bottom'} style={{ background: '#47408f', maxWidth: 1200, margin: '0 auto' }}>
                            <div>
                                <Row>
                                    <Col span={11} style={{ padding: 16, marginTop: 50 }}>
                                        <span style={{ fontWeight: 700, color: '#fff', fontSize: 24, background: 'linear-gradient(to top, #323232 45%, transparent 50%)' }}>
                                            Mooeat에 오신것을 환영합니다!
                                        </span>
                                        <div style={{ fontWeight: 100, color: '#fff', fontSize: 18 }}>
                                            Mooeat 사이트가 오픈하였습니다 🎉
                                        </div>
                                        <div style={{ fontWeight: 100, color: '#fff', fontSize: 14, marginTop: 30 }}>
                                            자세히보기 {'>'}
                                        </div>
                                    </Col>
                                    <Col span={13} style={{ overflow: 'hidden' }}>
                                        <Image src={TestImg} height={200} alt="테스트 이미지" />
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <h3 style={contentStyle}>캐러샐입니다.</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>안녕하세요</h3>
                            </div>
                        </Carousel>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CarouselComponent;