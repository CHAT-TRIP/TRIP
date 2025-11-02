'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function CTA() {
  return (
    <section
      className="
        relative w-full overflow-hidden text-white
        pt-24 sm:pt-28 md:pt-36
        min-h-[680px] sm:min-h-[720px] md:min-h-[768px] lg:min-h-[820px] xl:min-h-[880px]
        bg-[#E9E9E9]
      "
    >
      {/* Fundo desktopp */}
      <Image
        src="/background-cta.svg"
        alt="Fundo TRIP"
        fill
        priority
        className="
          hidden md:block
          object-cover object-bottom
          pointer-events-none select-none
        "
      />

      {/* Fundo mobile */}
      <Image
        src="/background-roxo-mb.svg"
        alt="Fundo TRIP Mobile"
        fill
        priority
        className="
          block md:hidden
          object-cover object-top
          pointer-events-none select-none
        "
      />

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#E9E9E9] z-10" />

      {/* Texto */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-8">
        <div
          className="
            max-w-[560px]
            mx-auto md:mx-0
            text-center md:text-left
            mt-6 sm:mt-10 md:mt-28
          "
        >
          <h1
            className="
              font-unbounded font-light
              text-[28px] leading-[1.2]
              sm:text-[34px] sm:leading-[1.2]
              md:text-6xl md:leading-tight
              mb-6
            "
          >
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

          <p
            className="
              font-montserrat
              text-[14px] leading-relaxed
              sm:text-base
              md:text-xl md:leading-relaxed
              text-white/90
            "
          >
            Viajar bem começa com um bom <br className="hidden sm:block" />
            atendimento.{' '}
            <Link
              href="/chatbot"
              className="font-bold hover:underline hover:text-[#DCC2FF] transition-colors"
            >
              CONHEÇA O TRIP.
            </Link>
          </p>
        </div>
      </div>

      {/* Imagem somente no mobile */}
      <div className="relative z-20 block md:hidden -mt-3 px-5">
        <Image
          src="/imagem-capa-mb.svg"
          alt="Capa Mobile TRIP"
          width={500}
          height={500}
          className="mx-auto w-full max-w-[360px] h-auto"
          priority
        />
      </div>
    </section>
  )
}
