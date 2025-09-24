'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Parceria() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: '#E9E9E9' }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Coluna de texto */}
        <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h2
            className="text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.06] lg:text-[64px] lg:leading-[1.08] font-extrabold text-[#5E22F3]"
            style={{ fontFamily: 'Unbounded, sans-serif' }}
          >
            <span className="inline bg-[linear-gradient(180deg,transparent_70%,rgba(94,34,243,0.25)_0)]">
              Inovação
            </span>
            <br />
            <span>transporte</span>
            <br />
            <span>ferroviário</span>
          </h2>

          <p
            className="mt-6 text-[#181818] text-base md:text-lg leading-relaxed max-w-[640px]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Com a tecnologia do Trip e a expertise da Motiva, os passageiros ganham um{' '}
            <strong className="text-[#5E22F3] font-semibold">
              atendimento mais ágil, seguro e eficiente
            </strong>
            , tornando cada viagem mais tranquila, informada e inovadora.
          </p>

          <Link
            href="https://www.motiva.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block px-6 py-3 text-white font-bold transition-transform hover:scale-[1.03] active:scale-95"
            style={{
              backgroundColor: '#5E22F3',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Saiba mais
          </Link>
        </div>

        {/* Coluna do mascote */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          {/* Forma lilás atrás do mascote */}
          <div
            aria-hidden
            className="absolute right-4 top-10 -z-10 hidden sm:block"
            style={{
              width: '520px',
              height: '420px',
              backgroundColor: '#DCC2FF',
              borderTopLeftRadius: '120px',
              borderBottomRightRadius: '120px',
              borderTopRightRadius: '24px',
              borderBottomLeftRadius: '24px',
              opacity: 0.9,
            }}
          />
          <Image
            src="/mascote-logo.svg"
            alt="Mascote TRIP"
            width={680}
            height={680}
            priority
            className="w-[320px] sm:w-[420px] md:w-[520px] lg:w-[600px] h-auto"
          />
        </div>
      </div>
    </section>
  )
}
