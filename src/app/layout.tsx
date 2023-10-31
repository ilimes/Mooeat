import './globals.css'
import type { Metadata } from 'next'
import CustomLayout from '@components/CustomLayout/CustomLayout'
import RecoilRootProvider from '@/lib/RecoilRootProvider'

export const metadata: Metadata = {
  title: 'Mooeat',
  description: 'Mooeat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <RecoilRootProvider>
            <CustomLayout>
              {children}
            </CustomLayout>
          </RecoilRootProvider>
        </main>
      </body>
    </html>
  )
}
