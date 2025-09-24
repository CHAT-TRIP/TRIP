'use client'

import Navbar from '../components/Navbar'
import CTA from '../components/CTA'
import Receitas from '../components/Receitas'
import Chat from '../components/Chat'
import Funcionalidades from '../components/Funcionalidades'
import Parceria from '../components/Parceria'
import Proposta from '../components/Proposta'
import Integrantes from '../components/Integrantes'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />

      <section id="cta">
        <CTA />
      </section>

      <section id="receitas">
        <Receitas />
      </section>

      <section id="chat">
        <Chat />
      </section>

      <section id="funcionalidades">
        <Funcionalidades />
      </section>

      <section id="parceria">
        <Parceria />
      </section>

      <section id="proposta">
        <Proposta />
      </section>

      <section id="integrantes">
        <Integrantes />
      </section>
    </main>
  )
}
