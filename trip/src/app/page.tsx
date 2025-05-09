'use client'

import Navbar from '../components/Navbar'
import CTA from '../components/CTA'
import Receitas from '../components/Receitas'

export default function Home() {
  return (
    <main>
      <Navbar />
      <CTA />
      <Receitas />
    </main>
  )
}
