import { useState, useEffect } from 'react';
import { Carousel, Col, Row } from 'antd';
import Image from 'next/image';
import TestImg from '../../public/test.png';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import animationData from '@/public/lottie/Animation - 1698595350015.json';
import useIsMobile from '@/hooks/useIsMobile';

const contentStyle: React.CSSProperties = {
  height: '200px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
};

const CarouselComponent = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [nowIndex, setNowIndex] = useState(0);
  const textMargin = isMobile ? 0 : 120;
  const imgHeight = isMobile ? 200 : 350;
  const contents = [
    {
      topText: 'Mooeat에 오신것을 환영합니다!',
      bottomText: 'Mooeat 사이트가 오픈하였습니다 🎉',
      forwardText: '자세히보기',
      background: '#47408f',
      textBackground: '#323232',
      link: '/test',
      img: <Lottie animationData={animationData} loop={true} style={{ width: 340, height: imgHeight, margin: '0 auto' }} />
    },
    {
      topText: '지금 바로 가입해보세요!',
      bottomText: '사이트를 이용하시려면 가입해야합니다 :)',
      forwardText: '회원가입 하러가기',
      background: '#E5B175',
      textBackground: '#D98B35',
      link: '/auth/join',
      img: <Image src={TestImg} height={imgHeight} alt="테스트 이미지" style={{ margin: '0 auto' }} />
    },
    {
      topText: '3번쨰 캐러샐 입니다',
      bottomText: '안녕하세요 😊',
      forwardText: '자세히보기',
      background: '#000000',
      textBackground: 'grey',
      link: '/test2',
      img: <Image src={TestImg} height={imgHeight} alt="테스트 이미지" />
    }
  ];

  const TextComponent = ({ e, i }: { e: any, i: number }) => {
    return (
      <>
        <span
          style={{
            fontWeight: 700,
            color: "#fff",
            fontSize: 24,
            background:
              `linear-gradient(to top, ${e?.textBackground} 45%, transparent 50%)`,
          }}
        >
          {e?.topText}
        </span>
        <div
          style={{ fontWeight: 100, color: "#fff", fontSize: 18 }}
        >
          {e?.bottomText}
        </div>
        <div
          style={{
            fontWeight: 100,
            color: "#fff",
            fontSize: 14,
            marginTop: 30,
          }}
        >
          {e?.forwardText} {">"}
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        <Row>
          <Col span={24}>
            <Carousel
              autoplay
              dotPosition={"bottom"}
              speed={700}
              style={{
                background: contents?.[nowIndex]?.background,
                display: "flex",
                justifyContent: "center",
                transition: "0.35s",
                height: 370,
              }}
              afterChange={(number) => setNowIndex(number)}
            >
              {
                contents?.map((e, i) =>
                  <div key={i} onClick={() => router.push(e?.link)}>
                    <Row
                      style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        cursor: "pointer",
                      }}
                    >
                      {isMobile && <>
                        <Col span={24} style={{ overflow: "hidden" }}>
                          {e?.img}
                        </Col>
                        <Col span={24} style={{ padding: 16, marginTop: textMargin }}>
                          <TextComponent e={e} i={i} />
                        </Col>
                      </>}
                      {!isMobile && <>
                        <Col span={12} style={{ padding: 16, marginTop: textMargin }}>
                          <TextComponent e={e} i={i} />
                        </Col>
                        <Col span={12} style={{ overflow: "hidden" }}>
                          {e?.img}
                        </Col>
                      </>}
                    </Row>
                  </div>)
              }
            </Carousel>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CarouselComponent;