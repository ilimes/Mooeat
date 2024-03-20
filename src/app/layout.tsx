import './styles/globals.css';
import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import KakaoScript from 'components/common/KakaoScript';
import SessionProvider from '../../lib/SessionProvider';
import CustomLayout from '@/components/CustomLayout';
import RecoilRootProvider from '@/lib/RecoilRootProvider';
import StyledComponentsRegistryAnt from '@/lib/AntdRegistry';
import StyledComponentsRegistry from '@/lib/Registry';
import ReactQueryProvider from '@/lib/ReactQueryProvider';
import theme from '../../theme/themeConfig';

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <SessionProvider>
            <ReactQueryProvider>
              <RecoilRootProvider>
                <StyledComponentsRegistry>
                  <StyledComponentsRegistryAnt>
                    <ConfigProvider theme={theme}>
                      <CustomLayout>{children}</CustomLayout>
                    </ConfigProvider>
                  </StyledComponentsRegistryAnt>
                </StyledComponentsRegistry>
              </RecoilRootProvider>
            </ReactQueryProvider>
          </SessionProvider>
        </main>
      </body>
      <KakaoScript />
    </html>
  );
}
