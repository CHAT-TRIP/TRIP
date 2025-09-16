'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Chat() {
  return (
    <section
      id="chat"
      className="w-full bg-white text-[#181818] px-6 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* TEXTO */}
        <div className="order-2 lg:order-1 max-w-xl">
          <h2 className="font-unbounded text-[38px] sm:text-[44px] md:text-[76px] leading-tight font-light text-[#5E22F3]">
            Viaje fácil <br />
            <span className="relative">
              com o trip
              <span className="absolute left-0 right-0 bottom-0 h-3 bg-[#DCC2FF] -z-10" />
            </span>
          </h2>

          <p className="mt-6 font-montserrat text-base md:text-lg text-[#181818] leading-relaxed">
            O TRIP é um assistente virtual{" "}
            <span className="font-bold text-[#5E22F3]">
              acessível pelo WhatsApp
            </span>
            , que ajuda você a consultar tarifas, horários e rotas de forma simples e rápida.
          </p>

          <p className="mt-4 font-montserrat text-base md:text-lg text-[#181818] leading-relaxed">
            Ele{" "}
            <span className="font-bold text-[#5E22F3]">funciona 24h por dia</span> e também permite fazer denúncias, tudo com foco em praticidade, segurança e acessibilidade.
          </p>

          <div className="mt-8">
            <Link
              href="/chatbot" // altere o destino real
              className="inline-block px-6 py-3 rounded-md font-montserrat font-semibold text-white bg-[#5E22F3] hover:brightness-110 transition"
            >
              Começar agora
            </Link>
          </div>
        </div>

        {/* CELULAR */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div
            className="
              relative
              w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] xl:w-[520px]
              /* Caso precise ajustar posição use:
                 -translate-y-4
                 translate-x-2
                 rotate-[-2deg]
                 mt-[-20px]
              */
            "
          >
            <Image
              src="/celular.svg"   // o SVG que você anexou
              alt="Tela do TRIP no celular"
              width={1200}
              height={1200}
              priority
              className="w-full h-auto select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
