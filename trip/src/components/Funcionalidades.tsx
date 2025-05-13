'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Funcionalidades() {
  const cards = [
    {
      id: 1,
      front: '/Card Rotas img.png',
      back: '/Card Rotas escrita.png',
    },
    {
      id: 2,
      front: '/Card Bilhetes img.png',
      back: '/Card Bilhetes escrita.png',
    },
    {
      id: 3,
      front: '/Card Acessibilidade img.png',
      back: '/Card Acessibilidade escrita.png',
    },
    {
      id: 4,
      front: '/Card Denuncia img.png',
      back: '/Card Denuncias escrita.png',
    },
  ]

  return (
    <section
      className="w-full py-20 px-4 flex flex-col items-center text-white"
      style={{
        backgroundImage: "url('/background das funcionalidades.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-[1400px] w-full">
        {/* Título + Parágrafo */}
        <div className="text-left mb-12 max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            FIQUE POR <br /> DENTRO
          </h2>
          <p className="text-sm leading-relaxed font-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
            O <strong>Trip</strong> é um chatbot inteligente que facilita sua vida no transporte ferroviário. Confira tudo o que ele pode fazer por você!
          </p>
        </div>

        {/* Grid dos cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <FlipCard key={card.id} front={card.front} back={card.back} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FlipCard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="w-full aspect-[3/4] perspective"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Frente */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
          <Image src={front} alt="card front" fill className="object-cover" />
        </div>

        {/* Verso */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden">
          <Image src={back} alt="card back" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}
