'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Integrantes() {
  const cards = [
    {
      id: 1,
      front: '/Card-Madjer-img.svg',
      back: '/Card-Madjer-escrita.svg',
      github: 'https://github.com/MadjerFin',
      linkedin: 'https://www.linkedin.com/in/madjer-finamor-51196117b/'
    },
    {
      id: 2,
      front: '/Card-Duda-img.svg',
      back: '/Card-Duda-escrita.svg',
      github: 'https://github.com/dudafernanndes',
      linkedin: 'https://www.linkedin.com/in/dudafernanndes/'
    },
    {
      id: 3,
      front: '/Card-Guilherme-img.svg',
      back: '/Card-Guilherme-escrita.svg',
      github: 'https://github.com/gsfalcao',
      linkedin: 'https://www.linkedin.com/in/guilherme-santos-falcão-a87012328/'

    }
  ]

  return (
    <section
      className="w-full py-20 px-4 flex flex-col items-center text-white"
      style={{
        backgroundImage: "url('/background-integrantes.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Grid dos cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <FlipCard key={card.id} front={card.front} back={card.back} github={card.github} linkedin={card.linkedin} />
        ))}
      </div>
    </section>
  )
}

function FlipCard({ front, back, github, linkedin }: { front: string; back: string; github: string; linkedin: string }) {
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
      className="[perspective:1000px] w-[280px] h-[540px] sm:w-[300px] sm:h-[560px] md:w-[320px] md:h-[580px] lg:w-[300px] lg:h-[560px] mx-auto cursor-pointer"
      onMouseEnter={() => !isMobile && setFlipped(true)}
      onMouseLeave={() => !isMobile && setFlipped(false)}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Frente */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden">
          <Image src={front} alt="card front" fill className="object-contain" />
        </div>

        {/* Verso */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden">
          <Image src={back} alt="card back" fill className="object-contain" />
          <div className="absolute bottom-[100px] left-[30px] flex gap-2">
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Image src="/Icone-GitHub.png" alt="GitHub" width={30} height={30} />
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <Image src="/Icone-Linkedin.png" alt="LinkedIn" width={30} height={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} /**Página de integrantes ajustada */
