'use client'

import Image from 'next/image'

export default function Funcionalidades() {
  const cards = [
    {
      front: '/Card Rotas img.png',
      back: '/Card Rotas escrita.png',
      width: '400px',
      height: '300px',
    },
    {
      front: '/Card Bilhetes img.png',
      back: '/Card Bilhetes escrita.png',
      width: '230px',
      height: '220px',
    },
    {
      front: '/Card Acessibilidade img.png',
      back: '/Card Acessibilidade escrita.png',
      width: '400px',
      height: '220px',
    },
    {
      front: '/Card Denuncia img.png',
      back: '/Card Denuncias escrita.png',
      width: '400px',
      height: '300px',
    },
  ]

  return (
    <section
      id="funcionalidades"
      className="relative w-full flex flex-col items-center py-24 px-4 md:px-12 text-white"
      style={{ backgroundImage: "url('/background das funcionalidades.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Texto */}
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-start justify-between gap-12">
        <div className="max-w-md">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            FIQUE POR <br /> DENTRO
          </h2>
          <p className="mt-6 text-lg md:text-xl font-light leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            O <strong>Trip</strong> é um chatbot inteligente que facilita sua vida no transporte ferroviário. Confira tudo o que ele pode fazer por você!
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative [perspective:1000px]"
              style={{
                width: card.width,
                height: card.height,
              }}
            >
              <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Frente */}
                <Image
                  src={card.front}
                  alt={`Card frente ${index}`}
                  fill
                  className="rounded-xl backface-hidden object-contain"
                  sizes="100%"
                />
                {/* Verso */}
                <Image
                  src={card.back}
                  alt={`Card verso ${index}`}
                  fill
                  className="absolute top-0 left-0 rounded-xl [transform:rotateY(180deg)] backface-hidden object-contain"
                  sizes="100%"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
