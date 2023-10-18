import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_KR, Montserrat, Roboto } from 'next/font/google'
import CustomLayout from '@components/CustomLayout/CustomLayout'

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
        <CustomLayout children={children} />
      </body>
    </html>
  )
}
