'use client';

import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import useIsMobile from '@/src/hooks/useIsMobile';
import NoSSr from '../NoSsr';
import * as S from './styles';
import useCarousel from '@/src/hooks/useCarousel';
import CarouselContent from './CarouselContent';

const CarouselComponent = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [nowIndex, setNowIndex] = useState(0);
  const { contents } = useCarousel();

  return (
    <div>
      <Row>
        <Col span={24}>
          <NoSSr>
            <S.StyledCarousel
              autoplay
              dotPosition="bottom"
              speed={600}
              $background={contents?.[nowIndex]?.background}
              $nowIndex={nowIndex}
              beforeChange={(_, nextNumber) => {
                setNowIndex(nextNumber);
              }}
            >
              {contents.map((content, index) => (
                <div key={content.link}>
                  <Link href={content?.link}>
                    <StyledRow>
                      <CarouselContent
                        isMobile={isMobile}
                        index={index}
                        nowIndex={nowIndex}
                        content={content}
                      />
                    </StyledRow>
                  </Link>
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

const StyledRow = styled(Row)`
  max-width: 1200px;
  margin: 0 auto;
  cursor: pointer;
`;
