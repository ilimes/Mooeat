import styled from 'styled-components';
import { TextComponentTypes } from '@/src/types/Carousel/Carousel.interface';

const TextComponent = ({ content, index }: TextComponentTypes & { index: number }) => (
  <>
    <div className="title1" key={`title1-${index}`}>
      <StyledTopText $textBackground={content.textBackground}>{content?.topText}</StyledTopText>
    </div>
    <div className="title2" key={`title2-${index}`}>
      {content?.bottomText}
    </div>
    <div className="title3" key={`title3-${index}`}>
      {content?.forwardText} {'>'}
    </div>
  </>
);

export default TextComponent;

const StyledTopText = styled.span<{ $textBackground?: string }>`
  font-weight: 800;
  color: #fff;
  font-size: 24px;
  background: linear-gradient(to top, ${(props) => props.$textBackground} 45%, transparent 50%);
`;
