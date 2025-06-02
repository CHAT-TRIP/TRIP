'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="absolute top-4 left-0 w-full z-50 flex items-center justify-between px-6 md:px-20">
      {/* LOGO */}
      <div className="flex items-center">
        <Image src="/Logo.png" alt="Logo TRIP" width={120} height={50} priority />
      </div>

      {/* BOTÕES CONTA / TRIP - DESKTOP */}
      <div className="hidden md:flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-6 py-2 border border-white text-white text-base font-bold rounded-md hover:bg-white/10 transition-transform transform hover:scale-105 duration-200"
          >
            CONTA
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-40 rounded-xl shadow-lg backdrop-blur-md p-2 z-50"
              style={{
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              <Link
                href="/login"
                className="block px-4 py-2 text-sm text-white hover:bg-white/20 rounded-md transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-sm text-white hover:bg-white/20 rounded-md transition"
              >
                Criar conta
              </Link>
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
