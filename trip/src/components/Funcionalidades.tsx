'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Funcionalidades() {
  const cards = [
    {
      id: 1,
      front: '/card-rotas-img.svg',
      back: '/card-rotas-escrita.svg'
    },
    {
      id: 2,
      front: '/card-bilhetes-img.svg',
      back: '/card-bilhetes-escrita.svg'
    },
    {
      id: 3,
      front: '/card-acessibilidade-img.svg',
      back: '/card-acessibilidade-escrita.svg'
    },
    {
      id: 4,
      front: '/card-denuncia-img.svg',
      back: '/card-denuncias-escrita.svg'
    }
  ]

  return (
    <section
      className="w-full py-20 px-4 flex flex-col items-center text-white"
      style={{
        backgroundImage: "url('/background-funcionalidades.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-[1400px] w-full flex flex-col items-center">
        {/* Título + Parágrafo */}
        <div className="text-center mb-12 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            FIQUE POR DENTRO
          </h2>
          <p className="text-base md:text-xl leading-relaxed font-light md:px-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
            O <strong>Trip</strong> é um chatbot inteligente que facilita sua vida no transporte ferroviário. Confira tudo o que ele pode fazer por você!
          </p>
        </div>

        {/* Grid dos cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleClick = () => {
    if (isMobile) setFlipped(!flipped)
  }

  return (
    <div
      className="[perspective:1000px] w-[280px] h-[390px] mx-auto cursor-pointer"
      onMouseEnter={() => !isMobile && setFlipped(true)}
      onMouseLeave={() => !isMobile && setFlipped(false)}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-300 ease-in-out [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Frente */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden">
          <Image src={front} alt="card front" fill className="object-cover" />
        </div>

        {/* Verso */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden">
          <Image src={back} alt="card back" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
} /**Página de funcionalidades ajustada */