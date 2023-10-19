
import type { ThemeConfig } from 'antd';
import { Noto_Sans_KR, Montserrat, Roboto } from 'next/font/google'

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#4f4791',
    fontFamily: `${notoSansKr.style.fontFamily}`
  },
};

export default theme;