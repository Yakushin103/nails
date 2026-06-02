import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import { ReduxProvider } from '@/store/provider'

import Header from '@/components/Layout/Header'
import ToastProvider from '@/components/Toast/ToastProvider';

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Юлия Калмыкова | Школа маникюра',
  description: 'Обучающие курсы по маникюру от Юлии Калмыковой. Профессиональное обучение с сертификатом.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className={montserrat.className}>
        <ToastProvider />

        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}