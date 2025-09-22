'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const desktopBanners = [
  { src: '/anuncio-desktop-thetown.png', alt: 'Banner 1', width: 1440, height: 710 },
  { src: '/anuncio-desktop-ccr.png',    alt: 'Banner 2', width: 1440, height: 710 },
]

const mobileBanners = [
  { src: '/anuncio-mobile-thetown.png', alt: 'Banner 1 Mobile', width: 364, height: 626 },
  { src: '/anuncio-mobile-ccr.png',     alt: 'Banner 2 Mobile', width: 364, height: 626 },
]

export default function Parcerias() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % desktopBanners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="parcerias" className="relative w-full py-14 md:py-20 bg-[#E9E9E9]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Logos das empresas parceiras */}
        <div className="flex justify-center opacity-80">
          <Image
            src="/parcerias-marcas.png"
            alt="Empresas Parceiras"
            width={920}
            height={100}
            className="object-contain w-full max-w-[920px] h-auto"
            priority
          />
        </div>

        {/* Título + subtítulo */}
        <div className="mt-10 md:mt-12 text-center">
          <h2
            className="relative inline-block text-[#5E22F3] font-unbounded font-semibold
                       text-[34px] sm:text-[42px] md:text-[54px] leading-tight"
          >
            <span className="relative inline-block">
              {/* Texto por cima */}
              <span className="relative z-10">Seja um parceiro Motiva</span>

              {/* Marca-texto como IMAGEM atrás do texto */}
              <span className="absolute left-0 right-0 bottom-[8%] h-[0.55em] -z-10 pointer-events-none select-none">
                <Image
                  src="/texto.svg"
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 768px) 640px, 90vw"
                  className="object-fill w-full h-full"
                  priority
                />
              </span>
            </span>
          </h2>

          <p className="mt-6 font-montserrat text-sm sm:text-base md:text-lg text-[#181818]">
            SUA EMPRESA CONECTADA A NÓS.{' '}
            <Link
              href="#saiba-mais-parcerias"
              className="font-bold text-[#5E22F3] hover:underline underline-offset-4"
            >
              SAIBA MAIS!
            </Link>
          </p>
        </div>

        {/* Banner Desktop */}
        <div className="hidden md:block mt-10 md:mt-12">
          <div className="mx-auto rounded-3xl overflow-hidden w-[1440px] h-[710px] max-w-full shadow-lg">
            <Image
              key={desktopBanners[index].src}
              src={desktopBanners[index].src}
              alt={desktopBanners[index].alt}
              width={desktopBanners[index].width}
              height={desktopBanners[index].height}
              className="w-full h-full object-cover transition-opacity duration-700"
              priority
            />
          </div>
        </div>

        {/* Banner Mobile */}
        <div className="block md:hidden mt-8">
          <div className="mx-auto rounded-3xl overflow-hidden w-[364px] h-[626px] max-w-full shadow-md">
            <Image
              key={mobileBanners[index].src}
              src={mobileBanners[index].src}
              alt={mobileBanners[index].alt}
              width={mobileBanners[index].width}
              height={mobileBanners[index].height}
              className="w-full h-full object-cover transition-opacity duration-700"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
