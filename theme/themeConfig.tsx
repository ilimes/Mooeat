
import type { ThemeConfig } from 'antd';
import localFont from 'next/font/local'

const lineSeedKr = localFont({
  variable: '--line-seed-kr',
  src: [
    {
      path: '../public/fonts/LINESeedKR-Th.woff2',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../public/fonts/LINESeedKR-Rg.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/LINESeedKR-Bd.woff2',
      weight: '600',
      style: 'normal'
    }
  ]
})

const theme: ThemeConfig = {
  token: {
    fontSize: 15,
    colorPrimary: '#4f4791',
    colorBgLayout: '#fff',
    fontFamily: `${lineSeedKr.style.fontFamily}`
  },
  components: {
    Carousel: {
      dotHeight: 13,
      dotWidth: 26,
      dotActiveWidth: 40
    },
  },
};

export default theme;