'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function Chatbot() {
  const [mensagens, setMensagens] = useState([
    {
      remetente: 'bot',
      texto:
        'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação às linhas de trens e metrôs, como posso te ajudar?',
    },
  ])
  const [input, setInput] = useState('')
  const [enviando, setEnviando] = useState(false)
  const fimDasMensagensRef = useRef<HTMLDivElement | null>(null)

  const enviarMensagem = async () => {
    if (!input.trim()) return
    const novaMensagem = { remetente: 'user', texto: input }
    setMensagens((prev) => [...prev, novaMensagem, { remetente: 'bot', texto: 'Digitando...' }])
    setInput('')
    setEnviando(true)
    setTimeout(() => fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)

    try {
      const resposta = await fetch('https://chatbot-trip.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: novaMensagem.texto }),
      })

      const data = await resposta.json()
      const texto = data.resposta || 'Erro: resposta vazia'
      setMensagens((msgs) => [...msgs.slice(0, -1), { remetente: 'bot', texto }])
    } catch {
      setMensagens((msgs) => [...msgs.slice(0, -1), { remetente: 'bot', texto: 'Desculpe, ocorreu um erro.' }])
    }

    setEnviando(false)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .mensagem-bot {
            margin-right: auto !important;
            align-self: flex-start !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            white-space: pre-wrap !important;
          }
          .mensagem-user {
            margin-left: auto !important;
            align-self: flex-end !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            white-space: pre-wrap !important;
            font-weight: 600 !important;
          }
          .mensagem-bot a {
            color: #60A5FA !important;
            text-decoration: underline !important;
            font-weight: 600 !important;
            transition: all 0.2s ease !important;
          }
          .mensagem-bot a:hover {
            color: #93C5FD !important;
            text-shadow: 0 0 8px rgba(96, 165, 250, 0.6) !important;
          }
          .mensagem-user a {
            color: #5E22F3 !important;
            text-decoration: underline !important;
            font-weight: 600 !important;
          }
          .mensagem-user a:hover {
            color: #3D16A8 !important;
          }
        `
      }} />
      <section
        className="relative w-full min-h-screen flex flex-col font-[Poppins] bg-gradient-to-br from-[#5E22F3] to-[#DCC2FF] overflow-hidden"
      >
      {/* mascote centralizado */}
      <div className="absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none">
        <Image
          src="/mascote-footer.svg"
          alt="Mascote TRIP"
          width={750}
          height={750}
          className="object-contain select-none"
          priority
        />
      </div>

      {/* header */}
      <header className="relative z-10 w-full px-8 py-4 flex items-center justify-between backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="flex items-center gap-3">
          <Image src="/logo-header.png" alt="Logo TRIP" width={120} height={60} />
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="text-white text-sm font-semibold px-5 py-2 rounded-md border border-white hover:bg-white hover:text-[#5E22F3] transition"
          >
            Início
          </Link>
          <button
            onClick={() =>
              setMensagens([
                {
                  remetente: 'bot',
                  texto:
                    'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação às linhas de trens e metrôs, como posso te ajudar?',
                },
              ])
            }
            className="bg-white text-[#5E22F3] text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition"
          >
            Limpar
          </button>
        </div>
      </header>

      {/* chat */}
      <main className="relative z-10 flex-1 flex flex-col justify-end w-full max-w-3xl px-4 sm:px-6 py-10 mx-auto">
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] mb-6 scrollbar-thin scrollbar-thumb-[#9F86FF]/40 scrollbar-track-transparent w-full">
          {mensagens.map((msg, i) => (
            <div
              key={i}
              className={`w-fit max-w-[85%] px-6 py-3 rounded-3xl text-sm md:text-base font-medium shadow-lg break-words ${
                msg.remetente === 'user'
                  ? 'mensagem-user bg-white text-[#5E22F3] self-end'
                  : 'mensagem-bot bg-white/30 text-white self-start backdrop-blur-sm'
              }`}
              dangerouslySetInnerHTML={{ __html: msg.texto.replace(/\n/g, '<br/>') }}
            />
          ))}
          <div ref={fimDasMensagensRef} />
        </div>

        {/* input */}
        <div className="w-full flex justify-center px-2">
          <div className="flex items-center gap-3 w-full bg-white/20 backdrop-blur-md px-4 py-3 rounded-full shadow-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-transparent text-white placeholder:text-white/70 outline-none text-sm md:text-base"
            />
            <button
              onClick={enviarMensagem}
              disabled={enviando}
              className="bg-white text-[#5E22F3] px-6 py-2 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition"
            >
              Enviar
            </button>
          </div>
        </div>
      </main>
    </section>
    </>
  )
}
