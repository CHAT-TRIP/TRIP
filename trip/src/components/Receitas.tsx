'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const desktopBanners = [
  { src: '/anuncio-desktop-thetown.png', alt: 'Banner 1', width: 1140, height: 630 },
  { src: '/anuncio-desktop-ccr.png', alt: 'Banner 2', width: 1140, height: 630 },
]

const mobileBanners = [
  { src: '/anuncio-mobile-thetown.png', alt: 'Banner 1 Mobile', width: 364, height: 626 },
  { src: '/anuncio-mobile-ccr.png', alt: 'Banner 2 Mobile', width: 364, height: 626 },
]

export default function Receitas() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % desktopBanners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="receitas"
      className="py-12 px-4 md:px-20 flex flex-col items-center gap-12 bg-white"
    >
      {/* Logos das Empresas Parceiras */}
      <div className="flex justify-center">
        <Image
          src="/Parcerias.svg"
          alt="Empresas Parceiras"
          width={700}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Versão Desktop */}
      <div className="hidden md:block rounded-3xl border-2 border-[#DA3368] overflow-hidden w-[1140px] h-[630px] max-w-full transition-all duration-700">
        <Image
          key={desktopBanners[index].src}
          src={desktopBanners[index].src}
          alt={desktopBanners[index].alt}
          width={desktopBanners[index].width}
          height={desktopBanners[index].height}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Versão Mobile */}
      <div className="block md:hidden rounded-3xl border-2 border-[#DA3368] overflow-hidden w-[364px] h-[626px] max-w-full transition-all duration-700">
        <Image
          key={mobileBanners[index].src}
          src={mobileBanners[index].src}
          alt={mobileBanners[index].alt}
          width={mobileBanners[index].width}
          height={mobileBanners[index].height}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
