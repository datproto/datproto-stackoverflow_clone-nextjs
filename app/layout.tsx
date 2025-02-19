import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from 'next/font/google'
import ThemeProvider from '@/context/ThemeProvider'

export const metadata: Metadata = {
  title: 'Next.js 13 with Clerk',
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

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'primary-text-gradient hover:text-blue-500'
            }
          }}
        >
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}