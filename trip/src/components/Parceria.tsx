'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Parceria() {
  return (
    <section
      className="w-full bg-no-repeat bg-cover bg-center flex items-center justify-center min-h-[660px] md:min-h-[680px] lg:min-h-[720px]"
      style={{ backgroundImage: "url('/background-trip.png')" }}
    >
      <div className="max-w-[1400px] w-full flex flex-col lg:flex-row items-center justify-between px-6 py-16 gap-10">
        {/* Boneco separado */}
        <div className="order-1 lg:order-2 w-[300px] md:w-[400px] lg:w-[700px]">
          <Image
            src="/boneco.svg"
            alt="Trip Personagem"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/* Texto */}
        <div className="order-2 lg:order-1 text-center lg:text-left max-w-xl">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#DA3368]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            INOVAÇÃO NO <br className="block lg:hidden" /> TRANSPORTE <br className="block lg:hidden" /> FERROVIÁRIO
          </h2>

          <p
            className="text-[#DA3368] text-sm sm:text-base md:text-lg font-light mb-8"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Com a tecnologia do Trip e a expertise da Motiva, os passageiros ganham um atendimento mais ágil, seguro e eficiente, tornando cada viagem mais tranquila, informada e inovadora.
          </p>

          <Link
            href="https://www.motiva.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#DA3368] text-white font-bold px-6 py-3 rounded-md shadow-md transition-transform transform hover:scale-105 hover:brightness-110 active:scale-95"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </section>
  )
} /**Página de parcerias ajustada */
