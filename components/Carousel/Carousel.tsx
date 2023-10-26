import { useState, useEffect } from 'react';
import { Carousel, Col, Row } from 'antd';
import Image from 'next/image';
import TestImg from '../../public/test.png';
import { useRouter } from 'next/navigation';

const contentStyle: React.CSSProperties = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    // background: '#47408f',
};

const CarouselComponent = () => {
    const router = useRouter();
    const [nowIndex, setNowIndex] = useState(0);
    const colors = ['#47408f', '#E5B175', '#000000'];
    const links = ['/test', '/join', '/test2'];
    
    return (
        <>
            <div style={{ marginTop: 10 }}>
                <Row>
                    <Col span={24}>
                        <Carousel autoplay dotPosition={'bottom'} style={{ background: colors?.[nowIndex], display: 'flex', justifyContent: 'center', transition: '0.15s', height: 350 }} afterChange={(number) => setNowIndex(number)}>
                            <div onClick={() => router.push(links?.[nowIndex])}>
                                <Row style={{ maxWidth: 1200, margin: '0 auto', cursor: 'pointer' }}>
                                    <Col span={11} style={{ padding: 16, marginTop: 100 }}>
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
                                        <Image src={TestImg} height={350} alt="테스트 이미지" />
                                    </Col>
                                </Row>
                            </div>
                            <div onClick={() => router.push(links?.[nowIndex])}>
                                <Row style={{ maxWidth: 1200, margin: '0 auto', cursor: 'pointer' }}>
                                    <Col span={11} style={{ padding: 16, marginTop: 100 }}>
                                        <span style={{ fontWeight: 700, color: '#fff', fontSize: 24, background: 'linear-gradient(to top, #D98B35 45%, transparent 50%)' }}>
                                            지금 바로 가입해보세요!
                                        </span>
                                        <div style={{ fontWeight: 100, color: '#fff', fontSize: 18 }}>
                                            사이트를 바로 이용하실 수 있습니다 😊
                                        </div>
                                        <div style={{ fontWeight: 100, color: '#fff', fontSize: 14, marginTop: 30 }}>
                                            회원가입 하러 가기 {'>'}
                                        </div>
                                    </Col>
                                    <Col span={13} style={{ overflow: 'hidden' }}>
                                        <Image src={TestImg} height={350} alt="테스트 이미지" />
                                    </Col>
                                </Row>
                            </div>
                            <div onClick={() => router.push(links?.[nowIndex])}>
                                <Row style={{ maxWidth: 1200, margin: '0 auto', cursor: 'pointer' }}>
                                    <Col span={11} style={{ padding: 16, marginTop: 100 }}>
                                        <span style={{ fontWeight: 700, color: '#fff', fontSize: 24, background: 'linear-gradient(to top, grey 45%, transparent 50%)' }}>
                                            3번쨰 캐러샐 입니다
                                        </span>
                                        <div style={{ fontWeight: 100, color: '#fff', fontSize: 18 }}>
                                            사이트를 바로 이용하실 수 있습니다 😊
                                        </div>
                                        <div style={{ fontWeight: 100, color: '#fff', fontSize: 14, marginTop: 30 }}>
                                            회원가입 하러 가기 {'>'}
                                        </div>
                                    </Col>
                                    <Col span={13} style={{ overflow: 'hidden' }}>
                                        <Image src={TestImg} height={350} alt="테스트 이미지" />
                                    </Col>
                                </Row>
                            </div>
                        </Carousel>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CarouselComponent;