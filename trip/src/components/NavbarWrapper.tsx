'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()

  // Não renderiza o Navbar na página do chatbot
  if (pathname === '/chatbot') {
    return null
  }

  return <Navbar />
}
