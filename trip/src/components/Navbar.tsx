'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 🔼 Scroll suave pro topo (ou redireciona se não estiver na home)
  const scrollToInicio = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (pathname !== '/') {
      await router.push('/') // vai pra home primeiro
      setTimeout(() => {
        const section = document.getElementById('inicio')
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 300) // espera o carregamento da home antes de scrollar
    } else {
      const section = document.getElementById('inicio')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  // 🔽 Scroll suave pra seção da proposta (só na home)
  const scrollToProposta = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (pathname !== '/') {
      await router.push('/')
      setTimeout(() => {
        const section = document.getElementById('proposta')
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    } else {
      const section = document.getElementById('proposta')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between 
                 px-6 md:px-12 py-4 shadow-md bg-[#5E22F3]"
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
        <a
          href="#inicio"
          onClick={scrollToInicio}
          className="hover:text-[#DCC2FF] transition-colors duration-200"
        >
          Início
        </a>

        <a
          href="#proposta"
          onClick={scrollToProposta}
          className="hover:text-[#DCC2FF] transition-colors duration-200"
        >
          Parcerias
        </a>

        <Link
          href="/integrantes"
          className={`${pathname === '/integrantes' ? 'text-[#DCC2FF]' : 'hover:text-[#DCC2FF]'} transition-colors duration-200`}
        >
          Criadores
        </Link>

        <Link
          href="/rota"
          className={`transition-colors duration-200 ${
            pathname === '/rota' ? 'text-[#CBA6FF]' : 'hover:text-[#DCC2FF]'
          }`}
        >
          Rotas
        </Link>
      </nav>

      {/* BOTÃO TRIP */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/register"
          className="bg-white text-[#300E86] font-bold text-base px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105 duration-200"
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
            className="absolute top-16 right-4 bg-[#5E22F3] text-white text-sm rounded-lg shadow-lg py-4 px-6 w-[200px] flex flex-col gap-3 z-50"
          >
            <a
              href="#inicio"
              onClick={(e) => {
                scrollToInicio(e)
                setMenuOpen(false)
              }}
              className="hover:text-[#DCC2FF]"
            >
              Início
            </a>

            <a
              href="#proposta"
              onClick={(e) => {
                scrollToProposta(e)
                setMenuOpen(false)
              }}
              className="hover:text-[#DCC2FF]"
            >
              Parcerias
            </a>

            <Link href="/integrantes" className={pathname === '/integrantes' ? 'text-[#DCC2FF]' : 'hover:text-[#DCC2FF]'}>Criadores</Link>

            <Link
              href="/rota"
              className={pathname === '/rota' ? 'text-[#CBA6FF]' : 'hover:text-[#DCC2FF]'}
            >
              Rotas
            </Link>

            <Link
              href="/register"
              className="w-full text-center bg-white text-[#300E86] font-bold rounded-md py-2 mt-2 transition-transform hover:scale-105 duration-200"
            >
              TRIP
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
