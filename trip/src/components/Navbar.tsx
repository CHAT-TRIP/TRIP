'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)          // menu padrão (não-chatbot)
  const [chatMenuOpen, setChatMenuOpen] = useState(false)  // dropdown mobile do chatbot
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  const isChat = pathname === '/chatbot'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
        setChatMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // scroll helpers da home
  const scrollToInicio = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (pathname !== '/') {
      await router.push('/')
      setTimeout(() => {
        const section = document.getElementById('inicio')
        if (section) section.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 300)
    } else {
      const section = document.getElementById('inicio')
      if (section) section.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToProposta = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (pathname !== '/') {
      await router.push('/')
      setTimeout(() => {
        const section = document.getElementById('proposta')
        if (section) section.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      const section = document.getElementById('proposta')
      if (section) section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // dispara o "limpar chat" para a página /chatbot ouvir
  const dispatchClearChat = () => {
    window.dispatchEvent(new CustomEvent('trip:clear-chat'))
    setChatMenuOpen(false)
  }

  // função de logout
  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('loginTime')
    router.push('/login')
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-4 shadow-md
        ${isChat
          ? 'bg-white/10 backdrop-blur-md border-b border-white/20 text-white'
          : 'bg-[#5E22F3] text-white'
        }`}
    >
      {/* LOGO */}
      <div className="flex items-center">
        <Image src="/logo-header.png" alt="Logo TRIP" width={140} height={60} priority />
      </div>

      {/* ====== DESKTOP ====== */}
      {!isChat ? (
        // navegação padrão (todas as páginas exceto /chatbot)
        <>
          <nav
            className="hidden md:flex items-center gap-10 font-medium text-base"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <a href="#inicio" onClick={scrollToInicio} className="hover:text-[#DCC2FF] transition-colors duration-200">
              Início
            </a>
            <a href="#proposta" onClick={scrollToProposta} className="hover:text-[#DCC2FF] transition-colors duration-200">
              Parcerias
            </a>

            <Link href="/criadores" className="hover:text-[#DCC2FF] transition-colors duration-200">Criadores</Link>
            <Link href="/rota" className="hover:text-[#DCC2FF] transition-colors duration-200">Rotas</Link>
            <Link href="/buscar-rota" className="hover:text-[#DCC2FF] transition-colors duration-200">Buscar Rota</Link>
            <Link href="/status-linhas" className="hover:text-[#DCC2FF] transition-colors duration-200">Status das Linhas</Link>
            <Link href="/chatbot" className="hover:text-[#DCC2FF] transition-colors duration-200">Chatbot</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/register"
              className="bg-white text-[#300E86] font-bold text-base px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105 duration-200"
              style={{ fontFamily: 'Unbounded, sans-serif' }}
            >
              TRIP
            </Link>
          </div>
        </>
      ) : (
        // barra especial do CHATBOT (desktop): "Início", "Limpar" e "Sair"
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/"
            className="text-white text-sm font-semibold px-5 py-2 rounded-md border border-white/80 hover:bg-white hover:text-[#5E22F3] transition"
          >
            Início
          </Link>
          <button
            onClick={dispatchClearChat}
            className="text-white text-sm font-semibold px-5 py-2 rounded-md border border-white/80 hover:bg-white hover:text-[#5E22F3] transition"
          >
            Limpar
          </button>
          <button
            onClick={handleLogout}
            className="bg-white text-[#5E22F3] text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition"
          >
            Sair
          </button>
        </div>
      )}

      {/* ====== MOBILE ====== */}
      {!isChat ? (
        // menu mobile padrão
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
              <a href="#inicio" onClick={(e) => { scrollToInicio(e); setMenuOpen(false) }} className="hover:text-[#DCC2FF]">Início</a>
              <a href="#proposta" onClick={(e) => { scrollToProposta(e); setMenuOpen(false) }} className="hover:text-[#DCC2FF]">Parcerias</a>
              <Link href="/criadores" onClick={() => setMenuOpen(false)} className="hover:text-[#DCC2FF]">Criadores</Link>
              <Link href="/rota" onClick={() => setMenuOpen(false)} className="hover:text-[#DCC2FF]">Rotas</Link>
              <Link href="/buscar-rota" onClick={() => setMenuOpen(false)} className="hover:text-[#DCC2FF]">Buscar Rota</Link>
              <Link href="/status-linhas" onClick={() => setMenuOpen(false)} className="hover:text-[#DCC2FF]">Status das Linhas</Link>
              <Link href="/chatbot" onClick={() => setMenuOpen(false)} className="hover:text-[#DCC2FF]">Chatbot</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="w-full text-center bg-white text-[#300E86] font-bold rounded-md py-2 mt-2">
                TRIP
              </Link>
            </div>
          )}
        </div>
      ) : (
        // mobile do CHATBOT: um botão "Clique aqui" que abre as opções
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setChatMenuOpen(!chatMenuOpen)}
            className="px-4 py-2 border border-white text-white text-sm font-bold rounded-md"
          >
            Clique aqui
          </button>

          {chatMenuOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-16 right-4 bg-white/15 backdrop-blur-md text-white text-sm rounded-lg shadow-lg py-4 px-6 w-[200px] flex flex-col gap-3 z-50 border border-white/25"
            >
              <Link href="/" onClick={() => setChatMenuOpen(false)} className="hover:text-[#DCC2FF]">Início</Link>
              <button onClick={dispatchClearChat} className="text-left hover:text-[#DCC2FF]">Limpar chat</button>
              <button onClick={handleLogout} className="text-left hover:text-[#DCC2FF]">Sair</button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
