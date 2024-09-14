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
        <link rel="apple-touch-icon" sizes="192x192" href="maskable_icon_x192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="maskable_icon_x512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link href="/apple_splash_2048.png" sizes="2048x2732" rel="apple-touch-startup-image" />
        <link href="/apple_splash_1668.png" sizes="1668x2224" rel="apple-touch-startup-image" />
        <link href="/apple_splash_1536.png" sizes="1536x2048" rel="apple-touch-startup-image" />
        <link href="/apple_splash_1125.png" sizes="1125x2436" rel="apple-touch-startup-image" />
        <link href="/apple_splash_1242.png" sizes="1242x2208" rel="apple-touch-startup-image" />
        <link href="/apple_splash_750.png" sizes="750x1334" rel="apple-touch-startup-image" />
        <link href="/apple_splash_640.png" sizes="640x1136" rel="apple-touch-startup-image" />
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
