'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Rotas() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between bg-[#E9E9E9] text-[#181818] pt-36">
      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16">
        <h1
          className="text-[38px] md:text-[52px] font-extrabold text-[#5E22F3] mb-10 text-center"
          style={{ fontFamily: 'Unbounded, sans-serif' }}
        >
          Mapa de Rotas
        </h1>

        {/* VISUALIZADOR DE PDF */}
        <div className="w-full max-w-[1000px] h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#d8c9ff]">
          <iframe
            src="/Mapa-de-rede.pdf"
            className="w-full h-full"
            title="Mapa de Rotas TRIP"
          ></iframe>
        </div>

        <p
          className="mt-6 text-sm md:text-base text-[#5E22F3]/70 text-center"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Você pode ampliar, mover e visualizar os detalhes do mapa diretamente aqui.
        </p>
      </div>

      {/* RODAPÉ */}
      <footer className="w-full bg-[#181818] text-white py-6 md:py-7">
        <div className="mx-auto w-full max-w-[1300px] px-6">

          {/* MOBILE */}
          <div className="md:hidden flex flex-col items-center justify-center gap-4">
            <Image
              src="/mascote-footer.svg"
              alt="Mascote TRIP"
              width={120}
              height={120}
              className="w-[110px] h-auto select-none pointer-events-none"
            />

            <p
              className="text-[13px] text-[#D5D5D5] leading-relaxed text-center max-w-[320px]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Edifício Eldorado Business Tower – Av. Dra. Ruth Cardoso, 8.501 – 5º andar,
              Pinheiros – São Paulo – SP – CEP: 05425-070 • © 2025 Motiva
            </p>

            <div className="flex flex-col items-center gap-2 mt-2">
              <span className="text-[#AFC7E3] text-sm">Acompanhe-nos:</span>

              <div className="flex items-center gap-3">
                <Link href="https://www.youtube.com/user/GrupoCCROficial" target="_blank">
                  <Image
                    src="/youtube.png"
                    alt="YouTube"
                    width={38}
                    height={38}
                    className="hover:scale-110 transition-transform"
                  />
                </Link>

                <Link href="https://www.linkedin.com/company/motivamobilidade/" target="_blank">
                  <Image
                    src="/Linkedin.svg"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="hover:scale-110 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center justify-between gap-8">
            <div className="flex items-center gap-5 min-w-0 flex-1">
              <div className="relative h-[130px] w-[190px] overflow-visible">
                <Image
                  src="/mascote-footer.svg"
                  alt="Mascote TRIP"
                  width={220}
                  height={220}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-auto"
                />
              </div>

              <p className="text-sm text-[#D5D5D5] leading-snug">
                Edifício Eldorado Business Tower – Av. Dra. Ruth Cardoso, 8.501 – 5º andar,
                Pinheiros – São Paulo – SP – CEP: 05425-070 • © 2025 Motiva
              </p>
            </div>

            <div className="flex items-start gap-14">
              <span className="block h-20 w-px bg-white/40" />

              <div className="min-w-[350px]">
                <span className="block text-[#AFC7E3] text-sm">Acompanhe-nos:</span>

                <div className="mt-2 flex items-center gap-3">
                  <Link href="https://www.youtube.com/user/GrupoCCROficial" target="_blank">
                    <Image
                      src="/youtube.png"
                      alt="YouTube"
                      width={44}
                      height={44}
                      className="hover:scale-110 transition-transform"
                    />
                  </Link>

                  <Link href="https://www.linkedin.com/company/motivamobilidade/" target="_blank">
                    <Image
                      src="/Linkedin.svg"
                      alt="LinkedIn"
                      width={28}
                      height={28}
                      className="hover:scale-110 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </section>
  )
}
