import { Carousel } from 'antd';
import styled from 'styled-components';

export const StyledCarousel = styled(Carousel)<{ $background?: string; $nowIndex?: number }>`
  && {
    .slick-dots button {
      border-radius: 30px;
    }
    display: flex;
    justify-content: center;
    transition: 0.35s;
    height: 370px;
    background: ${({ $background }) => $background};
    svg {
      animation-delay: 750ms;
      animation-duration: 500ms;
      animation-fill-mode: forwards;
      animation-name: slideUp;
      animation-timing-function: ease-out;
      opacity: 0;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;
