'use client'

import Navbar from '../components/Navbar'
import CTA from '../components/CTA'
import Receitas from '../components/Receitas'
import Chat from '../components/Chat'
import Funcionalidades from '../components/Funcionalidades'

export default function Home() {
  return (
    <main>
      <Navbar />
      <CTA />
      <Receitas />
      <Chat />
      <Funcionalidades />
    </main>
  )
}
