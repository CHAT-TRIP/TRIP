'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[rgb(24,24,24)] text-white py-6 md:py-7">
      <div className="mx-auto w-full max-w-[1300px] px-6 flex items-center justify-between gap-8">
        {/* ESQUERDA: Mascote grande (sem aumentar a altura do footer) + texto */}
        <div className="flex items-center gap-5 min-w-0 flex-1">
          {/* Wrapper com altura fixa; imagem absoluta pode “vazar” */}
          <div className="relative h-[110px] md:h-[130px] w-[150px] md:w-[190px] overflow-visible">
            <Image
              src="/mascote-footer.svg"
              alt="Mascote TRIP"
              width={220}
              height={220}
              priority
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] md:w-[150px] h-auto select-none pointer-events-none"
            />
          </div>

          <p
            className="text-[13px] md:text-sm text-[#D5D5D5] leading-relaxed md:leading-snug"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Edifício Eldorado Business Tower – Av. Dra. Ruth Cardoso, 8.501 – 5º andar,
            Pinheiros – São Paulo – SP – CEP: 05425-070 • © 2025 Motiva
          </p>
        </div>

        {/* DIREITA: divisor + “Acompanhe-nos” na linha e ícones embaixo */}
        <div className="hidden md:flex items-start gap-16">
          {/* divisor mais à esquerda */}
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
                <Image src="/Instagram.svg" alt="" width={20} height={28} className="opacity-90 hover:opacity-100 transition" />
              </Link>
              <Link href="https://twitter.com" target="_blank" aria-label="X (Twitter)">
                <Image src="/Twitter.svg" alt="" width={20} height={28} className="opacity-90 hover:opacity-100 transition" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <Image src="/Linkedin.svg" alt="" width={20} height={28} className="opacity-90 hover:opacity-100 transition" />
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE: título + ícones abaixo do texto, sem divisor */}
        <div className="md:hidden w-full flex justify-end">
          <div className="flex flex-col items-end">
            <span
              className="text-[#AFC7E3] text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Acompanhe-nos:
            </span>
            <div className="mt-2 flex items-center gap-3">
              <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                <Image src="/Facebook.svg" alt="" width={24} height={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                <Image src="/Instagram.svg" alt="" width={24} height={24} />
              </Link>
              <Link href="https://twitter.com" target="_blank" aria-label="X (Twitter)">
                <Image src="/Twitter.svg" alt="" width={24} height={24} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <Image src="/Linkedin.svg" alt="" width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
