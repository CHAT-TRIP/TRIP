// src/components/CTA.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function CTA() {
  return (
    <section className="relative pt-24 pb-36 flex items-center justify-center text-white">
      {/* Fundo */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/background.png"
          alt="Fundo"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 text-center w-full max-w-4xl px-6">
        {/* bem-vindo com degradê transparente */}
        <div
          className="inline-block text-base font-normal px-8 py-2 rounded-full mb-4 backdrop-blur-md mx-auto"
          style={{
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          bem-vindo
        </div>

        {/* Título */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          ao seu assistente <br /> virtual TRIP!
        </h1>

        {/* Parágrafo */}
        <p className="text-lg md:text-xl font-light text-white/90 mb-12 leading-relaxed mx-auto max-w-3xl px-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Tire dúvidas, planeje rotas e receba atendimento rápido direto no celular. Tudo para tornar sua jornada mais confortável, ágil e conectada com o que há de mais inovador.
        </p>

        {/* Botões */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* TRIP */}
          <Link
            href="/chatbot"
            className="w-[150px] text-center bg-white text-[#DA3368] font-bold text-base px-6 py-2 rounded-md shadow-sm transition-transform transform hover:scale-105 duration-200"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            TRIP
          </Link>

          {/* Saiba mais */}
          <a
            href="#funcionalidades"
            className="w-[150px] text-center text-white border border-white font-bold text-base px-6 py-2 rounded-md transition-transform transform hover:scale-105 duration-200"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Saiba mais
          </a>
        </div>
      </div>
    </section>
  )
}
