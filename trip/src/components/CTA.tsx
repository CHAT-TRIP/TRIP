'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function CTA() {
  return (
    <section
      className="
        relative w-full overflow-hidden text-white
        pt-24 sm:pt-28 md:pt-36
        bg-[#E9E9E9]
        min-h-[680px] sm:min-h-[720px] md:min-h-[780px] lg:min-h-[820px]
      "
    >

      {/* Fundo desktop */}
      <Image
        src="/background-cta.svg"
        alt="Fundo TRIP Desktop"
        fill
        priority
        className="
          hidden md:block
          object-cover object-bottom
          pointer-events-none select-none
        "
      />

      {/* Fundo mobile com mulher incluída */}
      <div
        className="
          block md:hidden
          absolute inset-0
          bg-[url('/background-roxo.svg')]
          bg-cover bg-top
        "
      />

      {/* Fade branco inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#E9E9E9] z-10" />

      {/* Texto */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-8">
        <div
          className="
            max-w-[560px]
            mx-auto md:mx-0
            text-center md:text-left
            mt-6 sm:mt-8 md:mt-16 lg:mt-28
            pb-0
            space-y-4 sm:space-y-5 md:space-y-6
          "
        >
          <h1
            className="
              font-unbounded font-light
              text-[22px] leading-[1.25]
              sm:text-[28px] sm:leading-[1.2]
              md:text-6xl md:leading-tight
            "
          >
            Seu transporte com mais{' '}
            <span className="bg-gradient-to-r from-[#DCC2FF] to-white bg-clip-text text-transparent">
              agilidade
            </span>, segurança e na palma da mão.
          </h1>

          <p
            className="
              font-montserrat
              text-[14px] leading-relaxed
              sm:text-base
              md:text-xl md:leading-relaxed
              text-white/90
            "
          >
            Viajar bem começa com um bom atendimento.{' '}
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
