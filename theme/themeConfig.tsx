
import type { ThemeConfig } from 'antd';
import { Noto_Sans_KR, Montserrat, Roboto } from 'next/font/google'
import localFont from 'next/font/local'

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });
// const pretendard = localFont({
//   variable: '--pretendard',
//   src: [
//     {
//       path: '../public/fonts/PretendardVariable.woff2',
//       // style: 'normal'
//     }
//   ]
// })
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
    // fontFamily: `${notoSansKr.style.fontFamily}`
    // fontFamily: `${pretendard.style.fontFamily}`
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