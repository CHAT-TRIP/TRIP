'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute top-4 left-0 w-full z-50 flex items-center justify-between px-23">
      {/* LOGO GRANDE */}
      <div className="flex items-center">
        <Image src="/Logo.png" alt="Logo TRIP" width={140} height={60} priority />
      </div>

      {/* NAV BAR */}
      <div className="flex-1 flex justify-center pr">
        <nav className="backdrop-blur-md bg-white/10 px-16 py-5 rounded-full flex gap-8 text-white text-sm font-normal tracking-wide transition-transform transform hover:scale-105 duration-200">
          <a href="#funcionalidades" className="hover:text-secondary transition">FUNCIONALIDADES</a>
          <a href="#parceria" className="hover:text-secondary transition">PARCERIA</a>
          <a href="#integrantes" className="hover:text-secondary transition">INTEGRANTES</a>
          <Link href="/chatbot" className="hover:text-secondary transition">CHAT</Link>
          <a href="#ajuda" className="hover:text-secondary transition">AJUDA</a>
          <a href="https://ccr.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">CCR</a>
          <a href="#novidades" className="hover:text-secondary transition">NOVIDADES</a>
        </nav>
      </div>

      {/* BOTÕES CONTA / TRIP */}
      <div className="flex items-center gap-4">
        {/* CONTA */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="px-7 py-2 border border-white text-white text-base font-bold rounded-md hover:bg-white/10 transition-transform transform hover:scale-105 duration-200"
          >
            CONTA
          </button>
          {open && (
            <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded z-10 w-32">
              <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
              <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">Criar conta</Link>
            </div>
          )}
        </div>

        {/* TRIP */}
        <Link
          href="/chatbot"
          className="bg-white text-[#DA3368] font-bold text-base px-7 py-2 rounded-md shadow-sm hover:bg-gray-100 transition-transform transform hover:scale-105 duration-200"
        >
          TRIP
        </Link>
      </div>
    </header>
  )
}