'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[rgb(24,24,24)] text-white py-6 md:py-7">
      <div className="mx-auto w-full max-w-[1300px] px-6">

        {/* ===================== MOBILE ===================== */}
        <div className="md:hidden flex flex-col items-center justify-center gap-4">
          {/* Mascote em cima */}
          <Image
            src="/mascote-footer.svg"
            alt="Mascote TRIP"
            width={120}
            height={120}
            priority
            className="w-[110px] h-auto select-none pointer-events-none"
          />

          {/* Texto centralizado abaixo do boneco */}
          <p
            className="text-[13px] text-[#D5D5D5] leading-relaxed text-center max-w-[320px]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Edifício Eldorado Business Tower – Av. Dra. Ruth Cardoso, 8.501 – 5º andar,
            Pinheiros – São Paulo – SP – CEP: 05425-070 • © 2025 Motiva
          </p>

          {/* Acompanhe-nos centralizado */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <span
              className="text-[#AFC7E3] text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Acompanhe-nos:
            </span>
            <div className="flex items-center gap-4">
              <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                <Image src="/Facebook.svg" alt="Facebook" width={15} height={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                <Image src="/Instagram.svg" alt="Instagram" width={24} height={24} />
              </Link>
              <Link href="https://twitter.com" target="_blank" aria-label="X (Twitter)">
                <Image src="/Twitter.svg" alt="X (Twitter)" width={24} height={24} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <Image src="/Linkedin.svg" alt="LinkedIn" width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* ===================== DESKTOP ===================== */}
        <div className="hidden md:flex items-center justify-between gap-8">
          {/* ESQUERDA: Mascote grande + texto (sem alterar layout aprovado) */}
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

          {/* DIREITA: divisor + “Acompanhe-nos” (desktop igual ao aprovado) */}
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
                <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                  <Image src="/Facebook.svg" alt="" width={15} height={28} className="opacity-90 hover:opacity-100 transition" />
                </Link>
                <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                  <Image src="/Instagram.svg" alt="" width={24} height={28} className="opacity-90 hover:opacity-100 transition" />
                </Link>
                <Link href="https://twitter.com" target="_blank" aria-label="X (Twitter)">
                  <Image src="/Twitter.svg" alt="" width={24} height={28} className="opacity-90 hover:opacity-100 transition" />
                </Link>
                <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                  <Image src="/Linkedin.svg" alt="" width={24} height={28} className="opacity-90 hover:opacity-100 transition" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
