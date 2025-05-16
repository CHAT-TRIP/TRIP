'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="absolute top-4 left-0 w-full z-50 flex items-center justify-between px-6 md:px-20">
      {/* LOGO */}
      <div className="flex items-center">
        <Image src="/Logo.png" alt="Logo TRIP" width={120} height={50} priority />
      </div>

      {/* MENU DESKTOP */}
      <div className="hidden md:flex flex-1 justify-center">
        <nav className="backdrop-blur-md bg-white/10 px-10 py-3 rounded-full flex gap-6 text-white text-sm font-normal tracking-wide transition-transform transform hover:scale-105 duration-200">
          <a href="#funcionalidades" className="hover:text-secondary transition">FUNCIONALIDADES</a>
          <a href="#parceria" className="hover:text-secondary transition">PARCERIA</a>
          <a href="#integrantes" className="hover:text-secondary transition">INTEGRANTES</a>
          <Link href="/chatbot" className="hover:text-secondary transition">CHAT</Link>
          <a href="#ajuda" className="hover:text-secondary transition">AJUDA</a>
          <a href="https://ccr.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">CCR</a>
          <a href="#novidades" className="hover:text-secondary transition">NOVIDADES</a>
        </nav>
      </div>

      {/* BOTÕES CONTA / TRIP - DESKTOP */}
      <div className="hidden md:flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-6 py-2 border border-white text-white text-base font-bold rounded-md hover:bg-white/10 transition-transform transform hover:scale-105 duration-200"
          >
            CONTA
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded z-10 w-32">
              <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
              <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">Criar conta</Link>
            </div>
          )}
        </div>

        <Link
          href="/chatbot"
          className="bg-white text-[#DA3368] font-bold text-base px-6 py-2 rounded-md shadow-sm hover:bg-gray-100 transition-transform transform hover:scale-105 duration-200"
        >
          TRIP
        </Link>
      </div>

      {/* MENU MOBILE */}
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-4 py-2 border border-white text-white text-sm font-bold rounded-md"
        >
          MENU
        </button>

        {menuOpen && (
          <div className="absolute top-16 right-4 bg-white/20 backdrop-blur-md text-white text-sm rounded-md shadow-lg py-4 px-6 w-[180px] flex flex-col items-start z-50">
            <a href="#funcionalidades" className="py-1 hover:underline">FUNCIONALIDADES</a>
            <a href="#parceria" className="py-1 hover:underline">PARCERIA</a>
            <a href="#integrantes" className="py-1 hover:underline">INTEGRANTES</a>
            <Link href="/chatbot" className="py-1 hover:underline">CHAT</Link>
            <a href="#ajuda" className="py-1 hover:underline">AJUDA</a>
            <a href="https://ccr.com.br" target="_blank" rel="noopener noreferrer" className="py-1 hover:underline">CCR</a>
            <a href="#novidades" className="py-1 hover:underline">NOVIDADES</a>
            <hr className="my-2 w-full border-white/30" />
            <Link
              href="/login"
              className="w-full text-left px-4 py-2 bg-white text-[#DA3368] font-bold rounded-md mb-2"
            >
              CONTA
            </Link>
            <Link
              href="/chatbot"
              className="w-full text-left px-4 py-2 bg-white text-[#DA3368] font-bold rounded-md"
            >
              TRIP
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
