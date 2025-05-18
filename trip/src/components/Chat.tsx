'use client'

import Image from 'next/image'

export default function Chat() {
  return (
    <section
      className="w-full h-auto px-4 pt-4 pb-2 lg:py-20 flex flex-col lg:flex-row items-center justify-center text-white"
      style={{
        backgroundImage: "url('/background - chat.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4">
        
        {/* CELULAR */}
        <div className="flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="w-[98vw] max-w-[880px] lg:w-[500px] xl:w-[580px]">
            <Image
              src="/celular.png"
              alt="Imagem do Celular"
              width={1400}
              height={1600}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* TEXTOS */}
        <div className="text-center lg:text-left max-w-[90%] sm:max-w-md md:max-w-lg order-1 lg:order-2">
          <h2
            className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-tight"
            style={{
              fontFamily: 'Poppins, sans-serif',
              background: 'linear-gradient(90deg, #DA3368, #741B37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            VIAJE FÁCIL <br /> COM O TRIP
          </h2>

          <p
            className="mt-6 text-base sm:text-lg md:text-xl xl:text-2xl font-light text-white"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            O <strong>Trip</strong> é um assistente virtual inteligente que facilita sua vida no transporte ferroviário.
          </p>

          <p
            className="mt-6 text-base sm:text-lg md:text-xl xl:text-2xl font-bold text-white"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Confira algumas das funcionalidades que ele oferece.
          </p>
        </div>
      </div>
    </section>
  )
}
