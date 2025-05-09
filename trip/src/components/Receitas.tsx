'use client'

import Image from 'next/image'

export default function Receitas() {
  return (
    <section className="py-12 px-4 md:px-20 flex flex-col items-center gap-12 bg-white">
      {/* Logos das Empresas Parceiras */}
      <div className="flex justify-center">
        <Image
          src="/Parcerias.png"
          alt="Empresas Parceiras"
          width={400}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Banner com borda rosa e cantos arredondados */}
      <div className="rounded-3xl border-2 border-[#DA3368] overflow-hidden w-[1140px] h-[630px] max-w-full">
        <Image
          src="/banner-receitas.png"
          alt="Banner de receitas"
          width={1140}
          height={630}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
