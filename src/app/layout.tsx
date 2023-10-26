import './globals.css'
import type { Metadata } from 'next'
import CustomLayout from '@components/CustomLayout/CustomLayout'

export const metadata: Metadata = {
  title: 'Mooeat',
  description: 'Mooeat',
  icons: {
    icon: '/icon.png',
  },
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
          <CustomLayout>
            {children}
          </CustomLayout>
        </main>
      </body>
    </html>
  )
}
