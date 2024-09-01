import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Popup from '../../components/Popup'
import { Toaster } from '../../components/ui/toaster'
import { Providers } from '../providers'
import '@/src/app/globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <Popup />
          </Providers>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}