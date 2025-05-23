'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface BotaoAnimadoProps {
  href: string
  children: ReactNode
  variant?: 'filled' | 'outlined'
}

export default function BotaoAnimado({ href, children, variant = 'outlined' }: BotaoAnimadoProps) {
  const baseStyle =
    'px-3 sm:px-6 py-1.5 sm:py-3 rounded-md text-xs sm:text-base font-bold transition'

  const outlinedStyle =
    'border border-white text-white hover:bg-white hover:text-[#DA3368]'

  const filledStyle =
    'bg-white text-[#DA3368] hover:bg-[#DA3368] hover:text-white border border-white'

  const style = variant === 'outlined' ? outlinedStyle : filledStyle

  return (
    <Link
      href={href}
      className={`${baseStyle} ${style}`}
      style={{ fontFamily: 'Poppins', fontWeight: 700 }}
    >
      {children}
    </Link>
  )
}  /**Botões ajustados */

