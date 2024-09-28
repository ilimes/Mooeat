import type { ThemeConfig } from 'antd';
import localFont from 'next/font/local';

export const suitVariable = localFont({
  variable: '--suit-variable',
  src: [
    {
      path: '../public/fonts/suit/SUIT-Thin.woff2',
      weight: '100',
      style: 'Thin',
    },
    {
      path: '../public/fonts/suit/SUIT-ExtraLight.woff2',
      weight: '200',
      style: 'ExtraLight',
    },
    {
      path: '../public/fonts/suit/SUIT-Light.woff2',
      weight: '300',
      style: 'Light',
    },
    {
      path: '../public/fonts/suit/SUIT-Regular.woff2',
      weight: '400',
      style: 'Normal',
    },
    {
      path: '../public/fonts/suit/SUIT-Medium.woff2',
      weight: '500',
      style: 'Medium',
    },
    {
      path: '../public/fonts/suit/SUIT-SemiBold.woff2',
      weight: '600',
      style: 'SemiBold',
    },
    {
      path: '../public/fonts/suit/SUIT-Bold.woff2',
      weight: '700',
      style: 'Bold',
    },
    {
      path: '../public/fonts/suit/SUIT-ExtraBold.woff2',
      weight: '800',
      style: 'ExtraBold',
    },
    {
      path: '../public/fonts/suit/SUIT-Heavy.woff2',
      weight: '900',
      style: 'Heavy',
    },
  ],
});

const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: '#4f4791',
    colorError: '#F22020',
    colorBgLayout: '#fff',
    fontFamily: `${suitVariable.style.fontFamily}`,
    borderRadiusLG: 12,
    motionDurationFast: '180ms',
    motionDurationMid: '180ms',
    motionDurationSlow: '180ms',
  },
  components: {
    Carousel: {
      dotHeight: 13,
      dotWidth: 26,
      dotActiveWidth: 40,
    },
  },
};

export default theme;
