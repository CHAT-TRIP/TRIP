'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[rgb(24,24,24)] text-white py-6 md:py-7">
      <div className="mx-auto w-full max-w-[1300px] px-6">

        {/* ===================== MOBILE ===================== */}
        <div className="md:hidden flex flex-col items-center justify-center gap-4">
          <Image
            src="/mascote-footer.svg"
            alt="Mascote TRIP"
            width={120}
            height={120}
            priority
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
            <span
              className="text-[#AFC7E3] text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Acompanhe-nos:
            </span>

            <div className="flex items-center gap-4">
              <Link
                href="https://www.youtube.com/user/GrupoCCROficial"
                target="_blank"
                aria-label="YouTube"
              >
                <Image src="/youtube.png" alt="YouTube" width={45} height={45} />
              </Link>

              <Link
                href="https://www.linkedin.com/company/motivamobilidade/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <Image src="/Linkedin.svg" alt="LinkedIn" width={28} height={28} />
              </Link>
            </div>
          </div>
        </div>

        {/* ===================== DESKTOP ===================== */}
        <div className="hidden md:flex items-center justify-between gap-8">
          
          {/* Mascote + Texto */}
          <div className="flex items-center gap-5 min-w-0 flex-1">
            <div className="relative h-[130px] w-[190px] overflow-visible">
              <Image
                src="/mascote-footer.svg"
                alt="Mascote TRIP"
                width={220}
                height={220}
                priority
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-auto select-none pointer-events-none"
              />
            </div>

            <p
              className="text-sm text-[#D5D5D5] leading-snug"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Edifício Eldorado Business Tower – Av. Dra. Ruth Cardoso, 8.501 – 5º andar,
              Pinheiros – São Paulo – SP – CEP: 05425-070 • © 2025 Motiva
            </p>
          </div>

          {/* Divider + Redes */}
          <div className="flex items-start gap-16">
            <span className="block h-20 w-px bg-white/40" />

            <div className="min-w-[350px]">
              <span
                className="block text-[#AFC7E3] text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Acompanhe-nos:
              </span>

              <div className="mt-2 flex items-center gap-4">
                <Link
                  href="https://www.youtube.com/user/GrupoCCROficial"
                  target="_blank"
                  aria-label="YouTube"
                >
                  <Image
                    src="/youtube.png"
                    alt="YouTube"
                    width={45}
                    height={45}
                    className="opacity-90 hover:opacity-100 transition"
                  />
                </Link>

                <Link
                  href="https://www.linkedin.com/company/motivamobilidade/"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <Image
                    src="/Linkedin.svg"
                    alt="LinkedIn"
                    width={28}
                    height={28}
                    className="opacity-90 hover:opacity-100 transition"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
