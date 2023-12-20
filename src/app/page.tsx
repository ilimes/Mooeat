'use client';

import CarouselComponent from '@/components/Carousel/Carousel';
import Main from '@/components/Main/Main';

const Home: React.FC = () => {
  return (
    <>
      <CarouselComponent />
      <div>
        <Main />
      </div>
    </>
  )
}

export default Home;
