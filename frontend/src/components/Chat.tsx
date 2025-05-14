'use client'

import Image from 'next/image'

export default function Chat() {
  return (
    <section className="w-full h-[640px] flex justify-center items-center" style={{ backgroundImage: "url('/background - chat.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-[1400px] w-full flex flex-col lg:flex-row items-center justify-center px-4 md:px-12 gap-8">
        {/* Imagem do celular */}
        <div className="w-full flex justify-center lg:justify-end">
          <div className="w-[380px] md:w-[500px] lg:w-[640px]">
            <Image
              src="/celular.png"
              alt="Imagem do Celular"
              width={700}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Textos */}
        <div className="text-center lg:text-left max-w-xl">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(90deg, #DA3368, #741B37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            VIAJE FÁCIL <br /> COM O TRIP
          </h2>

          <p className="mt-6 text-white text-xl md:text-2xl font-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
            O <strong>Trip</strong> é um assistente virtual inteligente que facilita sua vida no transporte ferroviário.
          </p>

          <p className="mt-8 text-white text-xl md:text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Confira algumas das funcionalidades que ele oferece.
          </p>
        </div>
      </div>
    </section>
  )
}