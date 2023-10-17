'use client';

import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#4f4791',
};

const Home: React.FC = () => {
  return (
    <>
      <Carousel autoplay dotPosition={'bottom'}>
        <div>
          <h3 style={contentStyle}>Mooeat에 오신것을 환영합니다.</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2번째</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3번째</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4번째</h3>
        </div>
      </Carousel>
      <div style={{ padding: '20px 50px' }}>메인 페이지 입니다.</div>
    </>
  )
}

export default Home;
