
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
    fontSize: 14,
    colorPrimary: '#4f4791',
    colorError: '#F22020',
    colorBgLayout: '#fff',
    fontFamily: `${lineSeedKr.style.fontFamily}`,
    borderRadiusLG: 12,
    motionDurationFast: '180ms',
    motionDurationMid: '180ms',
    motionDurationSlow: '180ms',
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