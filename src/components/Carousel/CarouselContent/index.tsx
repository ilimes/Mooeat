import { Col } from 'antd';
import styled from 'styled-components';
import { ContentsTypes } from '@/src/types/Carousel/Carousel.interface';
import TextComponent from '../TextComponent';

const CarouselContent = ({
  isMobile,
  index,
  nowIndex,
  content,
}: {
  isMobile: boolean;
  index: number;
  nowIndex: number;
  content: ContentsTypes;
}) => {
  const textMargin = isMobile ? 0 : 120;
  const span = isMobile ? 24 : 12;
  const imgOrder = isMobile ? 1 : 2;
  const TextOrder = !isMobile ? 1 : 2;

  return (
    <>
      <ImgCol order={imgOrder} span={span}>
        {index === nowIndex && content?.img}
      </ImgCol>
      <TextCol order={TextOrder} span={span} $textMargin={textMargin}>
        <TextComponent content={content} index={nowIndex} />
      </TextCol>
    </>
  );
};

export default CarouselContent;

const ImgCol = styled(Col)`
  overflow: hidden;
`;

const TextCol = styled(Col)<{ $textMargin: number }>`
  padding: 16px;
  margin-top: ${({ $textMargin }) => $textMargin}px;
`;
