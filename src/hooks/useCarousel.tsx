import Lottie from 'lottie-react';
import { ContentsTypes } from '../types/Carousel/Carousel.interface';
import animationData from '@/public/lottie/Animation - 1698745940539.json';
import animationData2 from '@/public/lottie/Animation - 1698595350015.json';
import animationData3 from '@/public/lottie/Animation - 1698745819488.json';
import useIsMobile from './useIsMobile';

const useCarousel = () => {
  const isMobile = useIsMobile();
  const imgHeight = isMobile ? 200 : 350;
  const contentStyle = { width: 340, height: imgHeight, margin: '0 auto' };

  const contents: ContentsTypes[] = [
    {
      topText: 'Mooeat에 오신것을 환영합니다!',
      bottomText: 'Mooeat 사이트가 오픈하였습니다 🎉',
      forwardText: '자세히보기',
      background: '#47408f',
      textBackground: '#323232',
      link: '/welcome',
      img: <Lottie animationData={animationData} loop={false} style={contentStyle} />,
    },
    {
      topText: '지금 바로 가입해보세요!',
      bottomText: '사이트를 이용하시려면 가입해야합니다 :)',
      forwardText: '회원가입 하러가기',
      background: '#E5B175',
      textBackground: '#D98B35',
      link: '/auth/join',
      img: <Lottie animationData={animationData2} loop={false} style={contentStyle} />,
    },
    {
      topText: '매일 출석체크 이벤트 진행중!',
      bottomText: '출석체크 시 100포인트 획득 가능합니다 😊',
      forwardText: '출석 하러가기',
      background: '#004AD5',
      textBackground: '#2972FF',
      link: '/attendance',
      img: <Lottie animationData={animationData3} loop={false} style={contentStyle} />,
    },
  ];

  return { contents };
};

export default useCarousel;
