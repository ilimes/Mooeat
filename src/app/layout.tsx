import './styles/globals.css';
import type { Metadata } from 'next';
import KakaoScript from 'components/common/KakaoScript';
import { ConfigProvider } from 'antd';
import CustomLayout from '@/components/CustomLayout';
import SessionProvider from '../../lib/SessionProvider';
import RecoilRootProvider from '@/lib/RecoilRootProvider';
import StyledComponentsRegistryAnt from '@/lib/AntdRegistry';
import StyledComponentsRegistry from '@/lib/Registry';
import ReactQueryProvider from '@/lib/ReactQueryProvider';
import theme from '../../theme/themeConfig';
import Providers from '@/components/Providers';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: 'Mooeat',
  description: 'Mooeat',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" sizes="192x192" href="maskable_icon_x192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="maskable_icon_x512.png" />
      </head>
      <body>
        <main>
          <Providers>
            <CustomLayout>{children}</CustomLayout>
          </Providers>
        </main>
      </body>
      <KakaoScript />
    </html>
  );
}
