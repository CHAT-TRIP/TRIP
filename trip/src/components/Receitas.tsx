'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const desktopBanners = [
  { src: '/anuncio-desktop-f1.png', alt: 'Banner 1', width: 1440, height: 710 },
  { src: '/anuncio-desktop-ccr.png',    alt: 'Banner 2', width: 1440, height: 710 },
]

const mobileBanners = [
  { src: '/anuncio-mobile-f1.png', alt: 'Banner 1 Mobile', width: 364, height: 626 },
  { src: '/anuncio-mobile-ccr.png',     alt: 'Banner 2 Mobile', width: 364, height: 626 },
]

export default function Parcerias() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const it = setInterval(() => {
      setIndex((prev) => (prev + 1) % desktopBanners.length)
    }, 5000)
    return () => clearInterval(it)
  }, [])

  return (
    <section id="parcerias" className="w-full bg-[#E9E9E9] py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6">

        {/* Logos desbotadas no topo */}
        <div className="flex justify-center opacity-80">
          <Image
            src="/parcerias-marcas.png"
            alt="Empresas Parceiras"
            width={920}
            height={100}
            priority
            className="object-contain w-full max-w-[920px] h-auto"
          />
        </div>

        {/* Título + subtítulo */}
        <div className="mt-10 md:mt-12 text-center">
          <h2
            className="text-[#5E22F3] font-unbounded font-extrabold tracking-tight
                       text-[34px] sm:text-[44px] md:text-[56px] leading-[1.08]"
          >
            <span>Seja um </span>
            {/* ⬇️ Marca-texto roxo exatamente como no “Viaje fácil” */}
            <span className="
                inline px-[2px]
                bg-[linear-gradient(180deg,transparent_66%,rgba(94,34,243,0.28)_0)]
                box-decoration-clone
              ">
              parceiro Motiva
            </span>
          </h2>

          <p
            className="mt-5 md:mt-6 font-montserrat text-sm sm:text-base md:text-lg text-[#181818]"
          >
            SUA EMPRESA CONECTADA A NÓS.{` `}
            <Link
              href="#saiba-mais-parcerias"
              className="font-bold text-[#5E22F3] underline-offset-4 hover:underline"
            >
              SAIBA MAIS!
            </Link>
          </p>
        </div>

        {/* Banner Desktop */}
        <div className="hidden md:block mt-10 md:mt-12">
          <div className="mx-auto overflow-hidden w-[1440px] h-[710px] max-w-full shadow-lg">
            <Image
              key={desktopBanners[index].src}
              src={desktopBanners[index].src}
              alt={desktopBanners[index].alt}
              width={desktopBanners[index].width}
              height={desktopBanners[index].height}
              priority
              className="w-full h-full object-cover transition-opacity duration-700"
            />
          </div>
        </div>

        {/* Banner Mobile */}
        <div className="block md:hidden mt-8">
          <div className="mx-auto overflow-hidden w-[364px] h-[626px] max-w-full shadow-md">
            <Image
              key={mobileBanners[index].src}
              src={mobileBanners[index].src}
              alt={mobileBanners[index].alt}
              width={mobileBanners[index].width}
              height={mobileBanners[index].height}
              priority
              className="w-full h-full object-cover transition-opacity duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
