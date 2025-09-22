'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function CTA() {
  return (
    <section
      className="
        relative w-full overflow-hidden text-white
        pt-36
        h-[720px] md:h-[768px] lg:h-[820px] xl:h-[880px]
        bg-[#E9E9E9]
      "
    >
      {/* Fundo */}
      <Image
        src="/background-cta.svg"
        alt="Fundo TRIP"
        fill
        priority
        className="object-cover object-bottom"
      />

      {/* Costura para suavizar a transição */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#E9E9E9] z-10" />

      {/* Texto */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-8 flex items-start">
        <div className="max-w-[550px] text-left mt-16 md:mt-28">
          {/* Título */}
          <h1 className="font-unbounded font-light text-[40px] md:text-6xl leading-snug md:leading-tight mb-6">
            Seu transporte <br />
            com mais{' '}
            <span className="bg-gradient-to-r from-[#DCC2FF] to-white bg-clip-text text-transparent">
              agilidade
            </span>,<br />
            <span className="bg-gradient-to-r from-[#DCC2FF] to-white bg-clip-text text-transparent">
              segurança
            </span>{' '}
            e na<br />
            palma da mão.
          </h1>

          {/* Subtítulo */}
          <p className="font-montserrat text-base md:text-xl font-light text-white/90 leading-relaxed">
            Viajar bem começa com um bom <br /> atendimento.{' '}
            <Link
              href="/chatbot"
              className="font-bold hover:underline hover:text-[#DCC2FF] transition-colors"
            >
              CONHEÇA O TRIP.
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
