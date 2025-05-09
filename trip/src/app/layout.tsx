import '../styles/globals.css'
import { Poppins } from 'next/font/google'
import type { Metadata } from 'next'

// Fonte Poppins com variações específicas
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'TRIP | CCR',
  description: 'Assistente virtual da CCR para transporte ferroviário',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head />
      <body className={`${poppins.variable} font-sans bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}