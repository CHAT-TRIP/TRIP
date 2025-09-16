'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 flex items-center justify-between px-6 md:px-12 py-4 rounded-2xl shadow-md backdrop-blur-md"
      style={{ background: 'rgba(255, 255, 255, 0.15)' }}
    >
      {/* LOGO */}
      <div className="flex items-center">
        <Image src="/logo-header.png" alt="Logo TRIP" width={140} height={60} priority />
      </div>

      {/* LINKS DESKTOP */}
      <nav
        className="hidden md:flex items-center gap-10 text-white font-medium text-base"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        <Link href="/">Início</Link>
        <Link href="/parcerias">Parcerias</Link>
        <Link href="/integrantes">Criadores</Link>
        <Link href="/receitas">Rotas</Link>
      </nav>

      {/* BOTÃO TRIP */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/chatbot"
          className="bg-[#ffffff] text-#300E86 font-bold text-base px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-200"
          style={{ fontFamily: 'Unbounded, sans-serif' }}
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
          <div
            ref={dropdownRef}
            className="absolute top-16 right-4 bg-[#300E86] text-white text-sm rounded-lg shadow-lg py-4 px-6 w-[200px] flex flex-col gap-3 z-50"
          >
            <Link href="/" className="hover:text-[#DCC2FF]">Início</Link>
            <Link href="/parcerias" className="hover:text-[#DCC2FF]">Parcerias</Link>
            <Link href="/integrantes" className="hover:text-[#DCC2FF]">Criadores</Link>
            <Link href="/receitas" className="hover:text-[#DCC2FF]">Rotas</Link>
            <Link
              href="/chatbot"
              className="w-full text-center bg-[#5E22F3] text-white font-bold rounded-md py-2 mt-2"
            >
              TRIP
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
