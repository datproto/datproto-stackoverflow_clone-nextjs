import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from 'next/font/google'
import ThemeProvider from '@/context/ThemeProvider'
import { Toaster } from 'sonner'

import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'Stackoverlow 2.0',
  description: 'A community-driven platform for asking and answering programming questions Get help, share knowledge, and collaborate with developers from around the world. Explorer topics in web development, mobile app development, algorithms, data structures, and more.',
  icons: {
    icon: '/favicon.ico'
  }
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <ThemeProvider>
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  )
}