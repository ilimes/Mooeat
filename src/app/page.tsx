'use client';

import CarouselComponent from '@/components/Carousel/Carousel';
import MainPage from '@/components/MainPage/MainPage';

const Home: React.FC = () => {
  return (
    <>
      <CarouselComponent />
      <div className='container'>
        <MainPage />
      </div>
    </>
  )
}

export default Home;
