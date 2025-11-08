'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'

type Msg = { remetente: 'bot' | 'user'; texto: string }

export default function Chatbot() {
  const router = useRouter()
  const [mensagens, setMensagens] = useState<Msg[]>([
    {
      remetente: 'bot',
      texto:
        'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação às linhas de trens e metrôs, como posso te ajudar?',
    },
  ])
  const [input, setInput] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [autenticado, setAutenticado] = useState(false)
  const fimDasMensagensRef = useRef<HTMLDivElement | null>(null)

  /* ================== AUTENTICAÇÃO ================== */
  useEffect(() => {
    const user = localStorage.getItem('user')
    const loginTime = localStorage.getItem('loginTime')

    if (!user || !loginTime) {
      router.push('/login')
      return
    }
    const horas = (Date.now() - parseInt(loginTime)) / (1000 * 60 * 60)
    if (horas > 24) {
      localStorage.removeItem('user')
      localStorage.removeItem('loginTime')
      router.push('/login')
    } else {
      setAutenticado(true)
    }
  }, [router])

  /* ================== LIMPAR VIA NAVBAR ================== */
  useEffect(() => {
    const clearHandler = () => {
      setMensagens([
        {
          remetente: 'bot',
          texto:
            'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação às linhas de trens e metrôs, como posso te ajudar?',
        },
      ])
    }
    window.addEventListener('trip:clear-chat', clearHandler)
    return () => window.removeEventListener('trip:clear-chat', clearHandler)
  }, [])

  /* ================== ENVIAR MENSAGEM ================== */
  const enviarMensagem = async () => {
    const textoUsuario = input.trim()
    if (!textoUsuario) return

    const novaMensagem: Msg = { remetente: 'user', texto: textoUsuario }
    setMensagens((prev) => [
      ...prev,
      novaMensagem,
      { remetente: 'bot', texto: 'Digitando...' },
    ])
    setInput('')
    setEnviando(true)

    setTimeout(() => fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' }), 80)

    try {
      const resposta = await fetch('https://chatbot-trip.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: textoUsuario }),
      })
      const data = await resposta.json()
      const texto = data?.resposta || 'Erro: resposta vazia'
      setMensagens((msgs) => [...msgs.slice(0, -1), { remetente: 'bot', texto }])
    } catch {
      setMensagens((msgs) => [...msgs.slice(0, -1), { remetente: 'bot', texto: 'Desculpe, ocorreu um erro.' }])
    } finally {
      setEnviando(false)
      setTimeout(() => fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }

  if (!autenticado) return null

  return (
    <>
      <Navbar />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .mensagem-bot { margin-right: auto !important; align-self: flex-start !important; white-space: pre-wrap !important; }
          .mensagem-user { margin-left: auto !important; align-self: flex-end !important; white-space: pre-wrap !important; font-weight: 600 !important; }
          .mensagem-bot a { color: #93C5FD !important; text-decoration: underline !important; font-weight: 600 !important; }
        `,
        }}
      />

      {/* ===== FUNDO FIXO ===== */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5E22F3] via-[#7B4DF7] to-[#DCC2FF]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_25%,rgba(255,255,255,0.22),transparent_60%)]" />
      </div>

      {/* ===== CONTAINER ===== */}
      <section className="relative w-full h-[100dvh] flex flex-col font-[Montserrat] text-white/95">
        <div className="h-24 shrink-0" aria-hidden />

        <div className="flex-1 min-h-0 w-full flex flex-col items-center">
          <div className="w-full max-w-3xl px-4 sm:px-6 flex-1 min-h-0 flex flex-col">

            {/* CHAT */}
            <div
              className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-5
                         scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent"
            >
              {mensagens.map((msg, i) => (
                <div
                  key={i}
                  className={`w-fit max-w-[90%] sm:max-w-[85%] px-6 py-4 rounded-3xl text-[15px] md:text-base font-medium shadow-[0_10px_30px_rgba(0,0,0,0.2)] break-words
                  ${
                    msg.remetente === 'user'
                      ? 'mensagem-user bg-white text-[#5E22F3] self-end'
                      : 'mensagem-bot bg-white/15 text-white self-start backdrop-blur-md border border-white/10'
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.texto.replace(/\n/g, '<br/>') }}
                />
              ))}
              <div ref={fimDasMensagensRef} />
            </div>

            {/* INPUT FIXO */}
            <div className="sticky bottom-0 left-0 w-full pt-4 pb-6 bg-transparent">
              <div className="w-full max-w-3xl mx-auto px-0 sm:px-0">
                <div className="flex items-center gap-3 w-full
                                rounded-full border border-white/20
                                bg-white/14 backdrop-blur-md
                                px-5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(ev) => ev.key === 'Enter' && enviarMensagem()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 bg-transparent text-white placeholder:text-white/75 outline-none text-base"
                  />
                  <button
                    onClick={enviarMensagem}
                    disabled={enviando}
                    className="shrink-0 rounded-full px-6 min-h-[44px] text-sm font-semibold
                               bg-white text-[#5E22F3] shadow-md hover:shadow-lg transition
                               focus:outline-none focus:ring-2 focus:ring-white/60 disabled:opacity-60"
                  >
                    Enviar
                  </button>
                </div>
              </div>

              <div className="pb-[env(safe-area-inset-bottom)]" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
