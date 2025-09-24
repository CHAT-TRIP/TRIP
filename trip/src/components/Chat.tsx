'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Chat() {
  return (
    <section
      id="chat"
      className="w-full bg-[#E9E9E9] text-[#181818] px-6 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* CELULAR */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] xl:w-[520px]">
            <Image
              src="/celular.svg"
              alt="Tela do TRIP no celular"
              width={1200}
              height={1200}
              priority
              className="w-full h-auto select-none pointer-events-none"
            />
          </div>
        </div>

        {/* TEXTO */}
        <div className="order-2 lg:order-1 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <h2
            className="text-[34px] sm:text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] font-extrabold text-[#5E22F3] mb-6"
            style={{ fontFamily: 'Unbounded, sans-serif' }}
          >
            {/* Barrinha roxa igual ao exemplo da página Parceria */}
            <span className="inline bg-[linear-gradient(180deg,transparent_70%,rgba(94,34,243,0.25)_0)]">
              Viaje fácil
            </span>
            <br />
            com o trip
          </h2>

          <p
            className="mt-6 text-base md:text-lg text-[#181818] leading-relaxed"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            O TRIP é um assistente virtual{' '}
            <span className="font-bold text-[#5E22F3]">acessível pelo WhatsApp</span>, 
            que ajuda você a consultar tarifas, horários e rotas de forma simples e rápida.
          </p>

          <p
            className="mt-4 text-base md:text-lg text-[#181818] leading-relaxed"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Ele <span className="font-bold text-[#5E22F3]">funciona 24h por dia</span> e também permite fazer denúncias,
            tudo com foco em praticidade, segurança e acessibilidade.
          </p>

          {/* Botão animado */}
          <div className="mt-8 flex justify-center lg:justify-start">
            <Link
              href="/chatbot"
              className="inline-block px-7 py-3 rounded-md bg-[#5E22F3] text-white text-base md:text-lg font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Começar agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
