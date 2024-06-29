'use client';

import { useState, useEffect } from 'react';
import { Col, Row, Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import TestImg from '../../public/test.png';
import carouselImg1 from '@/public/carousel/carousel1.png';
import animationData from '@/public/lottie/Animation - 1698745940539.json';
import animationData2 from '@/public/lottie/Animation - 1698595350015.json';
import animationData3 from '@/public/lottie/Animation - 1698745819488.json';
import useIsMobile from '@/hooks/useIsMobile';
import NoSSr from '../NoSsr';
import { TextComponentTypes } from '@/types/Carousel/Carousel.interface';
import * as S from './style';

const CarouselComponent = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [titles, setTitles] = useState<boolean>(false);
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
      link: '/welcome',
      img: (
        <Lottie
          animationData={animationData}
          loop={false}
          style={{ width: 340, height: imgHeight, margin: '0 auto' }}
        />
      ),
    },
    {
      topText: '지금 바로 가입해보세요!',
      bottomText: '사이트를 이용하시려면 가입해야합니다 :)',
      forwardText: '회원가입 하러가기',
      background: '#E5B175',
      textBackground: '#D98B35',
      link: '/auth/join',
      img: (
        <Lottie
          animationData={animationData2}
          loop={false}
          style={{ width: 340, height: imgHeight, margin: '0 auto' }}
        />
      ),
    },
    {
      topText: '매일 출석체크 이벤트 진행중!',
      bottomText: '출석체크 시 100포인트 획득 가능합니다 😊',
      forwardText: '출석 하러가기',
      background: '#004AD5',
      textBackground: '#2972FF',
      link: '/attendance',
      img: (
        <Lottie
          animationData={animationData3}
          loop={false}
          style={{ width: 340, height: imgHeight, margin: '0 auto' }}
        />
      ),
    },
  ];

  const TextComponent = ({ e, i }: TextComponentTypes) => (
    <>
      <div className="title1">
        <span
          style={{
            fontWeight: 800,
            color: '#fff',
            fontSize: 24,
            background: `linear-gradient(to top, ${e?.textBackground} 45%, transparent 50%)`,
          }}
        >
          {e?.topText}
        </span>
      </div>
      <div className="title2" style={{ fontWeight: 100, color: '#fff', fontSize: 18 }}>
        {e?.bottomText}
      </div>
      <div
        className="title3"
        style={{
          fontWeight: 100,
          color: '#fff',
          fontSize: 14,
          marginTop: 30,
        }}
      >
        {e?.forwardText} {'>'}
      </div>
    </>
  );

  return (
    <div>
      <Row>
        <Col span={24}>
          <NoSSr>
            <S.StyledCarousel
              autoplay
              dotPosition="bottom"
              speed={600}
              style={{
                background: contents?.[nowIndex]?.background,
                display: 'flex',
                justifyContent: 'center',
                transition: '0.35s',
                height: 370,
              }}
              beforeChange={(_, nextNumber) => {
                setNowIndex(nextNumber);
              }}
            >
              {contents?.map((e, i) => (
                <div key={i}>
                  <Row
                    style={{
                      maxWidth: 1200,
                      margin: '0 auto',
                      cursor: 'pointer',
                    }}
                    onClick={() => router.push(e?.link)}
                  >
                    {isMobile && (
                      <>
                        <Col span={24} style={{ overflow: 'hidden' }}>
                          {e?.img}
                        </Col>
                        <Col span={24} style={{ padding: 16, marginTop: textMargin }}>
                          <TextComponent e={e} i={i} />
                        </Col>
                      </>
                    )}
                    {!isMobile && (
                      <>
                        <Col span={12} style={{ padding: 16, marginTop: textMargin }}>
                          <TextComponent e={e} i={i} />
                        </Col>
                        <Col span={12} style={{ overflow: 'hidden' }}>
                          {e?.img}
                        </Col>
                      </>
                    )}
                  </Row>
                </div>
              ))}
            </S.StyledCarousel>
          </NoSSr>
        </Col>
      </Row>
    </div>
  );
};

export default CarouselComponent;
