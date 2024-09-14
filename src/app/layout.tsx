/* eslint-disable react/no-invalid-html-attribute */
import './styles/globals.css';
import type { Metadata } from 'next';
import KakaoScript from 'components/common/KakaoScript';
import CustomLayout from '@/components/CustomLayout';
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
        <link
          href="/splash_screens/12.9__iPad_Pro_landscape.png"
          sizes="2048x2732"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash_screens/10.9__iPad_Air_portrait.png"
          sizes="1668x2224"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash_screens/10.5__iPad_Air_portrait.png"
          sizes="1536x2048"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
          sizes="1125x2436"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
          sizes="1242x2208"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
          sizes="750x1334"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
          sizes="640x1136"
          rel="apple-touch-startup-image"
        />
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
