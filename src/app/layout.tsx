import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HR Dashboard',
  description: 'Track employee performance and manage bookmarks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Navigation />
          <div className="flex-1 md:ml-64">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
} 